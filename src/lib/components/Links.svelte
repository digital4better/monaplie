<script lang="ts">
  import type { Category, Link } from "$lib/types";
  import circle from "@material-design-icons/svg/filled/circle.svg?raw";
  import favorite from "@material-design-icons/svg/filled/favorite.svg?raw";
  import favorite_border from "@material-design-icons/svg/filled/favorite_border.svg?raw";
  import launch from "@material-design-icons/svg/filled/launch.svg";
  import navigate_next from "@material-design-icons/svg/filled/navigate_next.svg";

  export let links: Link[] = [];
  export let categories: Category[] = [];

  export const circleColor = (category: string) => {
    return (
      categories.find((c) => {
        return c.title === category;
      })?.color || "red"
    );
  };
</script>

<section class="links">
  <h2 class="title"><img src={launch} alt="" />Liens</h2>
  <h3>Connexion vers les services publics</h3>
  <div class="list">
    {#each links as { title, label, image, category, link }}
      <a class="link" href={link}>
        <div class="favorite" class:selected={false} aria-hidden>
          {@html false ? favorite : favorite_border}
        </div>
        <img
          class="logo"
          src={image.file}
          aria-label={image.alt}
          alt={image.alt}
        />
        <div class="title">{title}<img src={navigate_next} alt="" /></div>
        <div class="text-sm">{label}</div>
        <div class="category">
          <div class="circle" aria-hidden style:color={circleColor(category)}>
            {@html circle}
          </div>
          <span class="label">{category}</span>
        </div>
      </a>
    {/each}
  </div>
</section>

<style lang="scss">
  .links {
    margin: 2em 1em 4em 1em;

    .title {
      display: inline-flex;
      align-items: center;
      gap: 1rem;
    }

    .list {
      display: flex;
      overflow: auto;

      .link {
        position: relative;

        display: inline-flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;

        background-color: #f1f5ff;
        border-radius: 10px;
        margin: 1em 1em 0 0;
        padding: 2em;
        max-width: 20em;
        min-width: 12em;

        color: #000;
        text-decoration: none;

        .category {
          display: flex;
          align-items: baseline;
          gap: 0.375rem;

          margin-top: 3em;

          .circle {
            fill: currentColor;

            :global svg {
              height: 0.667rem;
              width: 0.667rem;
            }
          }

          .label {
            font-size: small;
            color: #544837;
          }
        }

        .favorite {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;

          height: 1.5rem;

          fill: currentColor;

          color: #9b9b9b;
          & .selected {
            color: "#F29400";
          }
        }

        .logo {
          height: 4em;
        }

        .title {
          margin: 0.5em 0 0.5em 0;
          font-size: large;
          font-weight: 800;
          color: #1e326a;
        }
      }
    }
  }
</style>
