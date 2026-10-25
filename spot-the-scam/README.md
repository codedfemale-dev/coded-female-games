# Spot the Scam | Coded Female

Thirty original investigations across five levels, with 48 decisions, 90 inspectable details and guided recovery branches in all 18 advanced cases. Built with static HTML, CSS and JavaScript. No installation or build step.

[Collection game](https://codedfemale-dev.github.io/coded-female-games/spot-the-scam/) · [All games](../README.md)

## Learning journey

1. **Notice the clues:** six introductory investigations about pressure, requests and independently supported messages.
2. **Check before acting:** six investigations about trusted verification routes, recruitment, QR codes and account notices.
3. **Put the pieces together:** six two-decision cases comparing messages, contacts and payment instructions.
4. **Handle the convincing:** six two-decision cases about familiar conversations, voices, app permissions and account access.
5. **Respond and recover:** six two-decision cases about sharing a password, clicking a link, payments, app access, supporting a colleague and opened attachments.

All levels are available. Later investigations offer a follow-up after the first decision. A safer choice proceeds directly to new evidence. A risky choice branches to an explicit guided check before rejoining the investigation; the game never pretends the risky action produced a successful check. Original choices remain in the notes. Hints have no penalty. Scores describe practice decisions, not security certification.

## Design and accessibility

Coded Female's existing Open Sans, Playfair Display and Rokkitt families remain. The revised palette uses warm ivory `#F7F5F0`, deep forest `#253B35`, charcoal `#232B28`, antique gold `#806139` and pale sage `#E9EEE7`. White message cards, restrained borders and generous spacing keep the interface readable. No replacement logo.

Responsive layouts use five, three or two level columns, then a single-column investigation on phones. Native buttons and disclosures support touch and keyboard. Focus moves to each new view or feedback, and text accompanies feedback colours. No hover-only inspection, drag interaction, timer or live suspicious links. Reduced-motion preferences are respected.

`data-arcade-design="studio"` is the collection generator's existing opt-out for games with their own presentation. Preserve it so regeneration does not overwrite this redesign.

## Progress and privacy

The browser stores versioned progress under `coded-female-scam-v2`: completed scenarios, choice IDs, inspected detail IDs and the current investigation. Resume restores the decision or guided check. Replaying replaces that scenario's previous choices; targeted practice uses the latest completed attempt. There is no account, analytics or remote answer storage. A storage failure leaves an in-memory playable session with a visible explanation. Malformed or obsolete data is ignored. Players can explicitly clear progress in the About disclosure. Clearing browser data also removes it.

Downloads are generated locally as plain-text field notes. Google Fonts loads the established font families; fallback fonts work without it. Hosting serves ordinary page requests. Example addresses use reserved `.example` destinations or descriptive text and are never linked.

## Development

Serve the collection root with a static HTTP server, then open `/spot-the-scam/`. Direct `index.html` use also works, subject to the browser's local-storage policy. No build is needed for GitHub Pages.

Run `node --test spot-the-scam/tests.cjs migration-tests.mjs` from the collection root. Controller checks cover all 30 successful routes, all 18 guided branches, resume, malformed saves, unavailable storage, double-answer guards, downloads, explicit reset and option shuffling. Native browser QA complements these checks.

Each question in `questions.js` has a stable ID, level, three inspections and one or two decision stages. Keep options uniquely identified and retain the `correct` ID after shuffling. Advanced stages include new evidence under `reveal`. Keep context, follow-up and inspection facts consistent. Supported situations should remain in the bank so learners can practise proceeding when there is sufficient evidence.

## Guidance

An introductory practice game, not a certification or incident-response service. Follow organisational procedures for work accounts. Original scenarios are informed by [NCSC spotting guidance](https://www.ncsc.gov.uk/collection/phishing-scams/spot-scams), [NCSC reporting and recovery guidance](https://www.ncsc.gov.uk/collection/phishing-scams) and [GOV.UK reporting guidance](https://www.gov.uk/report-suspicious-emails-websites-phishing). Reviewed 25 October 2026. MIT licence retained.
