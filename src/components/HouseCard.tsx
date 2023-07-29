import { component$ } from "@builder.io/qwik";
import styles from "./HouseCard.module.scss";
import type { HouseCardInterface } from "~/interfaces";
import { type ActionStore } from "@builder.io/qwik-city";
import HouseSourceIcon from "./common/icons/HouseSourceIcon";
import PriceIcon from "./common/icons/PriceIcon";
import BedsIcon from "./common/icons/BedsIcon";
import FloorIcon from "./common/icons/FloorIcon";
import AreaIcon from "./common/icons/AreaIcon";
import ReloadIcon from "./common/icons/ReloadIcon";
import LikeIcon from "./common/icons/LikeIcon";
import RemoveIcon from "./common/icons/RemoveIcon";
import NoteIcon from "./common/icons/NoteIcon";

interface HouseCard {
  data: HouseCardInterface;
  deleteAction: ActionStore<{}, Record<string, any>, true>;
  refetchAction: ActionStore<{}, Record<string, any>, true>;
  userId: string;
}

export const HouseCard = component$(
  ({ data, deleteAction, refetchAction, userId }: HouseCard) => {
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
          <button class={styles.likeButton}>
            <LikeIcon />
          </button>
        </div>
        <div class={styles.priceContainer}>
          <span>{data.price}</span>
          <button
            onClick$={async () =>
              await deleteAction.submit({
                houseId: data.id,
              })
            }
          >
            <RemoveIcon />
          </button>
        </div>
        <h3 class={styles.title}>{data.title}</h3>
        <div class={styles.infoContainer}>
          <div class={styles.name}>
            <HouseSourceIcon />
            <h4>Oferta</h4>
          </div>

          <p class={styles.value}>Olx</p>

          <div class={styles.name}>
            <HouseSourceIcon />
            <h4>Dostępność</h4>
          </div>

          <p class={styles.value}>Dostępne</p>

          <div class={styles.name}>
            <PriceIcon />
            <h4>Cena</h4>
          </div>

          <p class={styles.value}>10 000 za metr</p>

          <div class={styles.name}>
            <AreaIcon />
            <h4>Powierzchnia</h4>
          </div>

          <p class={styles.value}>60 m</p>
          <div class={styles.name}>
            <BedsIcon />
            <h4>Liczba pokoi</h4>
          </div>

          <p class={styles.value}>5</p>

          <div class={styles.name}>
            <FloorIcon />
            <h4>Piętro</h4>
          </div>

          <p class={styles.value}>3</p>
        </div>

        <div class={styles.note}>
          <div class={styles.noteHeader}>
            <NoteIcon />
            <h4>Notatka</h4>
          </div>
          <div class={styles.noteContent} contentEditable="true">
            Super okolica i ulubiony park jest blisko
          </div>
        </div>
        <div class={styles.actionBar}>
          <button
            onClick$={async () =>
              await refetchAction.submit({
                houseId: data.id,
                houseUrl: data.link,
                userId,
              })
            }
          >
            <ReloadIcon />
          </button>
          <a href={data.link} target="_blank">
            Strona oferty
          </a>
        </div>
      </div>
    );
  }
);
