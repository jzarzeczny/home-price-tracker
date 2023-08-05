import { CreateHouseData } from "../interfaces";

function validateImageUrl(imageUrl: string | undefined) {
  if (!imageUrl) {
    console.log(imageUrl);
    throw new Error("Image does not exist");
  }
}

function validateTitle(title: string | undefined) {
  if (!title) {
    throw new Error("Title is missing");
  }
}

function validatePrice(price: string | undefined) {
  if (!price) {
    throw new Error("Price is missing");
  }
}

function validatePricePerM(pricePerM: string | undefined) {
  if (!pricePerM) {
    throw new Error("Price per square meter is missing");
  }
}

function validateRooms(rooms: number | undefined) {
  if (!rooms) {
    throw new Error("Number of rooms is missing");
  }
}

function validateFloor(floor: number | undefined) {
  if (!floor) {
    throw new Error("Floor information is missing");
  }
}

function validateSize(size: number | undefined) {
  if (!size) {
    throw new Error("Size information is missing");
  }
}

export function validateWebsite(houseData: Partial<CreateHouseData>) {
  validateImageUrl(houseData?.imageUrl);
  validateTitle(houseData?.title);
  validatePrice(houseData?.price);
  validatePricePerM(houseData?.pricePerM);
  validateRooms(houseData?.rooms);
  validateFloor(houseData?.floor);
  validateSize(houseData?.size);
}
