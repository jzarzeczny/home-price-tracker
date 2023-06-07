import { component$ } from "@builder.io/qwik";
import styles from "./HouseCard.module.scss";
import type { HouseCardWithIdInterface } from "~/interfaces";

interface HouseCardInterface {
  data: HouseCardWithIdInterface;
}

export const HouseCard = component$(({ data }: HouseCardInterface) => {
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
      </div>
    </a>
  );
});
