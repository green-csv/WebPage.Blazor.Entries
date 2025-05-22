import { paths } from "./config.ts";
import matterPkg from "npm:gray-matter@4.0.3";
import {
  dirname,
  join,
  relative,
  resolve,
} from "https://deno.land/std@0.203.0/path/mod.ts";

const matter = (matterPkg as any).default ?? matterPkg;

// Directories & output
const ROOT = resolve(paths.ROOT_DIR);
const POSTS_DIR = join(ROOT, "posts");
const OUTPUT_FILE = join(ROOT, "docs", "posts-assets", "index.json");

// Helpers
const isMarkdown = (name: string) => name.endsWith(".md");

interface Translation {
  title: string;
  date: string;
  filename: string;
  summary: string;
  cover: string | null;
}

interface PostIndex {
  slug: string;
  tags: string[];
  translations: Record<string, Translation>;
}

async function buildIndex() {
  // 1. Read top-level folders under posts
  const dirEntries = [];
  for await (const entry of Deno.readDir(POSTS_DIR)) {
    if (entry.isDirectory) dirEntries.push(entry.name);
  }

  const index: PostIndex[] = [];

  for (const slug of dirEntries) {
    const postDir = join(POSTS_DIR, slug);

    // 2. Find all .md files in that folder
    const files: string[] = [];
    for await (const entry of Deno.readDir(postDir)) {
      if (entry.isFile && isMarkdown(entry.name)) {
        files.push(entry.name);
      }
    }

    const translations: Record<string, Translation> = {};
    let tags: string[] = [];

    // 3. Process each language file
    for (const file of files) {
      const fullPath = join(postDir, file);
      const raw = await Deno.readTextFile(fullPath);
      const { data } = matter(raw);

      // Skip unpublished
      if (!data.published) continue;

      const lang: string = data.language ?? "en";
      const relDir = relative(ROOT, postDir).replace(/\\/g, "/");
      const baseName = file.replace(/\.md$/, "");

      translations[lang] = {
        title: data.title ?? "Untitled",
        date: data.date ?? "1970-01-01",
        filename: `${relDir}/${baseName}.html`,
        summary: data.summary ?? "",
        cover: data.cover ?? null,
      };

      if (Array.isArray(data.tags)) {
        tags = data.tags.map(String);
      }
    }

    // 4. Only include if at least one translation
    if (Object.keys(translations).length > 0) {
      index.push({ slug, tags, translations });
    }
  }

  // 5. Ensure output folder exists
  const outDir = dirname(OUTPUT_FILE);
  await Deno.mkdir(outDir, { recursive: true });

  // 6. Write JSON
  await Deno.writeTextFile(
    OUTPUT_FILE,
    JSON.stringify(index, null, 2),
  );

  console.log(`✅ index.json generated with ${index.length} posts`);
}

if (import.meta.main) {
  buildIndex().catch((err) => {
    console.error("💥 buildIndex failed:", err);
    Deno.exit(1);
  });
}
