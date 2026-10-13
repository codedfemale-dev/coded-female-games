# Verification

Checked locally and published on GitHub Pages on 10 October 2026. Repository: https://github.com/codedfemale-dev/coded-female-games/tree/main/ai-escape-room. Play: https://codedfemale-dev.github.io/coded-female-games/ai-escape-room/. GitHub Pages deployment completed successfully.

## Passed

- JavaScript syntax check and five automated checks for lock logic, clues, hint content, page wiring and local assets.
- Exhaustive answer-combination checks: each room has exactly one intended passing solution. The control lock requires both relevant lines and draft-only permission.
- Full browser playthrough across all three rooms and the final exit.
- Incorrect answers left rooms locked and identified the part needing revision. Correct answers revealed the corresponding code fragment and disabled further submissions.
- Clue switching and both hint levels worked. The final screen acknowledged the room where hints were used.
- The evidence room rejected “contradicted” for a claim absent from the record, then accepted “not stated” and displayed all four explanations.
- The control room rejected sending and accepted drafting with the two relevant facts.
- The final door rejected an incorrect code and accepted the collected fragments in order.
- Escape notes downloaded as `coded-female-ai-escape-notes.txt`.
- Replay returned to the first room and hid all previously collected fragments.
- Phone layout at 390 pixels wide and desktop layout at 1280 pixels wide showed no horizontal overflow in the checked states.
- After final readability changes, the five automated checks passed again.
- A full live browser playthrough passed all three rooms and the final exit without hints, verifying the other final-screen branch. No browser errors or warnings were reported.

## Limits

These checks are not a complete screen-reader or cross-browser audit. All AI outputs and source documents are scripted, fictional examples.
