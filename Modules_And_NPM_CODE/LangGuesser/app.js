import { franc } from "franc";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const langs = require("langs");
const colors = require("colors");

const input =
  process.argv[2] || "NO TEXT INCLUDED, THIS IS THE DEFAULT MESSAGE".red;
const langCode = franc(input);
if (langCode === "und") {
  console.log("SORRY I COULD NOT FIGURE OUT THE LANGUAGE".red);
} else {
  const language = langs.where("3", langCode);
  if (language) {
    console.log(`OUR BEST GUESS IS: ${language.name}`.green);
  } else {
    console.log(
      `SORRY I COULD NOT FIGURE OUT THE LANGUAGE FOR CODE: ${langCode}`.red
    );
  }
}
