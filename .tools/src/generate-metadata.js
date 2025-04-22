const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "../../");
const metadataFile = path.join(OUTPUT_DIR, "posts-assets/metadata.config.json");

// Load existing or start fresh
let metadata = {};
if (fs.existsSync(metadataFile)) {
  metadata = JSON.parse(fs.readFileSync(metadataFile, "utf-8"));
} else {
  metadata = {
    author: {
      name: "A Z.",
      email: "aruiz@greencsv.dev",
      url: "https://greencsv.dev"
    },
    license: {
      type: "CC-BY-4.0",
      url: "https://creativecommons.org/licenses/by/4.0/"
    },
    repo: {
      name: "blog-content",
      url: "https://gitlab.com/greencsv/blog-content",
      branch: "main"
    },
    defaultLanguage: "en",
    supportedLanguages: ["en", "es"],
    description: "This vault is a multilingual, Git-backed knowledge base rendered through Blazor WebAssembly. Every entry is a versioned artifact."
  };
}

// Always update this
metadata.generated = new Date().toISOString();

fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));

console.log("🧬 metadata.config.json updated.");
