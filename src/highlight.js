import { styleTags, tags as t } from "@lezer/highlight";

export const automnHighlighting = styleTags({
  ModelName: [t.className, t.strong],
  ObjectKeySymbol: t.variableName,
});
