import { glob } from "glob";
import { pathToFileURL } from "url";

const files = await glob("*.js"); // all js files in folder

for (const file of files) {
  if (file !== "runAll.js") { // avoid running this file itself
    await import(pathToFileURL(`./${file}`).href);
  }
}
