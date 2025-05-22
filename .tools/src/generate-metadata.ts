// update-metadata.ts
// Run with: deno run --allow-read --allow-write update-metadata.ts

import { paths } from "./config.ts";
import {
  dirname,
  join,
  resolve,
} from "https://deno.land/std@0.203.0/path/mod.ts";

interface Metadata {
  author?: {
    name: string;
    email: string;
    url: string;
  };
  license?: {
    type: string;
    url: string;
  };
  repo?: {
    name: string;
    url: string;
    branch: string;
  };
  defaultLanguage?: string;
  supportedLanguages?: string[];
  description?: string;
  generated?: string;
  [key: string]: unknown;
}

async function updateMetadata() {
  const ROOT = resolve(paths.ROOT_DIR);
  const metadataFile = join(
    ROOT,
    "docs",
    "posts-assets",
    "metadata.config.json",
  );

  // Load existing metadata if present
  let metadata: Metadata = {};
  try {
    await Deno.stat(metadataFile);
    const raw = await Deno.readTextFile(metadataFile);
    metadata = JSON.parse(raw);
  } catch {
    // file doesn't exist: start fresh
    metadata = {};
  }

  // Merge in our defaults
  metadata = {
    ...metadata,
    author: {
      name: "A.",
      email: "aruiz@greencsv.dev",
      url: "https://greencsv.dev",
    },
    license: {
      type: "CC-BY-4.0",
      url: "https://creativecommons.org/licenses/by/4.0/",
    },
    repo: {
      name: "WebPage.Blazor.Entries",
      url: "https://github.com/green-csv/WebPage.Blazor.Entries",
      branch: "main",
    },
    defaultLanguage: "en",
    supportedLanguages: ["en", "es"],
    description:
      "This vault is a multilingual, Git-backed knowledge base rendered through Blazor WebAssembly. Every entry is a versioned artifact.",
    // always override the generated timestamp
    generated: new Date().toISOString(),
  };

  // Ensure output directory exists
  const outDir = dirname(metadataFile);
  await Deno.mkdir(outDir, { recursive: true });

  // Write it back
  await Deno.writeTextFile(
    metadataFile,
    JSON.stringify(metadata, null, 2),
  );

  console.log("🧬 metadata.config.json updated.");
}

if (import.meta.main) {
  updateMetadata().catch((err) => {
    console.error("❌ Failed to update metadata:", err);
    Deno.exit(1);
  });
}
