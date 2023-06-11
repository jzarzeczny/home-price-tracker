import { component$ } from "@builder.io/qwik";
import styles from "./HouseCard.module.scss";
import type { HouseCardInterface } from "~/interfaces";
import type { ActionStore } from "@builder.io/qwik-city";
import { Form } from "@builder.io/qwik-city";

interface HouseCard {
  data: HouseCardInterface;
  deleteAction: ActionStore<{}, Record<string, any>, true>;
}

export const HouseCard = component$(({ data, deleteAction }: HouseCard) => {
  return (
    <a href={data.link} key={data.id} class={styles.container}>
      <div class={styles.imageContainer}>
        <img
          src={data.imageUrl}
          alt={data.title}
          class={styles.image}
          height={300}
          width={300}
        />
      </div>
      <div class={styles.infoContainer}>
        <span>{data.title}</span>
        <span>{data.price}</span>
        <span>{data.pricePerM}</span>
        <Form action={deleteAction}>
          <input type="hidden" name="houseId" value={data.id} />
          <button type="submit">Usuń</button>
        </Form>
      </div>
    </a>
  );
});
