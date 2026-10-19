# Release Manager: Ship Happens

A standalone Coded Female management arcade web app, styled as a companion to Product Quest. Hire a developer team, plan your backlog and survive six releases at fictional MEGACORP. The product changes; the stakeholder opinions do not run out.

**[Play the web app](https://codedfemale-dev.github.io/coded-female-games/release-manager/)**

## Play and install

Open the link in a browser. Choose an arcade campaign (12 seconds per workday) or untimed play. The clock starts paused, and stops for stakeholder decisions. Run/Pause controls the clock; Next day advances manually. A campaign takes about 15–25 minutes including planning and feedback.

The app can be added to a home screen or installed in supporting browsers. Use the in-game Install app button when offered; otherwise use the browser's install menu. On iPhone/iPad Safari, Share → Add to Home Screen. The manifest scopes the installed app to this game. Installation availability and wording vary by browser.

Wait for **OFFLINE PLAY READY** after a successful first visit. Then this game can reopen without a connection, including its artwork, fonts, rules and saved career. Links to other games and learning sources require a connection. A service worker caches a complete version of the game and affects only this game's directory, plus its explicit shared font request; it does not take over the collection. Updates activate after all old game windows close. The app tells you when an update is waiting. Increment the cache version in `sw.js` whenever releasing changed game files, and update versioned asset URLs and precache entries together when changing those URLs.

## The campaign

1. **Minimum Viable Panic** — checkout essentials versus CEO confetti.
2. **The Agent Has Entered the Chat** — a bounded AI pilot versus unreviewed autonomy.
3. **Vibe Now, Debug Later** — generated-code debt, tests and mentoring.
4. **The Retention Intervention** — real activation versus misleading metrics and cancellation friction.
5. **Cloudy With a Chance of Invoices** — operating cost, model quality and dependable fallbacks.
6. **The Board Wants a Demo** — reversible rollout and honest communication.

Each release has four authored tasks, an explicit outcome, and two stakeholder interruptions. Select three developers within 12 hiring credits. In MoSCoW, each developer works on one assigned card each day, ordered Must → Should → Could; ties follow card order. Won’t work is deferred. Specialists gain +1 work on matching tasks. Reassigning work retains progress. A finished card cannot be reassigned. Work does not spill into a second task on the same day.

MoSCoW labels organise the queue; choosing a label alone earns no points. In RICE mode, tickets show their score and estimates, use Include/Defer controls, and both the backlog and each developer’s work queue rank by reach × impact × confidence ÷ effort over the same release horizon. Equal scores preserve authored card order. The selected method persists across reloads; existing saves migrate to MoSCoW without losing progress. Switching methods preserves assignments, progress and deferred work. The player still needs to inspect requirements and evidence. Each release has one clearly marked requirement that the agreed outcome depends on.

At day six, ship completed work or negotiate exactly one extra day (−6 leadership support, −3 team energy). Review the consequences and individual card explanations in the retrospective. Meters and queued consequences persist across releases. Hiring credits reset to 12; the roster can change. No low score locks the player out of later lessons.

Customer trust, leadership support, energy and debt are bounded 0–100. Low energy (<35) and high debt (>55) each reduce daily work by one, with a minimum of one. Mentoring Sam adds one to Sam's future capacity. Some choices return later in the same release; the agent-purchase and blanket-model-switch shortcuts return in the next release. Promising confetti is checked against what actually ships. The activity log and downloadable field notes preserve these reveals.

**Scoring:** 10 × shipped value, minus 100 per missed release requirement and 20 per unfinished Must in MoSCoW mode, minimum zero per release. Missing a requirement costs 18 customer trust and 10 leadership support. Each unfinished Must in MoSCoW mode costs another 3 leadership support. Completed leadership work adds 6 leadership support per card; the release adds 3. Shipped value adds rounded(value/5) customer trust. Completed quality work reduces debt by 7; otherwise debt increases by 8. A working day costs 2 energy; releasing restores 10, and moving to the next release restores another 8. Stakeholder decisions have additional authored effects. The ending considers customer trust, energy and inverse debt as well as displaying the career score. These are teaching mechanics, not forecasts of real colleagues.

## Run and verify

No package installation, backend, API key, build or paid service is needed. Serve the collection root over HTTP and open `/release-manager/`. Localhost is a secure development context; published service workers require HTTPS.

```sh
node --test release-manager/tests.cjs
node --test tests.mjs learning-tests.mjs migration-tests.mjs */tests.cjs
node generate.mjs
```

- `content.js`: original scenarios, developer roster and source links.
- `engine.js`: state transitions, work queues, consequences, scoring and save validation.
- `app.js`: semantic controls, local save, audio, install controls and offline status.
- `art.js`: original low-resolution office and character sprites in Product Quest's palette/style.
- `sw.js` / `manifest.webmanifest`: versioned offline files and install metadata.
- `tests.cjs`: campaign, planning, consequences, scoring and offline-cache behaviour.

The existing GitHub Pages publication from `main` / repository root hosts this under `/coded-female-games/release-manager/`. Relative paths keep it compatible with project Pages. No separate hosting account or deployment workflow is introduced. Future hosting remains subject to GitHub Pages' free-tier availability and usage limits.

## Privacy, accessibility and sources

Career data lives only in local storage under `cf-release-manager-v1`. There is no sign-in, cross-device sync, analytics, real AI or network gameplay. Optional sound is generated locally and off by default. Field notes download on-device. Reset removes the saved career; clearing this site's browser data also removes offline files. Shared-origin browser storage may be cleared for other Coded Female games at the same time. GitHub handles ordinary hosting requests.

Native buttons, selects, visible focus, keyboard interaction, a pause control and an untimed mode support different ways of playing. The interface is responsive and respects reduced motion. This has not been audited with every browser or assistive technology. Saved careers are paused when resumed; time spent away does not advance the game.

Learning references, reviewed 18 October 2026:

- [MoSCoW — Agile Business Consortium](https://www.agilebusiness.org/resource/what-is-moscow-prioritization/)
- [RICE — Intercom](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers)
- [AI complexity and engineering fundamentals — Thoughtworks, 2026](https://www.thoughtworks.com/about-us/news/2026/combat-ai-cognitive-debt-radar-v34)
- [Installable web apps — MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)
- [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)

All characters, scenarios and numerical effects are fictional. The game draws on the management genre; no Rock Manager assets, scenarios, music or interface were copied. Pixel characters follow the collection's existing original Product Quest art system. Existing repository content and brand permissions apply; no new licence is granted.

## The room edition · 18 October 2026

The campaign now opens as a standalone workplace adventure: choose Rae, Jules, Imani or Alex, walk through the door and assemble your party. Character choice is cosmetic. At-your-pace play is the default; the optional arcade clock starts paused. The room is the main screen, with clickable colleagues and a project board. On small screens, named conversation buttons sit below the scene so targets remain readable and easy to press. Full screen is optional.

The project board uses task tabs, priority/scope buttons and developer portraits instead of form selects. Read the evidence on every task. MoSCoW and RICE retain the same queue and scoring rules; the pocket field guide explains both during play. Stakeholder choices pause time, and the player can inspect the board before returning to a pending decision. Keys 1–3 answer stakeholder choices; Escape returns to the room. Left/right arrows move through character selection. Sound stays off until selected. Reduced-motion settings skip the entrance movement and confetti animation.

Every new release report explains the actual result with specific feedback: required delivery, specialist matches, missing skills, final unassigned/overloaded queues, recorded stakeholder choices, confetti commitments, delays, energy and debt. It distinguishes final allocations from a complete assignment history, so it does not claim that a developer was idle all week merely because their final board is empty. Feedback suggests concrete changes for the next release. Existing saved careers remain compatible; reports created before this update keep their original card feedback. New strategy feedback is included in downloaded field notes. `scene.js` contains original room and player artwork.

When an older offline version is open, close all Release Manager tabs and installed windows, then reopen after the update is ready. The versioned offline shell preserves the same game scope and storage key.

## Walk and talk, and developer character files

Click a colleague to walk over before their conversation opens. The route follows the aisle in front of the table and the corridor on its right. Another click changes destination from the current position. Moving pauses the workday clock; opening a panel, pressing Escape, opening help or hiding the tab cancels the walk so an old arrival cannot reopen a conversation. Reduced-motion settings move directly to the destination. Stakeholder interruptions can bring the player over to the waiting speaker; other conversations retain a button to return to that pending request.

Meet the developers is available during hiring and from the Developers tab during a release. Profiles explain all six people, their specialisms, costs, pace and trade-offs. Green labels indicate matching specialist work. Amber warns when a matching specialist cannot finish required work within the days left at the current capacity. Explanations include per-task rates and estimated working days, with current energy, debt and mentoring applied. These estimates assume that person works on that task each day; other queued work still competes for their time. A green specialist is not a guarantee or the only useful hire: Lex can match some specialists through a faster base pace. Hiring and assignment explanations use expandable bubbles that work with mouse, touch and keyboard. `people.js` derives the recommendations from actual release tasks and capacity; `movement.js` supplies the route calculations.

## Your actual team at the table · 19 October 2026

The room seats the three developers hired for the current release, in hiring order and with their roster colours. Each has a named, keyboard-accessible talk target on desktop and mobile. Walk over to a person to ask about their work, their queue or what is slowing delivery. The check-in is derived from real assignments and progress: it follows MoSCoW or RICE ordering, excludes deferred and completed cards from the active queue, shows ready work and flags unassigned work, low energy, debt and time pressure. A direct board link opens their current task. Conversations do not change assignments or advance time.

Named requests from a hired developer route to that developer’s seat. Requests from an absent engineering stakeholder use a visiting character, keeping decisions reachable without pretending the guest was hired. A team request routes to a hired representative. A pending request remains accessible while checking in with other people; a developer with a pending request can also be asked about their assigned work. Existing saves use their saved roster without a reset. The roster and work-state helpers live in `team-room.js` and are included in the complete offline shell.
