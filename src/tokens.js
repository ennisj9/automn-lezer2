import { ExternalTokenizer, ContextTracker } from "@lezer/lr";
import { indent, dedent, redent } from "./parser.terms.js";

class IndentLevel {
  constructor(parent, depth) {
    this.parent = parent;
    this.depth = depth;
    this.hash =
      (parent ? (parent.hash + parent.hash) << 8 : 0) + depth + (depth << 4);
  }
}

const newline = 10,
  space = 32,
  tab = 9,
  carriageReturn = 13;

let lastIndentDepth;

export const trackIndent = new ContextTracker({
  start: new IndentLevel(null, 0),
  shift(context, term, stack, input) {
    if (term == indent) return new IndentLevel(context, lastIndentDepth);
    if (term == dedent) return context.parent;
    return context;
  },
  hash: (context) => context.hash,
});

const advanceSpaces = (input) => {
  let spaces = 0;
  while (input.next == newline || input.next == carriageReturn) input.advance();
  while (input.next == space || input.next == tab) {
    input.advance();
    spaces++;
  }
  return spaces;
};

const spaceOrTab = (char) => char == space || char == tab;
const newlineOrCarriage = (char) => char == newline || char == carriageReturn;

export const indentation = new ExternalTokenizer(
  (input, stack) => {
    if (input.next == -1 && stack.context.parent) {
      input.acceptToken(dedent);
    }
    if (input.next != newline && input.next != carriageReturn) return;
    let i = 0;
    let spaces = 0;
    var char = input.peek(0);
    while (spaceOrTab(char) || newlineOrCarriage(char)) {
      spaces++;
      if (char == newline) {
        spaces = 0;
      }
      i++;
      char = input.peek(i);
    }
    if (spaces > stack.context.depth) {
      lastIndentDepth = spaces;
      input.advance(i);
      input.acceptToken(indent);
    } else if (spaces < stack.context.depth) {
      input.acceptToken(dedent);
    } else {
      input.advance(i);
      input.acceptToken(redent);
    }
  },
  { extend: true },
);
