import { EditorState } from "@codemirror/state";
import {
  EditorView,
  lineNumbers,
  highlightActiveLineGutter,
  highlightSpecialChars,
  drawSelection,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
  highlightActiveLine,
  keymap,
} from "@codemirror/view";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import {
  syntaxHighlighting,
  defaultHighlightStyle,
  bracketMatching,
} from "@codemirror/language";
import { automnDark } from "../src/automnDarkTheme.js";
import { automn } from "../src/language.js";
import { tagHighlighter, tags, highlightCode } from "@lezer/highlight";

const sampleCode = `Types
  union?: int | string
  array_of: [int]
  map: {int: string}
  parameter: varchar(255)
  enum_shorthand: BLUE, GREEN, ORANGE
  complex: string | [int | {int: int}] | YES, NO

Values
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
  }
  .array_property = [1, 2, 3,]
  field_example ~ "string"

Fields
  inline_specification?: int 'Instant' ~ 12
  constant_value: string 'Constant' == "some_value"
  indented_spefication?
    : object
    (js): string
    'Indented'
    ~ {
      "foo": "bar"
    }
    [some-tag,another-tag,]
    .property = "string"
    > single line doc
    >>
      multiline
      documentation

Model GET \`/user/<user_id>\`
  .property = "string"
  [tag, another-tag, third-tag,]
  > single line doc
  >>
    multiline
    documentation
  field
  function()
    argument: int
    -> return_field: string
  /Submodel
    sub_field: int

Function()
  arg: int
  -> return_field1: string
  -> return_field2: int
  .property = "string"
  [tag, another-ag, third-tag,]
  > single line doc
  >>
    multiline
    documentation

|Enum: string
  .property = "string"
  [tag, another-tag, third-tag,]
  > single line doc
  >>
    multiline
    documentation
  BLUE
  RED = "RED"
  GREEN
    = "GREEN"
    [tag, another-ag, third-tag,]
    > single line doc
    >>
      multiline
      documentation

:TypeAlias = int | [string]
`;

const state = EditorState.create({
  doc: sampleCode,
  extensions: [
    lineNumbers(),
    highlightActiveLineGutter(),
    highlightSpecialChars(),
    history(),
    drawSelection(),
    dropCursor(),
    EditorState.allowMultipleSelections.of(true),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    bracketMatching(),
    rectangularSelection(),
    crosshairCursor(),
    highlightActiveLine(),
    keymap.of([...defaultKeymap, ...historyKeymap]),
    automnDark,
    automn(),
  ],
});

const view = new EditorView({
  state,
  parent: document.getElementById("editor"),
});

function escapeHtml(str) {
  if (typeof str !== "string") {
    return "";
  }
  return str.replace(/[&<>"'`]/g, (match) => {
    switch (match) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#039;";
      case "`":
        return "&#096;";
      default:
        return match;
    }
  });
}

const classHighlighter = tagHighlighter([
  { tag: tags.link, class: "tok-link" },
  { tag: tags.heading, class: "tok-heading" },
  { tag: tags.emphasis, class: "tok-emphasis" },
  { tag: tags.strong, class: "tok-strong" },
  { tag: tags.keyword, class: "tok-keyword" },
  { tag: tags.atom, class: "tok-atom" },
  { tag: tags.bool, class: "tok-bool" },
  { tag: tags.url, class: "tok-url" },
  { tag: tags.labelName, class: "tok-labelName" },
  { tag: tags.inserted, class: "tok-inserted" },
  { tag: tags.deleted, class: "tok-deleted" },
  { tag: tags.literal, class: "tok-literal" },
  { tag: tags.string, class: "tok-string" },
  { tag: tags.number, class: "tok-number" },
  {
    tag: [tags.regexp, tags.escape, tags.special(tags.string)],
    class: "tok-string2",
  },
  { tag: tags.variableName, class: "tok-variableName" },
  { tag: tags.function(tags.variableName), class: "tok-variableName-function" },
  { tag: tags.local(tags.variableName), class: "tok-variableName tok-local" },
  {
    tag: tags.definition(tags.variableName),
    class: "tok-variableName tok-definition",
  },
  { tag: tags.special(tags.variableName), class: "tok-variableName2" },
  {
    tag: tags.definition(tags.propertyName),
    class: "tok-propertyName tok-definition",
  },
  { tag: tags.docString, class: "tok-docString" },
  { tag: tags.annotation, class: "tok-annotation" },
  { tag: tags.typeName, class: "tok-typeName" },
  { tag: tags.namespace, class: "tok-namespace" },
  { tag: tags.className, class: "tok-className" },
  { tag: tags.macroName, class: "tok-macroName" },
  { tag: tags.propertyName, class: "tok-propertyName" },
  { tag: tags.operator, class: "tok-operator" },
  { tag: tags.comment, class: "tok-comment" },
  { tag: tags.meta, class: "tok-meta" },
  { tag: tags.invalid, class: "tok-invalid" },
  { tag: tags.punctuation, class: "tok-punctuation" },
  { tag: tags.attributeName, class: "tok-attributeName" },
  { tag: tags.tagName, class: "tok-tagName" },
  { tag: tags.null, class: "tok-null" },
  { tag: tags.operatorKeyword, class: "tok-operatorKeyword" },
  { tag: tags.typeOperator, class: "tok-typeOperator" },
  { tag: tags.squareBracket, class: "tok-squareBracket" },
  { tag: tags.bracket, class: "tok-bracket" },
  { tag: tags.paren, class: "tok-paren" },
  { tag: tags.angleBracket, class: "tok-angleBracket" },
]);

const renderAutomn = (code) => {
  let output = "<pre>";
  const emit = (text, classes) => {
    const escaped = escapeHtml(text);
    if (classes) {
      console.log(classes);
      let span = `<span class="${classes}">${escaped}</span>`;
      output += span;
    } else {
      output += escaped;
    }
  };
  const emitBreak = () => {
    output += "\n";
  };
  highlightCode(
    code,
    automn().language.parser.parse(code),
    classHighlighter,
    emit,
    emitBreak,
  );
  output += "</pre>";
  return output;
};

document.getElementById("prerendered").innerHTML = preRender(sampleCode);
