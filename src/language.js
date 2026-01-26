import { LRLanguage, LanguageSupport } from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";
import { parser } from "./parser.js";

const automnHighlighting = styleTags({
  FieldName: t.variableName,
  ModelName: [t.strong, t.className],
  EnumName: t.className,
  VariantName: t.atom,
  TypeSymbol: t.typeName,
  TypeEnumVariant: t.atom,
  PropertyKey: t.propertyName,
  Tag: t.tagName,
  LabelString: t.string,
  ValueString: t.string,
  ObjectKeyString: t.string,
  ObjectKeySymbol: t.propertyName,
  DocumentationString: t.comment,
  TemplateString: t.special(t.string),
  Escape: t.escape,
  colon: t.variableName,
  DoubleCaret: t.punctuation,
  Bool: t.bool,
  Null: t.null,
  SinggleCaret: t.punctuation,
  Pipe: t.punctuation,
  OpenBracket: t.squareBracket,
  CloseBracket: t.squareBracket,
  Escape: t.escape,
});

export const automnLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [automnHighlighting],
  }),
  languageData: {
    commentTokens: { line: "#" },
  },
});

export function automn() {
  return new LanguageSupport(automnLanguage);
}
