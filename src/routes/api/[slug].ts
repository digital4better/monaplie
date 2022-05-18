import type { RequestHandler } from "@sveltejs/kit";
import fm from "front-matter";
import { readdir, readFile } from "fs/promises";
import path from "path";

/**
 * Expose folder collections items attributes
 * @returns a list of items attributes
 */
export const get: RequestHandler<{ slug: string }> = async ({ params }) => {
  const _path = path.resolve(`src/lib/content/${params.slug}`);
  const files = await readdir(_path);

  const collection = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const src = await readFile(path.join(_path, file), "utf8");
        const { attributes } = fm<Record<string, any>>(src);

        return {
          slug: path.basename(file, ".md"),
          ...attributes,
        };
      })
  );

  return {
    body: collection,
  };
};
