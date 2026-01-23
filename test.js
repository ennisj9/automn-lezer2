import { readdirSync, readFileSync } from "fs";
import { fileTests } from "@lezer/generator/test";
import { parser } from "./src/parser.js";
import { join } from "path";

for (let file of readdirSync("test")) {
  let tests = fileTests(readFileSync(join("test", file), "utf8"), file);
  for (let { name, run, text } of tests) {
    try {
      run(parser);
      console.log(name + " - succcess");
    } catch (e) {
      console.log(name + " - failed");
      if (e instanceof SyntaxError && e.message.substring(0, 8) == "No parse") {
        const index = parseInt(e.message.substring(12));
        console.log("parsed:");
        console.log(text.substring(0, index));
        console.log("failed at:");
        console.log(text.substring(index, index + 10));
      }
      throw e;
    }
  }
}
