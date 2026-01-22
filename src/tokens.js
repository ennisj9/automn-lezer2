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

export const trackIndent = new ContextTracker({
  start: new IndentLevel(null, 0),
  shift(context, term, stack, input) {
    if (term == indent) return new IndentLevel(context, stack.pos - input.pos);
    if (term == dedent) return context.parent;
    return context;
  },
  hash: (context) => context.hash,
});

const newline = 10,
  space = 32,
  tab = 9,
  carriageReturn = 13;

const advanceSpaces = (input) => {
  let spaces = 0;
  while (input.peek() == newline || input.peek() == carriageReturn)
    input.advance();
  while (input.next == space || input.next == tab) {
    input.advance();
    spaces++;
  }
  return spaces;
};

export const indentation = new ExternalTokenizer((input, stack) => {
  console.log(input.peek());
  if (input.peek() != newline && input.peek() != carriageReturn) return;
  let spaces = advanceSpaces();
  while (input.peek() == newline || input.peek() == carriageReturn)
    spaces = advanceSpaces();

  if (spaces > stack.context.depth) {
    input.acceptToken(indent);
  } else if (spaces < stack.context.depth) {
    input.acceptToken(dedent);
  } else {
    input.acceptToken(redent);
  }
});
