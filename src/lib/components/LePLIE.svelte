<script>
  export let lePlie;
</script>

<div class="plie">
  <h2>🔎 Le PLIE</h2>
  <h3>Plan Local d’Insertion pour l’Emploi</h3>
  <div class="list">
    <input class="icon" type="image" src={lePlie?.icon} aria-hidden />
    <a class="underline" href={lePlie?.link}>{lePlie?.label}</a>
  </div>
</div>

<style>
  .plie {
    margin: 2em 1em 4em 1em;
  }
  .button {
    display: flex;
    align-items: center;
    margin-top: 1em;
  }
</style>
