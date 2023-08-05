import { CreateHouseData } from "../interfaces";

export function validateWebsite({
  imageUrl,
  title,
  price,
  pricePerM,
  rooms,
  floor,
  size,
}: Partial<CreateHouseData>): void {
  if (imageUrl === undefined) {
    throw new Error("Image URL is missing.");
  }

  if (!title) {
    throw new Error("Title is missing.");
  }

  if (!price) {
    throw new Error("Price is missing.");
  }

  if (!pricePerM) {
    throw new Error("Price per square meter is missing.");
  }

  if (!rooms) {
    throw new Error("Number of rooms is missing.");
  }

  if (floor === undefined) {
    throw new Error("Floor information is missing.");
  }

  if (!size) {
    throw new Error("Size information is missing.");
  }
}
