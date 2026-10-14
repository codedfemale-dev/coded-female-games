> This game is now maintained in the [Coded Female games collection](https://github.com/codedfemale-dev/coded-female-games). Publish the collection root, rather than this folder separately. [Play this version](https://codedfemale-dev.github.io/coded-female-games/sprint-survival/) · [All games](../README.md). Earlier standalone setup notes below are retained for reference.

# Sprint Survival

A small browser simulator by [Coded Female](https://codedfemale.com). Guide a fictional mentoring app through three sprints: choose useful work, handle surprises and protect team wellbeing.

Plain HTML, CSS and JavaScript. No installation, dependencies or build step. No sign-up, analytics or remote data storage. There is no timer. Progress is held in memory and resets on reload.

## Play online

[Play Sprint Survival](https://codedfemale-dev.github.io/coded-female-games/sprint-survival/)

## Play locally

Keep `index.html`, `style.css`, `engine.js` and `script.js` together. Open `index.html` in your browser.

1. Choose a scenario pack before adding tasks, then choose a team approach and add tasks in delivery order.
2. Lock the plan to reveal a surprise.
3. Choose a response, then adjust the plan.
4. Deliver, review and continue through all three sprints.
5. Read your final reflection, download it as a text file or replay with different decisions.

## How the model works

- A sprint starts with 12 effort units. These represent working time, not story points.
- Support reserves 2 capacity units and adds 8 wellbeing points. Steady adds 2 wellbeing points. Stretch adds 2 capacity units and costs 10 wellbeing points.
- Events change capacity and wellbeing. All wellbeing changes apply after delivery.
- Wellbeing begins at 80/100. Starting a sprint below 65 reduces capacity by 1; below 45 reduces it by 3. Wellbeing stays within 0 to 100.
- Tasks are attempted in selection order. Delivery stops at the first task that does not fit. Dependencies must be selected earlier or already complete.
- Removing a prerequisite also removes its dependants from the plan.
- Unfinished planned work returns to the backlog without partial progress and costs 4 wellbeing points per sprint. Work that was never selected has no penalty.
- Completed tasks remain complete. Sprint goals include work completed in earlier sprints.
- Value is a fictional estimate. There is no combined score or leaderboard. Accessibility, trust, learning and wellbeing belong in delivery conversations.
- Each of five packs has three fixed events so replaying the same pack makes comparisons easier. The partner banner becomes available after the first event, even if you defer it.

This is a deliberately simplified learning model. It does not prescribe Scrum rules or measure real people’s wellbeing or productivity.

## Add to GitHub

Upload the contents of this folder into a repository called `sprint-survival`. Keep the four application files together at the repository root. Include this README and the licence.

To publish with GitHub Pages, choose **Settings → Pages → Deploy from a branch**, then select your default branch and **/(root)**. GitHub’s [official publishing guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) explains the options. The project works as a static site and requires no server features.

Suggested repository description: “A playful delivery simulator about priorities, surprises and team wellbeing. Built with vanilla JavaScript for Coded Female.”

## Remix challenges

1. **First change:** edit a task title and description in `engine.js`. Keep its `id` unchanged.
2. **Try a trade-off:** adjust a task’s `effort` or `value`, then compare the results.
3. **Write a surprise:** rewrite an event’s choices and learning notes. Keep three options and check the stated effects match `capacity` and `wellbeing`.
4. **Go further:** add a task, give it a unique ID, then use that ID in another task’s `deps` to introduce a dependency.

| File | Purpose |
| --- | --- |
| `index.html` | Introduction, instructions and page structure |
| `style.css` | Coded Female colours, layout and responsive styles |
| `engine.js` | Task data, events and simulation rules |
| `script.js` | Interface, controls and reflection download |
| `tests.cjs` | Rule checks with Node’s built-in test runner |

Run optional rule checks with `node --test tests.cjs`. The checks are development tools; players do not need Node.

## Accessibility

Native buttons support keyboard use. Selection states use `aria-pressed`; phase changes focus the new heading; plan changes are announced through a live region. The layout adapts to narrow screens, honours reduced motion and does not rely on colour alone. No external fonts are loaded; it uses the system font stack used in the existing First Code Playground project.

## Licence

MIT. Contributions and remixes welcome. See `LICENSE`.

## Expanded scenarios, October 2026

Five selectable packs provide 15 original situations, including 12 new examples:

- **Start with the basics:** a new request, a teammate’s blocker and an earlier demo.
- **AI meets delivery:** review overload, an invented meeting agreement and a prototype mistaken for a release.
- **Keep work moving:** cross-team dependencies, conflicting documents and repeated support interruptions.
- **Protect the people:** reduced capacity, misleading ticket targets and competing sponsors.
- **Release with care:** unreliable tests, keyboard accessibility and bookings that do not lead to attended sessions.

Every event includes suggested words for a team conversation and a reflection question. These are shown after the response and included in the downloadable reflection. Replay retains the pack; choose another before selecting tasks. Original task IDs, dependencies and numerical rules are retained.

### Research and originality

Themes were informed by [DORA’s March 2026 analysis of AI delivery trade-offs](https://dora.dev/insights/balancing-ai-tensions/) and [Atlassian’s 2025 developer experience research](https://www.atlassian.com/blog/developer/developer-experience-report-2025), reviewed on 14 October 2026. DORA discusses verification work and the gap between prototypes and production. Atlassian discusses friction in collaboration and finding information. The people and release packs also extend longstanding delivery issues; they are not presented as a ranked list of 2026 trends.

All situations, choices, dialogue and questions were newly written for the fictional Mentor Match product. They do not reproduce reported incidents or survey respondents’ stories. Research does not support the invented capacity, value or wellbeing numbers. No claim is made that every similar idea is unique across the internet. Privacy, accessibility and quality risks have consequences beyond this simplified model.
