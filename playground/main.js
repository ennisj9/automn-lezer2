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
