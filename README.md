# Coded Female learning games

Thirteen browser games together in one repository, including six new learning games and seven earlier Coded Female games. All content uses fictional organisations and curated feedback. No live AI service or accounts are needed.

Play the collection: https://codedfemale-dev.github.io/coded-female-games/

| Game | What you practise | Play |
| --- | --- | --- |
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

GitHub Pages can deploy the root of the `main` branch. `.nojekyll` keeps it a plain static site. Each game is a separate directory with a direct play URL. All 13 games are stored in this repository and linked from the landing page. The seven earlier standalone repositories remain available so existing links keep working. Future collection updates should be made here. `MIGRATION.json` records the source commits used during consolidation.

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

The controls use native buttons, selects and checkboxes, visible labels, focus indicators, keyboard interaction and feedback focus. Motion respects device reduced-motion preferences. Important information is provided as text, including the deliberately problematic visual examples. The six newest games are untimed. Bug Bash offers timed arcade play and an untimed practice mode. This is not a full accessibility compliance claim; testing with assistive technology and people is still valuable.

No sign-up or live AI service is needed. Bug Bash saves its best score in local storage; other progress resets on reload. Game processing happens in your browser. Some earlier games request Google Fonts, while the six newest games serve fonts locally. GitHub Pages handles ordinary hosting requests.

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
