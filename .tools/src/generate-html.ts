import { paths } from "./config.ts";
import { unified } from "npm:unified";
import remarkParse from "npm:remark-parse";
import remarkFrontmatter from "npm:remark-frontmatter";
import remarkGfm from "npm:remark-gfm";
import remarkObsidian from "npm:remark-obsidian";
import remarkEmbedder from "npm:@remark-embedder/core";
import oembedTransformer from "npm:@remark-embedder/transformer-oembed";
import remarkRehype from "npm:remark-rehype";
import rehypeRaw from "npm:rehype-raw";
import rehypeHighlight from "npm:rehype-highlight";
import rehypeSlug from "npm:rehype-slug";
import rehypeStringify from "npm:rehype-stringify";
import remarkToc from "npm:remark-toc";
import { visit } from "npm:unist-util-visit";
import {
  dirname,
  join,
  resolve,
} from "https://deno.land/std@0.203.0/path/mod.ts";
import { relative } from "https://deno.land/std@0.203.0/path/mod.ts";

// Use your ROOT_DIR from config.ts
const ROOT_DIR = resolve(paths.ROOT_DIR);
const POSTS_DIR = join(ROOT_DIR, "posts");
const OUTPUT_DIR = join(ROOT_DIR, "docs", "posts");

// CLI flags
const args = Deno.args;
const flags = {
  cleanOnly: args.includes("--clean-only"),
  force: args.includes("--force"),
};

async function mdToHtml(markdown: string, slug: string): Promise<string> {
  const remarkEmbedderPlugin = (remarkEmbedder as any).default ??
    remarkEmbedder;
  const oembedTransformerPlugin = (oembedTransformer as any).default ??
    oembedTransformer;

  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ["yaml"])     
    .use(remarkGfm)    
    .use(remarkObsidian)
    .use(remarkToc, {
      heading: "Contents",
    })
    .use(remarkEmbedderPlugin, { transformers: [oembedTransformerPlugin] })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(rehypeSlug)    
    .use(rehypeStringify)
    .use(rehypeAbsoluteUrls, slug)
    .process(markdown);

  return String(file);
}

export function rehypeAbsoluteUrls(slug: string) {
  return function transformer(tree: any) {
    function walk(node: any) {
      // If this is an element node with children…
      if (node.type === "element") {
        // Check for <a href="#...">
        const href = node.properties?.href;
        if (
          node.tagName === "a" &&
          typeof href === "string" &&
          href.startsWith("#")
        ) {
          node.properties.href = `entry/${slug}${href}`;
        }
      }

      if (Array.isArray(node.children)) {
        for (const child of node.children) {
          walk(child);
        }
      }
    }

    walk(tree);
  };
}

async function shouldRender(input: string, output: string): Promise<boolean> {
  try {
    const [inStat, outStat] = await Promise.all([
      Deno.stat(input),
      Deno.stat(output),
    ]);
    return inStat.mtime! > outStat.mtime!;
  } catch {
    // missing source or output → render
    return true;
  }
}

async function walkMarkdownFiles(
  inputDir: string,
  outputDir: string,
  force = false,
) {
  for await (const entry of Deno.readDir(inputDir)) {
    const inputPath = join(inputDir, entry.name);
    const outputPath = join(
      outputDir,
      entry.name.replace(/\.md$/, ".html"),
    );

    if (entry.isDirectory) {
      await walkMarkdownFiles(inputPath, join(outputDir, entry.name), force);
      continue;
    }
    if (!entry.name.endsWith(".md")) continue;

    if (!(await shouldRender(inputPath, outputPath)) && !force) {
      console.log("⏩ Skipped:", inputPath);
      continue;
    }

    const relPath = relative(POSTS_DIR, inputPath);        // e.g. "test/en.md"
    const slug = relPath.replace(/\.md$/, "");  
    const raw = await Deno.readTextFile(inputPath);
    const html = await mdToHtml(raw, slug.split("\\")[0]);

    await Deno.mkdir(dirname(outputPath), { recursive: true });
    await Deno.writeTextFile(outputPath, html);
    console.log("🌈 Rendered:", outputPath);
  }
}

async function cleanOrphans(renderedDir: string, sourceDir: string) {
  console.log("🧹 Checking for orphaned .html files...");
  for await (const entry of Deno.readDir(renderedDir)) {
    const htmlPath = join(renderedDir, entry.name);
    const mdPath = join(sourceDir, entry.name.replace(/\.html$/, ".md"));

    if (entry.isDirectory) {
      await cleanOrphans(htmlPath, join(sourceDir, entry.name));
      continue;
    }
    if (entry.name.endsWith(".html")) {
      try {
        await Deno.stat(mdPath);
      } catch {
        await Deno.remove(htmlPath);
        console.log("🗑️  Deleted orphaned HTML:", htmlPath);
      }
    }
  }
}

if (!flags.cleanOnly) {
  await walkMarkdownFiles(POSTS_DIR, OUTPUT_DIR, flags.force);
}
await cleanOrphans(OUTPUT_DIR, POSTS_DIR);

console.log("✅ All markdown files processed and orphans cleaned up.");
