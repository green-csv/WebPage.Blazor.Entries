const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "../../");
const INDEX_FILE = path.join(ROOT_DIR, "index.json");
const TAGS_FILE = path.join(ROOT_DIR, "tags.json");

const generateTags = () => {
  const index = JSON.parse(fs.readFileSync(INDEX_FILE, "utf-8"));

  const tagMap = {};

  for (const post of index) {
    if (!post.tags || !Array.isArray(post.tags)) continue;

    for (const tag of post.tags) {
      const lowerTag = tag.toLowerCase();

      if (!tagMap[lowerTag]) {
        tagMap[lowerTag] = [];
      }

      tagMap[lowerTag].push(post.slug);
    }
  }

  fs.writeFileSync(TAGS_FILE, JSON.stringify(tagMap, null, 2));
  console.log(`🏷️  tags.json generated with ${Object.keys(tagMap).length} tags`);
};

generateTags();
