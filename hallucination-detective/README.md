> This game is now maintained in the [Coded Female games collection](https://github.com/codedfemale-dev/coded-female-games). Publish the collection root, rather than this folder separately. [Play this version](https://codedfemale-dev.github.io/coded-female-games/hallucination-detective/) · [All games](../README.md). Earlier standalone setup notes below are retained for reference.

# Hallucination Detective

**[Play the game](https://codedfemale-dev.github.io/coded-female-games/hallucination-detective/)**

A free browser game by [Coded Female](https://codedfemale.com). Follow a fictional Agile team after releasing Relay, a product for clearer project handovers. Audit the AI assistant’s answers against source records and distinguish supported claims, contradictions and claims the evidence does not establish.

Maya (Product Owner), Noor (analyst) and Sam (delivery lead) ask B.I.T. (Brilliant In Theory) five questions about release feedback, onboarding, user interviews, a follow-up release and retrospective learning. The cases cover survey denominators, percentages versus percentage points, invented quotations, outdated approvals and correlation versus causation. The last answer contains no flawed claims.

Classify three claims and select a careful summary in each case. First answers count towards 20 judgements, with optional clues, detailed explanations, playful team-log reactions, score titles, replay and downloadable notes.

The interface preserves Coded Female’s fonts and gold accents, with a charcoal inspection console and labelled source records. B.I.T. gently bobs and blinks; evidence cards enter as each case opens; verdict stamps animate briefly after submission. Reduced-motion settings disable these animations and smooth feedback scrolling. A Pause animations control also lets players stop movement for the current page session.

## Run locally

Serve this folder with any static web server, for example `python3 -m http.server 8767`, and open `http://localhost:8767/`.

## Checks

Run `node tests.cjs`. It checks all 405 verdict and summary combinations, source references and the clean case. There is no build step.

## Privacy and learning limits

Relay, its team, users and evidence records are fictional. This game uses scripted examples, not a live AI model or a fact-checking service. Answers are held in memory for the current page only. No analytics, external fonts, API keys or account is required. GitHub Pages hosting has its own platform policies.

Open Sans and Playfair Display are bundled with their font licence files in `assets/`.
