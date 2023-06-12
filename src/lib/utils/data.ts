import { HouseCardInterface, HouseDBReturn, PriceDBReturn } from "~/interfaces";

export const margeHousesWithPrices = (
  houses: HouseDBReturn[],
  prices: PriceDBReturn[]
): HouseCardInterface[] => {
  return (
    houses.map((house: HouseDBReturn) => {
      const price = prices.find((price) => price.houseId === house.id);
      return {
        ...house,
        price: price?.price,
        pricePerM: price?.pricePerM,
      } as HouseCardInterface;
    }) || []
  );
};
