import { $, component$, useContext } from "@builder.io/qwik";
import { Link, useNavigate } from "@builder.io/qwik-city";
import styles from "./Header.module.scss";
import { signInWithGoogle, signOut } from "~/server/db/auth";
import { UserSessionContext } from "~/root";

const navigation = [
  { text: "Home", href: "/" },
  { text: "Dashboard", href: "/dashboard" },
];

export default component$(() => {
  const userSession = useContext(UserSessionContext);
  const nav = useNavigate();
  const handleLogOut = $(async () => {
    await signOut();
    nav("/");
  });
  const handleLogin = $(async () => {
    await signInWithGoogle();
  });
  return (
    <header class={styles.header}>
      <nav class={styles.navigation}>
        {navigation.map((nav) => (
          <li key={nav.text} class={styles.navItem}>
            <Link href={nav.href}>{nav.text}</Link>
          </li>
        ))}
      </nav>
      {userSession.isLoggedIn ? (
        <button class={styles.button} onClick$={handleLogOut}>
          Logout
        </button>
      ) : (
        <button class={styles.button} onClick$={handleLogin}>
          Login
        </button>
      )}
    </header>
  );
});
