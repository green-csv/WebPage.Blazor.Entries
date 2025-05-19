const fs = require("fs");
const path = require("path");
const { marked } = require("marked");
const hljs = require("highlight.js");
const { config, paths } = require("./config");

const args = process.argv.slice(2);
const flags = {
  cleanOnly: args.includes("--clean-only"),
  force: args.includes("--force")
};

const POSTS_DIR = path.resolve(paths.ROOT_DIR, "posts");
const OUTPUT_DIR = path.resolve(paths.ROOT_DIR, "docs/posts");

marked.setOptions({
  highlight(code, lang) {
    const valid = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language: valid }).value;
  }
});

function stripFrontmatter(md) {
  return md.replace(
    /^---\r?\n[\s\S]*?\r?\n---\r?\n?/,
    ""
  );
}

function shouldRender(input, output) {
  if (!fs.existsSync(output)) return true;
  const inputTime = fs.statSync(input).mtimeMs;
  const outputTime = fs.statSync(output).mtimeMs;
  return inputTime > outputTime;
}

function walkMarkdownFiles(inputDir, outputDir, force = false) {

  const entries = fs.readdirSync(inputDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullInputPath = path.join(inputDir, entry.name);
    const fullOutputPath = path.join(outputDir, entry.name.replace(/\.md$/, ".html"));

    if (entry.isDirectory()) {
      walkMarkdownFiles(fullInputPath, path.join(outputDir, entry.name));
    } else if (entry.name.endsWith(".md")) {

      if (!shouldRender(fullInputPath, fullOutputPath) && !force) {
        console.log("⏩ Skipped:", fullInputPath);
        continue;
      }

      const md = fs.readFileSync(fullInputPath, "utf-8");
      const cleanedMd = stripFrontmatter(md);
      const html = marked(cleanedMd);

      fs.mkdirSync(path.dirname(fullOutputPath), { recursive: true });
      fs.writeFileSync(fullOutputPath, html);
      console.log("🌈 Rendered:", fullOutputPath);
    }
  }
}

function cleanOrphans(renderedDir, sourceDir) {
  console.log("🧹 Checking for orphaned .html files...");
  
  const entries = fs.readdirSync(renderedDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullRenderedPath = path.join(renderedDir, entry.name);
    const correspondingSource = path.join(
      sourceDir,
      entry.name.replace(/\.html$/, ".md")
    );

    if (entry.isDirectory()) {
      cleanOrphans(fullRenderedPath, path.join(sourceDir, entry.name));
    } else if (entry.name.endsWith(".html")) {
      if (!fs.existsSync(correspondingSource)) {
        fs.unlinkSync(fullRenderedPath);
        console.log("🗑️  Deleted orphaned HTML:", fullRenderedPath);
      }
    }
  }
}

if (!flags.cleanOnly) {
  walkMarkdownFiles(POSTS_DIR, OUTPUT_DIR, flags.force);  
}

cleanOrphans(OUTPUT_DIR, POSTS_DIR);

console.log("✅ All markdown files processed and orphans cleaned up.");
