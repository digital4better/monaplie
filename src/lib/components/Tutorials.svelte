<script>
  const promise = fetch("/api/tutorials").then((response) => response.json());
  /** @type { { slug: string, title: string }[] } */
  export let tutorials = [];
</script>

<section>
  <h2>📄 Tutoriels</h2>
  <h3>Savoir utiliser les services publiques</h3>
  <div>
    {#await promise then tutorials}
      <ul>
        {#each tutorials as { title, slug }}
          <li><a href={`/tutorials/${slug}`}>{title}</a></li>
        {/each}
      </ul>
    {/await}
  </div>
</section>
