/* The rules live here so you can remix the game without changing the interface. */
(function (root) {
  'use strict';
  const TASKS = [
    {id:'profile', title:'Mentor profiles', effort:3, value:5, type:'Foundation', description:'Help learners find someone with relevant experience.', deps:[]},
    {id:'slots', title:'Available time slots', effort:3, value:4, type:'Foundation', description:'Show when mentors can meet.', deps:['profile']},
    {id:'booking', title:'Book a session', effort:4, value:8, type:'Core journey', description:'Turn a good match into a confirmed conversation.', deps:['slots']},
    {id:'privacy', title:'Private contact details', effort:2, value:5, type:'Trust', description:'Keep personal contact details out of public profiles.', deps:['profile']},
    {id:'access', title:'Keyboard-friendly booking', effort:3, value:6, type:'Accessibility', description:'Make the booking journey usable without a mouse.', deps:['booking']},
    {id:'reminder', title:'Session reminders', effort:3, value:5, type:'Core journey', description:'Help learners and mentors remember their session.', deps:['booking']},
    {id:'cancel', title:'Cancel or rearrange', effort:3, value:5, type:'Core journey', description:'Give people a way to change plans.', deps:['booking']},
    {id:'feedback', title:'Useful session feedback', effort:3, value:6, type:'Learning', description:'Find out whether a session helped the learner.', deps:['booking']},
    {id:'measure', title:'Measure booking completion', effort:2, value:4, type:'Learning', description:'Count completed bookings, not just page visits.', deps:['booking']},
    {id:'improve', title:'Improve the matching questions', effort:4, value:8, type:'Learning', description:'Use feedback to help learners choose a mentor.', deps:['feedback']},
    {id:'confetti', title:'Celebration confetti', effort:2, value:1, type:'Nice to have', description:'A tiny party for every booking. The duck approves.', deps:['booking']},
    {id:'banner', title:'Partner logo banner', effort:3, value:2, type:'New request', description:'An eye-catching request from a stakeholder.', deps:[], hidden:true}
  ];
  const SPRINTS = [
    {goal:'Make a first session bookable', goals:['profile','slots','booking'], event:{title:'“Could you squeeze in one tiny thing?”', text:'A stakeholder wants a partner logo banner before the first demo. It takes 3 effort units and does not help anyone book a session.', options:[
      {title:'Defer it and explain why', text:'Keep the booking goal. Add the request to the backlog for later.', capacity:0, wellbeing:2, lesson:'A clear explanation can protect focus while acknowledging a request.'},
      {title:'Bring it into this sprint', text:'Add the banner to the end of your plan, then decide what fits.', capacity:0, wellbeing:-2, add:'banner', lesson:'Accepting a request means reconsidering scope. Move something out if the plan is too full.'},
      {title:'Promise overtime', text:'Gain 3 effort units this sprint. Lose 14 wellbeing points.', capacity:3, wellbeing:-14, add:'banner', lesson:'Overtime creates short-term capacity, but its cost carries into the next sprint.'}
    ]}},
    {goal:'Make booking easier to trust and use', goals:['privacy','access','reminder'], event:{title:'A teammate is stuck', text:'A test environment problem is blocking a teammate. They have asked for help. How will you respond?', options:[
      {title:'Pair up and unblock them', text:'Use 1 effort unit to help. Gain 5 wellbeing points.', capacity:-1, wellbeing:5, lesson:'Helping early takes time, but can reduce isolation and get work moving.'},
      {title:'Let them work it out alone', text:'Lose 3 effort units while the blocker continues. Lose 6 wellbeing points.', capacity:-3, wellbeing:-6, lesson:'A blocker can affect the whole plan. Making space for support is delivery work.'},
      {title:'Help, then catch up after hours', text:'Keep capacity unchanged. Lose 10 wellbeing points.', capacity:0, wellbeing:-10, lesson:'Solving a blocker is useful. Making recovery depend on overtime adds another problem.'}
    ]}},
    {goal:'Learn what makes sessions useful', goals:['feedback','measure','improve'], event:{title:'The demo date moves forward', text:'A stakeholder wants to see progress sooner. The team still needs time to test the work and prepare a useful demo.', options:[
      {title:'Agree a smaller, tested demo', text:'Reserve 2 effort units for testing and preparation. Gain 3 wellbeing points.', capacity:-2, wellbeing:3, lesson:'A smaller, tested demonstration can create a better conversation than rushed promises.'},
      {title:'Keep every promise', text:'Reserve 2 effort units for preparation, then add 3 through overtime. Lose 14 wellbeing points.', capacity:1, wellbeing:-14, lesson:'Keeping scope unchanged transfers the pressure to people. A deadline does not remove the work.'},
      {title:'Keep the date, discuss expectations', text:'Reserve 1 effort unit for a progress review. Gain 1 wellbeing point.', capacity:-1, wellbeing:1, lesson:'A progress review can show learning and unfinished work honestly, if everyone agrees what to expect.'}
    ]}}
  ];
  const PACKS = [
  {
    "id": "classic",
    "title": "Start with the basics",
    "description": "New requests, a blocked teammate and an earlier demo.",
    "events": null
  },
  {
    "id": "ai",
    "title": "AI meets delivery",
    "description": "Review queues, confident summaries and a prototype mistaken for a release.",
    "events": [
      {
        "title": "The draft is fast. The review queue is not.",
        "text": "An AI assistant produces a 900-line booking change by lunchtime. The only reviewer also owns a release fix. The draft has not been checked against duplicate bookings.",
        "trySaying": "Could we split this into the smallest booking change and reserve review time before starting another one?",
        "question": "Where does work wait after someone calls it finished?",
        "options": [
          {
            "title": "Split the change and reserve review time",
            "text": "-2 capacity · +3 wellbeing after delivery.",
            "capacity": -2,
            "wellbeing": 3,
            "lesson": "A smaller change takes coordination time, but makes checking assumptions manageable. Ask for tests for duplicate bookings before accepting the work."
          },
          {
            "title": "Keep the draft in review; reduce other scope",
            "text": "-3 capacity · +1 wellbeing after delivery.",
            "capacity": -3,
            "wellbeing": 1,
            "lesson": "Keeping the larger draft means a longer review. Make the waiting work visible and agree what moves out instead of treating drafting speed as delivery speed."
          },
          {
            "title": "Ask the reviewer to clear it tonight",
            "text": "+1 capacity · -12 wellbeing after delivery.",
            "capacity": 1,
            "wellbeing": -12,
            "lesson": "The queue moves by spending the reviewer’s recovery time. Faster authorship has not removed the need for verification."
          }
        ]
      },
      {
        "title": "The summary invents an agreement",
        "text": "An AI-generated meeting summary says mentors agreed to receive learner phone numbers. The original notes record an unanswered question. A teammate has already written a ticket from the summary.",
        "trySaying": "The notes do not show agreement. Who can confirm the intended behaviour before this becomes an acceptance criterion?",
        "question": "What evidence makes a decision reliable enough to build?",
        "options": [
          {
            "title": "Check the notes and confirm with the owner",
            "text": "-1 capacity · +3 wellbeing after delivery.",
            "capacity": -1,
            "wellbeing": 3,
            "lesson": "Pause the assumption, correct the ticket and record who confirmed it. A plausible summary is a draft, not approval."
          },
          {
            "title": "Park the disputed ticket and continue other work",
            "text": "-2 capacity · +1 wellbeing after delivery.",
            "capacity": -2,
            "wellbeing": 1,
            "lesson": "This avoids building on uncertainty, but the unanswered decision still needs an owner and a follow-up date."
          },
          {
            "title": "Build from the summary to keep momentum",
            "text": "+0 capacity · -8 wellbeing after delivery.",
            "capacity": 0,
            "wellbeing": -8,
            "lesson": "The apparent time saving carries an unresolved trust risk. The simulator does not reproduce a real disclosure of personal information."
          }
        ]
      },
      {
        "title": "The prototype becomes a promise",
        "text": "A mentor-matching demo looks polished. A stakeholder announces a launch on Friday, but failure handling and consent checks are still missing.",
        "trySaying": "Which tested journey can we demonstrate on Friday, and which release checks still need to pass?",
        "question": "What separates a convincing demo from a service people can rely on?",
        "options": [
          {
            "title": "Agree a tested slice and a release checklist",
            "text": "-2 capacity · +3 wellbeing after delivery.",
            "capacity": -2,
            "wellbeing": 3,
            "lesson": "Use the prototype to learn. Agree a small demonstration and check failure handling before promising a release."
          },
          {
            "title": "Use Friday for a feedback session",
            "text": "-1 capacity · +2 wellbeing after delivery.",
            "capacity": -1,
            "wellbeing": 2,
            "lesson": "An explicitly labelled prototype can answer useful questions. Confirm that participants understand its limits and cannot mistake it for a launched service."
          },
          {
            "title": "Finish the missing checks after hours",
            "text": "+2 capacity · -14 wellbeing after delivery.",
            "capacity": 2,
            "wellbeing": -14,
            "lesson": "A polished interface can hide unfinished delivery work. Overtime adds capacity here, but does not prove that a release is safe."
          }
        ]
      }
    ]
  },
  {
    "id": "flow",
    "title": "Keep work moving",
    "description": "Cross-team dependencies, scattered decisions and recurring interruptions.",
    "events": [
      {
        "title": "The calendar team has no slot for you",
        "text": "Booking needs a calendar service owned by another team. Their contact is away and your ticket has no agreed delivery date.",
        "trySaying": "What is the smallest interface we can agree, who owns it, and when will we know whether it is available?",
        "question": "Which dependency needs an agreement rather than another status update?",
        "options": [
          {
            "title": "Agree an owner and test a small interface",
            "text": "-2 capacity · +3 wellbeing after delivery.",
            "capacity": -2,
            "wellbeing": 3,
            "lesson": "Use a short joint conversation to name the owner, confirm the interface and set a checkpoint. A test substitute can support learning, but is not proof that integration is complete."
          },
          {
            "title": "Move blocked scope out and deliver independent work",
            "text": "-1 capacity · +1 wellbeing after delivery.",
            "capacity": -1,
            "wellbeing": 1,
            "lesson": "Protect flow by removing the dependency from this plan. Explain the effect on the goal and keep a dated follow-up."
          },
          {
            "title": "Keep the promise and wait for a reply",
            "text": "-3 capacity · -6 wellbeing after delivery.",
            "capacity": -3,
            "wellbeing": -6,
            "lesson": "A ticket without an agreement is still uncertain. Waiting quietly makes the risk harder for others to respond to."
          }
        ]
      },
      {
        "title": "Three documents, three different decisions",
        "text": "The booking ticket says 30-minute sessions. The design file says 45. A chat thread suggests either. The newest teammate is expected to guess which one is current.",
        "trySaying": "Can the decision owner confirm the duration and link one dated decision from the ticket?",
        "question": "How would a new teammate find the current decision?",
        "options": [
          {
            "title": "Confirm the decision and update its source",
            "text": "-1 capacity · +4 wellbeing after delivery.",
            "capacity": -1,
            "wellbeing": 4,
            "lesson": "Ask the accountable person, record the decision and link it from the work. Explain what changed so people can find it again."
          },
          {
            "title": "Pause duration-dependent work",
            "text": "-2 capacity · +1 wellbeing after delivery.",
            "capacity": -2,
            "wellbeing": 1,
            "lesson": "Continue work that does not depend on session length. Assign someone to resolve the disagreement rather than letting the pause become permanent."
          },
          {
            "title": "Let each person use their latest document",
            "text": "-3 capacity · -5 wellbeing after delivery.",
            "capacity": -3,
            "wellbeing": -5,
            "lesson": "Parallel guesses create avoidable rework. The problem is conflicting context, not a teammate failing to read everything."
          }
        ]
      },
      {
        "title": "Every message is urgent",
        "text": "A developer is interrupted by six support messages about reminder emails. Each requester believes their issue is the priority.",
        "trySaying": "Can we triage these together, name one support contact and agree which issue genuinely needs an immediate response?",
        "question": "What interruption rule would protect users and focused work?",
        "options": [
          {
            "title": "Triage together and rotate a support contact",
            "text": "-2 capacity · +4 wellbeing after delivery.",
            "capacity": -2,
            "wellbeing": 4,
            "lesson": "Reserve support time and make urgent criteria explicit. Rotate the role so one person does not permanently absorb every interruption."
          },
          {
            "title": "Pause feature work for a support window",
            "text": "-3 capacity · +2 wellbeing after delivery.",
            "capacity": -3,
            "wellbeing": 2,
            "lesson": "A bounded support window makes the capacity cost visible. Tell stakeholders which feature work moves out and review the unresolved requests."
          },
          {
            "title": "Ask everyone to answer messages between tasks",
            "text": "-4 capacity · -7 wellbeing after delivery.",
            "capacity": -4,
            "wellbeing": -7,
            "lesson": "Scattered interruptions look small individually but fragment the plan. An urgent label needs shared criteria."
          }
        ]
      }
    ]
  },
  {
    "id": "people",
    "title": "Protect the people",
    "description": "Reduced capacity, pressure from metrics and competing stakeholder requests.",
    "events": [
      {
        "title": "The plan still assumes a full team",
        "text": "One teammate is on leave. Another is recovering from an incident shift. The plan was copied from a sprint when everyone was available.",
        "trySaying": "What capacity do we actually have, including recovery, and which part of the goal can fit?",
        "question": "Whose invisible work or absence is missing from the plan?",
        "options": [
          {
            "title": "Replan with the people available",
            "text": "-2 capacity · +5 wellbeing after delivery.",
            "capacity": -2,
            "wellbeing": 5,
            "lesson": "Include leave and recovery in the conversation. Cut scope using the goal, rather than asking absent or tired people to make the spreadsheet true."
          },
          {
            "title": "Keep only the smallest goal-related work",
            "text": "-3 capacity · +3 wellbeing after delivery.",
            "capacity": -3,
            "wellbeing": 3,
            "lesson": "Reduce the commitment and explain the consequence early. A smaller plan is useful when the team has less time to work."
          },
          {
            "title": "Use evenings to match last sprint’s output",
            "text": "+1 capacity · -14 wellbeing after delivery.",
            "capacity": 1,
            "wellbeing": -14,
            "lesson": "Last sprint’s output is not this sprint’s available capacity. Catching up through evenings shifts a planning error onto people."
          }
        ]
      },
      {
        "title": "The dashboard asks for more tickets",
        "text": "A manager sees fewer completed tickets and asks the team to split every change into tiny tickets. Learners still abandon the booking form.",
        "trySaying": "Can we review booking completion, waiting work and support demand alongside the ticket count?",
        "question": "Which measure tells you whether users are better served?",
        "options": [
          {
            "title": "Review outcomes and the delivery bottleneck",
            "text": "-1 capacity · +3 wellbeing after delivery.",
            "capacity": -1,
            "wellbeing": 3,
            "lesson": "Use ticket counts as a conversation starter. Check a user outcome and where work waits before deciding that people should produce more."
          },
          {
            "title": "Try one change and agree what to observe",
            "text": "-2 capacity · +2 wellbeing after delivery.",
            "capacity": -2,
            "wellbeing": 2,
            "lesson": "Set a small experiment, an owner and a review date. Check completion and rework, not just how many tickets were renamed."
          },
          {
            "title": "Split tickets to improve the headline number",
            "text": "+0 capacity · -5 wellbeing after delivery.",
            "capacity": 0,
            "wellbeing": -5,
            "lesson": "Changing the count can improve appearances without helping a learner. Do not turn a shared measure into an individual performance target."
          }
        ]
      },
      {
        "title": "Two sponsors both say top priority",
        "text": "One sponsor wants partner branding. Another wants reminder improvements. Both have promised their request for the same demo.",
        "trySaying": "Which outcome matters most for this demo, and who can make the trade-off when these requests compete?",
        "question": "Who needs to choose when the team cannot satisfy both promises?",
        "options": [
          {
            "title": "Bring the decision owners together",
            "text": "-1 capacity · +4 wellbeing after delivery.",
            "capacity": -1,
            "wellbeing": 4,
            "lesson": "Show the capacity and consequences in one conversation. Record the agreed priority and tell both sponsors what has been deferred."
          },
          {
            "title": "Prepare a smallest-scope option for each",
            "text": "-2 capacity · +2 wellbeing after delivery.",
            "capacity": -2,
            "wellbeing": 2,
            "lesson": "Offer concrete alternatives so decision owners can compare them. Options support a decision; they do not create extra capacity."
          },
          {
            "title": "Promise both and ask the team to catch up",
            "text": "+2 capacity · -12 wellbeing after delivery.",
            "capacity": 2,
            "wellbeing": -12,
            "lesson": "Separate promises can sound helpful until they reach the same team. The cost lands in workload and recovery."
          }
        ]
      }
    ]
  },
  {
    "id": "release",
    "title": "Release with care",
    "description": "Unreliable tests, accessibility gaps and a misleading product metric.",
    "events": [
      {
        "title": "The test passes on the third attempt",
        "text": "The duplicate-booking check fails twice, then passes. Someone suggests rerunning until the release dashboard turns green.",
        "trySaying": "What caused the failure, and which booking behaviour can we confidently release while we investigate?",
        "question": "What evidence would distinguish an unreliable test from a real defect?",
        "options": [
          {
            "title": "Investigate and keep the change small",
            "text": "-2 capacity · +3 wellbeing after delivery.",
            "capacity": -2,
            "wellbeing": 3,
            "lesson": "Check the failure evidence and isolate the cause. A later pass does not erase an earlier failure."
          },
          {
            "title": "Pause the affected release and show verified work",
            "text": "-3 capacity · +1 wellbeing after delivery.",
            "capacity": -3,
            "wellbeing": 1,
            "lesson": "An honest progress review is possible while the failing behaviour is investigated. Name the owner and next checkpoint."
          },
          {
            "title": "Rerun until green and keep the deadline",
            "text": "+0 capacity · -8 wellbeing after delivery.",
            "capacity": 0,
            "wellbeing": -8,
            "lesson": "A green dashboard obtained by repeated retries is weak evidence. The simulated wellbeing change does not capture the possible user harm."
          }
        ]
      },
      {
        "title": "The happy path needs a mouse",
        "text": "A learner using a keyboard cannot confirm their mentor session. The visual demo looks complete and a sponsor asks to fix accessibility after launch.",
        "trySaying": "Booking is incomplete for this learner. What can we remove so we can test the keyboard journey before release?",
        "question": "Who is excluded by your current definition of working?",
        "options": [
          {
            "title": "Reserve time to test and repair the journey",
            "text": "-2 capacity · +4 wellbeing after delivery.",
            "capacity": -2,
            "wellbeing": 4,
            "lesson": "Work through the booking journey using a keyboard and check the fix. Completion means people can use the feature, not just see it."
          },
          {
            "title": "Reduce the demo to a verified accessible slice",
            "text": "-1 capacity · +2 wellbeing after delivery.",
            "capacity": -1,
            "wellbeing": 2,
            "lesson": "Be explicit about the smaller scope and the unresolved step. A reduced demonstration is not approval to release the broken journey."
          },
          {
            "title": "Launch the visual version and queue the repair",
            "text": "+0 capacity · -9 wellbeing after delivery.",
            "capacity": 0,
            "wellbeing": -9,
            "lesson": "This prioritises the visible demo over a known excluded user. Real accessibility consequences are broader than the simulator’s numbers."
          }
        ]
      },
      {
        "title": "Bookings rise. Sessions do not",
        "text": "The dashboard shows more bookings, but mentors report no-shows. Nobody has checked whether reminder delivery or confusing times are responsible.",
        "trySaying": "Can we compare bookings with sessions attended and investigate a few missed sessions before adding another feature?",
        "question": "What could make a successful-looking metric misleading?",
        "options": [
          {
            "title": "Check the journey with learners and mentors",
            "text": "-2 capacity · +3 wellbeing after delivery.",
            "capacity": -2,
            "wellbeing": 3,
            "lesson": "Look at the gap between a booking and a useful session. Use a small sample to identify a next experiment, not to claim certainty about every user."
          },
          {
            "title": "Run a bounded reminder experiment",
            "text": "-1 capacity · +2 wellbeing after delivery.",
            "capacity": -1,
            "wellbeing": 2,
            "lesson": "Confirm the suspected cause, choose a small change and observe attendance and unwanted reminders. A rise in clicks alone would not answer the question."
          },
          {
            "title": "Celebrate booking growth and add more features",
            "text": "+0 capacity · -4 wellbeing after delivery.",
            "capacity": 0,
            "wellbeing": -4,
            "lesson": "A rising activity count can hide a weak outcome. Keep checking what happens after the event you measure."
          }
        ]
      }
    ]
  }
];
  [["Could we add this to the backlog and keep this sprint focused on making a session bookable?","What moves out if this request moves in?"],["Let’s look at the blocker together and make the support time visible in our plan.","How would we spot a blocker before someone feels stuck alone?"],["Which tested part of the journey would give you the most useful feedback at the earlier demo?","What can we demonstrate honestly with the time available?"]].forEach(([trySaying,question],i)=>Object.assign(SPRINTS[i].event,{trySaying,question}));
  PACKS[0].events = SPRINTS.map(s=>s.event);
  const pack = s => PACKS.find(p=>p.id===s.pack) || PACKS[0];
  const eventFor = (s,round=s.round) => pack(s).events[round];
  const find = id => TASKS.find(t => t.id === id);
  const clamp = n => Math.max(0, Math.min(100, n));
  function createState(packId='classic') { return {pack:PACKS.some(p=>p.id===packId)?packId:'classic',round:0, phase:'plan', wellbeing:80, done:[], selected:[], history:[], choice:null, stance:'steady', banner:false}; }
  function capacity(s) { const recovery = s.wellbeing < 45 ? 3 : s.wellbeing < 65 ? 1 : 0; return Math.max(0, 12 - recovery + (s.stance === 'support' ? -2 : s.stance === 'stretch' ? 2 : 0) + (s.choice === null ? 0 : eventFor(s).options[s.choice].capacity)); }
  function effort(s) { return s.selected.reduce((n,id) => n + find(id).effort, 0); }
  function available(s,t) { return !s.done.includes(t.id) && (!t.hidden || s.banner) && t.deps.every(id => s.done.includes(id) || s.selected.includes(id)); }
  function toggle(s,id) {
    if (!['plan','adapt'].includes(s.phase)) return;
    if (s.selected.includes(id)) {
      s.selected = s.selected.filter(x => x !== id);
      let changed;
      do { const before = s.selected.length; s.selected = s.selected.filter(x => find(x).deps.every(d => s.done.includes(d) || s.selected.includes(d))); changed = before !== s.selected.length; } while (changed);
    } else { const t=find(id); if(t && available(s,t)) s.selected.push(id); }
  }
  function choose(s,index) {
    if(s.phase !== 'event' || !eventFor(s).options[index]) return;
    s.choice=index; s.banner=true;
    const o=eventFor(s).options[index];
    if(o.add && !s.done.includes(o.add) && !s.selected.includes(o.add)) s.selected.push(o.add);
    s.phase='adapt';
  }
  function deliver(s) {
    if(s.phase !== 'adapt') return;
    const cap=capacity(s), planned=[...s.selected], finished=[]; let used=0;
    for(const id of planned) { const t=find(id); if(used+t.effort>cap || !t.deps.every(d=>s.done.includes(d)||finished.includes(d))) break; finished.push(id); used+=t.effort; }
    const unfinished=planned.filter(id=>!finished.includes(id));
    const stanceDelta=s.stance==='support'?8:s.stance==='stretch'?-10:2;
    const option=eventFor(s).options[s.choice];
    const delta=stanceDelta+option.wellbeing-(unfinished.length?4:0);
    s.wellbeing=clamp(s.wellbeing+delta); s.done.push(...finished);
    s.history.push({round:s.round,cap,used,planned,finished,unfinished,delta,wellbeing:s.wellbeing,choice:s.choice,stance:s.stance,goal:SPRINTS[s.round].goals.every(id=>s.done.includes(id)),value:finished.reduce((n,id)=>n+find(id).value,0)});
    s.phase='review';
  }
  function next(s) { if(s.phase !== 'review') return; if(s.round===2) s.phase='final'; else {s.round++; s.phase='plan'; s.selected=[]; s.choice=null; s.stance='steady';} }
  root.SprintGame={TASKS,SPRINTS,PACKS,pack,eventFor,find,createState,capacity,effort,available,toggle,choose,deliver,next};
})(typeof window !== 'undefined' ? window : globalThis);
