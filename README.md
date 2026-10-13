# Coded Female learning games

Six original, untimed browser games by Coded Female. All content uses fictional organisations and curated feedback. No live AI service or accounts are needed.

Play the collection: https://codedfemale-dev.github.io/coded-female-games/

| Game | What you practise | Play |
| --- | --- | --- |
| Open for Everyone | Labels, contrast, button names, focus order and error recovery | [Play](https://codedfemale-dev.github.io/coded-female-games/open-for-everyone/) |
| Ship It or Fix It | Read requirements, predict actual tests, select code repairs and keep working code | [Play](https://codedfemale-dev.github.io/coded-female-games/ship-it-or-fix-it/) |
| Agent Mission Control | Tool boundaries, human approval, budget limits, external instructions and handovers | [Play](https://codedfemale-dev.github.io/coded-female-games/agent-mission-control/) |
| Undo the Nudge | Clear pricing, voluntary extras, neutral choices, honest urgency and cancellation | [Play](https://codedfemale-dev.github.io/coded-female-games/undo-the-nudge/) |
| Metric Makeover | Outcome measures, denominators, tail performance, funnels, guardrails and causation | [Play](https://codedfemale-dev.github.io/coded-female-games/metric-makeover/) |
| The Stakeholder Room | Questions, trade-offs, scope, risk, promises and shared agreements | [Play](https://codedfemale-dev.github.io/coded-female-games/the-stakeholder-room/) |

There are 32 challenges. Repair and redesign games allow retries. Code choices run real predefined JavaScript functions against the displayed test cases, without evaluating player-supplied code. Conversation and agent meters are simplified learning models; they are not measures of real people or operational readiness. Downloads include the decisions, reasoning and further reading.

## Run locally

Serve this folder with a static web server, then open `index.html` through that server. JavaScript modules require HTTP rather than opening files directly. There are no package dependencies or build requirements.

With a current Node.js runtime:

```
node generate.mjs
node --test tests.mjs
```

`generate.mjs` updates the static introduction pages after metadata changes. The game content lives in `data.js`, the rules in `models.js`, and the interface in `game.js`. Keep the generated HTML tracked. Update asset version strings when publishing later changes to avoid mixing browser-cached versions.

## Publication

GitHub Pages can deploy the root of the `main` branch. `.nojekyll` keeps it a plain static site. Each game is a separate directory with a direct play URL. The landing page also links to the existing Coded Female games.

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

The controls use native buttons, selects and checkboxes, visible labels, focus indicators, keyboard interaction and feedback focus. Motion respects device reduced-motion preferences. Important information is provided as text, including the deliberately problematic visual examples. No timer or drag-only interaction is required. This is not a full accessibility compliance claim; testing with assistive technology and people is still valuable.

No analytics, tracking code, cookies, local storage or saved answers. Progress resets on reload. All processing and downloads are local to the page. Fonts are served locally. GitHub Pages handles ordinary hosting requests.

The existing Coded Female Open Sans and Playfair Display font families are retained. Their supplied OFL licences are in `assets/`. No new licence is granted for the game content or brand assets by this repository.
