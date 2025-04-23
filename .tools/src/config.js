const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "../../");

const config = {
  baseUrl: "https://greencsv.com",
  defaultLang: "en",
  langList: ["en", "es"],
};

const paths = {
  ROOT_DIR, 
};

module.exports = {config, paths};