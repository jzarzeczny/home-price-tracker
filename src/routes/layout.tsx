import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import Header from "~/components/header/Header";
import NavMobile from "~/components/navbar/NavMobile";
import { getUserFromEvent } from "~/server/db/auth";
import styles from "./layout.module.scss";

export const useUser = routeLoader$((event) => {
  return getUserFromEvent(event);
});

export default component$(() => {
  const user = useUser();
  return (
    <>
      <Header user={user} />
      <main class={styles.main}>
        <Slot />
        <NavMobile />
      </main>
    </>
  );
});
