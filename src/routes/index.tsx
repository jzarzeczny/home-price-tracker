import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Form, routeAction$ } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { subabaseClient } from "~/server/db/client";
import { load } from "cheerio";
import { HouseCard } from "~/components/HouseCard";
import type { HouseCardWithIdInterface } from "~/interfaces";
import styles from "./index.module.scss";

export const useGetData = routeLoader$(async () => {
  const response = await subabaseClient.from("houses").select("*");
  return response.data;
});

export const useAddLink = routeAction$(async (props) => {
  try {
    const webside = await fetch(props.link as string);
    const html = await webside.text();

    const $ = await load(html);
    console.log($.html());
    const firstImage = $("source").first();
    const imageUrl = firstImage.attr("srcset");
    const title = $('h1[data-cy="adPageAdTitle"]').text();
    const price = $('strong[data-cy="adPageHeaderPrice"]').text();
    const pricePerM = $('div[aria-label="Cena za metr kwadratowy"]').text();
    await subabaseClient.from("houses").insert({
      title,
      imageUrl,
      price,
      pricePerM,
      link: props.link,
    });
  } catch (error) {
    console.log(error);
  }
});

export default component$(() => {
  // const data = useGetData();
  const action = useAddLink();
  const houseData = useGetData();

  // console.log(data.value);
  return (
    <>
      <h1>Hi 👋</h1>

      <h3>Lets add some house</h3>
      <Form action={action}>
        <div>
          <label>Name</label>
          <input type="text" name="link" />
        </div>
        <button type="submit">Submit</button>
      </Form>
      <section class={styles.houses}>
        {houseData.value?.map((data) => (
          <HouseCard key={data.id} data={data as HouseCardWithIdInterface} />
        ))}
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
