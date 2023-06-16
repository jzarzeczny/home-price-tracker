import { component$ } from "@builder.io/qwik";
import styles from "./HouseCard.module.scss";
import type { HouseCardInterface } from "~/interfaces";
import type { ActionStore } from "@builder.io/qwik-city";

interface HouseCard {
  data: HouseCardInterface;
  deleteAction: ActionStore<{}, Record<string, any>, true>;
  refetchAction: ActionStore<{}, Record<string, any>, true>;
}

export const HouseCard = component$(
  ({ data, deleteAction, refetchAction }: HouseCard) => {
    return (
      <div key={data.id} class={styles.container}>
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
          <div class={styles.buttonsContainer}>
            <a href={data.link} target="_blank">
              Strona
            </a>

            <button
              onClick$={async () => {
                await refetchAction.submit({
                  houseId: data.id,
                  houseUrl: data.link,
                });
              }}
            >
              Odśwież
            </button>
            <button
              onClick$={async () => {
                deleteAction.submit({ houseId: data.id });
              }}
            >
              Usuń
            </button>
          </div>
        </div>
      </div>
    );
  }
);
