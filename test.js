import { readdirSync, readFileSync } from "fs";
import { fileTests } from "@lezer/generator/test";
import { parser } from "./src/parser.js";
import { join } from "path";

for (let file of readdirSync("test")) {
  let tests = fileTests(readFileSync(join("test", file), "utf8"), file);
  for (let { name, run } of tests) {
    console.log(name);
    run(parser);
  }
}
