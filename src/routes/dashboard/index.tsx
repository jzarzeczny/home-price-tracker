import {
  Resource,
  component$,
  useContext,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";
import styles from "./index.module.scss";
import { HouseCard } from "~/components/HouseCard";
import type { HouseCardInterface } from "~/interfaces";
import { UserSessionContext } from "~/root";
import { parseWebsite } from "~/lib/parsing/parsingWebsite";
import {
  getHouses,
  getPrices,
  deleteHouse,
  addHouse,
  addInitialPrice,
  addPrice,
} from "~/server/db/queries";
import { margeHousesWithPrices } from "~/lib/utils/data";

export const useAddLink = routeAction$(async (props) => {
  try {
    const link = props.link as string;
    const userId = props.userId as string;
    const website = await fetch(props.link as string);

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
      userId: userId,
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
  const houses = useSignal<HouseCardInterface[]>();

  useTask$(async () => {
    const housesData = await getHouses(userSession.userId);
    const priceData = await getPrices(userSession.userId);

    const housesReturnValue: HouseCardInterface[] = margeHousesWithPrices(
      housesData,
      priceData
    );
    houses.value = housesReturnValue;
  });

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
        <Resource
          value={houses}
          onPending={() => <p>Loading...</p>}
          onResolved={(housesData) => (
            <>
              {housesData?.map((house) => (
                <HouseCard
                  key={house.id}
                  data={house}
                  deleteAction={deleteAction}
                  refetchAction={refetchAction}
                  userId={userSession.userId}
                />
              ))}
            </>
          )}
        />
      </section>
    </>
  );
});
