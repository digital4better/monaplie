import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const storedFavorites = writable(
  browser && localStorage.getItem("favorite")
);
export const initSetStorageFavorites = () =>
  storedFavorites.subscribe((val) => {
    if (browser) localStorage.setItem("favorite", val || "");
  });
