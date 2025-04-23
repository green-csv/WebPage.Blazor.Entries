const fs = require("fs");
const path = require("path");
const { config, paths } = require("./config");

const indexPath = path.resolve(paths.ROOT_DIR, "public/posts-assets/index.json");
const outputPath = path.resolve(paths.ROOT_DIR, "public/posts-assets/posts-index.json");

const index = JSON.parse(fs.readFileSync(indexPath, "utf-8"));

const flat = [];

for (const post of index) {
  for (const lang of Object.keys(post.translations)) {
    const t = post.translations[lang];
    flat.push({
      slug: post.slug,
      lang: lang,
      title: t.title,
      summary: t.summary,
      date: t.date,
      tags: post.tags,
      url: `posts/${post.slug}/${lang}.html`,
      cover: t.cover
    });
  }
}

fs.writeFileSync(outputPath, JSON.stringify(flat, null, 2), "utf-8");

console.log(`✅ posts-index.json generated with ${flat.length} entries`);
