import type { InternalTutorial } from "$lib/types";
import type { Load } from "@sveltejs/kit";

const tutorials = import.meta.glob<Record<string, unknown>>(
  "$lib/content/tutorials/*.md"
);

export const load: Load<{ slug: string }> = async ({ params: { slug } }) => {
  const { metadata } =
    (await tutorials[`/src/lib/content/tutorials/${slug}.md`]?.()) || {};
  return {
    tutorial: metadata as InternalTutorial,
  };
};
