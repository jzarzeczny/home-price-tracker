export interface HouseCardInterface {
  id: string;
  imageUrl: string;
  title: string;
  price: string;
  pricePerM: string;
  link: string;
}

export interface HouseDBReturn {
  id: string;
  imageUrl: string;
  link: string;
  title: string;
  userId: string;
  createdAt: string;
}

export interface PriceDBReturn {
  createdAt: string;
  houseId: string;
  id: string;
  price: string;
  pricePerM: string;
  userId: string;
}
