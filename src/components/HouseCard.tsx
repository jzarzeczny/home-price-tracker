import { component$ } from "@builder.io/qwik";
import styles from "./HouseCard.module.scss";
import type { HouseCardInterface } from "~/interfaces";
import { Link, type ActionStore } from "@builder.io/qwik-city";
import HouseSourceIcon from "./common/icons/HouseSourceIcon";
import PriceIcon from "./common/icons/PriceIcon";
import BedsIcon from "./common/icons/BedsIcon";
import FloorIcon from "./common/icons/FloorIcon";
import AreaIcon from "./common/icons/AreaIcon";
import ReloadIcon from "./common/icons/ReloadIcon";

interface HouseCard {
  data: HouseCardInterface;
  deleteAction: ActionStore<{}, Record<string, any>, true>;
  refetchAction: ActionStore<{}, Record<string, any>, true>;
  userId: string;
}

export default component$(({ data }: HouseCard) => {
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              d="M24.14 33.2428L24 33.3858L23.846 33.2428C17.196 27.0777 12.8 23.0011 12.8 18.8672C12.8 16.0064 14.9 13.8608 17.7 13.8608C19.856 13.8608 21.956 15.2912 22.698 17.2366H25.302C26.044 15.2912 28.144 13.8608 30.3 13.8608C33.1 13.8608 35.2 16.0064 35.2 18.8672C35.2 23.0011 30.804 27.0777 24.14 33.2428ZM30.3 11C27.864 11 25.526 12.1586 24 13.9752C22.474 12.1586 20.136 11 17.7 11C13.388 11 10 14.4473 10 18.8672C10 24.2598 14.76 28.6798 21.97 35.3598L24 37.2479L26.03 35.3598C33.24 28.6798 38 24.2598 38 18.8672C38 14.4473 34.612 11 30.3 11Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
      <div class={styles.priceContainer}>
        <span>{data.price}</span>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
          >
            <path
              d="M5 0V1H0V3H1V16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H13C13.5304 18 14.0391 17.7893 14.4142 17.4142C14.7893 17.0391 15 16.5304 15 16V3H16V1H11V0H5ZM3 3H13V16H3V3ZM5 5V14H7V5H5ZM9 5V14H11V5H9Z"
              fill="black"
            />
          </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z"
              fill="black"
            />
          </svg>
          <h4>Notatka</h4>
        </div>
        <div class={styles.noteContent} contentEditable="true">
          Super okolica i ulubiony park jest blisko
        </div>
      </div>
      <div class={styles.actionBar}>
        <button>
          <ReloadIcon />
        </button>
        <Link>Strona oferty</Link>
      </div>
    </div>
  );
});
