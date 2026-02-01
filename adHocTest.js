import { parser } from "./src/parser.js";

const input = `Values
  .object_property = {
    "string_key": "string_value",
    true: true,
    false: false,
    missing: null,
    symbol: symbol,
    integer: 12,
    fraction: 1.25,
    negative: -10.25,
    array: ["string"],
    path: \`/folder/<field: int ~ "12">/file\`,
  }`;

console.log("Input length:", input.length);
console.log("Character at pos 13:", JSON.stringify(input[9]));
console.log("Characters 0-15:", JSON.stringify(input.slice(0, 15)));

try {
  const tree = parser.parse(input);
  console.log(tree.toString());
} catch (e) {
  console.log("Error:", e.message);
}
