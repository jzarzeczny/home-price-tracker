import { load } from "cheerio";
import { CreateHouseData, HOUSE_SOURCE } from "../interfaces/index";
import { validateWebsite } from "./validateWebsite";
import { launch } from "puppeteer";
const otoDomUrl = "otodom.pl" as const;
const olxUrl = "olx.pl" as const;

const numberPattern = /\d+/;

export const parseWebsite = async (
  website: Response,
  link: string
): Promise<CreateHouseData> => {
  const url = new URL(link).host;
  let parsedData: CreateHouseData;

  if (url.includes(otoDomUrl)) {
    parsedData = await parseOtoDom(website);
  } else if (url.includes(olxUrl)) {
    parsedData = await parseOLX(website);
  } else {
    throw new Error("URL not supported");
  }
  return parsedData;
};

export const parseOtoDom = async (
  website: Response
): Promise<CreateHouseData> => {
  const html = await website.text();

  const $ = await load(html);
  const firstImage = $("source").first();
  const imageUrl = firstImage.attr("srcset");
  const title = $('h1[data-cy="adPageAdTitle"]').text();
  const price = $('strong[data-cy="adPageHeaderPrice"]').text();
  const pricePerM = $('div[aria-label="Cena za metr kwadratowy"]').text();
  const roomsDirty = $('div[data-cy="table-label-content"]')
    .filter((_, element) => {
      return $(element).text().trim() === "Liczba pokoi";
    })
    .parent()
    .next();

  const rooms = parseInt(roomsDirty.children().text().trim());
  const floorDirty = $('div[data-cy="table-label-content"]')
    .filter((_, element) => {
      return $(element).text().trim() === "Piętro";
    })
    .parent()
    .next();

  const floor = parseInt(floorDirty.children().text()) || 0;
  const sizeDirty = $('div[data-cy="table-label-content"]')
    .filter((_, element) => {
      return $(element).text().trim() === "Powierzchnia";
    })
    .parent()
    .next();

  const size =
    parseTheRegexp(sizeDirty.children().text().split("}")[1]) || undefined;

  const newDataObject = {
    imageUrl,
    title,
    price,
    pricePerM,
    rooms,
    floor,
    size,
  };

  try {
    validateWebsite(newDataObject);
  } catch (error: any) {
    console.error(error.message);
  }
  return { ...newDataObject, source: HOUSE_SOURCE.otoDom } as CreateHouseData;
};

export const parseOLX = async (webside: Response): Promise<CreateHouseData> => {
  const html = await webside.text();
  const $ = await load(html);
  const imageUrl = $("img").first().attr("src");
  const title = $('h1[data-cy="ad_title"]').text();
  const price = $('[data-testid="ad-price-container"] h2').text();
  const pricePerM = $("li > p")
    .filter((_, element) => {
      return $(element).text().includes("Cena za m²");
    })
    .text();
  const roomsDirty = $('li:contains("Liczba pokoi:")').text();
  const floorDirty = $('li:contains("Poziom:")').text();
  const sizeDirty = $('li:contains("Powierzchnia: ")').text();
  const size = parseTheRegexp(sizeDirty) || undefined;
  const rooms = parseTheRegexp(roomsDirty) || undefined;
  const floor = parseTheRegexp(floorDirty) || 0;
  const newDataObject = {
    imageUrl,
    title,
    price,
    pricePerM,
    rooms,
    floor,
    size,
  };

  try {
    validateWebsite(newDataObject);
  } catch (error: any) {
    console.error(error.message);
  }

  return {
    ...newDataObject,
    source: HOUSE_SOURCE.olx,
  } as CreateHouseData;
};

const extractPricePerM = (text: string): string => {
  const regex = /Cena za m²: (.*?)$/;
  const match = text.match(regex) as string[];
  const extractedValue = match[1];
  return extractedValue;
};

const parseTheRegexp = (text: string): number | null => {
  const regex = text.match(numberPattern);
  if (regex) {
    return parseInt(regex[0], 10);
  }
  return null;
};
