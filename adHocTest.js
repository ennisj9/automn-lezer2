import { parser } from "./src/parser.js";

const input = `:TypeAlias = int | [string]`;

console.log("Input length:", input.length);
console.log("Character at pos 13:", JSON.stringify(input[9]));
console.log("Characters 0-15:", JSON.stringify(input.slice(0, 15)));

try {
  const tree = parser.parse(input);
  console.log(tree.toString());
} catch (e) {
  console.log("Error:", e.message);
}
