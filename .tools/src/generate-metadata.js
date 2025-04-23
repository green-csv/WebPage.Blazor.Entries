const path = require("path");
const fs = require("fs");
const { config, paths } = require("./config");

const metadataFile = path.join(paths.ROOT_DIR, "public/posts-assets/metadata.config.json");

// Load existing or start fresh
let metadata = {};
if (fs.existsSync(metadataFile)) {
  metadata = JSON.parse(fs.readFileSync(metadataFile, "utf-8"));
} else {
  metadata = {
    author: {
      name: "A.",
      email: "aruiz@greencsv.dev",
      url: "https://greencsv.dev"
    },
    license: {
      type: "CC-BY-4.0",
      url: "https://creativecommons.org/licenses/by/4.0/"
    },
    repo: {
      name: "WebPage.Blazor.Entries",
      url: "https://gitlab.com/green-csv/WebPage.Blazor.Entries",
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
