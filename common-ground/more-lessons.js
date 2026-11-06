export const additionalLessons=[
  {
    "short": "Link text",
    "title": "A link that tells you where it goes",
    "kind": "example",
    "brief": "The workshop page has three links called “Read more”. Sam wants the venue access details without opening each page.",
    "question": "Give the access link a useful name.",
    "options": [
      "Underline “Read more”",
      "Rename it “View venue access details”",
      "Rename every link “Important”"
    ],
    "good": 1,
    "explanations": [
      "Underlining helps identify a link but does not explain its destination.",
      "The words describe the destination, so this link is useful on its own.",
      "Repeating “Important” still leaves the destinations unclear."
    ],
    "before": "<div class=\"of-example-card\"><u>Read more</u></div>",
    "samples": [
      "<div class=\"of-example-card\"><u>Read more</u></div>",
      "<div class=\"of-example-card\"><u>View venue access details</u></div>",
      "<div class=\"of-example-card\"><u>Important</u></div>"
    ],
    "test": "Follow the descriptive link below. It should take you to the access details in this local example.",
    "tryHTML": "<a href=\"#of-linked-details\" data-demo-link>View venue access details</a><h4 id=\"of-linked-details\" tabindex=\"-1\">Venue access details</h4><p>Step-free entrance on Market Lane. Accessible toilet on the ground floor.</p>",
    "code": "<a href=\"access.html\">View venue access details</a>",
    "source": "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html",
    "visitor": [
      "Sam · finding venue information",
      "Which link has the access details?"
    ],
    "hint": "Choose the repair that helps someone complete the task, rather than only changing its appearance.",
    "feedback": "The words describe the destination, so this link is useful on its own.",
    "takeaway": "The words describe the destination, so this link is useful on its own.",
    "reaction": "Try the repaired example and check the behaviour for yourself."
  },
  {
    "short": "Page headings",
    "title": "Headings that make a page navigable",
    "kind": "example",
    "brief": "A long workshop page uses bold paragraphs as section titles. Rae needs to find the booking information using heading navigation.",
    "question": "Make the page structure meaningful.",
    "options": [
      "Use one H1, then H2 section headings",
      "Make every section an H1",
      "Keep paragraphs and increase their font size"
    ],
    "good": 0,
    "explanations": [
      "Real, sensibly nested headings expose the structure as well as showing it visually.",
      "Giving every section the top rank flattens the page structure.",
      "A larger paragraph still does not become a heading."
    ],
    "before": "<div class=\"of-example-card\"><p><b>Workshops</b></p><p><b>Book a place</b></p></div>",
    "samples": [
      "<div class=\"of-example-card\"><p><b>H1 · Workshops</b></p><p>H2 · Book a place</p><p>H2 · Venue access</p></div>",
      "<div class=\"of-example-card\"><p>H1 · Workshops</p><p>H1 · Book a place</p></div>",
      "<div class=\"of-example-card\"><p style=\"font-size:22px\">Workshops</p><p>Paragraph · Book a place</p></div>"
    ],
    "test": "Read the heading outline below. The section headings sit below the page heading. Use a screen reader heading list when testing a real page.",
    "tryHTML": "<p><strong>Example document outline</strong></p><ol><li>H1: Workshops<ul><li>H2: Book a place</li><li>H2: Venue access</li></ul></li></ol>",
    "code": "<h1>Workshops</h1>\n<h2>Book a place</h2>\n<h2>Venue access</h2>",
    "source": "https://www.w3.org/WAI/tutorials/page-structure/headings/",
    "visitor": [
      "Rae · navigating by headings",
      "Let me jump straight to the section I need."
    ],
    "hint": "Choose the repair that helps someone complete the task, rather than only changing its appearance.",
    "feedback": "Real, sensibly nested headings expose the structure as well as showing it visually.",
    "takeaway": "Real, sensibly nested headings expose the structure as well as showing it visually.",
    "reaction": "Try the repaired example and check the behaviour for yourself."
  },
  {
    "short": "Required fields",
    "title": "Required, without a guessing game",
    "kind": "example",
    "brief": "The form uses a red asterisk but never explains it. Jo needs to know which information is required before continuing.",
    "question": "Explain the requirement.",
    "options": [
      "Use a brighter asterisk",
      "Remove every label",
      "Write “Your name (required)” and mark the input required"
    ],
    "good": 2,
    "explanations": [
      "A brighter symbol still needs an explanation.",
      "Removing labels makes the fields harder to identify.",
      "Visible wording explains the rule; the required attribute also exposes it to browsers and assistive technology."
    ],
    "before": "<div class=\"of-example-card\">Your name <span aria-hidden=\"true\">*</span><div class=\"of-faux-input\">Jo</div></div>",
    "samples": [
      "<div class=\"of-example-card\">Your name <b>*</b><div class=\"of-faux-input\">Jo</div></div>",
      "<div class=\"of-example-card\"><div class=\"of-faux-input\">Jo</div></div>",
      "<div class=\"of-example-card\"><strong>Your name (required)</strong><div class=\"of-faux-input\">Jo</div></div>"
    ],
    "test": "Leave the name empty and check it, then enter Jo and check again. The requirement and entered value should stay visible.",
    "tryHTML": "<label for=\"of-extra-name\">Your name (required)</label><input id=\"of-extra-name\" required autocomplete=\"off\" maxlength=\"100\"><button type=\"button\" class=\"secondary\" data-demo-action=\"required\">Check example name</button>",
    "code": "<label for=\"name\">Your name (required)</label>\n<input id=\"name\" required>",
    "source": "https://www.w3.org/WAI/tutorials/forms/instructions/",
    "visitor": [
      "Jo · completing the details",
      "Tell me which fields I need to fill in."
    ],
    "hint": "Choose the repair that helps someone complete the task, rather than only changing its appearance.",
    "feedback": "Visible wording explains the rule; the required attribute also exposes it to browsers and assistive technology.",
    "takeaway": "Visible wording explains the rule; the required attribute also exposes it to browsers and assistive technology.",
    "reaction": "Try the repaired example and check the behaviour for yourself."
  },
  {
    "short": "Grouped choices",
    "title": "Choices with a question attached",
    "kind": "example",
    "brief": "A visitor reaches radio buttons called Morning and Evening. There is no group question to explain what the choices are for.",
    "question": "Connect the choices to their question.",
    "options": [
      "Put them in a fieldset with a legend",
      "Make the labels uppercase",
      "Use two unrelated checkboxes"
    ],
    "good": 0,
    "explanations": [
      "A fieldset and legend give related controls a shared, programmatic question.",
      "Uppercase text changes appearance without adding the group question.",
      "Checkboxes suggest independent selections; this task needs one choice and an explicit group question."
    ],
    "before": "<div class=\"of-example-card\">○ Morning　○ Evening</div>",
    "samples": [
      "<div class=\"of-example-card\"><strong>Preferred workshop time</strong><p>○ Morning　○ Evening</p></div>",
      "<div class=\"of-example-card\">○ MORNING　○ EVENING</div>",
      "<div class=\"of-example-card\">□ Morning　□ Evening</div>"
    ],
    "test": "Choose a preferred time. Both radio buttons belong to one named group and only one can be selected.",
    "tryHTML": "<fieldset><legend>Preferred workshop time</legend><label><input type=\"radio\" name=\"of-time\" value=\"Morning\"> Morning</label><label><input type=\"radio\" name=\"of-time\" value=\"Evening\"> Evening</label></fieldset><button type=\"button\" class=\"secondary\" data-demo-action=\"group\">Check example time</button>",
    "code": "<fieldset>\n <legend>Preferred workshop time</legend>\n <label><input type=\"radio\" name=\"time\" value=\"morning\"> Morning</label>\n <label><input type=\"radio\" name=\"time\" value=\"evening\"> Evening</label>\n</fieldset>",
    "source": "https://www.w3.org/WAI/tutorials/forms/grouping/",
    "visitor": [
      "Alex · choosing a session",
      "Morning or evening for what?"
    ],
    "hint": "Choose the repair that helps someone complete the task, rather than only changing its appearance.",
    "feedback": "A fieldset and legend give related controls a shared, programmatic question.",
    "takeaway": "A fieldset and legend give related controls a shared, programmatic question.",
    "reaction": "Try the repaired example and check the behaviour for yourself."
  },
  {
    "short": "Visible focus",
    "title": "A keyboard position you can see",
    "kind": "example",
    "brief": "The designer removed the focus outline from every button. Rae can move with Tab but cannot tell which action is selected.",
    "question": "Make keyboard focus visible.",
    "options": [
      "Change the mouse pointer",
      "Add a clear focus-visible outline",
      "Make the button change only on hover"
    ],
    "good": 1,
    "explanations": [
      "A mouse pointer does not identify keyboard focus.",
      "A visible focus indicator shows which control will respond to the keyboard.",
      "Hover feedback helps pointer use but does not replace keyboard focus feedback."
    ],
    "before": "<div class=\"of-example-card\"><span class=\"of-faux-button\">View workshops</span><p>No visible focus indicator.</p></div>",
    "samples": [
      "<div class=\"of-example-card\"><span class=\"of-faux-button\">View workshops</span><p>Mouse pointer changed.</p></div>",
      "<div class=\"of-example-card\"><span class=\"of-faux-button of-focus-sketch\">View workshops</span><p>Keyboard focus is clearly outlined.</p></div>",
      "<div class=\"of-example-card\"><span class=\"of-faux-button\">View workshops</span><p>Hover styling only.</p></div>"
    ],
    "test": "Use Tab to reach the example button and notice the outline. Activate it with Enter or Space.",
    "tryHTML": "<button type=\"button\" class=\"secondary\" data-demo-action=\"focus\">View example workshops</button>",
    "code": "button:focus-visible {\n outline: 3px solid #006874;\n outline-offset: 4px;\n}",
    "source": "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html",
    "visitor": [
      "Rae · using Tab",
      "Where am I on the page?"
    ],
    "hint": "Choose the repair that helps someone complete the task, rather than only changing its appearance.",
    "feedback": "A visible focus indicator shows which control will respond to the keyboard.",
    "takeaway": "A visible focus indicator shows which control will respond to the keyboard.",
    "reaction": "Try the repaired example and check the behaviour for yourself."
  },
  {
    "short": "Touch targets",
    "title": "Room for a less precise tap",
    "kind": "example",
    "brief": "The calendar uses tightly packed tiny arrows. Sam keeps choosing the wrong month.",
    "question": "Make the controls easier to activate.",
    "options": [
      "Use smaller arrows",
      "Make the controls and spacing more generous",
      "Change the arrow colour only"
    ],
    "good": 1,
    "explanations": [
      "Smaller controls make accurate pointing harder.",
      "Larger controls with space between them reduce accidental activation.",
      "Colour alone does not make a small target easier to tap."
    ],
    "before": "<div class=\"of-example-card\"><span class=\"of-tiny-sketch\" aria-hidden=\"true\">‹ ›</span><p>Tiny, adjacent month controls.</p></div>",
    "samples": [
      "<div class=\"of-example-card\"><span class=\"of-tiny-sketch\" aria-hidden=\"true\">‹›</span><p>Even smaller targets.</p></div>",
      "<div class=\"of-example-card\"><span class=\"of-faux-button\">Previous</span> <span class=\"of-faux-button\">Next</span></div>",
      "<div class=\"of-example-card\"><span class=\"of-tiny-sketch\" style=\"color:#006874\" aria-hidden=\"true\">‹ ›</span><p>Still tiny and adjacent.</p></div>"
    ],
    "test": "Try both month buttons. These examples use at least 44 CSS pixels for comfortable activation. WCAG 2.2 AA specifies a 24 by 24 CSS pixel minimum with exceptions, including spacing.",
    "tryHTML": "<div class=\"actions\"><button type=\"button\" class=\"secondary\" data-demo-action=\"previous-month\">Previous month</button><button type=\"button\" class=\"secondary\" data-demo-action=\"next-month\">Next month</button></div>",
    "code": "button { min-width: 44px; min-height: 44px; }\n.month-controls { display: flex; gap: 12px; }",
    "source": "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html",
    "visitor": [
      "Sam · using a touch screen",
      "Give me enough room to choose the right action."
    ],
    "hint": "Choose the repair that helps someone complete the task, rather than only changing its appearance.",
    "feedback": "Larger controls with space between them reduce accidental activation.",
    "takeaway": "Larger controls with space between them reduce accidental activation.",
    "reaction": "Try the repaired example and check the behaviour for yourself."
  },
  {
    "short": "Text reflow",
    "title": "A page that fits a smaller window",
    "kind": "example",
    "brief": "The venue notice uses a fixed-width row. On a narrow display it needs sideways scrolling.",
    "question": "Let the notice adapt to the available space.",
    "options": [
      "Keep a fixed 900px width",
      "Shrink all the text until it fits",
      "Use a flexible width and let the text wrap"
    ],
    "good": 2,
    "explanations": [
      "A fixed width still exceeds a narrow display.",
      "Making text tiny trades a layout problem for a readability problem.",
      "Flexible widths and wrapping help information remain usable as the viewport narrows."
    ],
    "before": "<div class=\"of-example-card\"><div class=\"of-line-sketch\">Workshop arrivals: use the entrance beside the library.</div><p>Fixed row: the sentence extends beyond the sample.</p><p>Full text: Workshop arrivals: use the entrance beside the library.</p></div>",
    "samples": [
      "<div class=\"of-example-card\"><p>Fixed width: 900px</p></div>",
      "<div class=\"of-example-card\"><p style=\"font-size:11px\">Workshop arrivals: use the entrance beside the library.</p><p>Text has been made smaller.</p></div>",
      "<div class=\"of-example-card\"><p>Workshop arrivals: use the entrance beside the library.</p><p>Flexible width; the sentence wraps.</p></div>"
    ],
    "test": "Switch between the narrow and wider notice. The words should wrap without being cut off. Also test a real page with browser zoom.",
    "tryHTML": "<div class=\"of-flex-demo\" id=\"of-flex-demo\"><p>Workshop arrivals: use the entrance beside the library.</p></div><div class=\"actions\"><button type=\"button\" class=\"secondary\" data-demo-action=\"narrow\">Narrow the notice</button><button type=\"button\" class=\"secondary\" data-demo-action=\"wide\">Widen the notice</button></div>",
    "code": ".notice {\n width: 100%;\n max-width: 40rem;\n overflow-wrap: anywhere;\n}",
    "source": "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html",
    "visitor": [
      "Sam · viewing on a phone",
      "I want to read the whole notice without scrolling sideways."
    ],
    "hint": "Choose the repair that helps someone complete the task, rather than only changing its appearance.",
    "feedback": "Flexible widths and wrapping help information remain usable as the viewport narrows.",
    "takeaway": "Flexible widths and wrapping help information remain usable as the viewport narrows.",
    "reaction": "Try the repaired example and check the behaviour for yourself."
  },
  {
    "short": "Helpful instructions",
    "title": "The format before the mistake",
    "kind": "example",
    "brief": "The date box gives no clue whether 04/05 means April or May. Jo wants to enter the workshop date correctly the first time.",
    "question": "Put a clear format instruction beside the field.",
    "options": [
      "Show a persistent DD/MM/YYYY hint and connect it to the input",
      "Explain the format only after an error",
      "Put the only hint inside the placeholder"
    ],
    "good": 0,
    "explanations": [
      "A persistent hint helps before an error and aria-describedby connects it to the field.",
      "Waiting for an error makes visitors guess first.",
      "Placeholder text disappears while typing and should not be the only instruction."
    ],
    "before": "<div class=\"of-example-card\"><strong>Workshop date</strong><div class=\"of-faux-input\">04/05/2026</div></div>",
    "samples": [
      "<div class=\"of-example-card\"><strong>Workshop date</strong><p>Use DD/MM/YYYY, for example 14/11/2026.</p><div class=\"of-faux-input\">14/11/2026</div></div>",
      "<div class=\"of-example-card\"><strong>Workshop date</strong><div class=\"of-faux-input\">04/05/2026</div><p>No help until submission.</p></div>",
      "<div class=\"of-example-card\"><strong>Workshop date</strong><div class=\"of-faux-input\">DD/MM/YYYY (placeholder only)</div></div>"
    ],
    "test": "Type a date into the example box. The format hint should remain visible while you type, with a programmatic connection to the input.",
    "tryHTML": "<label for=\"of-extra-date\">Workshop date</label><p id=\"of-date-hint\">Use DD/MM/YYYY, for example 14/11/2026.</p><input id=\"of-extra-date\" type=\"text\" inputmode=\"numeric\" aria-describedby=\"of-date-hint\" autocomplete=\"off\" maxlength=\"10\">",
    "code": "<label for=\"date\">Workshop date</label>\n<p id=\"date-hint\">Use DD/MM/YYYY, for example 14/11/2026.</p>\n<input id=\"date\" aria-describedby=\"date-hint\">",
    "source": "https://www.w3.org/WAI/tutorials/forms/instructions/",
    "visitor": [
      "Jo · entering a date",
      "Tell me which date format you expect."
    ],
    "hint": "Choose the repair that helps someone complete the task, rather than only changing its appearance.",
    "feedback": "A persistent hint helps before an error and aria-describedby connects it to the field.",
    "takeaway": "A persistent hint helps before an error and aria-describedby connects it to the field.",
    "reaction": "Try the repaired example and check the behaviour for yourself."
  },
  {
    "short": "Status messages",
    "title": "A saved change people can notice",
    "kind": "example",
    "brief": "The Save workshop button changes the saved count visually, but a screen reader is not notified. Alex needs to know whether the action worked.",
    "question": "Announce the result without moving focus.",
    "options": [
      "Move focus to the page heading every time",
      "Update a pre-existing role=\"status\" message",
      "Show only a brief colour flash"
    ],
    "good": 1,
    "explanations": [
      "Moving focus away can interrupt the task and lose the visitor’s place.",
      "A status region can announce the result while keyboard focus stays on the action.",
      "A colour flash is easy to miss and supplies no programmatic status message."
    ],
    "before": "<div class=\"of-example-card\"><p>Saved workshops: 1</p><p>Visual update only.</p></div>",
    "samples": [
      "<div class=\"of-example-card\"><p>Focus jumps back to the page heading.</p></div>",
      "<div class=\"of-example-card\"><p><strong>Workshop saved to your list.</strong></p><p>Status message; focus stays on Save.</p></div>",
      "<div class=\"of-example-card\"><p>Brief colour flash; no status text.</p></div>"
    ],
    "test": "Activate Save example workshop. The visible status updates without moving focus. Activate it again to remove the saved example. A screen reader can check the announcement.",
    "tryHTML": "<button type=\"button\" class=\"secondary\" data-demo-action=\"status\" aria-pressed=\"false\">Save example workshop</button>",
    "code": "<button type=\"button\">Save workshop</button>\n<p role=\"status\" id=\"save-status\"></p>\n<!-- On save, update the existing region with the result. -->",
    "source": "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html",
    "visitor": [
      "Alex · saving a workshop",
      "Did the save work?"
    ],
    "hint": "Choose the repair that helps someone complete the task, rather than only changing its appearance.",
    "feedback": "A status region can announce the result while keyboard focus stays on the action.",
    "takeaway": "A status region can announce the result while keyboard focus stays on the action.",
    "reaction": "Try the repaired example and check the behaviour for yourself."
  },
  {
    "short": "Clear confirmation",
    "title": "A useful answer after the action",
    "kind": "example",
    "brief": "After booking, the website says “Transaction processed: 200”. Jo is unsure whether there is a place booked or what happens next.",
    "question": "Explain the result in everyday language.",
    "options": [
      "Show only the technical response code",
      "Tell the visitor to start the form again",
      "Confirm the practice booking, details and next step"
    ],
    "good": 2,
    "explanations": [
      "A technical code does not explain the outcome to the visitor.",
      "Restarting the form adds uncertainty and risks duplicate actions.",
      "A clear confirmation states the outcome and gives useful details and next steps."
    ],
    "before": "<div class=\"of-example-card\"><p>Transaction processed: 200</p></div>",
    "samples": [
      "<div class=\"of-example-card\"><p>200 OK</p></div>",
      "<div class=\"of-example-card\"><p>Start the form again to check.</p></div>",
      "<div class=\"of-example-card\"><strong>Your practice place is confirmed.</strong><p>Your first web page · Community room 1.</p><p>Bring a laptop. No real booking or email was made.</p></div>"
    ],
    "test": "Open the example confirmation. It should state what happened, where to go and what to bring, while making the practice limit clear.",
    "tryHTML": "<button type=\"button\" class=\"secondary\" data-demo-action=\"confirmation\">Show example confirmation</button><div id=\"of-example-confirmation\" hidden><h4>Your practice place is confirmed.</h4><p>Your first web page · Community room 1.</p><p>Bring a laptop. This example sends no email and reserves no real place.</p></div>",
    "code": "<section aria-labelledby=\"confirmation\">\n <h2 id=\"confirmation\">Your practice place is confirmed.</h2>\n <p>Your first web page. Bring a laptop.</p>\n</section>",
    "source": "https://www.w3.org/WAI/tutorials/forms/notifications/",
    "visitor": [
      "Jo · checking the result",
      "Have I finished, and what do I need to do next?"
    ],
    "hint": "Choose the repair that helps someone complete the task, rather than only changing its appearance.",
    "feedback": "A clear confirmation states the outcome and gives useful details and next steps.",
    "takeaway": "A clear confirmation states the outcome and gives useful details and next steps.",
    "reaction": "Try the repaired example and check the behaviour for yourself."
  }
];
