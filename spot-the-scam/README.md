# Spot the Scam | Coded Female

A message lands. What’s your next move? Play a three-case inbox, tap message details, choose a short action and see what happens.

[Play](https://codedfemale-dev.github.io/coded-female-games/spot-the-scam/) · [Original link, which redirects here](https://codedfemale-dev.github.io/spot-the-scam/)

## Play-first design

The opening screen has one sentence and an **Open your inbox** action. The level map lives in the optional **Your progress** screen. Each case has one short setup, one message and three short actions. Tap a sender, destination, attachment label or earlier record to inspect it. All inspections remain inside the game.

After a choice, the other options disappear. The player sees one takeaway and can open **Why?** for the full explanation. Later cases reveal new information or offer a brief guided alternative after a risky choice. Rounds end after three cases, with three pocket notes and an **Another inbox** action. Full decision notes and downloads remain available separately.

Thirty original cases and 48 decisions cover five levels of increasing complexity. Each level has six cases; new inboxes prefer unseen cases in the earliest unfinished level. When possible, a round includes a supported message as well as requests needing checks. Genuine messages have the same presentation as suspicious ones. Replays can fill a round when only one or two unseen cases remain in a level. Targeted practice can contain fewer than three cases if only one or two need revisiting.

## Progress and privacy

The existing `coded-female-scam-v2` browser-storage key is retained. Completed case records and active investigations from the previous version are preserved. The added `round` object records up to three case IDs and the cases finished in that inbox. Pausing or reloading restores the current decision, guided branch and round position. Replays replace that case’s latest choices. Malformed saves are ignored; unavailable storage leaves a playable in-memory session with an explanation. No account, analytics or remote answer storage.

Field notes are generated locally. Players can clear progress through the About disclosure. Google Fonts provides the established Open Sans, Playfair Display and Rokkitt families, with system fallbacks.

## Presentation and accessibility

Dark forest surrounds, ivory actions on dark surfaces, neutral light message cards and small gold accents. Sender details and unopened evidence never encode whether a message is genuine. Keyboard-accessible native disclosures and buttons, visible focus, focus on new views and feedback, and live announcements. No hover-only interactions, timer or hint penalty. Phone layouts stack the message and actions. Reduced-motion preferences are respected.

Preserve `data-arcade-design="studio"`: the collection generator uses it to retain this game’s own interface.

## Development

Static HTML, CSS and JavaScript. No build step. Serve the collection root and open `/spot-the-scam/`.

- `questions.js`: original cases, short setups, short action labels, full explanations and stable answer IDs.
- `script.js`: inbox rounds, inspection, branches, progress, resume and downloads.
- `style.css`: responsive dark-forest interface.
- `tests.cjs`: all case routes and recovery branches, old-save compatibility, three-case boundaries, progression, malformed saves, storage failures, duplicate-answer guards and notes.

Run `node --test spot-the-scam/tests.cjs migration-tests.mjs` from the collection root. Browser checks complement the controller tests.

## Guidance

Introductory practice, not a security certification or incident-response service. Follow organisational procedures for work accounts. Lessons are informed by [NCSC spotting guidance](https://www.ncsc.gov.uk/collection/phishing-scams/spot-scams), [NCSC reporting and recovery guidance](https://www.ncsc.gov.uk/collection/phishing-scams) and [GOV.UK reporting guidance](https://www.gov.uk/report-suspicious-emails-websites-phishing). Original cases; MIT licence retained.
