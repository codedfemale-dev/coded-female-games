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
    "brief": "Zig cannot dock because Beacon rejects ship ID 0. Fit gate modules into the docking circuit, launch test convoys and restore the docking core.",
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
    "lesson": "JavaScript treats 0 as falsy. Validate the rule you actually mean, and test its boundaries so a repair does not leave another gap.",
    "transfer": "On your next bug: reproduce it with one input, compare the result with the requirement, test the smallest repair and keep a regression test that catches the original failure.",
    "takeaway": "A regression test checks that a previously fixed bug has not come back.",
    "related": {
      "href": "../ship-it-or-fix-it/",
      "title": "Practise more coding repairs"
    },
    "sources": [
      [
        "MDN: falsy values",
        "https://developer.mozilla.org/en-US/docs/Glossary/Falsy"
      ],
      [
        "MDN: Number.isInteger",
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger"
      ]
    ]
  },
  {
    "title": "The very impressive dashboard",
    "sector": "08",
    "subtitle": "Product Management",
    "topic": "PRODUCT MANAGEMENT",
    "skill": "Success rates · denominators · user outcomes",
    "brief": "Pilots are piling up in Beacon’s booking route. Send repair drones to the bottleneck, launch fleets and get at least 75% of pilots booked to recover the navigation core.",
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
    "lesson": "A percentage needs a denominator: the group it is calculated from. Pair completion counts with completion rates, then investigate before claiming a cause.",
    "transfer": "For your next product update, write the user goal first. Report completed tasks divided by started tasks, show both counts and explain what the data cannot yet tell you.",
    "takeaway": "80/100 = 80%. 100/200 = 50%. That is a fall of 30 percentage points, even though 20 more pilots completed.",
    "related": {
      "href": "../metric-makeover/",
      "title": "Investigate more product metrics"
    },
    "sources": [
      [
        "GOV.UK: measuring completion rate",
        "https://www.gov.uk/service-manual/measuring-success/measuring-completion-rate"
      ]
    ]
  },
  {
    "title": "One tiny feature before launch",
    "sector": "09",
    "subtitle": "Agile & Teamwork",
    "topic": "AGILE & TEAMWORK",
    "skill": "Sprint goals · scope · capacity · change",
    "brief": "The fleet needs a working confirmation journey. Load repairs and testing into the crew’s shift, rehearse the release and adapt when a new fault appears. Recover the delivery core without hidden overtime.",
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
    "lesson": "Use a shared goal to discuss change. Make scope, testing and capacity visible, then agree a new commitment when the evidence changes.",
    "transfer": "In your next delivery conversation, try: “We can finish the confirmation journey with the time available. Adding this means moving something else. What best supports the goal?”",
    "takeaway": "A Sprint Goal gives a Scrum team a shared objective. Scope can be discussed and adapted as the team learns, while protecting that objective.",
    "related": {
      "href": "../sprint-survival/",
      "title": "Practise more delivery trade-offs"
    },
    "sources": [
      [
        "The Scrum Guide: the Sprint Goal and adapting scope",
        "https://scrumguides.org/scrum-guide.html"
      ]
    ]
  }
];
