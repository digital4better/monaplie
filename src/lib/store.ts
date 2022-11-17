import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const storedItems = writable(
  browser && localStorage.getItem("favorite")
);
export const initSetStorageFavorites = () =>
  storedItems.subscribe((val) => {
    if (browser) localStorage.setItem("favorite", val || "");
  });

initSetStorageFavorites();
