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

<section class="error">
  <p class="status">{status}</p>
  <p style="text-align: center; margin: 1em;">
    Oups ! Cette page n’a pas été trouvée. Vous pouvez reprendre votre
    navigation depuis la page d’accueil.
  </p>
  <button on:click={() => goto("/")}> Revenir à la page d’accueil </button>
</section>

<style lang="scss">
  .error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .status {
    font-weight: 700;
    font-size: 6rem;
    line-height: 129.8%;
    color: #f29400;
    margin: 0;
  }
  button {
    background-color: #13235b;
    color: white;
    border-radius: 15px;
    padding: 0.6em;
  }
</style>
