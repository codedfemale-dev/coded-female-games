# First Code Playground

A small Coded Female browser playground. Try the original greeting, palette, counter and language quiz, then edit a project of your own without leaving the page. The arcade’s artwork, fonts, colours and navigation remain in place.

## The editor

Three labelled tabs contain short, real sections of a project:

- **HTML:** a heading and introductory paragraph, using one `h1` and one `p`.
- **CSS:** the `--accent` colour, using a three- or six-digit hex value.
- **JavaScript:** a quoted `greeting` and an integer `increment` from 1 to 10.

The rest of each file is supplied. These boundaries are stated in the interface; this is a guided first editor rather than an arbitrary-code environment. Both single and double quotes work for the greeting. Line comments are allowed in JavaScript and block comments in CSS.

Valid edits update after a short typing pause. Run preview updates immediately. Each valid update restarts the preview; invalid edits preserve the last working version, keep the learner’s code and explain which section needs attention. Download is paused until all current sections are valid. The preview runs in an isolated iframe and makes no external requests.

Try changing `const increment = 1;` to `const increment = 2;`. One preview click then adds two. Change the heading, greeting or accent and test the result. Button text is chosen for contrast against the accent.

Reset section changes only the selected section. Reset project restores all starter sections. Undo reset restores the preceding edits, including incomplete edits. Changes stay in memory in the tab. Refreshing or closing the page clears them; download before leaving.

## Your downloadable project

Download my project creates a ZIP locally containing:

- `index.html`: the edited heading and paragraph with supplied greeting and counter controls.
- `style.css`: the edited accent with the supplied responsive layout.
- `script.js`: the edited constants with the supplied event handlers.
- `README.txt`: extraction, opening and next-challenge instructions.

Extract the whole ZIP, keep the files together and open `index.html` in a browser. No package installation, server, sign-in or internet connection is needed by the exported project. Input names and runtime counts are not included in the download. The counter starts at zero when opened. The exported files use the same HTML, CSS and runtime as the preview. Learners can edit the complete downloaded files beyond the browser editor’s guided sections.

## Development and checks

Serve the collection root over HTTP and open `/first-code-playground/`. No build step or runtime package is needed.

```sh
node --test first-code-playground/tests.cjs
node --test --test-concurrency=1 *tests.mjs */*tests.cjs
```

- `script.js` and `style.css`: the existing guided demo.
- `project.js`: section validation, complete project generation, isolated preview and store-only ZIP generation.
- `editor.js`: tabs, live updates, recovery, resets and download.
- `editor.css`: local editor styles loaded after the shared arcade skin.
- `tests.cjs`: actual exported runtime behaviour, validation boundaries, preview/export parity, ZIP structure and asset wiring.

Keyboard tabs follow native controls. Left/Right arrows, Home and End switch file tabs. Tab in a code field leaves it normally; there is no keyboard trap. Fields are labelled, errors identify a section, updates preserve focus while typing, and the preview has a descriptive title. Responsive layout stacks the editor and preview on narrow screens. No complete assistive-technology audit is claimed.

No new browser storage, account, analytics, remote compilation or code-submission service is used. Publishing remains through the existing collection after review. This change requires no edits to the catalogue, shared arcade files or other games.
