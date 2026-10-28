# Product Quest

An original retro pixel-art browser game for Coded Female. You are a Product Manager at MEGACORP, working with seven stakeholders on a bounded spoon pilot. The office is retro; the product decisions are present-day.

## Play

Choose with the mouse, touch or keys **1–3**. **C** takes an optional breather. **Enter** starts or continues; native buttons support Tab and Enter. Sound is off by default. There is no timer.

Each meeting covers three evidence-based situations. Each situation offers two defensible approaches, both worth 30 alignment, and one approach that leaves a material gap, worth 10. Three sound decisions earn 90 against a target of 80. You must cover all three decisions and resolve every gap before moving on. A focused review replaces the earlier 10 with 30, adding 20 without restarting the run. Feedback explains the consequence, trade-off and next check.

Energy is a pacing cue only. It never blocks choices or affects XP. A decision uses 6 energy; an optional once-per-meeting breather restores 24. Moving to the next meeting restores 18. Energy stays between 0 and 100. There is no confidence penalty, required coffee or game over.

Completion XP is 100 per grounded decision plus 150 per stakeholder agreement, totalling 3,150 for all 21 decisions and seven agreements. Both sound approaches and successful reviews earn equal credit. Speed, breaks and first attempts do not change the score. The final screen records the conditions agreed before the pilot; it does not imply a real product is ready to release. Players can save or copy their decision record, including revised choices and trade-offs.

## Run and test

No installation or build step is required. Serve the repository with a static HTTP server, for example `python3 -m http.server 8080`, then open `http://localhost:8080/product-quest/`. JavaScript modules require HTTP.

```sh
node --test product-quest/tests.cjs
node --test tests.mjs learning-tests.mjs migration-tests.mjs */tests.cjs
```

`content.js` holds the 21 situations and feedback. `engine.js` contains pure state transitions and scoring. `app.js` renders semantic HTML controls, `art.js` draws the existing original pixel artwork, and `style.css` provides the responsive interface. No runtime packages or external services are needed. Progress is held in memory and resets on reload. This is a fictional learning exercise: no payments, orders or messages are sent.

## Publishing and scope

This static directory runs within the existing GitHub Pages arcade. Review locally before merging into the publishing branch. Product Quest changes do not require regenerating or replacing the arcade catalogue or changing another game.

The seven meetings cover discovery, costs, engineering, marketing, legal, sales and a final board review. Simplified fictional situations support practice, rather than measuring professional ability. Existing repository content and brand permissions apply; no new licence is granted.
