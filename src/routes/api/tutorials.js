import fm from "front-matter";
import { readdir, readFile } from "fs/promises";
import path from "path";

export async function get() {
  const _path = path.resolve("src/lib/content/tutorials");
  const files = await readdir(_path);

  const tutorials = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const src = await readFile(path.join(_path, file), "utf8");
        const { attributes } = fm(src);

        return {
          slug: path.basename(file, ".md"),
          ...attributes,
        };
      })
  );

  return {
    body: tutorials,
  };
}
