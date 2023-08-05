import { component$ } from "@builder.io/qwik";
import styles from "./HouseCard.module.scss";
import { type ActionStore } from "@builder.io/qwik-city";
import HouseSourceIcon from "./common/icons/HouseSourceIcon";
import PriceIcon from "./common/icons/PriceIcon";
import BedsIcon from "./common/icons/BedsIcon";
import FloorIcon from "./common/icons/FloorIcon";
import AreaIcon from "./common/icons/AreaIcon";
import ReloadIcon from "./common/icons/ReloadIcon";
import { LikeComponentEmpty, LikeComponentFull } from "./common/icons/LikeIcon";
import RemoveIcon from "./common/icons/RemoveIcon";
import NoteIcon from "./common/icons/NoteIcon";
import { HOUSE_SOURCE, type HouseData } from "~/lib/interfaces";
import { updateNote } from "~/server/db/queries";

interface HouseCard {
  data: HouseData;
  deleteAction: ActionStore<{}, Record<string, any>, true>;
  refetchAction: ActionStore<{}, Record<string, any>, true>;
  favoriteAction: ActionStore<{}, Record<string, any>, true>;
  userId: string;
}

export const HouseCard = component$(
  ({
    data,
    deleteAction,
    refetchAction,
    userId,
    favoriteAction,
  }: HouseCard) => {
    const houseSource = (houseSource: HOUSE_SOURCE): string => {
      if (houseSource === HOUSE_SOURCE.olx) {
        return "Olx";
      }
      return "Otodom";
    };

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
          <button
            class={styles.likeButton}
            onClick$={async () =>
              await favoriteAction.submit({
                houseId: data.id,
                favoriteValue: data.favorite,
              })
            }
          >
            {data.favorite ? <LikeComponentFull /> : <LikeComponentEmpty />}
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

          <p class={styles.value}>{houseSource(data.source)}</p>

          <div class={styles.name}>
            <HouseSourceIcon />
            <h4>Dostępność</h4>
          </div>

          <p class={styles.value}>Dostępne</p>

          <div class={styles.name}>
            <PriceIcon />
            <h4>Cena</h4>
          </div>

          <p class={styles.value}>{data.pricePerM}</p>

          <div class={styles.name}>
            <AreaIcon />
            <h4>Powierzchnia</h4>
          </div>

          <p class={styles.value}>{data.size} m</p>
          <div class={styles.name}>
            <BedsIcon />
            <h4>Liczba pokoi</h4>
          </div>

          <p class={styles.value}>{data.rooms}</p>

          <div class={styles.name}>
            <FloorIcon />
            <h4>Piętro</h4>
          </div>

          <p class={styles.value}>{data.floor}</p>
        </div>

        <div class={styles.note}>
          <div class={styles.noteHeader}>
            <NoteIcon />
            <h4>Notatka</h4>
          </div>
          <div
            class={styles.noteContent}
            contentEditable="true"
            onBlur$={async (event) => {
              await updateNote(data.id, event.target.innerText);
            }}
          >
            {data.note ?? "Super okolica i ulubiony park jest blisko"}
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
