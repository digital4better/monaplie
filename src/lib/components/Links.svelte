<script context="module">
  import Links from "$lib/content/links.md";
</script>

<section>
  <h2>🔗 Liens</h2>
  <h3>Connexion vers les services publiques</h3>
  <div>
    <Links />
  </div>
</section>

<style lang="scss">
  div :global {
    ul {
      list-style: none;

      display: flex;
      align-items: stretch;

      flex-wrap: nowrap;
      overflow-x: scroll;

      padding-left: 0;
      margin: auto -0.5rem;

      width: min-content;
      max-width: 100%;
    }

    li {
      flex: 1 0 0;

      min-width: 17rem;

      margin: 0 0.5rem;
      padding: 1rem;

      background: #f3f6fb;
      border-radius: 0.5rem;
    }

    a {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;

      height: 100%;
      width: 100%;
    }

    img {
      margin-right: 1rem;
      max-height: 75px;
    }
  }
</style>
