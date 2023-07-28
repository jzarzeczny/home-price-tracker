import { component$ } from "@builder.io/qwik";
import styles from "./AddHouseForm.module.scss";
import { routeLoader$, z } from "@builder.io/qwik-city";

const houseLinkSchema = z.object({
  link: z.string().url(),
  userId: z.string(),
});

type HouseLinkForm = z.infer<typeof houseLinkSchema>;

export const useFormLoader = routeLoader$<InitialValues<HouseLinkForm>>;

export const useAddLink = routeAction$(async (props) => {
  try {
    const link = props.link as string;
    const userId = props.userId as string;
    const website = await fetch(props.link as string);

    if (!website) {
      throw new Error("No website");
    }
    const parsedData = await parseWebsite(website, link);

    console.log(userId);

    const houseObject = await addHouse({
      imageUrl: parsedData.imageUrl,
      title: parsedData.title,
      link,
      userId,
    });
    const house = houseObject.data?.pop();
    if (!house) {
      throw Error("House data is not provided");
    }
    await addInitialPrice({
      userId,
      houseId: house.id,
      price: parsedData.price,
      pricePerM: parsedData.pricePerM,
    });
  } catch (error) {
    return "Niepoprawy link";
  }
});

export default component$(() => {
  const addAction = useAddLink();

  return (
    <Form class={styles.addHouseForm} action={addAction}>
      <div class={styles.formControl}>
        <input
          type="text"
          name="link"
          placeholder="skopiuj tutaj adres oferty"
        />
      </div>
      <input type="hidden" value={userSession.userId} name="userId" />
      <input class={styles.submitButton} type="submit" value={"Dodaj"}></input>
      {addAction.value && (
        <p class={styles.error}>{addAction.value as string}</p>
      )}
    </Form>
  );
});
