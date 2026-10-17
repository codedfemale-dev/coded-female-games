# Product Quest

An original retro pixel-art browser RPG for Coded Female. You are a Product Manager at MEGACORP in 1995. Your big idea is a spoon. Your real challenge is seven stakeholders.

## Play

**[Play Product Quest in your browser →](https://codedfemale-dev.github.io/coded-female-games/product-quest/)**

Choose dialogue with the mouse, touch, or keys **1–3**. Press **C** for a coffee break; **Enter** starts the game or advances after a win. Native buttons also support Tab and Enter. Sound is off by default and can be toggled. There is no timer. The field guide explains the full rules before play.

Reach 80 alignment within three turns per boss. Strong arguments earn 40 alignment for 14 energy and +4 confidence. Partial arguments earn 24 for 8 energy and −5 confidence. Corporate nonsense earns 8 for 4 energy and −24 confidence. The dialogue order changes by encounter. Read the stakeholder intel rather than memorising button positions.

Start with 80 energy and confidence. Two coffees each restore 32 energy and 8 confidence, with one per boss. Advancing after an approval restores 18 energy and 8 confidence. Resources cap at 100. Zero confidence, insufficient energy without an available coffee, or failing to align in three turns ends the run. You can replay immediately. All seven approvals unlock the successful scorecard. The review includes the scoring formula and meeting minutes, and can be copied to the clipboard (with a text-selection fallback).

## Run and test

No installation or build step is required. From the repository root, serve the directory with any static HTTP server, for example `python3 -m http.server 8080`, then open `http://localhost:8080/product-quest/`. JavaScript modules require HTTP.

```sh
node --test product-quest/tests.cjs
# All repository tests, including this game:
node --test tests.mjs learning-tests.mjs migration-tests.mjs */tests.cjs
```

`engine.js` contains pure state transitions and scoring; `app.js` renders semantic HTML controls; `art.js` draws original sprites on a low-resolution canvas; `style.css` provides the responsive interface. Add new encounters in `engine.js`. No remote fonts, image assets, services, analytics or runtime packages are needed. Progress is held in memory and resets on reload.

## GitHub Pages

This is a plain static subdirectory in the existing collection. The repository already contains `.nojekyll` and documents publishing `main` from `/ (root)`. Once these changes are merged into that publishing branch, Pages serves `/product-quest/` alongside the other games. No separate build or replacement deployment workflow is needed. If Pages is disabled, choose Settings → Pages → Deploy from a branch → main → / (root). See [GitHub’s publishing-source guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

The catalogue is generated from `legacy-games.js`; run `node generate.mjs` after changing its entry and keep the generated `index.html` tracked.

## Scope

Seven bosses: CEO, CFO, engineering, marketing, legal, sales and the executive board. Twenty-one authored encounters; a strong run can finish in fourteen turns. This is fictional workplace satire with simplified strategic mechanics, not advice or a model of real people. Artwork and dialogue were made for this game. Existing repository content and brand permissions apply; no new licence is granted.
