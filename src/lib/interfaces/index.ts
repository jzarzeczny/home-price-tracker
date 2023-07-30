export enum HOUSE_SOURCE {
  otoDom = "otodom.pl",
  olx = "olx.pl",
}

export interface CreateHouseData {
  imageUrl: string;
  title: string;
  price: string;
  pricePerM: string;
  rooms: number;
  floor: number;
  size: number;
  source: HOUSE_SOURCE;
}

export interface HouseData extends CreateHouseData {
  id: string;
  link: string;
  note: string;
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
