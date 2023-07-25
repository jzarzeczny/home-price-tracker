import { component$ } from "@builder.io/qwik";

import styles from "./Header.module.scss";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <header class={styles.header}>
      <Link href="/">Home tracker</Link>
      <p>Zapisuj ulubione oferty mieszkań!</p>
    </header>
  );
});
