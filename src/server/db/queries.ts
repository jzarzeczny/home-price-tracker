import { HouseDBReturn, HouseData, PriceDBReturn } from "~/lib/interfaces";
import { supabaseClient } from "./client";

interface AddHouseInterface {
  imageUrl: string;
  title: string;
  link: string;
  userId: string;
  floor: number;
  rooms: number;
  size: number;
}

export const addHouse = async (houseData: AddHouseInterface) => {
  return await supabaseClient
    .from("houses")
    .insert({
      ...houseData,
    })
    .select();
};

interface PriceDataInterface {
  userId: string;
  houseId: string;
  price: string;
  pricePerM: string;
}

export const addInitialPrice = async (priceData: PriceDataInterface) => {
  return await supabaseClient.from("prices").insert({
    userId: priceData.userId,
    houseId: priceData.houseId,
    price: priceData.price,
    pricePerM: priceData.pricePerM,
  });
};

export const addPrice = async (priceData: PriceDataInterface) => {
  return await supabaseClient.from("prices").insert({
    userId: priceData.userId,
    houseId: priceData.houseId,
    price: priceData.price,
    pricePerM: priceData.pricePerM,
  });
};

export const getHouses = async (userId: string): Promise<HouseData[]> => {
  const houses = await supabaseClient
    .from("houses")
    .select("*")
    .eq("userId", userId)
    .order("createdAt", { ascending: false });

  return (houses.data as HouseData[]) || [];
};

export const getPrices = async (userId: string): Promise<PriceDBReturn[]> => {
  const prices = await supabaseClient
    .from("prices")
    .select("*")
    .eq("userId", userId);

  return prices.data as PriceDBReturn[];
};

export const updateNote = async (
  houseId: string,
  noteContent: string
): Promise<PriceDBReturn[]> => {
  const updatedHouse = await supabaseClient
    .from("houses")
    .update({ note: noteContent })
    .eq("id", houseId)
    .select();
  return updatedHouse.data as PriceDBReturn[];
};

export const deleteHouse = async (houseId: string) => {
  await supabaseClient.from("houses").delete().eq("id", houseId);
};
