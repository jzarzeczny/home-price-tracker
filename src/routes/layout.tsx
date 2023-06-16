import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import Header from "~/components/header/Header";
import { getUserFromEvent } from "~/server/db/auth";

export const useUser = routeLoader$((event) => {
  return getUserFromEvent(event);
});

export default component$(() => {
  const user = useUser();
  return (
    <>
      <Header id={user.value?.id} />
      <main>
        <Slot />
      </main>
    </>
  );
});
