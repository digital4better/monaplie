import type { Load } from "@sveltejs/kit";

const items = (
  collection: Record<string, () => Promise<Record<string, any>>> // eslint-disable-line @typescript-eslint/no-explicit-any
) =>
  Object.entries(collection).map(async ([slug, fetch]) => {
    const { metadata } = await fetch();
    return {
      slug: slug.replace(/^.*\/[^/]+\/([^/]+)\.md/, "$1"),
      ...metadata,
    };
  });

const tutorials = items(import.meta.glob("$lib/content/tutorials/*.md"));
const links = items(import.meta.glob("$lib/content/links/*.md"));
const categories = items(import.meta.glob("$lib/content/link_categories/*.md"));
const resources = items(import.meta.glob("$lib/content/resources/*.md"));

export const load: Load = async () => {
  return {
    tutorials: (await Promise.all(tutorials)).sort((a, b) =>
      a.order ?? 1000 > b.order ?? 1000 ? 1 : -1
    ),
    links: (await Promise.all(links)).sort((a, b) =>
      a.order ?? 1000 > b.order ?? 1000 ? 1 : -1
    ),
    categories: await Promise.all(categories),
    resources: (await Promise.all(resources)).sort((a, b) =>
      a.order ?? 1000 > b.order ?? 1000 ? 1 : -1
    ),
  };
};
