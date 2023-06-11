import {
  Resource,
  component$,
  useContext,
  useResource$,
} from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";
import styles from "./index.module.scss";
import { HouseCard } from "~/components/HouseCard";
import type { HouseCardInterface } from "~/interfaces";
import { UserSessionContext } from "~/root";
import { parseOtoDom } from "~/lib/parsing/parsingWebsite";
import {
  addHouse,
  addInitialPrice,
  getHouses,
  getPrices,
} from "~/server/db/queries";
import { margeHousesWithPrices } from "~/lib/utils/data";

export const useAddLink = routeAction$(async (props) => {
  try {
    const link = props.link as string;
    const userId = props.userId as string;
    const website = await fetch(props.link as string);

    const parsedData = await parseOtoDom(website);
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
  }
});

export default component$(() => {
  const userSession = useContext(UserSessionContext);
  const action = useAddLink();
  //TODO perform operation in pageLoader
  const userHouse = useResource$(async ({ track }) => {
    track(() => userSession.userId);
    // TODO use one query to pull this data
    const housesData = await getHouses(userSession.userId);
    const priceData = await getPrices(userSession.userId);

    const houses: HouseCardInterface[] = margeHousesWithPrices(
      housesData,
      priceData
    );
    return houses;
  });

  return (
    <>
      <h3 class={styles.header}>Twoje zapisane domy</h3>
      <Form class={styles.addHouseForm} action={action}>
        <div class={styles.formControl}>
          <label>URL mieszkania/domu</label>
          <input type="text" name="link" />
        </div>
        <input type="hidden" value={userSession.userId} name="userId" />
        <button type="submit">Dodaj</button>
      </Form>
      <Resource
        value={userHouse}
        onPending={() => <p>Loading...</p>}
        onResolved={(housesData) => (
          <section class={styles.houses}>
            {housesData?.map((house) => (
              <HouseCard key={house.id} data={house} />
            ))}
          </section>
        )}
      />
    </>
  );
});
