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
import { githubDark } from "@uiw/codemirror-theme-github";
import { automn } from "../src/language.js";

const sampleCode = `User
  name: String
  email: String
  role: Admin, Member, Guest
  tags: [String]

Post
  title: String
  content: String
  author: User
  status: Draft, Published, Archived

Comment
  body: String
  post: Post
  author: User
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
    githubDark,
    automn(),
  ],
});

const view = new EditorView({
  state,
  parent: document.getElementById("editor"),
});
