export const stations = [
  {
    "id": "scan",
    "name": "System scanner",
    "short": "SCAN",
    "x": 27,
    "y": 46,
    "icon": "◎"
  },
  {
    "id": "signal",
    "name": "Data terminal",
    "short": "DATA",
    "x": 50,
    "y": 34,
    "icon": "⌁"
  },
  {
    "id": "crew",
    "name": "Speak to Pip",
    "short": "CREW",
    "x": 73,
    "y": 54,
    "icon": "♧"
  }
];

export const missions = [
  {
    "title": "The docking bug",
    "sector": "07",
    "subtitle": "Coding & Development",
    "topic": "CODING & DEVELOPMENT",
    "skill": "Debugging · falsy values · boundary tests",
    "brief": "Zig cannot request a landing slot through Beacon, the Curiosity’s docking app. Explore the bridge, trace the failed request and help the team choose a repair.",
    "alien": "ZIG",
    "transmission": "“My ship ID is zero. Your app says I do not exist. Rude.”",
    "clues": [
      {
        "station": "scan",
        "title": "A reproducible failure",
        "text": "A test request with ship ID 0 is rejected. Ship ID 7 works. The server is online. Beacon’s rules allow whole-number IDs from 0 upwards."
      },
      {
        "station": "signal",
        "title": "The validation code",
        "text": "The latest update rejects a request when !shipId is true. In JavaScript, the number 0 is falsy: !0 is true. The new check therefore treats this valid ID as missing."
      },
      {
        "station": "crew",
        "title": "Pip’s first explanation",
        "text": "“Maybe Zig typed the ID wrong?” Pip has not checked the request. Your request log shows that Zig sent the number 0. Reports from other pilots have not been checked yet."
      }
    ],
    "claims": [
      {
        "text": "The valid ship ID 0 is being rejected.",
        "kind": "fact",
        "why": "The recorded request and repeatable test both show that ID 0 fails."
      },
      {
        "text": "Zig entered the wrong ship ID.",
        "kind": "assumption",
        "why": "Pip offered this explanation without checking. The request actually contains a valid ID."
      },
      {
        "text": "No other pilots have been affected.",
        "kind": "unknown",
        "why": "Other reports have not been checked. One reproduced failure does not establish the full impact."
      }
    ],
    "options": [
      {
        "id": "repair",
        "title": "Repair the rule and test boundaries",
        "text": "Accept whole numbers from 0 upwards. Test 0, an ordinary ID and invalid values before releasing.",
        "points": 3,
        "effect": {
          "health": 12,
          "energy": -3,
          "trust": 5
        },
        "result": "The repair tests the actual rule instead of treating every falsy value as missing. The boundary test for 0 now passes."
      },
      {
        "id": "workaround",
        "title": "Give Zig a temporary manual booking",
        "text": "Help this pilot dock, but leave the validation check unchanged.",
        "points": 1,
        "effect": {
          "health": 0,
          "energy": -7,
          "trust": 0
        },
        "result": "Zig can dock through a manual booking. The software still rejects valid ID 0, so the team needs a tracked repair and a check for other affected pilots."
      },
      {
        "id": "blame",
        "title": "Tell Zig to enter a different ID",
        "text": "Assume the pilot caused the problem and close the report.",
        "points": 0,
        "effect": {
          "health": -10,
          "energy": -5,
          "trust": -10
        },
        "result": "Zig’s ID is valid. Closing the report leaves the app broken and asks the pilot to work around your team’s mistake."
      }
    ],
    "update": "You find that the old check also accepts -1 because negative numbers are truthy. A regression test should cover valid zero, positive integers and rejected negative or missing values.",
    "adapt": [
      {
        "id": "revise",
        "title": "Check both ends of the rule",
        "text": "Run the valid and invalid cases against the repair, add them as regression tests and check the support log.",
        "good": true
      },
      {
        "id": "stick",
        "title": "Stop after one successful booking",
        "text": "Treat the single success as proof that all validation works.",
        "good": false
      }
    ],
    "lesson": "JavaScript treats 0 as falsy. Validate the rule you actually mean, and test its boundaries so a repair does not leave another gap.",
    "transfer": "On your next bug: reproduce it with one input, compare the result with the requirement, test the smallest repair and keep a regression test that catches the original failure.",
    "takeaway": "A regression test checks that a previously fixed bug has not come back.",
    "related": {
      "href": "../ship-it-or-fix-it/",
      "title": "Practise more coding repairs"
    },
    "sources": [["MDN: falsy values", "https://developer.mozilla.org/en-US/docs/Glossary/Falsy"], ["MDN: Number.isInteger", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger"]],
    "demo": "validation"
  },
  {
    "title": "The very impressive dashboard",
    "sector": "08",
    "subtitle": "Product Management",
    "topic": "PRODUCT MANAGEMENT",
    "skill": "Success rates · denominators · user outcomes",
    "brief": "Beacon’s dashboard says docking requests have doubled. The captain wants to call the launch a success. Find out whether more pilots are actually completing their booking.",
    "alien": "ZIG",
    "transmission": "“Your chart is enormous. I am still in the queue.”",
    "clues": [
      {
        "station": "scan",
        "title": "What counts as success?",
        "text": "The product goal is for more pilots to complete a docking booking. A page view or repeated attempt is not a completed booking."
      },
      {
        "station": "signal",
        "title": "Counts and completion",
        "text": "Last week: 80 of 100 pilots who started completed a booking. This week: 100 of 200 completed. Each pilot is counted once per week. Request attempts rose from 200 to 400."
      },
      {
        "station": "crew",
        "title": "A tempting explanation",
        "text": "Pip thinks the new onboarding screen caused the drop in completion. It launched this week, but several new fleets also joined. The team has not compared where different pilots get stuck."
      }
    ],
    "claims": [
      {
        "text": "This week, 100 of 200 starting pilots completed.",
        "kind": "fact",
        "why": "The weekly records state both the completed count and the number who started."
      },
      {
        "text": "The new onboarding screen caused the lower rate.",
        "kind": "assumption",
        "why": "The timing suggests a possible explanation, but the pilot mix also changed. Cause has not been established."
      },
      {
        "text": "The main reason pilots abandon their booking is known.",
        "kind": "unknown",
        "why": "The team has not investigated the steps or compared pilot groups yet."
      }
    ],
    "options": [
      {
        "id": "celebrate",
        "title": "Celebrate twice as many requests",
        "text": "Report the higher activity count as proof that the product goal was met.",
        "points": 0,
        "effect": {
          "health": -5,
          "energy": -6,
          "trust": -8
        },
        "result": "More attempts might include retries. You have reported activity without checking whether pilots can complete the task."
      },
      {
        "id": "investigate",
        "title": "Compare completion rates and investigate",
        "text": "Report 80% becoming 50%, alongside 20 more completions. Inspect the journey before choosing a fix.",
        "points": 3,
        "effect": {
          "health": 5,
          "energy": -4,
          "trust": 5
        },
        "result": "Completed bookings rose from 80 to 100, while the completion rate fell from 80% to 50%. Showing both makes the trade-off visible without claiming to know its cause."
      },
      {
        "id": "revert",
        "title": "Remove onboarding immediately",
        "text": "Treat this week’s timing as proof that the new screen caused the problem.",
        "points": 0,
        "effect": {
          "health": -4,
          "energy": -10,
          "trust": -3
        },
        "result": "A rollback may become useful, but the current comparison does not isolate the cause. You change a feature before finding where the difficulty lies."
      }
    ],
    "update": "The journey breakdown shows that many new-fleet pilots stop at the language selector. A small usability session reveals that the “continue” control is unclear. This supports testing a clearer control, not blaming every part of onboarding.",
    "adapt": [
      {
        "id": "stick",
        "title": "Keep reporting only request volume",
        "text": "Leave the headline unchanged and ignore the journey evidence.",
        "good": false
      },
      {
        "id": "revise",
        "title": "Test the clearer control and watch completion",
        "text": "Try a small change, check whether pilots can finish and monitor support contacts for new problems.",
        "good": true
      }
    ],
    "lesson": "A percentage needs a denominator: the group it is calculated from. Pair completion counts with completion rates, then investigate before claiming a cause.",
    "transfer": "For your next product update, write the user goal first. Report completed tasks divided by started tasks, show both counts and explain what the data cannot yet tell you.",
    "takeaway": "80/100 = 80%. 100/200 = 50%. That is a fall of 30 percentage points, even though 20 more pilots completed.",
    "related": {
      "href": "../metric-makeover/",
      "title": "Investigate more product metrics"
    },
    "sources": [["GOV.UK: measuring completion rate", "https://www.gov.uk/service-manual/measuring-success/measuring-completion-rate"]],
    "demo": "metrics"
  },
  {
    "title": "One tiny feature before launch",
    "sector": "09",
    "subtitle": "Agile & Teamwork",
    "topic": "AGILE & TEAMWORK",
    "skill": "Sprint goals · scope · capacity · change",
    "brief": "Beacon’s team has six hours left to help pilots confirm their landing slot. The captain asks for animated alien avatars before the fleet demo. Keep the goal useful and the workload realistic.",
    "alien": "MOSS",
    "transmission": "“Just one tiny feature. Only twelve tentacles to animate.”",
    "clues": [
      {
        "station": "scan",
        "title": "The work behind the goal",
        "text": "Confirming a booking needs four hours of accessibility repairs and two hours of testing. Animated avatars need another four hours. The team has six hours of capacity."
      },
      {
        "station": "signal",
        "title": "What pilots need",
        "text": "Five pilot support conversations describe trouble confirming a booking. None mentions avatars. The demo can show the confirmed-booking journey with the existing portraits."
      },
      {
        "station": "crew",
        "title": "Pip’s capacity check",
        "text": "Pip says adding everything would mean skipping testing or working late. The captain thinks animation is essential for a good demo, but has not checked that with the pilot group."
      }
    ],
    "claims": [
      {
        "text": "Animated avatars are essential for a useful pilot demo.",
        "kind": "assumption",
        "why": "That is the captain’s belief. The current pilot evidence points to completing a booking."
      },
      {
        "text": "The agreed repairs and testing fill the six available hours.",
        "kind": "fact",
        "why": "Four hours plus two hours uses the recorded capacity."
      },
      {
        "text": "Pilots would complete more bookings because of animated avatars.",
        "kind": "unknown",
        "why": "There is no evidence here connecting animation to booking completion."
      }
    ],
    "options": [
      {
        "id": "overtime",
        "title": "Promise everything and work late",
        "text": "Keep all ten hours of work in a six-hour plan and ask Pip to absorb the gap.",
        "points": 0,
        "effect": {
          "health": -8,
          "energy": -22,
          "trust": -5
        },
        "result": "A ten-hour promise does not create four extra hours of capacity. The team carries the cost through exhaustion, skipped checks or a missed promise."
      },
      {
        "id": "refuse",
        "title": "Reject the request without a conversation",
        "text": "Say the plan is fixed and give the captain no explanation or alternative.",
        "points": 1,
        "effect": {
          "health": 0,
          "energy": -4,
          "trust": -5
        },
        "result": "You protect capacity, but miss a chance to explain the goal, hear the need behind the request and agree a useful demo."
      },
      {
        "id": "negotiate",
        "title": "Agree the trade-off around the goal",
        "text": "Protect repairs and testing, demonstrate the booking journey and discuss avatars as later work.",
        "points": 3,
        "effect": {
          "health": 10,
          "energy": -3,
          "trust": 5
        },
        "result": "You make the capacity visible and agree what the demo needs to achieve. Pip can deliver useful work without a hidden overtime promise."
      }
    ],
    "update": "Testing finds an extra keyboard-navigation problem that needs two hours. The pilot demo can move to tomorrow; nobody has agreed that change yet. The plan needs another conversation.",
    "adapt": [
      {
        "id": "revise",
        "title": "Replan together and confirm the new commitment",
        "text": "Explain the new finding, agree moving the demo, protect the repair and test time, and tell the affected people.",
        "good": true
      },
      {
        "id": "stick",
        "title": "Keep the promise and quietly drop testing",
        "text": "Avoid another discussion by absorbing the new work and leaving the checks out.",
        "good": false
      }
    ],
    "lesson": "Use a shared goal to discuss change. Make scope, testing and capacity visible, then agree a new commitment when the evidence changes.",
    "transfer": "In your next delivery conversation, try: “We can finish the confirmation journey with the time available. Adding this means moving something else. What best supports the goal?”",
    "takeaway": "A Sprint Goal gives a Scrum team a shared objective. Scope can be discussed and adapted as the team learns, while protecting that objective.",
    "related": {
      "href": "../sprint-survival/",
      "title": "Practise more delivery trade-offs"
    },
    "sources": [["The Scrum Guide: the Sprint Goal and adapting scope", "https://scrumguides.org/scrum-guide.html"]]
  }
];
