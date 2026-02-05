import { LRLanguage, LanguageSupport } from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";
import { parser } from "./parser.js";

const automnHighlighting = styleTags({
  FieldName: t.variableName,
  ModelName: [t.strong, t.className],
  EnumName: [t.strong, t.className],
  AssociatedModelName: t.className,
  VariantName: t.atom,
  FunctionName: t.function(t.variableName),
  TypeSymbol: t.typeName,
  TypeAliasName: t.typeName,
  TypeEnumVariant: t.atom,
  PropertyKey: t.attributeName,
  Tag: t.tagName,
  LabelString: t.annotation,
  ValueString: t.string,
  Template: t.special(t.string),
  Backtick: t.special(t.string),
  ObjectKeyString: t.string,
  ObjectKeySymbol: t.string,
  DocumentationString: t.docString,
  Escape: t.escape,
  RightArrow: t.operatorKeyword,
  Tilde: t.operatorKeyword,
  DoubleCaret: t.operatorKeyword,
  SingleDocumentationCaret: t.operatorKeyword,
  Period: t.operatorKeyword,
  TypeAliasColon: t.operatorKeyword,
  EnumPipe: t.operatorKeyword,
  Bool: t.bool,
  Null: t.null,
  QuestionMark: t.operator,
  TypePipe: t.typeOperator,
  DoubleEqual: t.typeOperator,
  VariantEqual: t.typeOperator,
  TypeBracketOpen: t.typeOperator,
  TypeBracketClose: t.typeOperator,
  TypeCurlyOpen: t.typeOperator,
  TypeCurlyClose: t.typeOperator,
  TypeParenOpen: t.typeOperator,
  TypeParenClose: t.typeOperator,
  BracketOpen: t.squareBracket,
  BracketClose: t.squareBracket,
  CurlyOpen: t.bracket,
  CurlyClose: t.bracket,
  ParenOpen: [t.bracket, t.paren],
  ParenClose: [t.bracket, t.paren],
  AngleOpen: t.angleBracket,
  AngleClose: t.angleBracket,
  TypeContext: t.special(t.variableName),
  TemplateField: t.variableName,
  Escape: t.escape,
  Symbol: t.special(t.variableName),
  Number: t.number,
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
