import { component$ } from "@builder.io/qwik";
import styles from "./NavMobile.module.scss";
import HomeIcon from "./HomeIcon";
import SearchIcon from "./SearchIcon";
import FilterIcon from "./FilterIcon";
import AccountIcon from "./AccountIcon";

export default component$(() => {
  return (
    <nav class={styles.navbar}>
      <ul>
        <li>
          <HomeIcon />
          <span>Główna</span>
        </li>
        <li>
          <SearchIcon />
          <span>Szukaj</span>
        </li>
        <li>
          <FilterIcon />
          <span>Filtruj</span>
        </li>
        <li>
          <AccountIcon />
          <span>Zaloguj</span>
        </li>
      </ul>
    </nav>
  );
});
