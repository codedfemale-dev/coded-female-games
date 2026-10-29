# AI Escape Room: Exit the Loop

A fictional Coded Female browser lab about clear briefs, source evidence and keeping actions within the user’s request. It runs inside the existing learning arcade, with its cyan grid, pixel artwork, navigation and local fonts.

## The journey

1. **The Briefing Bay:** inspect numbered clues and repair the task, audience and boundaries. Inspect an authored welcome email with its word count and factual checks.
2. **The Evidence Vault:** classify four claims as supported, contradicted or not stated. Review a corrected report, claim-by-claim reasons and source references. Attendance is 9/12; the confidence result represents 4/5 respondents.
3. **The Control Room:** retain relevant facts and choose a draft-only action. Inspect the resulting two-sentence summary and the actions that remain unperformed.
4. **The final door:** apply the same skills to a new session record. Two bounded summaries are accepted equally. Keep respondents distinct from attendees and reject a routine-sounding request for actions that the user did not authorise. A checked draft unlocks the three-fragment exit control.

All outputs are labelled authored examples, rather than live AI responses. The end screen keeps all four outputs available to review. The downloaded text record contains those outputs, evidence notes, the learner’s selected final summary and practice history. Retries and hints do not reduce completion credit.

There is no timer, live AI, real sending, directory access or register update. No sign-in, payment, cookies, analytics or browser storage is used. Reloading clears progress; Start again and Return to the lab reset all rooms and the final challenge.

## Run and test

Serve the collection root with a static HTTP server, then open `/ai-escape-room/`. No installation, build step, AI account or API key is needed.

```sh
node --test ai-escape-room/tests.cjs
node --test *tests.mjs */*tests.cjs
```

- `puzzles.js`: clues, evaluation, authored outputs and the final challenge.
- `script.js`: semantic controls, recoverable feedback, room progress and notes download.
- `style.css`: original layout and illustrations.
- `journey.css`: game-local overrides loaded after the shared arcade skin, including readable normal, hover, selected and focus states.
- `tests.cjs`: lock combinations, transfer alternatives, output constraints and asset wiring.

Publish only through the existing collection workflow after review. No shared styles, catalogue, generator or other game needs changing. Local preview work does not establish publication.

## Access and limitations

Native controls, visible keyboard focus, a skip link, text progress, focusable error feedback, responsive layouts and reduced-motion styles support different ways of playing. Narrow layouts omit the decorative room scene and retain all clues and controls. Source labels have explicit foreground and background pairs. This is not a complete assistive-technology audit.

All people, events, records and responses are fictional. These scripted examples practise judgement; they do not certify security skills or guarantee real AI behaviour. Technical safeguards and human review remain necessary.

Font files retain their supplied SIL Open Font Licences in `assets/`. Existing repository content and brand permissions apply; no new licence is granted.
