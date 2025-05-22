// config.ts
import {
  dirname,
  fromFileUrl,
  resolve,
} from "https://deno.land/std@0.203.0/path/mod.ts";

// Reconstruct __dirname
const __dirname = dirname(fromFileUrl(import.meta.url));
// Go up two levels from this file’s folder
const ROOT_DIR = resolve(__dirname, "../../");

export const config = {
  baseUrl: "https://greencsv.com",
  defaultLang: "en",
  langList: ["en", "es"],
};

export const paths = {
  ROOT_DIR,
};
