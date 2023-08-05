import { component$, useContext } from "@builder.io/qwik";
import styles from "./index.module.scss";
import { Form, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { getUserFromEvent } from "~/server/db/auth";
import {
  addHouse,
  addInitialPrice,
  addPrice,
  deleteHouse,
  favoriteHouseChange,
  getHouses,
  getPrices,
} from "~/server/db/queries";
import { margeHousesWithPrices } from "~/lib/utils/data";
import type { HouseData } from "~/lib/interfaces";
import { parseWebsite } from "~/lib/parsing/parsingWebsite";
import { UserSessionContext } from "~/root";
import { HouseCard } from "~/components/HouseCard";

export const useHousesData = routeLoader$(async (requestEvent) => {
  const user = await getUserFromEvent(requestEvent);
  if (!user) {
    requestEvent.redirect(301, "/");
    return;
  }
  const userId = user?.id;
  const housesData = await getHouses(userId as string);
  const priceData = await getPrices(userId as string);

  const housesReturnValue: HouseData[] = margeHousesWithPrices(
    housesData,
    priceData
  );

  return housesReturnValue;
});

export const useAddLink = routeAction$(async (props) => {
  try {
    const link = props.link as string;
    const userId = props.userId as string;
    const website = await fetch(props.link as string);

    if (!website) {
      throw new Error("No website");
    }
    const parsedData = await parseWebsite(website, link);

    const houseObject = await addHouse({
      imageUrl: parsedData.imageUrl,
      title: parsedData.title,
      rooms: parsedData.rooms,
      floor: parsedData.floor,
      size: parsedData.size,
      link,
      userId,
    });
    const house = houseObject.data?.pop();
    if (!house) {
      throw Error("House data is not provided");
    }
    await addInitialPrice({
      userId,
      houseId: house.id,
      price: parsedData.price,
      pricePerM: parsedData.pricePerM,
    });
  } catch (error) {
    console.log(error);
    return "Niepoprawy link";
  }
});

export const useDeleteHouse = routeAction$(async (props) => {
  const id = props.houseId as string;
  try {
    await deleteHouse(id);
  } catch (error) {
    console.log(error);
  }
});

export const useRefetchHouse = routeAction$(async (props) => {
  const houseId = props.houseId as string;
  const houseUrl = props.houseUrl as string;
  const userId = props.userId as string;

  try {
    const website = await fetch(houseUrl);
    const parsedData = await parseWebsite(website, houseUrl);
    await addPrice({
      userId,
      houseId,
      price: parsedData.price,
      pricePerM: parsedData.pricePerM,
    });
  } catch (error) {
    console.log(error);
    return "Zły link";
  }
});

export const useFavoriteHouse = routeAction$(async (props) => {
  const houseId = props.houseId as string;
  const favoriteValue = props.favoriteValue as boolean;

  try {
    await favoriteHouseChange(houseId, favoriteValue);
  } catch (error) {
    console.error(error);
  }
});

export default component$(() => {
  const userSession = useContext(UserSessionContext);
  const addAction = useAddLink();
  const deleteAction = useDeleteHouse();
  const refetchAction = useRefetchHouse();
  const housesSignal = useHousesData();
  const favoriteAction = useFavoriteHouse();

  return (
    <>
      <Form
        class={styles.addHouseForm}
        action={addAction}
        onSubmitCompleted$={(_, form) => {
          const link = form.querySelector("#link") as HTMLInputElement;
          link.value = "";
        }}
      >
        <div class={styles.formControl}>
          <input
            id="link"
            type="text"
            name="link"
            placeholder="skopiuj tutaj adres oferty"
          />
        </div>
        <input type="hidden" value={userSession.userId} name="userId" />
        <input
          class={styles.submitButton}
          type="submit"
          value={"Dodaj"}
        ></input>
        {addAction.value && (
          <p class={styles.error}>{addAction.value as string}</p>
        )}
      </Form>
      <section class={styles.houses}>
        {housesSignal.value?.map((house) => (
          <HouseCard
            key={house.id}
            data={house}
            deleteAction={deleteAction}
            refetchAction={refetchAction}
            favoriteAction={favoriteAction}
            userId={userSession.userId}
          />
        ))}
      </section>
    </>
  );
});
