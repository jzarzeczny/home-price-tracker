import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h2>Landing page</h2>
    </>
  );
});

export const head: DocumentHead = {
  title: "House tracker",
  meta: [
    {
      name: "description",
      content: "House Price Tracker",
    },
  ],
};
