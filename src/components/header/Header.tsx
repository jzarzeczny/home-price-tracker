import { component$ } from "@builder.io/qwik";

import styles from "./Header.module.scss";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={styles.contentWrapper}>
        <div class={styles.logo}>
          <Link href="/">Home tracker</Link>
          <p>Zapisuj ulubione oferty mieszkań!</p>
        </div>
      </div>
    </header>
  );
});
