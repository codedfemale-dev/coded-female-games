# Spot the Scam | Coded Female

An immersive, local practice inbox. Open mail, texts and app notifications, investigate the details and act through simulated tools.

[Play](https://codedfemale-dev.github.io/coded-female-games/spot-the-scam/) · [Original link](https://codedfemale-dev.github.io/spot-the-scam/)

## Experience

Three items arrive in a selectable inbox with All, Mail, Messages and Apps folders, sender names, previews and unread/read/filed states. Start the game opens the first or saved challenge directly, without rendering the inbox first. Each assessed action reveals a short feedback card showing what the player spotted or missed, using the scenario’s authored insight. Riskier actions include the safer move; changing course is acknowledged without erasing earlier decisions. Feedback opens in a compact native modal dialog with Next challenge or the branching follow-up action. The background is inert while it is open. Escape or Back to message dismisses it, and View feedback reopens it. Focus enters the dialog; longer explanation is optional. Next challenge records the completed case and opens the next, continuing across inboxes and all five levels without a batch recap. A completion screen appears after all 30 cases. The optional Inbox control still lets players browse messages in any order. Desktop keeps the list beside the reader; mobile opens each item with an Inbox back control.

Emails use a mail reader with From/To details. Texts and chats use a phone frame, status bar, contact header, incoming and outgoing bubbles, and a local message composer. Other channels use an app or account screen. The channel determines presentation; the scenario judgement never determines message colours.

Use Reply, Check elsewhere, Report and More inside the simulated app. Replies use prewritten practice drafts. Independent checks open a saved contact or account. Supplied links open an internal page preview; payment, permission, forwarding and app actions use local confirmation panels. No actual message, payment, sign-in, permission grant, phone call or suspicious navigation occurs. Source links and guidance links are ordinary external links outside these tools.

There are no answer letters or adjacent multiple-choice questions. Players can inspect records, act, switch to another item, return and investigate again before filing. Activity and outgoing replies remain in the conversation. Later cases add follow-up information and guided alternatives. Detailed learning notes are optional; the recap appears after all three items have been filed.

## Learning and records

Thirty original cases and 48 decision stages cover five levels. New rounds prefer unseen cases in the earliest unfinished level and mix message channels and supported situations where available. All cases remain reachable. The optional progress screen holds levels, targeted practice and notes.

The first action per stage is retained for the recap and targeted practice. Later actions are logged separately, and the latest action controls the next branch. A later check does not erase an earlier action from the notes. Replays replace a case’s previous record. Practice is not a security certification.

## Save and privacy

The existing `coded-female-scam-v2` storage key is preserved. Old completed records and active investigations migrate without losing choices or inspected evidence. `round` contains item IDs, filed IDs and opened IDs. `drafts` stores each unfinished conversation independently, including activity, first choices and latest actions. Reloading returns to the inbox; reopening an item restores its conversation. Corrupt data is validated; unavailable storage leaves an in-memory session with a visible note. No account, analytics or remote answer storage.

Field notes are generated locally. Progress can be cleared explicitly from About. No actual personal details are requested in the simulated tools.

## Brand and accessibility

Dark forest surrounds, ivory and white reading surfaces, subtle gold details. Open Sans throughout the game, including headings, the text brand header and simulated apps, keeps the experience seamless. The main Coded Female website uses Playfair Display headings and Open Sans body text; this single-family choice is specific to the game and does not replace original logo artwork.

The launch opens with “Spot the Scam.”, a short computer-style loading bar and the typed line “A message lands. What’s your next move?”. Start the game then opens the inbox or resumes saved work. Normal play bypasses inbox delivery and opens a challenge immediately. The optional inbox remains available for browsing. Read and filed messages remain in place; returning from an investigation never replays delivery. Gold badges, unread dots and selected tabs mark activity without encoding scenario judgements. Leaving the inbox cancels pending delivery animations. Skip intro is keyboard accessible; reduced-motion preferences reveal the complete line and controls immediately. Returning home does not replay the animation during the same visit.

Native buttons, disclosures and read-only draft textareas support keyboard and touch. Focus moves into opened readers and tool panels; text accompanies action states. Phone and desktop layouts are responsive. No timer, hint penalty, hover-only inspection or real malicious links. Keep `data-arcade-design="studio"` so the collection generator preserves this interface.

## Development and checks

Static HTML/CSS/JavaScript. Serve the collection root and open `/spot-the-scam/`; no build step.

Run `node --test spot-the-scam/tests.cjs migration-tests.mjs`. Checks cover every case and every action option through its actual tool, independent draft persistence, any-order completion, old saves, all advanced branches, folder filters, three-item rounds, malformed storage, double submission, multiple actions, downloads and reset. Native browser checks complement the controller tests.

Original lessons are informed by [NCSC spotting guidance](https://www.ncsc.gov.uk/collection/phishing-scams/spot-scams), [reporting and recovery guidance](https://www.ncsc.gov.uk/collection/phishing-scams) and [GOV.UK reporting guidance](https://www.gov.uk/report-suspicious-emails-websites-phishing). Follow organisational procedures for real work incidents. MIT licence retained.
