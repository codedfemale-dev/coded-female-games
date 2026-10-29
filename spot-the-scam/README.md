# Spot the Scam | Coded Female

A local practice inbox with 30 fictional cases across five levels and 48 decision stages. Read mail, texts and app notifications, inspect details, mark clues and act through simulated tools. The existing forest, ivory and gold design, Open Sans font, phone and mail surfaces remain in place.

## One decision, one committed action

Inspecting a message, marking a clue or opening a tool does not commit a decision. Confirming the chosen action records it once, adds one authored outcome and closes the action controls for that decision. Repeated taps cannot append another action. View feedback opens the existing native modal; it stays closed until requested.

**Compare another choice** rewinds to just before the current decision in a separately labelled alternative timeline. Choose one other action and inspect its outcome and feedback. The original choice is disabled in that comparison. Return to original timeline restores the committed outcome. Only the original timeline can continue or file the challenge. Each distinct comparison is saved once; repeating it does not duplicate an event.

Some advanced cases need an independent check before their authored follow-up. If the original risky route stops, the player explicitly opens a **guided follow-up timeline** from a hypothetical independent check. Its working thread contains that check and the follow-up. The original first action and outcome stay in a separate disclosure, rather than appearing to be undone. Comparisons within the follow-up remain separate too.

All 144 action options retain their specific reasons, scenario clues and authored consequences. Genuine messages remain among the scenarios. Checking a supported request can lead to a useful action; safe practice does not mean rejecting everything.

## Records and privacy

The original first-action record is retained. Notes distinguish original decisions, decisions in a guided follow-up and alternative timelines. Downloads contain their labelled actions and outcomes, reasoning, marked clues and takeaways. First-action history supports targeted practice; it is not a security certification or a score of professional ability.

The existing `coded-female-scam-v2` storage key and version are preserved. Timeline fields have their own marker. Older saves keep their first decisions; mixed later activity is preserved in a labelled archive and never treated as a single current world state. Later legacy choice IDs are retained even without an old transcript. Active comparisons, selected alternatives, clue marks and unfinished conversations survive reload and message switching. Changing levels retains unfinished drafts. Completed records are locked.

No real message, payment, sign-in, phone call, permission grant or suspicious navigation happens. Tool confirmations and outcomes are scripted simulations. No account, analytics or remote answer storage is used. Notes download locally. Clear saved progress affects this game only, after an explicit confirmation. If storage is unavailable, a visible note explains that the session stays in memory. Fonts use the existing Google Fonts request with system fallbacks.

## Play and preview

Serve the collection root over HTTP and open `/spot-the-scam/`. No package installation or build step is needed. The preview is reviewed locally before publication through the existing GitHub Pages collection. Changing this game does not require editing the catalogue, shared navigation, shared styles or any other game.

The launch animation can be skipped and respects reduced motion. Native buttons, disclosures, read-only drafts, modal focus and text labels support keyboard and touch. A prominent timeline banner names the current route. Responsive controls wrap at narrow widths. This has not been audited with every browser or assistive technology.

## Development

- `questions.js`: the existing 30 cases, clues, trusted-route context, tools and authored feedback.
- `timeline.js`: bounded comparison records, canonical route events, legacy-field migration and commit guards.
- `script.js`: inbox, tools, modal feedback, save validation, progress and notes.
- `style.css`: the existing appearance plus local timeline styles.
- `tests.cjs`: controller tests for all cases/actions, comparisons, repeats, saved-state recovery, legacy migration and records.

```sh
node --test spot-the-scam/tests.cjs
node --test *tests.mjs */*tests.cjs
```

Learning references retained: [NCSC spotting guidance](https://www.ncsc.gov.uk/collection/phishing-scams/spot-scams), [NCSC reporting and recovery](https://www.ncsc.gov.uk/collection/phishing-scams) and [GOV.UK reporting guidance](https://www.gov.uk/report-suspicious-emails-websites-phishing). Follow organisational procedures for real work incidents. MIT licence retained.
