const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { config, paths } = require("./config");


const POSTS_DIR = path.join(paths.ROOT_DIR, "posts");
const OUTPUT_FILE = path.join(paths.ROOT_DIR, "docs/posts-assets/index.json");

const isMarkdown = (filename) => filename.endsWith(".md");

const buildIndex = async () => {

  const postFolders = fs.readdirSync(POSTS_DIR).filter((f) =>
    fs.statSync(path.join(POSTS_DIR, f)).isDirectory()
  );

  const index = [];

  for (const slug of postFolders) {
    const dir = path.join(POSTS_DIR, slug);
    const files = fs.readdirSync(dir).filter(isMarkdown);

    const translations = {};
    let tags = [];

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const content = fs.readFileSync(fullPath, "utf-8");
      const { data } = matter(content);

      if (!data.published) continue;

      const lang = data.language || "en";

      const relativePath = path.relative(paths.ROOT_DIR, dir).replace(/\\/g, "/");
      const baseName = path.basename(file, ".md");

      translations[lang] = {
        title: data.title || "Untitled",
        date: data.date || "1970-01-01",
        filename: `${relativePath}/${baseName}.html`,
        summary: data.summary || "",
        cover: data.cover || null
      };

      if (data.tags) tags = data.tags; // assuming same tags for all langs
    }

    if (Object.keys(translations).length > 0) {
      index.push({
        slug,
        tags,
        translations
      });
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));

  console.log(`✅ index.json generated with ${index.length} posts`);  
};

buildIndex();
