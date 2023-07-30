import { HouseData, PriceDBReturn } from "../interfaces";

export const margeHousesWithPrices = (
  houses: HouseData[],
  prices: PriceDBReturn[]
): HouseData[] => {
  return (
    houses.map((house: HouseData) => {
      const price = prices.find((price) => price.houseId === house.id);
      return {
        ...house,
        price: price?.price,
        pricePerM: price?.pricePerM,
      } as HouseData;
    }) || []
  );
};
