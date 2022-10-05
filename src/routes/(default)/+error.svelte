<script context="module" lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
</script>

<section class="error--container">
  <p class="error--status">{$page.status}</p>
  <p class="error--message">
    Oups ! Cette page n’a pas été trouvée. Vous pouvez reprendre votre
    navigation depuis la page d’accueil.
  </p>
  <a href={base} class="error--link"> Revenir à la page d’accueil </a>
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
    text-decoration: none;
  }
</style>
