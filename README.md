# Coded Female learning games

Sixteen browser games together in one repository, including six shared-engine learning games, seven earlier Coded Female games, Product Quest and Release Manager. All content uses fictional organisations and curated feedback. No live AI service or accounts are needed.

Play the collection: https://codedfemale-dev.github.io/coded-female-games/

| Game | What you practise | Play |
| --- | --- | --- |
| Release Manager: Ship Happens | Team hiring, release planning, MoSCoW, RICE and consequences across six releases | [Play](https://codedfemale-dev.github.io/coded-female-games/release-manager/) |
| Product Quest | Stakeholder pitches, trade-offs and resource management in a retro RPG | [Play](https://codedfemale-dev.github.io/coded-female-games/product-quest/) |
| Open for Everyone | Labels, contrast, button names, focus order and error recovery | [Play](https://codedfemale-dev.github.io/coded-female-games/open-for-everyone/) |
| Ship It or Fix It | Read requirements, predict actual tests, select code repairs and keep working code | [Play](https://codedfemale-dev.github.io/coded-female-games/ship-it-or-fix-it/) |
| Agent Mission Control | Tool boundaries, human approval, budget limits, external instructions and handovers | [Play](https://codedfemale-dev.github.io/coded-female-games/agent-mission-control/) |
| Undo the Nudge | Clear pricing, voluntary extras, neutral choices, honest urgency and cancellation | [Play](https://codedfemale-dev.github.io/coded-female-games/undo-the-nudge/) |
| Metric Makeover | Outcome measures, denominators, tail performance, funnels, guardrails and causation | [Play](https://codedfemale-dev.github.io/coded-female-games/metric-makeover/) |
| The Stakeholder Room | Questions, trade-offs, scope, risk, promises and shared agreements | [Play](https://codedfemale-dev.github.io/coded-female-games/the-stakeholder-room/) |

| Spot the Scam | Message judgement and scam awareness | [Play](https://codedfemale-dev.github.io/coded-female-games/spot-the-scam/) |
| AI Escape Room | Clear briefs, evidence and instruction boundaries | [Play](https://codedfemale-dev.github.io/coded-female-games/ai-escape-room/) |
| Prompt Practice | Useful prompts and scripted responses | [Play](https://codedfemale-dev.github.io/coded-female-games/prompt-practice/) |
| Hallucination Detective | Evidence checks and careful summaries | [Play](https://codedfemale-dev.github.io/coded-female-games/hallucination-detective/) |
| Sprint Survival | Priorities, delivery and team wellbeing | [Play](https://codedfemale-dev.github.io/coded-female-games/sprint-survival/) |
| Bug Bash | Developer arcade with a practice mode | [Play](https://codedfemale-dev.github.io/coded-female-games/bug-bash/) |
| First Code Playground | Beginner coding experiments | [Play](https://codedfemale-dev.github.io/coded-female-games/first-code-playground/) |

The six shared-engine games contain 32 challenges. The seven earlier games retain their own formats. Repair and redesign games allow retries. Code choices run real predefined JavaScript functions against the displayed test cases, without evaluating player-supplied code. Conversation and agent meters are simplified learning models; they are not measures of real people or operational readiness. Downloads include the decisions, reasoning and further reading. Each of the six shared-engine games also ends with an optional, unscored follow-up situation: compare three responses with specific feedback, inspect a worked example and write a reflection. The reflection and practice attempts are included in the readable and downloadable field notes. These reset on replay or reload; download notes to keep them. No AI grades the reflection.

## Run locally

Serve this folder with a static web server, then open `index.html` through that server. JavaScript modules require HTTP rather than opening files directly. There are no package dependencies or build requirements.

With a current Node.js runtime:

```
node generate.mjs
node --test tests.mjs learning-tests.mjs migration-tests.mjs */tests.cjs
```

`generate.mjs` updates the collection and the six shared-engine introduction pages after metadata changes. `legacy-games.js` supplies the seven other catalogue entries; their implementations stay inside their respective folders. The follow-up exercises and their guidance links live in `learning.js`. The game content lives in `data.js`, the rules in `models.js`, and the interface in `game.js`. Keep the generated HTML tracked. Update asset version strings when publishing later changes to avoid mixing browser-cached versions.

## Publication

GitHub Pages can deploy the root of the `main` branch. `.nojekyll` keeps it a plain static site. Each game is a separate directory with a direct play URL. All 16 games are stored in this repository and linked from the landing page. The seven earlier standalone repositories remain available so existing links keep working. Future collection updates should be made here. `MIGRATION.json` records the source commits used during consolidation.

## Originality and guidance

The stories, characters, examples, choices, code challenges, layouts and illustrations were written or built for Coded Female. Competitor screens, scenarios and assets were not copied. Shared educational topics and common programming constructs are used to teach practical skills. Each game links to the primary guidance behind its lessons. Originality is not a guarantee that no similar wording exists elsewhere.

Supporting sources, reviewed on 12 October 2026:

- W3C WAI tutorials and WCAG 2.2 Understanding documents for form labels, contrast, focus order, notifications and image alternatives.
- MDN JavaScript reference for sorting, filtering and strict equality.
- OWASP Top 10 for Agentic Applications 2026 for agent oversight and security.
- OECD *Dark commercial patterns* for deceptive design patterns.
- GOV.UK Service Manual for performance measurement.
- The Scrum Guide for transparency, inspection and collaboration.

Exact links appear in `data.js` and in each game’s supporting guidance panel. No source wording is used as a scenario, dialogue or puzzle.

## Accessibility and privacy

The controls use native buttons, selects and checkboxes, visible labels, focus indicators, keyboard interaction and feedback focus. Motion respects device reduced-motion preferences. Important information is provided as text, including the deliberately problematic visual examples. The six shared-engine games are untimed. Bug Bash and Release Manager offer timed arcade play and an untimed mode. This is not a full accessibility compliance claim; testing with assistive technology and people is still valuable.

No sign-up or live AI service is needed. Bug Bash saves its best score in local storage; Release Manager saves the current career in local storage and game files in a scoped offline cache; other progress resets on reload. Game processing happens in your browser. Fonts are served with the collection. GitHub Pages handles ordinary hosting requests.

The existing Coded Female Open Sans and Playfair Display font families are retained. Their supplied OFL licences are in `assets/`. No new licence is granted for the game content or brand assets by this repository.

## Further learning improvements, 14 October 2026

Six new fictional situations help learners apply a lesson beyond the original story. These add to the existing 32 challenges, without changing their scores. Worked examples cover recoverable form errors, JavaScript boundary tests, external instructions to an assistant, trial renewal copy, completion-rate calculations and negotiating an urgent request. Related-game links offer a next step.

Follow-up sources are linked alongside each worked example. Check that product copy matches the real service before reusing it. Example conversation wording is a starting point rather than a guaranteed outcome.

Further opportunities in the other games, not implemented in this pass:

- First Code Playground: guided predict, edit and check exercises with visible expected results.
- Bug Bash: a separate debugging activity that connects arcade play to reading and repairing code.
- Hallucination Detective: new evidence cases with conflicting dates or missing information.
- Spot the Scam: a follow-up exercise on reporting and verifying a suspicious request through an independent channel.
- Prompt Practice and AI Escape Room: alternative briefs with different constraints so learners practise adapting their reasoning.
- Sprint Survival: build on its recently expanded scenario packs with comparisons between replayed decisions.

## Product Quest

**[Play Product Quest in your browser →](https://codedfemale-dev.github.io/coded-female-games/product-quest/)**

The retro RPG lives in `product-quest/` with its own original pixel art, dialogue and pure game engine. Seven stakeholder battles turn an everyday spoon pitch into a small corporate adventure. See [its README](product-quest/README.md) for controls, scoring, tests and publication details. It uses the existing static Pages setup and has no external runtime dependencies.

## Release Manager: Ship Happens

The installable, offline-capable product-management web app lives in `release-manager/`, using Product Quest’s plum, lime and lavender visual language and pixel-art style. Six releases include a developer roster, per-person work queues, MoSCoW and RICE, stakeholder decisions, delayed consequences, release gates and retrospectives. It runs on the existing free GitHub Pages hosting, without a backend or paid service. See [its README](release-manager/README.md) for rules, installation, save privacy and validation.

## Arcade collection refresh, 18 October 2026

The collection homepage is now an arcade game-select screen, with original cabinet artwork, illustrated cartridges for all 15 games and six discipline filters. All game links remain available without JavaScript. The filters use native buttons, keep the selected state visible and announce the result count.

Six shared-engine learning games now have distinct visual worlds and authored mission introductions:

| Game | Style | Discipline and setting |
| --- | --- | --- |
| Ship It or Fix It | Neon grid | Pip’s patch circuit: predict JavaScript behaviour, inspect actual tests and repair code. |
| Agent Mission Control | Neon grid | Orbit control: permissions, external instructions, reviewed spending and handover. |
| Metric Makeover | Neon grid | Signal observatory: activation, retention, denominators, guardrails and investigations. |
| Open for Everyone | Pixel world | Common Ground: repair a community centre’s booking barriers. |
| Undo the Nudge | Pixel world | Loopbox: fair pricing, voluntary extras, neutral choices and an easy exit. |
| The Stakeholder Room | Pixel world | The agreement room: listen, negotiate scope, protect capacity and record commitments. |

The styling carries through introductions, active missions, choices, feedback, results and further practice. The existing 32 authored challenges, real predefined code tests, decisions, scores and field notes remain in place. The illustrated accessibility and ethical-design screens retain their original light palette and deliberate faults, so the redesign does not remove the evidence the player must inspect. The six games remain untimed. Product Quest and Release Manager retain their own standalone implementations.

`arcade-worlds.js` defines mission copy, discipline metadata and original SVG scenes. `arcade.css` adds the two visual systems over the shared base stylesheet. `arcade-hub.js` filters the catalogue entirely on-device. Update the identity map when adding a new catalogue game, and run `node generate.mjs` after changing shared introductions or landing-page markup. Generated pages stay tracked. Keep the introductory mission panel in `game.js` and `generate.mjs` consistent so replay uses the same presentation. Versioned asset URLs avoid mixing the old interface with the new one.

The scenes use original geometric artwork and the collection’s pixel-character grammar, with no external images, copied film assets, new fonts, analytics or runtime packages. Colours and geometric grids evoke the requested neon arcade style; no Tron names, logos or film artwork appear in the game UI. Motion remains modest and respects reduced-motion preferences.


## Remaining arcade worlds, 18 October 2026

The seven earlier standalone games now complete the collection’s arcade presentation. All 15 games have arcade styling, and the seven remaining cartridges now depict their own settings rather than a generic discipline image.

| Game | World | Style |
| --- | --- | --- |
| Spot the Scam | The Signal Desk: inspect incoming messages and verify requests | Neon grid |
| AI Escape Room | Loop Lab: three locks for clarity, evidence and instruction boundaries | Neon grid |
| Bug Bash | Friday Grid: clear pixel bugs, collect coffee and protect the duck | Neon grid |
| Prompt Practice | The Brief Forge: turn vague requests into useful briefs | Pixel world |
| Hallucination Detective | The Relay Archive: audit B.I.T.’s claims against source records | Pixel world |
| Sprint Survival | Team Studio: three sprints, six stories, branching consequences and browser saves | Purple and lime studio |
| First Code Playground | The Code Garden: grow HTML, CSS and JavaScript interactions | Pixel world |

`arcade-standalone.css` adds a presentation layer over each game’s local stylesheet. The original engines, scenario selection, answers, hints, downloads, scoring and save behaviour remain in their own directories. Bug Bash uses original SVG pixel targets while keeping its accessible square labels and existing practice and pause modes. Code Garden’s palette choices use bright, readable colours and dark tints; its own `style.css` still owns the `--accent` default, so the beginner remix instruction continues to work. No new external fonts, artwork, accounts or analytics are introduced.

`generate-standalone.mjs`, called by `node generate.mjs`, refreshes the marked intro, mission header and results-art regions from `arcade-worlds.js` and writes the three SVG target assets. It leaves the playable forms and game DOM IDs intact. Keep the `arcade-world` comment markers when editing standalone HTML. The catalogue, six shared-engine pages and seven standalone presentation regions can now all be regenerated with the same command.

Validation includes the repository’s existing engine, content and local-asset checks; full browser runs of Spot the Scam, AI Escape Room, Prompt Practice, Hallucination Detective and Sprint Survival; Code Garden’s greeting, palette, counter and quiz; and Bug Bash scoring and pause in practice mode. The redesign is not an accessibility conformance audit.

## Sprint Survival consolidation

Sprint Survival now has one maintained implementation at `sprint-survival/`: the complete studio game, with the arcade’s purple and lime theme. It includes six stories (22 situations), the block-built team and duck, educational explanations, branching consequences, replay and browser-local save/resume. The old standalone address redirects to the arcade game; existing browser saves use the same origin and key. All earlier arcade scenario packs are retained.

The studio opts out of generated world regions so regenerating the arcade cannot replace its design. Run the repository test script to include the studio and save compatibility checks.


## Mission Control: First Contact

A standalone alien exploration game at `mission-control/`, linked from the arcade under Teamwork. Three connected missions adapt Observe, Orient, Decide, Act into a civilian decision-making exercise: a JavaScript validation bug, a misleading product dashboard and a release scope/capacity decision. This is separate from Agent Mission Control.

Explore the original green-phosphor bridge using WASD/arrows and E, click stations on the deck, or use named station buttons for the same evidence. Sort facts, assumptions and unknowns, choose a next step, then respond to fresh information. There is no countdown, combat, account or external runtime dependency. Decisions change bounded fictional service-health, crew-energy and pilot-trust meters. Each mission earns up to eight learning points, and classification retries are free. Field notes download locally; progress resets on reload.

Supports keyboard, touch, reduced motion, visible focus and pause. The bridge background is an original AI-generated asset created for this game; sprites and interaction overlays are drawn in code. `mission-control/art-prompt.txt` retains its generation prompt. The flight manual links to the supporting Air University explanation and distinguishes this simplified game from military training.

Run `node --test mission-control/tests.cjs` for all 216 full campaign decision paths, stage gates, score consistency and restart state. Full collection tests include these checks. Browser QA covers a complete 24/24 campaign, corrective feedback, field-note download, replay, WASD/E, pause, guide, catalogue filtering, and desktop/phone layouts. This is not an accessibility conformance audit.


### First Contact content connection

The alien story now follows Beacon, a fictional docking app. Its three missions map explicitly to Coded Female’s Coding & Development, Product Management, and Agile & Teamwork topics. Debugging teaches zero as a falsy value and boundary/regression tests; product analysis compares 80/100 with 100/200 and distinguishes activity from outcomes; delivery makes the shared goal, scope, testing and sustainable capacity visible. Each debrief includes a practical next step, a related arcade game and primary guidance. The coding worked example runs actual predefined JavaScript tests; the metrics example calculates its displayed percentages. OODA, the bridge, characters, movement, clues, branching actions, new evidence, scores and notes remain. All 216 decision paths still finish.


### First Contact journey improvements

A persistent next-step panel names the current mission and translates OODA into four plain actions. It suggests the next unvisited station without enforcing an order, reflects classification/plan readiness and provides a direct route to the next step. The bridge numbers all three stations and highlights the suggested stop. Each collected clue opens in a native dialog with its own progress count and a next-station or sort-evidence action; Escape or Back to the bridge closes it. During classification and planning, a local evidence disclosure keeps clues beside the task. The selected plan is named before confirmation, new evidence explains how to complete a mission, and the next-mission action precedes optional further learning. Mission rules, content, scoring and all decision paths are unchanged.
