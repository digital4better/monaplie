<script context="module" lang="ts">
  import { goto } from "$app/navigation";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = ({ error, status }) => {
    return {
      props: {
        error,
        status,
      },
    };
  };
</script>

<script lang="ts">
  export let status: number | null;
</script>

<section class="error--container">
  <p class="error--status">{status}</p>
  <p class="error--message">
    Oups ! Cette page n’a pas été trouvée. Vous pouvez reprendre votre
    navigation depuis la page d’accueil.
  </p>
  <!-- TODO: Use a link -->
  <button class="error--link" on:click={() => goto("/")}>
    Revenir à la page d’accueil
  </button>
</section>

<style>
  .error--container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .error--status {
    font-weight: 700;
    font-size: 6rem;
    line-height: 129.8%;
    color: var(--color-orange);
    margin: 0;
  }
  .error--message {
    text-align: center;
    margin: 1em;
  }
  .error--link {
    background-color: var(--color-blue-dark);
    color: white;
    border-radius: 15px;
    padding: 0.6em;
  }
</style>
