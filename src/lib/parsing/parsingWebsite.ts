import { load } from "cheerio";

export const parseOtoDom = async (webside:Response )=>{
    const html = await webside.text();

    const $ = await load(html);
    const firstImage = $("source").first();
    const imageUrl = firstImage.attr("srcset");
    const title = $('h1[data-cy="adPageAdTitle"]').text();
    const price = $('strong[data-cy="adPageHeaderPrice"]').text();
    const pricePerM = $('div[aria-label="Cena za metr kwadratowy"]').text();
    if (!imageUrl){
        throw "Image does not exists"
    }
    return {
        imageUrl,
        title,
        price,
        pricePerM
    }
}