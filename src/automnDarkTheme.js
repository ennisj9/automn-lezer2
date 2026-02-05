import { EditorView } from "@codemirror/view";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

const background = "#2d303b";
const foreground = "DEE0EA";
const selection = "#3e4451";
const cursor = "#528bff";
const activeLine = "#373c47";

const automnDarkTheme = EditorView.theme(
  {
    "&": {
      color: foreground,
      backgroundColor: background,
    },
    ".cm-content": {
      caretColor: cursor,
    },
    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: cursor,
    },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
      {
        backgroundColor: selection,
      },
    ".cm-panels": {
      backgroundColor: background,
      color: foreground,
    },
    ".cm-panels.cm-panels-top": {
      borderBottom: "2px solid black",
    },
    ".cm-panels.cm-panels-bottom": {
      borderTop: "2px solid black",
    },
    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff",
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f",
    },
    ".cm-activeLine": {
      backgroundColor: activeLine,
    },
    ".cm-selectionMatch": {
      backgroundColor: "#aafe661a",
    },
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847",
    },
    ".cm-gutters": {
      backgroundColor: background,
      color: "#5c6370",
      border: "none",
    },
    ".cm-activeLineGutter": {
      backgroundColor: activeLine,
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd",
    },
    ".cm-tooltip": {
      border: "none",
      backgroundColor: "#353a42",
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: "#353a42",
      borderBottomColor: "#353a42",
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        backgroundColor: "#2c313a",
        color: foreground,
      },
    },
  },
  { dark: true },
);

const automnDarkHighlightStyle = HighlightStyle.define([
  // ModelName, EnumName: className with strong
  { tag: [t.className], color: "8cecff" },
  { tag: [t.strong], fontWeight: "bold" },

  // FunctionName: function(variableName)
  { tag: t.function(t.variableName), color: "#9FD7FF" },

  // FieldName: variableName
  { tag: t.variableName, color: "#ffffff" },

  // TypeSymbol: typeName
  { tag: t.typeName, color: "#99ddff" },

  // TypeEnumVariant, VariantName: atom
  { tag: t.atom, color: "#bff9d5" },

  // TypePipe, TypeBracket*, TypeCurly*: typeOperator
  { tag: t.typeOperator, color: "#70b2fd" },

  // Number
  { tag: t.number, color: "#ffa2a3" },

  // Symbol: special(variableName)
  { tag: t.special(t.variableName), color: "#c5e39c" },

  // ValueString, ObjectKeyString, Backtick: string
  { tag: t.string, color: "#EFE1C3" },

  // Escape
  { tag: t.escape, color: "#f5d591" },

  // Template: special(string)
  { tag: t.special(t.string), color: "#f6b68e" },

  // LabelString: annotation
  { tag: t.annotation, color: "#c9b2ff" },

  // PropertyKey: attributeName
  { tag: t.attributeName, color: "#ffc3fe" },

  // Tag: tagName
  { tag: t.tagName, color: "#f2d5f1" },

  // ObjectKeySymbol: propertyName
  { tag: t.propertyName, color: "#db9ccd" },

  // DocumentationString: docString
  { tag: t.docString, color: "#d1d9ff" },

  // Bool, Null
  { tag: [t.bool, t.null], color: "#70adfd" },

  // Tilde, DoubleCaret, etc.: operatorKeyword
  { tag: t.operatorKeyword, color: "#F3A3F0" },

  // brackets
  {
    tag: [t.angleBracket, t.bracket, t.paren, t.squareBracket],
    color: "#DADDED",
  },
  {
    tag: [t.operator],
    color: "#B5C0F6",
  },
]);

export const automnDark = [
  automnDarkTheme,
  syntaxHighlighting(automnDarkHighlightStyle),
];
