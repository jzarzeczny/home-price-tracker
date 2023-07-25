import { component$, useContext } from "@builder.io/qwik";
import styles from "./index.module.scss";
import { Form, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { getUserFromEvent } from "~/server/db/auth";
import {
  addHouse,
  addInitialPrice,
  addPrice,
  deleteHouse,
  getHouses,
  getPrices,
} from "~/server/db/queries";
import { margeHousesWithPrices } from "~/lib/utils/data";
import type { HouseCardInterface } from "~/interfaces";
import { parseWebsite } from "~/lib/parsing/parsingWebsite";
import { UserSessionContext } from "~/root";
import HouseCard from "~/components/HouseCard";

export const useHousesData = routeLoader$(async (requestEvent) => {
  const user = await getUserFromEvent(requestEvent);
  if (!user) {
    requestEvent.redirect(301, "/");
    return;
  }
  const userId = user?.id;
  const housesData = await getHouses(userId as string);
  const priceData = await getPrices(userId as string);

  const housesReturnValue: HouseCardInterface[] = margeHousesWithPrices(
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
      link,
      userId,
    });
    const house = houseObject.data?.pop();
    if (!house) {
      return;
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

export default component$(() => {
  const userSession = useContext(UserSessionContext);
  const addAction = useAddLink();
  const deleteAction = useDeleteHouse();
  const refetchAction = useRefetchHouse();
  const housesSignal = useHousesData();

  return (
    <>
      <h3 class={styles.header}>Twoje zapisane domy</h3>
      <Form class={styles.addHouseForm} action={addAction}>
        <div class={styles.formControl}>
          <label>URL mieszkania/domu</label>
          <input type="text" name="link" />
        </div>
        <input type="hidden" value={userSession.userId} name="userId" />
        <button type="submit">Dodaj</button>
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
            userId={userSession.userId}
          />
        ))}
      </section>
    </>
  );
});
