import { parser } from "./src/parser.js";

const input = `SomeModel
  first_field
  second_field

AnotherModel
  another_field
  last_field`;

console.log("Input length:", input.length);
console.log("Character at pos 9:", JSON.stringify(input[9]));
console.log("Characters 0-15:", JSON.stringify(input.slice(0, 15)));

try {
  const tree = parser.parse(input);
  console.log(tree.toString());
} catch (e) {
  console.log("Error:", e.message);
}
