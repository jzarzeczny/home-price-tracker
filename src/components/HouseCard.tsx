import { component$ } from "@builder.io/qwik";
import styles from "./HouseCard.module.scss";
import type { HouseCardInterface } from "~/interfaces";
import type { ActionStore } from "@builder.io/qwik-city";
import { Form } from "@builder.io/qwik-city";

interface HouseCard {
  data: HouseCardInterface;
  deleteAction: ActionStore<{}, Record<string, any>, true>;
  refetchAction: ActionStore<{}, Record<string, any>, true>;
  userId: string;
}

export const HouseCard = component$(
  ({ data, deleteAction, refetchAction, userId }: HouseCard) => {
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
          <div class={styles.buttonsContainer}>
            <Form action={refetchAction}>
              <input type="hidden" name="houseId" value={data.id} />
              <input type="hidden" name="houseUrl" value={data.link} />
              <input type="hidden" name="userId" value={userId} />
              <button type="submit">Odśwież</button>
            </Form>
            <Form action={deleteAction}>
              <input type="hidden" name="houseId" value={data.id} />
              <button type="submit">Usuń</button>
            </Form>
          </div>
        </div>
      </a>
    );
  }
);
