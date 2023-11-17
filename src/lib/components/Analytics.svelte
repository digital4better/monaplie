<script lang="ts">
  import { dev } from "$app/environment";
</script>

<svelte:head>
  {#if !dev}
    <script>
      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", "GTM-559S4SD7");
    </script>
  {/if}
</svelte:head>

{#if !dev}
  <noscript>
    <iframe
      title="google tag manager noscript hidden iframe"
      src="https://www.googletagmanager.com/ns.html?id=GTM-559S4SD7"
      height="0"
      width="0"
      style="display:none;visibility:hidden"
    />
  </noscript>
{/if}
