import {
  Resource,
  component$,
  useContext,
  useResource$,
} from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";
import styles from "./index.module.scss";
import { HouseCard } from "~/components/HouseCard";
import type { HouseCardWithIdInterface } from "~/interfaces";
import { supabaseClient } from "~/server/db/client";
import { load } from "cheerio";
import { UserSessionContext } from "~/root";

export const useAddLink = routeAction$(async (props) => {
  try {
    const webside = await fetch(props.link as string);
    const html = await webside.text();

    const $ = await load(html);
    const firstImage = $("source").first();
    const imageUrl = firstImage.attr("srcset");
    const title = $('h1[data-cy="adPageAdTitle"]').text();
    const price = $('strong[data-cy="adPageHeaderPrice"]').text();
    const pricePerM = $('div[aria-label="Cena za metr kwadratowy"]').text();
    await supabaseClient.from("houses").insert({
      title,
      imageUrl,
      price,
      pricePerM,
      link: props.link,
      userId: props.userId,
    });
  } catch (error) {
    console.log(error);
  }
});

export default component$(() => {
  const userSession = useContext(UserSessionContext);
  const action = useAddLink();
  const userHouse = useResource$(async ({ track }) => {
    track(() => userSession.userId);
    const data = await supabaseClient
      .from("houses")
      .select("*")
      .eq("userId", userSession.userId);
    return data;
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
            {housesData?.data?.map((house) => (
              <HouseCard
                key={house.id}
                data={house as HouseCardWithIdInterface}
              />
            ))}
          </section>
        )}
      />
    </>
  );
});
