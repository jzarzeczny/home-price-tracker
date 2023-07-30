import { component$ } from "@builder.io/qwik";
import styles from "./NavMobile.module.scss";
import HomeIcon from "./HomeIcon";
import SearchIcon from "./SearchIcon";
import FilterIcon from "./FilterIcon";
import AccountIcon from "./AccountIcon";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const loc = useLocation();

  const isLanding = loc.prevUrl?.pathname === "/";

  return (
    <nav class={`${styles.navbar} ${isLanding ? styles.navbarHidden : null}`}>
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
