export interface HouseCardInterface {
  id: string;
  imageUrl: string;
  title: string;
  price: string;
  pricePerM: string;
  link: string;
}

export interface HouseCardWithIdInterface extends HouseCardInterface {
  id: string;
}
