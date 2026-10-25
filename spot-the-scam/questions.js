/* Original training examples by Coded Female. All message interactions stay local. */
const SCAM_LEVELS = [
  {
    "id": 1,
    "title": "Notice the clues",
    "kicker": "Start with the details",
    "description": "Recognise pressure, unexpected requests and the limits of appearances."
  },
  {
    "id": 2,
    "title": "Check before acting",
    "kicker": "Find a trusted route",
    "description": "Choose how to verify a message without relying on the message itself."
  },
  {
    "id": 3,
    "title": "Put the pieces together",
    "kicker": "Follow the evidence",
    "description": "Compare messages, records and requests before making your next move."
  },
  {
    "id": 4,
    "title": "Handle the convincing",
    "kicker": "Question what feels familiar",
    "description": "Investigate believable requests with fewer obvious warning signs."
  },
  {
    "id": 5,
    "title": "Respond and recover",
    "kicker": "Know your next step",
    "description": "Practise responding calmly when something has already happened."
  }
];
const SCAM_QUESTIONS = [
  {
    "id": "parcel",
    "topic": "Check through a trusted route",
    "channel": "Text message",
    "sender": "SwiftParcel",
    "address": "Unknown mobile number",
    "subject": "Your parcel is on hold",
    "context": "You are expecting a parcel, but you have not checked which courier is delivering it.",
    "message": "Delivery could not be completed. Pay a £1.45 redelivery fee in the next 30 minutes or your parcel will be returned.",
    "displayLink": "swiftparcel-redelivery.example/pay",
    "question": "What is the safest way to check?",
    "hint": "Expecting a parcel makes a message plausible. Does it verify the sender?",
    "options": [
      {
        "id": "open",
        "text": "Open the text link because you are expecting a delivery."
      },
      {
        "id": "trusted",
        "text": "Use the retailer’s order page or a courier app you already trust to check the delivery."
      },
      {
        "id": "small",
        "text": "Check that the linked payment page has a padlock before paying."
      }
    ],
    "correct": "trusted",
    "explanation": "A timely message can still be a scam. Check the order through a route you know rather than the supplied link. A small payment request can be used to obtain card details.",
    "takeaway": "Check delivery claims independently, even when you expect a parcel.",
    "judgement": "verify",
    "level": 1,
    "evidence": [
      {
        "title": "Sender details",
        "body": "Displayed sender: Unknown mobile number. The text came from an unfamiliar mobile number. A courier name is displayed, but has not been independently checked."
      },
      {
        "title": "Link destination",
        "body": "swiftparcel-redelivery.example/pay. The destination asks for card details; it is only a text preview here."
      },
      {
        "title": "Your order record",
        "body": "You are expecting a parcel. You have not checked the courier in your retailer account."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What is the safest way to check?",
        "options": [
          {
            "id": "open",
            "text": "Open the text link because you are expecting a delivery.",
            "label": "Open the text link",
            "tool": "link"
          },
          {
            "id": "trusted",
            "text": "Use the retailer’s order page or a courier app you already trust to check the delivery.",
            "label": "Check my order in the shop’s app",
            "tool": "verify"
          },
          {
            "id": "small",
            "text": "Check that the linked payment page has a padlock before paying.",
            "label": "Check for a padlock, then pay",
            "tool": "pay"
          }
        ],
        "correct": "trusted",
        "explanation": "A timely message can still be a scam. Check the order through a route you know rather than the supplied link. A small payment request can be used to obtain card details.",
        "next": {},
        "insight": "Check delivery claims independently, even when you expect a parcel."
      }
    ],
    "setup": "You’re expecting a parcel. This text arrives.",
    "surface": "text",
    "contact": {
      "name": "Retailer app",
      "source": "Saved app",
      "response": "Order CF-4821 · In transit. Delivery is still scheduled. No redelivery fee is due on this order."
    }
  },
  {
    "id": "code",
    "topic": "Keep verification codes private",
    "channel": "Team chat",
    "sender": "A colleague’s account",
    "address": "Direct message from Sam",
    "subject": "Could you send me that code?",
    "context": "A colleague’s chat account asks for a code that has just arrived on your phone.",
    "message": "I’m locked out and the code went to your number by mistake. Can you send it over? I need to get into a meeting.",
    "displayLink": "",
    "question": "What is the best next step?",
    "hint": "A familiar chat account may be compromised. What does a sign-in code allow someone to do?",
    "options": [
      {
        "id": "send",
        "text": "Send the code because you know Sam."
      },
      {
        "id": "partial",
        "text": "Ask Sam in this same chat to confirm which meeting they need to join."
      },
      {
        "id": "keep",
        "text": "Keep the code private and contact Sam independently using a known route."
      }
    ],
    "correct": "keep",
    "explanation": "A sign-in or recovery code can unlock an account. Keep it private even when the request appears to come from someone you know. Independently check on the colleague and contact IT if a work account may be compromised.",
    "takeaway": "Do not share sign-in or account recovery codes.",
    "judgement": "suspicious",
    "level": 1,
    "evidence": [
      {
        "title": "Sender details",
        "body": "Displayed sender: Direct message from Sam. The sender claims to be a colleague. You have not checked this request through your usual contact route."
      },
      {
        "title": "The code notification",
        "body": "The code is for signing in to your account, not for joining a meeting."
      },
      {
        "title": "The request",
        "body": "They ask you to send the code to them. This would give them information used to access your account."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What is the best next step?",
        "options": [
          {
            "id": "send",
            "text": "Send the code because you know Sam.",
            "label": "Send Sam the code",
            "tool": "reply",
            "draft": "Here is the sign-in code: 381 604."
          },
          {
            "id": "partial",
            "text": "Ask Sam in this same chat to confirm which meeting they need to join.",
            "label": "Ask about the meeting in this chat",
            "tool": "reply",
            "draft": "Which meeting are you trying to join?"
          },
          {
            "id": "keep",
            "text": "Keep the code private and contact Sam independently using a known route.",
            "label": "Keep it private. Contact Sam separately",
            "tool": "verify"
          }
        ],
        "correct": "keep",
        "explanation": "A sign-in or recovery code can unlock an account. Keep it private even when the request appears to come from someone you know. Independently check on the colleague and contact IT if a work account may be compromised.",
        "next": {},
        "insight": "Do not share sign-in or account recovery codes."
      }
    ],
    "setup": "Sam’s chat account asks for a code sent to your phone.",
    "surface": "text",
    "contact": {
      "name": "Sam",
      "source": "Saved work contact",
      "response": "Sam: I’m not locked out, and I didn’t ask for a code. Please don’t send it to that chat."
    }
  },
  {
    "id": "report",
    "topic": "Report without needing certainty",
    "channel": "Work email",
    "sender": "Workspace Support",
    "address": "help@workspace-check.example",
    "subject": "Keep your account active",
    "context": "You receive an unexpected email asking you to confirm your password. You have not clicked its link.",
    "message": "Your workspace access expires today. Confirm your username and password now to keep your account active.",
    "displayLink": "workspace-check.example/verify",
    "question": "What should you do with the message?",
    "hint": "Reporting lets the people responsible investigate and warn others.",
    "options": [
      {
        "id": "forward",
        "text": "Forward the working link to every colleague so they can inspect it."
      },
      {
        "id": "report",
        "text": "Use your organisation’s approved reporting route and avoid the link."
      },
      {
        "id": "reply",
        "text": "Reply asking the sender to prove they work for IT."
      }
    ],
    "correct": "report",
    "explanation": "Report through the route your organisation provides, such as its report-phishing button or security team. You do not need to prove it is a scam first. Outside work, UK users can follow the NCSC’s suspicious-email reporting guidance.",
    "takeaway": "Report concerns through the approved route; avoid spreading risky links.",
    "judgement": "suspicious",
    "level": 1,
    "evidence": [
      {
        "title": "Sender details",
        "body": "Displayed sender: help@workspace-check.example. The email claims to be your workspace administrator. Its authority has not been checked."
      },
      {
        "title": "Link destination",
        "body": "workspace-confirm.example/login. This preview does not open a real page."
      },
      {
        "title": "What is requested",
        "body": "The page would ask for a username and password. You have not opened it, and your established reporting route is available."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What should you do with the message?",
        "options": [
          {
            "id": "forward",
            "text": "Forward the working link to every colleague so they can inspect it.",
            "label": "Forward the link to the team",
            "tool": "forward",
            "draft": "Please take a look at this message and its link."
          },
          {
            "id": "report",
            "text": "Use your organisation’s approved reporting route and avoid the link.",
            "label": "Report it through work’s usual channel",
            "tool": "report"
          },
          {
            "id": "reply",
            "text": "Reply asking the sender to prove they work for IT.",
            "label": "Ask the sender to prove they’re IT",
            "tool": "reply",
            "draft": "Can you prove that you work for IT?"
          }
        ],
        "correct": "report",
        "explanation": "Report through the route your organisation provides, such as its report-phishing button or security team. You do not need to prove it is a scam first. Outside work, UK users can follow the NCSC’s suspicious-email reporting guidance.",
        "next": {},
        "insight": "Report concerns through the approved route; avoid spreading risky links."
      }
    ],
    "setup": "An unexpected email lands in your work inbox.",
    "surface": "email",
    "contact": {
      "name": "Work security",
      "source": "Staff directory",
      "response": "Your organisation’s reporting tool accepts the message without opening its link."
    }
  },
  {
    "id": "support-pop-up",
    "pack": "Everyday",
    "judgement": "suspicious",
    "difficulty": "starter",
    "topic": "Use support you can verify",
    "channel": "Browser pop-up",
    "sender": "Device Protection Desk",
    "address": "Warning inside a website",
    "subject": "Your files are at risk",
    "context": "While reading an article, a loud pop-up says your computer is infected and tells you to contact its support agent.",
    "message": "Threat detected. Your photos may be deleted. Contact our agent now and allow a remote repair session. Do not close this warning.",
    "displayLink": "Support number and download deliberately omitted.",
    "question": "What should you do?",
    "hint": "A website warning is making claims about your whole device. Who has actually verified those claims?",
    "options": [
      {
        "id": "call",
        "text": "Contact the agent displayed in the warning."
      },
      {
        "id": "remote",
        "text": "Allow remote access so the agent can prove the problem."
      },
      {
        "id": "close",
        "text": "Close the warning without using its contact details; use trusted support or your existing security tools if concerned."
      }
    ],
    "correct": "close",
    "explanation": "Fake security pop-ups use fear to push people towards fraudulent support. Giving remote access can expose your device and information. If the tab will not close normally, close the browser using the device’s usual controls. On a work device, contact your usual IT support route.",
    "takeaway": "Do not grant remote access because a website tells you to.",
    "guidanceUrl": "https://consumer.ftc.gov/articles/how-spot-avoid-and-report-tech-support-scams",
    "level": 1,
    "evidence": [
      {
        "title": "Source of the warning",
        "body": "Displayed sender: Warning inside a website. The warning appeared inside a web page while you were reading an article, not in your existing security tool."
      },
      {
        "title": "Support route",
        "body": "The phone number and remote support offer come from the same pop-up."
      },
      {
        "title": "Pressure used",
        "body": "The pop-up threatens your photos and tells you not to close it. This does not establish that an infection exists."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What should you do?",
        "options": [
          {
            "id": "call",
            "text": "Contact the agent displayed in the warning.",
            "label": "Call the number in the pop-up",
            "tool": "call"
          },
          {
            "id": "remote",
            "text": "Allow remote access so the agent can prove the problem.",
            "label": "Let the agent connect remotely",
            "tool": "access"
          },
          {
            "id": "close",
            "text": "Close the warning without using its contact details; use trusted support or your existing security tools if concerned.",
            "label": "Close it. Use my usual support",
            "tool": "verify"
          }
        ],
        "correct": "close",
        "explanation": "Fake security pop-ups use fear to push people towards fraudulent support. Giving remote access can expose your device and information. If the tab will not close normally, close the browser using the device’s usual controls. On a work device, contact your usual IT support route.",
        "next": {},
        "insight": "Do not grant remote access because a website tells you to."
      }
    ],
    "setup": "You’re reading an article when this warning appears.",
    "surface": "app",
    "contact": {
      "name": "IT help desk",
      "source": "Staff directory",
      "response": "We haven’t sent that repair warning. Close the web pop-up. If you need a device check, use your usual support ticket."
    }
  },
  {
    "id": "legitimate",
    "topic": "Use context, not blanket suspicion",
    "channel": "App notification",
    "sender": "Your usual bookshop app",
    "address": "Opened directly from your phone",
    "subject": "Your collection is ready",
    "context": "You ordered a book yesterday. You open your usual bookshop app yourself, and the order number and collection store match your order.",
    "message": "Your order is ready to collect at the store you selected. Bring your order confirmation. No additional payment is needed.",
    "displayLink": "Order details shown inside the app you opened yourself.",
    "question": "What is a reasonable next step?",
    "hint": "You reached this information independently and checked it against something you actually did.",
    "options": [
      {
        "id": "collect",
        "text": "Follow the collection instructions shown in the app; check with the shop if anything changes."
      },
      {
        "id": "delete",
        "text": "Wait for an email link before trusting the collection notice in the app."
      },
      {
        "id": "public",
        "text": "Send the order confirmation to a customer-support account found in a social media reply."
      }
    ],
    "correct": "collect",
    "explanation": "This scenario provides independent context: you placed the order and checked its details in the app yourself. That supports following the collection instructions. Stay alert to unexpected changes, and keep order details private.",
    "takeaway": "Trusted routes and matching context support informed decisions.",
    "judgement": "supported",
    "level": 1,
    "evidence": [
      {
        "title": "How you arrived",
        "body": "Displayed sender: Opened directly from your phone. You opened the retailer’s app yourself, rather than following a message link."
      },
      {
        "title": "Order details",
        "body": "The order number and collection details match the order inside that app."
      },
      {
        "title": "What is requested",
        "body": "Use your collection reference at the shop. No new payment or password is requested."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What is a reasonable next step?",
        "options": [
          {
            "id": "collect",
            "text": "Follow the collection instructions shown in the app; check with the shop if anything changes.",
            "label": "Collect using the app’s instructions",
            "tool": "task"
          },
          {
            "id": "delete",
            "text": "Wait for an email link before trusting the collection notice in the app.",
            "label": "Wait for an email link first",
            "tool": "archive"
          },
          {
            "id": "public",
            "text": "Send the order confirmation to a customer-support account found in a social media reply.",
            "label": "Send the order to a social support account",
            "tool": "forward",
            "draft": "Please take a look at this message and its link."
          }
        ],
        "correct": "collect",
        "explanation": "This scenario provides independent context: you placed the order and checked its details in the app yourself. That supports following the collection instructions. Stay alert to unexpected changes, and keep order details private.",
        "next": {},
        "insight": "Trusted routes and matching context support informed decisions."
      }
    ],
    "setup": "You open your usual bookshop app. The order and store match your purchase.",
    "surface": "app",
    "contact": {
      "name": "Bookshop",
      "source": "Saved app",
      "response": "The order number, collection shop and instructions match the order in the app you opened yourself."
    }
  },
  {
    "id": "prize",
    "topic": "Recognise pressure",
    "channel": "Social message",
    "sender": "Career Circle",
    "address": "@career-circle-prizes",
    "subject": "Your learning grant is waiting",
    "context": "You have not entered a grant competition.",
    "message": "You have won a £500 learning grant. Pay a £15 processing fee in the next hour to claim your place.",
    "displayLink": "Example message: inspection stays inside the game.",
    "question": "What is the most useful next step?",
    "options": [
      {
        "id": "a",
        "text": "Avoid paying and check the grant through the organisation’s independently located website."
      },
      {
        "id": "b",
        "text": "Ask this account to send a winner certificate before paying."
      },
      {
        "id": "c",
        "text": "Pay using a card so you can challenge the payment later."
      }
    ],
    "correct": "a",
    "hint": "Which action gives you reliable evidence or contains the risk without trusting this message?",
    "explanation": "A fee and a deadline for an unexpected prize are reasons to pause. A certificate from the same sender would not independently establish the offer.",
    "takeaway": "A convincing document is not independent verification.",
    "judgement": "suspicious",
    "level": 1,
    "evidence": [
      {
        "title": "Sender details",
        "body": "Displayed sender: @career-circle-prizes. An unfamiliar social account is using the name Career Circle."
      },
      {
        "title": "Your application history",
        "body": "You have not entered a competition or applied for this grant."
      },
      {
        "title": "Payment request",
        "body": "The message requires a processing fee within an hour. A certificate from the same account would not be an independent check."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What is the most useful next step?",
        "options": [
          {
            "id": "a",
            "text": "Avoid paying and check the grant through the organisation’s independently located website.",
            "label": "Check the grant independently",
            "tool": "verify"
          },
          {
            "id": "b",
            "text": "Ask this account to send a winner certificate before paying.",
            "label": "Ask this account for a certificate",
            "tool": "reply",
            "draft": "Please send me a winner certificate."
          },
          {
            "id": "c",
            "text": "Pay using a card so you can challenge the payment later.",
            "label": "Pay now. Challenge it later if needed",
            "tool": "pay"
          }
        ],
        "correct": "a",
        "explanation": "A fee and a deadline for an unexpected prize are reasons to pause. A certificate from the same sender would not independently establish the offer.",
        "next": {},
        "insight": "A convincing document is not independent verification."
      }
    ],
    "setup": "You haven’t entered a competition. This account messages you.",
    "surface": "text",
    "contact": {
      "name": "Career Circle",
      "source": "Independently located website",
      "response": "Grant applications are handled through this website. An unsolicited social message does not confirm an award or reserve a place."
    }
  },
  {
    "id": "qr",
    "topic": "Look beyond familiar branding",
    "channel": "Printed notice",
    "sender": "Workplace poster",
    "address": "A sticker on a shared noticeboard",
    "subject": "Staff Wi-Fi has moved",
    "context": "A new poster displays your company logo and a QR code. There has been no announcement from IT.",
    "message": "Scan to reconnect. Sign in with your work account to activate the new staff Wi-Fi.",
    "displayLink": "QR code intentionally omitted from this example.",
    "question": "What should you check first?",
    "hint": "A logo can be copied. Who can confirm this change through a trusted channel?",
    "options": [
      {
        "id": "logo",
        "text": "Scan and sign in because the poster has the company logo."
      },
      {
        "id": "confirm",
        "text": "Check with IT through the usual support channel before scanning or entering details."
      },
      {
        "id": "https",
        "text": "Scan it and trust the page if it uses HTTPS."
      }
    ],
    "correct": "confirm",
    "explanation": "QR codes can lead to deceptive websites, and a familiar logo is easy to copy. HTTPS encrypts a connection; it does not prove the site is trustworthy. Confirm the change before following the code.",
    "takeaway": "Treat QR codes as links. Verify the destination and request.",
    "judgement": "verify",
    "level": 2,
    "evidence": [
      {
        "title": "Poster details",
        "body": "Displayed sender: A sticker on a shared noticeboard. The poster uses your company logo. A logo can be copied."
      },
      {
        "title": "QR destination",
        "body": "The code previews staff-wifi-update.example/signin. The preview stays inside this game."
      },
      {
        "title": "Internal announcements",
        "body": "There has been no announcement from IT. Your usual help desk is available to confirm network changes."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What should you check first?",
        "options": [
          {
            "id": "logo",
            "text": "Scan and sign in because the poster has the company logo.",
            "label": "Scan it. The logo looks right",
            "tool": "link"
          },
          {
            "id": "confirm",
            "text": "Check with IT through the usual support channel before scanning or entering details.",
            "label": "Check with our usual IT help desk",
            "tool": "verify"
          },
          {
            "id": "https",
            "text": "Scan it and trust the page if it uses HTTPS.",
            "label": "Scan it. Trust it if there’s a padlock",
            "tool": "link"
          }
        ],
        "correct": "confirm",
        "explanation": "QR codes can lead to deceptive websites, and a familiar logo is easy to copy. HTTPS encrypts a connection; it does not prove the site is trustworthy. Confirm the change before following the code.",
        "next": {},
        "insight": "Treat QR codes as links. Verify the destination and request."
      }
    ],
    "setup": "A new Wi-Fi poster appears at work. IT hasn’t announced a change.",
    "surface": "app",
    "contact": {
      "name": "IT help desk",
      "source": "Staff directory",
      "response": "No staff Wi-Fi change has been announced. Please send the poster to our help desk without entering your work details on its page."
    }
  },
  {
    "id": "cv-conversion",
    "pack": "Career",
    "judgement": "suspicious",
    "difficulty": "starter",
    "topic": "Question compulsory application fees",
    "channel": "Professional networking message",
    "sender": "Ellis Recruitment",
    "address": "Profile you have not verified",
    "subject": "Your CV cannot enter our system",
    "context": "A recruiter has asked for your CV. They now say you must purchase a conversion from their chosen website to remain eligible.",
    "message": "Your experience fits the role, but our application system rejected the file. Use our approved converter for £24 and send the certificate before 5pm. We cannot put you forward without it.",
    "displayLink": "cv-format-pass.example (fictional, non-working text)",
    "question": "Which response best protects your application and money?",
    "hint": "A paid CV service and a fee demanded to access a job are different situations.",
    "options": [
      {
        "id": "pay",
        "text": "Pay because £24 is a small cost compared with the salary."
      },
      {
        "id": "check",
        "text": "Decline the payment request and check the vacancy and acceptable CV formats through a verified company contact."
      },
      {
        "id": "discount",
        "text": "Ask the same recruiter to confirm the converter is approved before paying."
      }
    ],
    "correct": "check",
    "explanation": "A supposed recruiter directing applicants to a paid CV conversion service is a documented scam pattern. Paying less does not verify it. Independently check the vacancy and ask about accepted formats. Legitimate paid CV advice exists, but that does not make this compulsory job-access fee trustworthy.",
    "takeaway": "Do not pay a recruiter’s chosen service just to remain eligible for a job.",
    "guidanceUrl": "https://consumer.ftc.gov/consumer-alerts/2022/05/applying-jobs-be-lookout-scams",
    "level": 2,
    "evidence": [
      {
        "title": "Recruitment history",
        "body": "Displayed sender: Profile you have not verified. You were asked for a CV. The conversion fee was introduced afterwards."
      },
      {
        "title": "Suggested website",
        "body": "The recruiter insists on one paid converter and asks for its certificate."
      },
      {
        "title": "Independent route",
        "body": "The company’s careers site and independently located recruitment contact can confirm acceptable file formats."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "Which response best protects your application and money?",
        "options": [
          {
            "id": "pay",
            "text": "Pay because £24 is a small cost compared with the salary.",
            "label": "Pay the conversion fee",
            "tool": "pay"
          },
          {
            "id": "check",
            "text": "Decline the payment request and check the vacancy and acceptable CV formats through a verified company contact.",
            "label": "Check CV formats with the company",
            "tool": "verify"
          },
          {
            "id": "discount",
            "text": "Ask the same recruiter to confirm the converter is approved before paying.",
            "label": "Ask this recruiter to confirm the site",
            "tool": "reply",
            "draft": "Can you confirm that this converter is approved?"
          }
        ],
        "correct": "check",
        "explanation": "A supposed recruiter directing applicants to a paid CV conversion service is a documented scam pattern. Paying less does not verify it. Independently check the vacancy and ask about accepted formats. Legitimate paid CV advice exists, but that does not make this compulsory job-access fee trustworthy.",
        "next": {},
        "insight": "Do not pay a recruiter’s chosen service just to remain eligible for a job."
      }
    ],
    "setup": "A recruiter likes your CV, but says you need to pay to change its format.",
    "surface": "text",
    "contact": {
      "name": "Recruitment team",
      "source": "Company careers page",
      "response": "A PDF or DOCX CV is accepted. You do not need to pay for the recruiter’s converter to apply."
    }
  },
  {
    "id": "mentor-fee",
    "pack": "Career",
    "judgement": "suspicious",
    "difficulty": "intermediate",
    "topic": "Verify unexpected opportunities",
    "channel": "Social media message",
    "sender": "Women Build Digital",
    "address": "Unverified fictional programme account",
    "subject": "Your sponsored mentoring place",
    "context": "You posted about changing careers into tech. An unfamiliar account claims you have been selected for a sponsored mentoring place you did not apply for.",
    "message": "Your profile has been chosen for our fully sponsored programme. Confirm your place with a refundable £35 identity fee today. Please keep the invitation private until selection closes.",
    "displayLink": "women-build-digital.example/claim (fictional, non-working text)",
    "question": "How should you assess this invitation?",
    "hint": "Relevance to your ambitions does not confirm the sender. Consider the payment, secrecy and deadline together.",
    "options": [
      {
        "id": "check",
        "text": "Pause and independently check the organisation, programme and fee before sharing information or paying."
      },
      {
        "id": "pay",
        "text": "Pay because the programme says it supports women in tech."
      },
      {
        "id": "badge",
        "text": "Ask the account for a programme brochure before deciding whether to pay."
      }
    ],
    "correct": "check",
    "explanation": "An unexpected opportunity combined with a payment demand, secrecy and pressure deserves independent checking. A mission you support or polished logo does not verify the organisation. Paid mentoring can be legitimate; this particular invitation has not supplied trustworthy evidence.",
    "takeaway": "Check opportunities independently, even when their mission matters to you.",
    "guidanceUrl": "https://www.ncsc.gov.uk/collection/phishing-scams/spot-scams",
    "level": 2,
    "evidence": [
      {
        "title": "Your application history",
        "body": "Displayed sender: Unverified fictional programme account. You did not apply for this mentoring programme."
      },
      {
        "title": "Conditions of the offer",
        "body": "The supposedly sponsored place requires a refundable identity fee today and asks you to keep the invitation private."
      },
      {
        "title": "Independent route",
        "body": "The organisation and programme can be checked outside this social account before any payment or information is shared."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "How should you assess this invitation?",
        "options": [
          {
            "id": "check",
            "text": "Pause and independently check the organisation, programme and fee before sharing information or paying.",
            "label": "Check the programme independently",
            "tool": "verify"
          },
          {
            "id": "pay",
            "text": "Pay because the programme says it supports women in tech.",
            "label": "Pay to secure the sponsored place",
            "tool": "pay"
          },
          {
            "id": "badge",
            "text": "Ask the account for a programme brochure before deciding whether to pay.",
            "label": "Ask this account for a brochure",
            "tool": "reply",
            "draft": "Please send me a programme brochure."
          }
        ],
        "correct": "check",
        "explanation": "An unexpected opportunity combined with a payment demand, secrecy and pressure deserves independent checking. A mission you support or polished logo does not verify the organisation. Paid mentoring can be legitimate; this particular invitation has not supplied trustworthy evidence.",
        "next": {},
        "insight": "Check opportunities independently, even when their mission matters to you."
      }
    ],
    "setup": "You posted about moving into tech. An unfamiliar account gets in touch.",
    "surface": "text",
    "contact": {
      "name": "Programme office",
      "source": "Independently located website",
      "response": "Programme places are confirmed through our application process. Please verify any fee with this office before paying a social account."
    }
  },
  {
    "id": "domain-renewal-check",
    "pack": "Everyday",
    "judgement": "verify",
    "difficulty": "intermediate",
    "topic": "Check account claims in the account itself",
    "channel": "Email",
    "sender": "Web Address Services",
    "address": "billing@web-address-services.example",
    "subject": "Your portfolio renewal",
    "context": "You own a portfolio domain. An email correctly names it and says renewal is due, but you cannot remember which provider manages it.",
    "message": "Your portfolio web address is due for renewal next week. Please review your renewal options to avoid interruption.",
    "displayLink": "web-address-services.example/renew (fictional, non-working text)",
    "question": "What is the best way to establish whether payment is due?",
    "hint": "Knowing your domain name does not establish a billing relationship.",
    "options": [
      {
        "id": "dashboard",
        "text": "Find your provider from existing records, open its account through a trusted route and check the renewal there."
      },
      {
        "id": "name",
        "text": "Use the email link because it correctly names your portfolio."
      },
      {
        "id": "ignore",
        "text": "Ignore all renewal notices, including those in your provider account."
      }
    ],
    "correct": "dashboard",
    "explanation": "The email alone does not establish whether this organisation is your provider or whether a payment is due. Public information can make a message look relevant. Checking your actual provider account resolves the uncertainty and avoids missing a genuine renewal.",
    "takeaway": "Verify billing claims in the service account you actually use.",
    "guidanceUrl": "https://www.ncsc.gov.uk/collection/phishing-scams/spot-scams",
    "level": 2,
    "evidence": [
      {
        "title": "Domain name",
        "body": "Displayed sender: billing@web-address-services.example. The message names your public portfolio domain correctly. That name can be found without access to your hosting account."
      },
      {
        "title": "Renewal timing",
        "body": "The email says next week, but you have not checked the provider’s renewal record."
      },
      {
        "title": "Your existing records",
        "body": "Previous invoices or saved provider details can help you locate the real account and check the renewal there."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What is the best way to establish whether payment is due?",
        "options": [
          {
            "id": "dashboard",
            "text": "Find your provider from existing records, open its account through a trusted route and check the renewal there.",
            "label": "Check my provider’s saved account",
            "tool": "verify"
          },
          {
            "id": "name",
            "text": "Use the email link because it correctly names your portfolio.",
            "label": "Use the link. It names my domain",
            "tool": "link"
          },
          {
            "id": "ignore",
            "text": "Ignore all renewal notices, including those in your provider account.",
            "label": "Ignore the renewal completely",
            "tool": "archive"
          }
        ],
        "correct": "dashboard",
        "explanation": "The email alone does not establish whether this organisation is your provider or whether a payment is due. Public information can make a message look relevant. Checking your actual provider account resolves the uncertainty and avoids missing a genuine renewal.",
        "next": {},
        "insight": "Verify billing claims in the service account you actually use."
      }
    ],
    "setup": "You own a portfolio domain, but can’t remember which provider manages it.",
    "surface": "email",
    "contact": {
      "name": "Domain provider",
      "source": "Saved billing record",
      "response": "Portfolio domain · Renewal due in 7 days. Review the renewal and payment options inside this account."
    }
  },
  {
    "id": "verified-interview",
    "pack": "Career",
    "judgement": "supported",
    "difficulty": "starter",
    "topic": "Use evidence to proceed with confidence",
    "channel": "Recruitment portal",
    "sender": "Alder Studio recruitment",
    "address": "Portal opened from your saved application record",
    "subject": "Choose an interview slot",
    "context": "You applied through the company’s careers page. You independently confirmed the interview with its recruitment team, then opened the saved application portal yourself.",
    "message": "Your junior developer application is ready for interview. Choose one of the available times. We do not need payment or bank details to arrange your interview.",
    "displayLink": "Slots displayed inside the verified application portal.",
    "question": "What is a reasonable next step?",
    "hint": "Which checks have already happened outside the incoming message?",
    "options": [
      {
        "id": "book",
        "text": "Choose a suitable slot in the verified portal and keep the confirmation private."
      },
      {
        "id": "reject",
        "text": "Wait for a second email before using the independently verified portal."
      },
      {
        "id": "bank",
        "text": "Return to the invitation email and use its link instead of the saved portal."
      }
    ],
    "correct": "book",
    "explanation": "You have independently verified the invitation and reached the application portal through your own saved record. That evidence supports booking. No bank details are needed for this step. If a later request changes the process or adds a payment, assess that request separately.",
    "takeaway": "Independent checks help you pursue genuine opportunities confidently.",
    "guidanceUrl": "https://www.ncsc.gov.uk/collection/phishing-scams/spot-scams",
    "level": 2,
    "evidence": [
      {
        "title": "Application record",
        "body": "Displayed sender: Portal opened from your saved application record. You applied through the company’s careers page and saved the portal."
      },
      {
        "title": "Independent confirmation",
        "body": "You confirmed the interview with the recruitment team independently."
      },
      {
        "title": "Portal request",
        "body": "You opened the saved portal yourself. It asks you to select a time, with no payment or bank details."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What is a reasonable next step?",
        "options": [
          {
            "id": "book",
            "text": "Choose a suitable slot in the verified portal and keep the confirmation private.",
            "label": "Book through the verified portal",
            "tool": "task"
          },
          {
            "id": "reject",
            "text": "Wait for a second email before using the independently verified portal.",
            "label": "Wait for another email",
            "tool": "archive"
          },
          {
            "id": "bank",
            "text": "Return to the invitation email and use its link instead of the saved portal.",
            "label": "Use the email link instead",
            "tool": "link"
          }
        ],
        "correct": "book",
        "explanation": "You have independently verified the invitation and reached the application portal through your own saved record. That evidence supports booking. No bank details are needed for this step. If a later request changes the process or adds a payment, assess that request separately.",
        "next": {},
        "insight": "Independent checks help you pursue genuine opportunities confidently."
      }
    ],
    "setup": "You confirmed the interview independently and opened your saved application portal.",
    "surface": "app",
    "contact": {
      "name": "Application portal",
      "source": "Saved application record",
      "response": "Your independent confirmation and saved portal support booking the interview. No payment or bank details are needed."
    }
  },
  {
    "id": "reset",
    "topic": "Check account requests",
    "channel": "Email",
    "sender": "Studio Cloud",
    "address": "security@studio-cloud-alerts.example",
    "subject": "Password reset requested",
    "context": "You did not request a password reset.",
    "message": "Someone requested a reset. If this was not you, use the button below to cancel.",
    "displayLink": "Example message: inspection stays inside the game.",
    "question": "How should you check your account?",
    "options": [
      {
        "id": "a",
        "text": "Open the service through your saved app or bookmark and review its security settings."
      },
      {
        "id": "b",
        "text": "Use the cancel button because you did not request the reset."
      },
      {
        "id": "c",
        "text": "Reply to the sender asking them to cancel it."
      }
    ],
    "correct": "a",
    "hint": "Which action gives you reliable evidence or contains the risk without trusting this message?",
    "explanation": "The message alone does not prove a compromise or establish its sender. Review the account through a route you already trust.",
    "takeaway": "Unexpected security messages deserve an independent check.",
    "judgement": "verify",
    "level": 2,
    "evidence": [
      {
        "title": "Sender details",
        "body": "Displayed sender: security@studio-cloud-alerts.example. The message claims to be Studio Cloud security. You have not independently checked it."
      },
      {
        "title": "Button destination",
        "body": "studio-cloud-alerts.example/cancel. This is a non-working text preview."
      },
      {
        "title": "Your recent activity",
        "body": "You did not request a reset. This alone does not prove the message is genuine or that someone accessed the account."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "How should you check your account?",
        "options": [
          {
            "id": "a",
            "text": "Open the service through your saved app or bookmark and review its security settings.",
            "label": "Check security in my usual app",
            "tool": "verify"
          },
          {
            "id": "b",
            "text": "Use the cancel button because you did not request the reset.",
            "label": "Use the email’s cancel button",
            "tool": "link"
          },
          {
            "id": "c",
            "text": "Reply to the sender asking them to cancel it.",
            "label": "Reply and ask them to cancel it",
            "tool": "reply",
            "draft": "Please cancel this password reset."
          }
        ],
        "correct": "a",
        "explanation": "The message alone does not prove a compromise or establish its sender. Review the account through a route you already trust.",
        "next": {},
        "insight": "Unexpected security messages deserve an independent check."
      }
    ],
    "setup": "You didn’t request a password reset. This email arrives.",
    "surface": "email",
    "contact": {
      "name": "Studio Cloud",
      "source": "Saved app",
      "response": "Account security is available here. Review signed-in devices and password settings without using the email’s cancel button."
    }
  },
  {
    "id": "invoice",
    "topic": "Verify payment changes",
    "channel": "Email",
    "sender": "Northline Accounts",
    "address": "accounts@northline-payments.example",
    "subject": "New bank details. Payment due today.",
    "context": "You work with Northline, a supplier. An invoice arrives with different bank details.",
    "message": "Hi, our bank details have changed. Please send today’s payment to the account on this invoice before midday. Our usual finance contact is unavailable, so reply here if you need anything.",
    "displayLink": "Attachment shown: updated-invoice.pdf (not downloadable)",
    "question": "What should you do before paying?",
    "hint": "How could you verify the change without relying on this message?",
    "options": [
      {
        "id": "pay",
        "text": "Pay because the invoice mentions a supplier you recognise."
      },
      {
        "id": "reply",
        "text": "Reply to this email and ask whether the new details are correct."
      },
      {
        "id": "verify",
        "text": "Pause payment and verify the change with the supplier using contact details you already trust."
      }
    ],
    "correct": "verify",
    "explanation": "A real supplier’s name does not prove who sent the message. Independently checking the request protects against invoice fraud, including messages sent from compromised accounts. Replying to the same message is not an independent check.",
    "takeaway": "Verify payment changes through an established contact route.",
    "judgement": "verify",
    "level": 3,
    "evidence": [
      {
        "title": "Sender details",
        "body": "Displayed sender: accounts@northline-payments.example. A familiar supplier name is shown. The displayed address alone cannot establish that a payment change is authorised."
      },
      {
        "title": "Previous invoice",
        "body": "Your saved previous invoice has different bank details."
      },
      {
        "title": "Contact record",
        "body": "You have a supplier phone number in your existing finance records, separate from this message."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What should you do before paying?",
        "options": [
          {
            "id": "pay",
            "text": "Pay because the invoice mentions a supplier you recognise.",
            "label": "Pay the familiar supplier",
            "tool": "pay"
          },
          {
            "id": "reply",
            "text": "Reply to this email and ask whether the new details are correct.",
            "label": "Reply to confirm the bank details",
            "tool": "reply",
            "draft": "Can you confirm that these new bank details are yours?"
          },
          {
            "id": "verify",
            "text": "Pause payment and verify the change with the supplier using contact details you already trust.",
            "label": "Call my established supplier contact",
            "tool": "verify"
          }
        ],
        "correct": "verify",
        "explanation": "A real supplier’s name does not prove who sent the message. Independently checking the request protects against invoice fraud, including messages sent from compromised accounts. Replying to the same message is not an independent check.",
        "next": {
          "correct": "followup",
          "incorrect": "followup"
        },
        "insight": "Verify payment changes through an established contact route."
      },
      {
        "id": "followup",
        "reveal": "The number from your saved supplier record reaches their finance team. They confirm no bank details have changed.",
        "question": "What should you do with the invoice?",
        "options": [
          {
            "id": "a",
            "text": "Keep payment paused and report the message to your finance or security team.",
            "label": "Pause payment and report it",
            "tool": "report"
          },
          {
            "id": "b",
            "text": "Pay the old account without checking the invoice itself.",
            "label": "Pay the old account instead",
            "tool": "pay"
          },
          {
            "id": "c",
            "text": "Reply to the suspicious sender with the supplier’s confirmation.",
            "label": "Reply with the supplier’s confirmation",
            "tool": "reply",
            "draft": "Northline told me the bank details have not changed."
          }
        ],
        "correct": "a",
        "explanation": "The independent check contradicts the new instruction. Preserve the message and follow your payment and reporting process.",
        "insight": "The independent check contradicts the new instruction."
      }
    ],
    "setup": "A supplier you use sends an invoice with different bank details.",
    "surface": "email",
    "contact": {
      "name": "Northline finance",
      "source": "Saved supplier number",
      "response": "Northline finance: our bank details have not changed. Please keep the payment paused while we investigate that message."
    }
  },
  {
    "id": "payroll-follow-up",
    "pack": "Work",
    "judgement": "verify",
    "difficulty": "intermediate",
    "topic": "Recognise when more evidence is needed",
    "channel": "Team chat",
    "sender": "Payroll team account",
    "address": "Internal direct message",
    "subject": "Bank details confirmation",
    "context": "You recently asked payroll how to change your salary account. A familiar internal account now asks you to send the new details directly in chat. You do not know the approved process.",
    "message": "I can make that change for you. Send the sort code and account number here before this afternoon’s payroll run.",
    "displayLink": "No bank details collected. Fictional conversation.",
    "question": "Can you establish whether this is safe from the message alone?",
    "hint": "The timing fits, but you still need to confirm the process for sharing sensitive information.",
    "options": [
      {
        "id": "known",
        "text": "Yes. An internal account makes the request safe."
      },
      {
        "id": "scam",
        "text": "Yes. Any payroll request about bank details must be a scam."
      },
      {
        "id": "process",
        "text": "No. Verify the request and approved process through your established payroll contact before sending details."
      }
    ],
    "correct": "process",
    "explanation": "This request could be genuine, but the scenario does not establish that chat is an approved way to submit bank details. Matching context is useful evidence, not a complete check. Confirm through an established route and use the approved method. Sensitive information requests are not automatically fraudulent.",
    "takeaway": "You can choose a safe action without deciding that someone is a scammer.",
    "guidanceUrl": "https://www.ncsc.gov.uk/collection/phishing-scams/spot-scams",
    "level": 3,
    "evidence": [
      {
        "title": "Request history",
        "body": "Displayed sender: Internal direct message. You recently requested a payroll change. This follow-up asks you to confirm it."
      },
      {
        "title": "Message route",
        "body": "The request arrived through a familiar internal chat account. That does not establish whether this is the approved process for handling bank details."
      },
      {
        "title": "Internal directory",
        "body": "Your staff directory lists a payroll contact and an established employee portal."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "Can you establish whether this is safe from the message alone?",
        "options": [
          {
            "id": "known",
            "text": "Yes. An internal account makes the request safe.",
            "label": "Trust the internal account",
            "tool": "reply",
            "draft": "I will send my new salary account details here."
          },
          {
            "id": "scam",
            "text": "Yes. Any payroll request about bank details must be a scam.",
            "label": "Treat every payroll request as a scam",
            "tool": "report"
          },
          {
            "id": "process",
            "text": "No. Verify the request and approved process through your established payroll contact before sending details.",
            "label": "Check payroll’s usual process",
            "tool": "verify"
          }
        ],
        "correct": "process",
        "explanation": "This request could be genuine, but the scenario does not establish that chat is an approved way to submit bank details. Matching context is useful evidence, not a complete check. Confirm through an established route and use the approved method. Sensitive information requests are not automatically fraudulent.",
        "next": {
          "correct": "followup",
          "incorrect": "followup"
        },
        "insight": "You can choose a safe action without deciding that someone is a scammer."
      },
      {
        "id": "followup",
        "reveal": "Payroll confirms through the internal directory that they sent the request. They direct you to your usual employee portal.",
        "question": "What is reasonable now?",
        "options": [
          {
            "id": "a",
            "text": "Open the usual portal yourself and complete the confirmed change there.",
            "label": "Open my usual employee portal",
            "tool": "task"
          },
          {
            "id": "b",
            "text": "Send bank details back to the original email instead.",
            "label": "Send the bank details by email",
            "tool": "reply",
            "draft": "I will send my new bank details by email."
          },
          {
            "id": "c",
            "text": "Reject the change even after this independent confirmation.",
            "label": "Reject it despite the independent check",
            "tool": "archive"
          }
        ],
        "correct": "a",
        "explanation": "The established contact and familiar portal provide evidence to proceed with the confirmed task.",
        "insight": "The established contact and familiar portal provide evidence to proceed with the confirmed task."
      }
    ],
    "setup": "You asked about changing your salary account. An internal chat account replies.",
    "surface": "text",
    "contact": {
      "name": "Payroll team",
      "source": "Internal directory",
      "response": "Payroll: yes, we sent a follow-up. Please use the employee portal for the change, rather than sending bank details in chat."
    }
  },
  {
    "id": "recruiter-equipment",
    "pack": "Career",
    "judgement": "suspicious",
    "difficulty": "starter",
    "topic": "Check an offer before paying",
    "channel": "Recruitment email",
    "sender": "Mara at Alder Studio",
    "address": "hiring@alder-careers.example",
    "subject": "Your developer starter kit",
    "context": "You applied for a junior developer role. After a short chat, an offer arrives asking you to buy equipment from a specified seller.",
    "message": "We would like you to join the team. Your laptop and security kit cost £185, which we will reimburse with your first salary. Please pay our equipment partner today so we can reserve your start date.",
    "displayLink": "alder-kit.example/checkout (fictional, non-working text)",
    "question": "What should you do before accepting this payment request?",
    "hint": "An offer can feel exciting. What independent check would protect both your money and your decision?",
    "options": [
      {
        "id": "verify",
        "text": "Pause the payment and confirm the offer and equipment policy through company contact details found independently."
      },
      {
        "id": "pay",
        "text": "Pay because the employer has promised to reimburse you."
      },
      {
        "id": "invoice",
        "text": "Ask the same recruiter for a branded invoice, then pay."
      }
    ],
    "correct": "verify",
    "explanation": "An upfront equipment payment tied to a job offer is a serious warning sign. A reimbursement promise or branded invoice can be invented. Check the company and vacancy independently before sending money or sensitive information. Applying for a real vacancy does not authenticate every message about it.",
    "takeaway": "Verify job offers independently before paying for equipment.",
    "guidanceUrl": "https://consumer.ftc.gov/consumer-alerts/2023/12/how-spot-latest-job-scams",
    "level": 3,
    "evidence": [
      {
        "title": "Offer history",
        "body": "Displayed sender: hiring@alder-careers.example. The offer arrived after a short chat. You have not independently confirmed it with the employer."
      },
      {
        "title": "Equipment request",
        "body": "The recruiter specifies a seller and asks for an upfront £185 payment with reimbursement later."
      },
      {
        "title": "Verification route",
        "body": "The employer’s careers site provides a route to check the recruiter, offer and equipment policy independently."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What should you do before accepting this payment request?",
        "options": [
          {
            "id": "verify",
            "text": "Pause the payment and confirm the offer and equipment policy through company contact details found independently.",
            "label": "Check the offer with the company",
            "tool": "verify"
          },
          {
            "id": "pay",
            "text": "Pay because the employer has promised to reimburse you.",
            "label": "Pay. They promised reimbursement",
            "tool": "pay"
          },
          {
            "id": "invoice",
            "text": "Ask the same recruiter for a branded invoice, then pay.",
            "label": "Ask this recruiter for an invoice",
            "tool": "reply",
            "draft": "Please send me a branded equipment invoice."
          }
        ],
        "correct": "verify",
        "explanation": "An upfront equipment payment tied to a job offer is a serious warning sign. A reimbursement promise or branded invoice can be invented. Check the company and vacancy independently before sending money or sensitive information. Applying for a real vacancy does not authenticate every message about it.",
        "next": {
          "correct": "followup",
          "incorrect": "followup"
        },
        "insight": "Verify job offers independently before paying for equipment."
      },
      {
        "id": "followup",
        "reveal": "You contact the employer through its careers website. They have no record of the recruiter or your offer.",
        "question": "What should happen next?",
        "options": [
          {
            "id": "a",
            "text": "Stop contact and report the account on the recruitment platform.",
            "label": "Stop contact. Report the account",
            "tool": "report"
          },
          {
            "id": "b",
            "text": "Ask the recruiter for a discount on the equipment.",
            "label": "Ask for a discount",
            "tool": "reply",
            "draft": "Can you reduce the equipment fee?"
          },
          {
            "id": "c",
            "text": "Send identity documents to the recruiter to restart the application.",
            "label": "Send ID to restart the application",
            "tool": "access"
          }
        ],
        "correct": "a",
        "explanation": "The independently contacted employer has contradicted the offer. Do not send money or documents to the account.",
        "insight": "The independently contacted employer has contradicted the offer."
      }
    ],
    "setup": "A developer job offer arrives after a short chat. There’s an upfront equipment fee.",
    "surface": "email",
    "contact": {
      "name": "Alder recruitment",
      "source": "Company careers page",
      "response": "We have no record of that recruiter or your offer. Please do not pay the equipment seller in that message."
    }
  },
  {
    "id": "task-wallet",
    "pack": "Career",
    "judgement": "suspicious",
    "difficulty": "intermediate",
    "topic": "Look beyond a first payout",
    "channel": "Messaging app",
    "sender": "Product Review Partner",
    "address": "Unsolicited work offer",
    "subject": "Unlock your remaining earnings",
    "context": "An online task service paid you £8 for rating products. Its dashboard now shows £160 in earnings, but withdrawal requires a deposit.",
    "message": "Great progress. Your next task bundle needs a £45 wallet top-up. Once complete, you can withdraw your full commission. Other members have already finished today.",
    "displayLink": "Balance shown in a fictional dashboard. No payment function.",
    "question": "What is the safest next step?",
    "hint": "Does receiving a small payment prove the larger balance is real?",
    "options": [
      {
        "id": "deposit",
        "text": "Deposit £45 because the service already paid you once."
      },
      {
        "id": "ask-group",
        "text": "Ask members of the service’s own group whether they deposited money."
      },
      {
        "id": "stop",
        "text": "Stop sending money, keep evidence of the messages and report the offer through appropriate channels."
      }
    ],
    "correct": "stop",
    "explanation": "Task scams may pay a small amount to build trust, then demand deposits to unlock supposed earnings. A dashboard balance and testimonials inside the same group are not independent evidence. Do not chase the displayed balance with more payments. If you already paid, promptly contact your payment provider through a trusted route.",
    "takeaway": "A small payout does not make a pay-to-withdraw scheme safe.",
    "guidanceUrl": "https://consumer.ftc.gov/consumer-alerts/2025/08/how-spot-avoid-task-scams",
    "level": 3,
    "evidence": [
      {
        "title": "Payment history",
        "body": "Displayed sender: Unsolicited work offer. The service paid you £8 before asking for a £45 deposit."
      },
      {
        "title": "Displayed earnings",
        "body": "The dashboard shows £160. A displayed balance does not establish that money can be withdrawn."
      },
      {
        "title": "Group messages",
        "body": "The people recommending deposits are in the service’s own group, not an independent source."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What is the safest next step?",
        "options": [
          {
            "id": "deposit",
            "text": "Deposit £45 because the service already paid you once.",
            "label": "Top up. They paid me before",
            "tool": "pay"
          },
          {
            "id": "ask-group",
            "text": "Ask members of the service’s own group whether they deposited money.",
            "label": "Ask the service’s own group",
            "tool": "reply",
            "draft": "Has anyone in this group paid the deposit and withdrawn?"
          },
          {
            "id": "stop",
            "text": "Stop sending money, keep evidence of the messages and report the offer through appropriate channels.",
            "label": "Stop paying. Keep evidence and report",
            "tool": "report"
          }
        ],
        "correct": "stop",
        "explanation": "Task scams may pay a small amount to build trust, then demand deposits to unlock supposed earnings. A dashboard balance and testimonials inside the same group are not independent evidence. Do not chase the displayed balance with more payments. If you already paid, promptly contact your payment provider through a trusted route.",
        "next": {
          "correct": "followup",
          "incorrect": "followup"
        },
        "insight": "A small payout does not make a pay-to-withdraw scheme safe."
      },
      {
        "id": "followup",
        "reveal": "The platform displays more earnings, but says you must deposit another £80 to withdraw them.",
        "question": "Does the displayed balance change your decision?",
        "options": [
          {
            "id": "a",
            "text": "No. Stop paying and retain the messages and payment records for reporting.",
            "label": "Stop paying. Save the records",
            "tool": "report"
          },
          {
            "id": "b",
            "text": "Yes. Pay once more because the balance now covers the deposit.",
            "label": "Pay once more to unlock the balance",
            "tool": "pay"
          },
          {
            "id": "c",
            "text": "Borrow the deposit so the earnings are not lost.",
            "label": "Borrow the deposit",
            "tool": "pay"
          }
        ],
        "correct": "a",
        "explanation": "An on-screen balance is not proof that withdrawable earnings exist. Further payment can increase the loss.",
        "insight": "An on-screen balance is not proof that withdrawable earnings exist."
      }
    ],
    "setup": "A task site paid you £8. Now it shows £160, but wants money before you withdraw.",
    "surface": "app",
    "contact": {
      "name": "Task service",
      "source": "Service’s own group",
      "response": "The service’s own group is not independent evidence that a deposit or promised withdrawal is safe."
    }
  },
  {
    "id": "verified-support-session",
    "pack": "Work",
    "judgement": "supported",
    "difficulty": "intermediate",
    "topic": "Distinguish verified support from unsolicited access",
    "channel": "Work support portal",
    "sender": "Your IT support team",
    "address": "Established internal support portal",
    "subject": "Your printer support appointment",
    "context": "You raised a printer ticket in your usual support portal. You confirmed the appointment there and verified the technician through your organisation’s established process.",
    "message": "Your scheduled support session is ready. The technician will use our approved support tool. Close private documents and stay with your device during the session.",
    "displayLink": "Approved workflow in the support portal. No remote-control software is provided by this game.",
    "question": "Is it reasonable to proceed?",
    "hint": "Who started this request, and how was the technician verified?",
    "options": [
      {
        "id": "never",
        "text": "Cancel the confirmed session because any remote access is automatically unsafe."
      },
      {
        "id": "proceed",
        "text": "Yes, through the verified appointment and approved tool, following your organisation’s support procedure."
      },
      {
        "id": "password",
        "text": "Let the technician work unattended because the appointment was verified."
      }
    ],
    "correct": "proceed",
    "explanation": "Remote support can be legitimate when you requested it, independently verified the appointment and use an approved process. That differs from an unsolicited warning demanding access. Stay present and do not send your password. Pause if the session departs from the agreed procedure.",
    "takeaway": "Verify the support process; remote access alone does not establish a scam.",
    "guidanceUrl": "https://consumer.ftc.gov/articles/how-spot-avoid-and-report-tech-support-scams",
    "level": 3,
    "evidence": [
      {
        "title": "Support ticket",
        "body": "Displayed sender: Established internal support portal. You raised the printer ticket through your normal help desk."
      },
      {
        "title": "Independent confirmation",
        "body": "You confirmed the appointment through the help desk using your established contact route."
      },
      {
        "title": "Scope of support",
        "body": "The agreed session is for the printer. Any later request for passwords or unrelated access needs a separate assessment."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "Is it reasonable to proceed?",
        "options": [
          {
            "id": "never",
            "text": "Cancel the confirmed session because any remote access is automatically unsafe.",
            "label": "Cancel. Remote support is always unsafe",
            "tool": "archive"
          },
          {
            "id": "proceed",
            "text": "Yes, through the verified appointment and approved tool, following your organisation’s support procedure.",
            "label": "Use the verified appointment and tool",
            "tool": "task"
          },
          {
            "id": "password",
            "text": "Let the technician work unattended because the appointment was verified.",
            "label": "Let them work while I step away",
            "tool": "access"
          }
        ],
        "correct": "proceed",
        "explanation": "Remote support can be legitimate when you requested it, independently verified the appointment and use an approved process. That differs from an unsolicited warning demanding access. Stay present and do not send your password. Pause if the session departs from the agreed procedure.",
        "next": {
          "correct": "followup",
          "incorrect": "followup"
        },
        "insight": "Verify the support process; remote access alone does not establish a scam."
      },
      {
        "id": "followup",
        "reveal": "During the confirmed printer session, the technician asks you to read out a one-time sign-in code for your email.",
        "question": "Does confirming the appointment cover this request?",
        "options": [
          {
            "id": "a",
            "text": "No. Stop and check this unexpected request with the help desk through your normal route.",
            "label": "Stop. Check with our usual help desk",
            "tool": "verify"
          },
          {
            "id": "b",
            "text": "Yes. The earlier appointment verification covers all later requests.",
            "label": "Share it. The appointment was verified",
            "tool": "reply",
            "draft": "Here is my email sign-in code: 381 604."
          },
          {
            "id": "c",
            "text": "Share half the code first as a compromise.",
            "label": "Share half the code first",
            "tool": "reply",
            "draft": "Here is the first half of my sign-in code: 381."
          }
        ],
        "correct": "a",
        "explanation": "An authorised appointment does not make every later request appropriate. A sign-in code can grant account access.",
        "insight": "An authorised appointment does not make every later request appropriate."
      }
    ],
    "setup": "You booked printer support and verified the appointment in your usual help desk.",
    "surface": "app",
    "contact": {
      "name": "IT help desk",
      "source": "Staff directory",
      "response": "Printer ticket 204 is confirmed. Use the approved support tool and stay with the device during the session."
    }
  },
  {
    "id": "shared-document",
    "topic": "Check the access route",
    "channel": "Email",
    "sender": "Project files",
    "address": "share@project-files.example",
    "subject": "Your delivery plan is ready",
    "context": "A colleague said they would share a plan, but did not name the sharing service.",
    "message": "Open the shared plan and sign in with your work email to view the latest milestones.",
    "displayLink": "Example message: inspection stays inside the game.",
    "question": "What would help you establish whether to proceed?",
    "options": [
      {
        "id": "a",
        "text": "Ask the colleague through your established work chat and locate the file in your normal workspace."
      },
      {
        "id": "b",
        "text": "Use the link because the subject matches your current project."
      },
      {
        "id": "c",
        "text": "Enter your email first and decide when the password page appears."
      }
    ],
    "correct": "a",
    "hint": "Which action gives you reliable evidence or contains the risk without trusting this message?",
    "explanation": "An expected topic makes a request plausible. An established conversation and your usual workspace provide a stronger way to check it.",
    "takeaway": "Expected content can still arrive through an untrusted route.",
    "judgement": "verify",
    "level": 3,
    "evidence": [
      {
        "title": "Expected work",
        "body": "Displayed sender: share@project-files.example. A colleague said they would share a plan. They did not confirm this particular service."
      },
      {
        "title": "Link destination",
        "body": "project-files.example/view. The preview stays inside the game."
      },
      {
        "title": "Independent route",
        "body": "You can ask the colleague in your established work chat and look for the plan in your usual workspace."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What would help you establish whether to proceed?",
        "options": [
          {
            "id": "a",
            "text": "Ask the colleague through your established work chat and locate the file in your normal workspace.",
            "label": "Check with my colleague in our work chat",
            "tool": "verify"
          },
          {
            "id": "b",
            "text": "Use the link because the subject matches your current project.",
            "label": "Open it. The project name matches",
            "tool": "link"
          },
          {
            "id": "c",
            "text": "Enter your email first and decide when the password page appears.",
            "label": "Enter my email and see what happens",
            "tool": "link"
          }
        ],
        "correct": "a",
        "explanation": "An expected topic makes a request plausible. An established conversation and your usual workspace provide a stronger way to check it.",
        "next": {
          "correct": "followup",
          "incorrect": "followup"
        },
        "insight": "Expected content can still arrive through an untrusted route."
      },
      {
        "id": "followup",
        "reveal": "Your colleague confirms in your usual work chat that they shared the plan. You find it in the normal project workspace.",
        "question": "How should you open it?",
        "options": [
          {
            "id": "a",
            "text": "Use the copy in your established workspace.",
            "label": "Open the file in our usual workspace",
            "tool": "task"
          },
          {
            "id": "b",
            "text": "Return to the original email and enter your password there.",
            "label": "Return to the email and sign in",
            "tool": "link"
          },
          {
            "id": "c",
            "text": "Ask the colleague to send their password to avoid another sign-in.",
            "label": "Ask for my colleague’s password",
            "tool": "reply",
            "draft": "Could you send me your password to open the plan?"
          }
        ],
        "correct": "a",
        "explanation": "Independent confirmation plus the existing workspace supports opening the expected file there.",
        "insight": "Independent confirmation plus the existing workspace supports opening the expected file there."
      }
    ],
    "setup": "A colleague promised to share a plan. This email arrives.",
    "surface": "email",
    "contact": {
      "name": "Project colleague",
      "source": "Usual work chat",
      "response": "Yes, I shared the plan. You can find it in our usual project workspace without using that email link."
    }
  },
  {
    "id": "familiar-voice",
    "pack": "Everyday",
    "judgement": "suspicious",
    "difficulty": "intermediate",
    "topic": "Verify urgent requests from familiar voices",
    "channel": "Voice message transcript",
    "sender": "Someone sounding like your sister",
    "address": "Message from an unfamiliar number",
    "subject": "Please book this for me",
    "context": "A voice message sounds like your sister. It asks you to transfer £90 for an urgent journey and not call because the microphone is broken.",
    "message": "I need to get home and my banking app will not open. Please send £90 to the account I have just texted. I will explain later. Do not ring this phone, it is playing up.",
    "displayLink": "Audio represented by text. No recording or bank details.",
    "question": "What should you do before sending money?",
    "hint": "What could confirm the request independently of the voice message?",
    "options": [
      {
        "id": "voice",
        "text": "Transfer the money because you recognise the voice."
      },
      {
        "id": "callback",
        "text": "Contact your sister using her saved number or another established route to check the request."
      },
      {
        "id": "small",
        "text": "Send half the money now to reduce the risk."
      }
    ],
    "correct": "callback",
    "explanation": "Voices can be imitated, including with AI, so familiarity alone does not authenticate a request. This example does not establish whether AI was used. Check through a route you already know. A smaller transfer still gives money to an unverified recipient.",
    "takeaway": "A familiar voice is a reason to care, not proof of identity.",
    "guidanceUrl": "https://consumer.ftc.gov/comment/180311",
    "level": 4,
    "evidence": [
      {
        "title": "Voice and identity",
        "body": "Displayed sender: Message from an unfamiliar number. The recording sounds like your sister. A familiar-sounding recording does not establish who sent it."
      },
      {
        "title": "Payment details",
        "body": "The request uses bank details sent in a new text and asks for an urgent £90 transfer."
      },
      {
        "title": "Contact route",
        "body": "You have her saved number and other established ways to reach her. The message discourages a call."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What should you do before sending money?",
        "options": [
          {
            "id": "voice",
            "text": "Transfer the money because you recognise the voice.",
            "label": "Send the money. I know that voice",
            "tool": "pay"
          },
          {
            "id": "callback",
            "text": "Contact your sister using her saved number or another established route to check the request.",
            "label": "Contact my sister on her saved number",
            "tool": "verify"
          },
          {
            "id": "small",
            "text": "Send half the money now to reduce the risk.",
            "label": "Send half to limit the risk",
            "tool": "pay"
          }
        ],
        "correct": "callback",
        "explanation": "Voices can be imitated, including with AI, so familiarity alone does not authenticate a request. This example does not establish whether AI was used. Check through a route you already know. A smaller transfer still gives money to an unverified recipient.",
        "next": {
          "correct": "followup",
          "incorrect": "followup"
        },
        "insight": "A familiar voice is a reason to care, not proof of identity."
      },
      {
        "id": "followup",
        "reveal": "You contact your sister using her saved number. She says she did not send the voice request.",
        "question": "What should you do next?",
        "options": [
          {
            "id": "a",
            "text": "Report the impersonation through your workplace process and stop responding.",
            "label": "Report it and stop responding",
            "tool": "report"
          },
          {
            "id": "b",
            "text": "Trust the voice message because it sounds familiar.",
            "label": "Trust the familiar-sounding recording",
            "tool": "pay"
          },
          {
            "id": "c",
            "text": "Send a small payment to test the request.",
            "label": "Send a small test payment",
            "tool": "pay"
          }
        ],
        "correct": "a",
        "explanation": "A familiar-sounding voice is not a reliable identity check. Your sister, reached through an established route, has denied the request.",
        "insight": "A familiar-sounding voice is not a reliable identity check."
      }
    ],
    "setup": "A recording sounds like your sister. A new text supplies bank details.",
    "surface": "text",
    "contact": {
      "name": "Your sister",
      "source": "Saved phone contact",
      "response": "That wasn’t me. I’m fine, and I didn’t ask you to send money."
    }
  },
  {
    "id": "meeting-tool-permissions",
    "pack": "Work",
    "judgement": "suspicious",
    "difficulty": "intermediate",
    "topic": "Check what an app wants to access",
    "channel": "App consent screen",
    "sender": "MeetBrief",
    "address": "Fictional third-party app",
    "subject": "Allow MeetBrief to connect?",
    "context": "An unsolicited message suggests a meeting-summary tool. Its sign-in screen requests permission to read all email and send messages on your behalf.",
    "message": "Connect your work account to create meeting notes. Requested access: read your mailbox and send email as you. Accept to continue.",
    "displayLink": "Consent screen is simulated. No account connection is possible.",
    "question": "What should you check before accepting?",
    "hint": "A genuine sign-in service can still ask you to authorise a third-party app.",
    "options": [
      {
        "id": "sign-in",
        "text": "Accept because the account sign-in screen looks familiar."
      },
      {
        "id": "review",
        "text": "Pause and check the app, its requested access and organisational approval through a trusted route."
      },
      {
        "id": "password",
        "text": "Accept because the app has not asked you to send it your password."
      }
    ],
    "correct": "review",
    "explanation": "Account permissions can expose information without asking you to send a password. A familiar sign-in screen does not establish that the third-party app is trustworthy. Here the unsolicited approach and extensive access request justify pausing. Confirm what access the tool actually needs and follow your organisation’s approval process.",
    "takeaway": "Review app permissions as carefully as password requests.",
    "guidanceUrl": "https://www.ncsc.gov.uk/collection/phishing-scams/spot-scams",
    "level": 4,
    "evidence": [
      {
        "title": "Where it came from",
        "body": "Displayed sender: Fictional third-party app. The suggestion arrived in an unsolicited message, rather than through your approved software process."
      },
      {
        "title": "Requested permissions",
        "body": "The app requests access to read all email and send messages as you, beyond access to a single meeting."
      },
      {
        "title": "Sign-in page",
        "body": "A familiar account authorisation screen can still be asking you to grant access to an untrusted app."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What should you check before accepting?",
        "options": [
          {
            "id": "sign-in",
            "text": "Accept because the account sign-in screen looks familiar.",
            "label": "Accept. The sign-in page looks familiar",
            "tool": "access"
          },
          {
            "id": "review",
            "text": "Pause and check the app, its requested access and organisational approval through a trusted route.",
            "label": "Check the app and permissions with IT",
            "tool": "verify"
          },
          {
            "id": "password",
            "text": "Accept because the app has not asked you to send it your password.",
            "label": "Accept. It hasn’t asked for my password",
            "tool": "access"
          }
        ],
        "correct": "review",
        "explanation": "Account permissions can expose information without asking you to send a password. A familiar sign-in screen does not establish that the third-party app is trustworthy. Here the unsolicited approach and extensive access request justify pausing. Confirm what access the tool actually needs and follow your organisation’s approval process.",
        "next": {
          "correct": "followup",
          "incorrect": "followup"
        },
        "insight": "Review app permissions as carefully as password requests."
      },
      {
        "id": "followup",
        "reveal": "Your IT team confirms an approved meeting-summary tool is available with access limited to the meeting, without connecting this app to your mailbox.",
        "question": "What is the better choice?",
        "options": [
          {
            "id": "a",
            "text": "Use the approved tool with access limited to the meeting.",
            "label": "Use the approved, limited-access tool",
            "tool": "task"
          },
          {
            "id": "b",
            "text": "Grant the app access anyway because the meeting is genuine.",
            "label": "Connect the original app anyway",
            "tool": "access"
          },
          {
            "id": "c",
            "text": "Give the app your email password instead of granting permissions.",
            "label": "Give the app my password instead",
            "tool": "reply",
            "draft": "I will give the app my email password."
          }
        ],
        "correct": "a",
        "explanation": "An approved alternative meets the need without granting this unsolicited app unrelated access.",
        "insight": "An approved alternative meets the need without granting this unsolicited app unrelated access."
      }
    ],
    "setup": "An unsolicited message recommends a meeting-notes app. You see this permission request.",
    "surface": "app",
    "contact": {
      "name": "IT help desk",
      "source": "Staff directory",
      "response": "Use our approved meeting tool. The unsolicited app is not needed, and should not have access to your whole mailbox."
    }
  },
  {
    "id": "mfa",
    "topic": "Protect account access",
    "channel": "Authenticator notification",
    "sender": "Your work sign-in app",
    "address": "Sign-in approval request",
    "subject": "Approve this sign-in?",
    "context": "You are making tea. You have not tried to sign in to your work account.",
    "message": "A sign-in needs your approval. Location shown: London. Is this you?",
    "displayLink": "This is a fictional prompt, not a working sign-in screen.",
    "question": "How should you respond?",
    "hint": "The important clue is whether you started this sign-in, not the displayed location.",
    "options": [
      {
        "id": "deny",
        "text": "Deny it and contact your IT or security team through your usual support route."
      },
      {
        "id": "approve",
        "text": "Approve it because the location looks familiar."
      },
      {
        "id": "repeat",
        "text": "Ask a colleague whether they also received a prompt before deciding whether to approve."
      }
    ],
    "correct": "deny",
    "explanation": "Multi-factor authentication (MFA) adds a further check at sign-in. Do not approve a request you did not initiate. Repeated prompts can pressure people into allowing access. Report the unexpected request and follow your organisation’s account-security process.",
    "takeaway": "Only approve sign-ins you initiated and recognise.",
    "judgement": "suspicious",
    "level": 4,
    "evidence": [
      {
        "title": "Your recent activity",
        "body": "Displayed sender: Sign-in approval request. You have not initiated a sign-in."
      },
      {
        "title": "Location shown",
        "body": "London is familiar, but an approximate location does not prove the sign-in is yours."
      },
      {
        "title": "Effect of approval",
        "body": "Approving confirms a sign-in attempt. Your usual help desk is available independently of the prompt."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "How should you respond?",
        "options": [
          {
            "id": "deny",
            "text": "Deny it and contact your IT or security team through your usual support route.",
            "label": "Deny it. Contact our usual IT team",
            "tool": "verify"
          },
          {
            "id": "approve",
            "text": "Approve it because the location looks familiar.",
            "label": "Approve. London looks familiar",
            "tool": "access"
          },
          {
            "id": "repeat",
            "text": "Ask a colleague whether they also received a prompt before deciding whether to approve.",
            "label": "Ask a colleague before deciding",
            "tool": "verify"
          }
        ],
        "correct": "deny",
        "explanation": "Multi-factor authentication (MFA) adds a further check at sign-in. Do not approve a request you did not initiate. Repeated prompts can pressure people into allowing access. Report the unexpected request and follow your organisation’s account-security process.",
        "next": {
          "correct": "followup",
          "incorrect": "followup"
        },
        "insight": "Only approve sign-ins you initiated and recognise."
      },
      {
        "id": "followup",
        "reveal": "After you reject the request, a caller claiming to be IT asks you to approve the next one to stop the alerts.",
        "question": "What should you do?",
        "options": [
          {
            "id": "a",
            "text": "Do not approve it. Contact IT through your established help desk.",
            "label": "Refuse. Contact the usual help desk",
            "tool": "verify"
          },
          {
            "id": "b",
            "text": "Approve once so the caller can finish their investigation.",
            "label": "Approve once to help the caller",
            "tool": "access"
          },
          {
            "id": "c",
            "text": "Ask the caller to read your name before approving.",
            "label": "Ask them to confirm my name first",
            "tool": "reply",
            "draft": "Can you confirm my name before I approve?"
          }
        ],
        "correct": "a",
        "explanation": "A follow-up caller can be part of the same attempt. Keep sign-in approval tied to actions you initiated.",
        "insight": "A follow-up caller can be part of the same attempt."
      }
    ],
    "setup": "You’re making tea. You haven’t tried to sign in.",
    "surface": "app",
    "contact": {
      "name": "IT help desk",
      "source": "Staff directory",
      "response": "Thanks for denying the sign-in. We’ll review it through the usual help-desk ticket. Do not approve prompts you did not initiate."
    }
  },
  {
    "id": "security-alert-in-app",
    "pack": "Everyday",
    "judgement": "supported",
    "difficulty": "intermediate",
    "topic": "Act on security concerns through trusted routes",
    "channel": "Account security settings",
    "sender": "Your usual email service",
    "address": "App opened directly from your device",
    "subject": "Review an unfamiliar session",
    "context": "After receiving an email alert, you avoid its link and open your usual email app yourself. The account security section shows an active session you do not recognise.",
    "message": "A device has accessed your account. Review the session and use the account-security controls if you do not recognise it.",
    "displayLink": "Information inside the genuine account app. Simulated controls only.",
    "question": "What should you do with this information?",
    "hint": "Ignoring the email link was sensible. Does that mean ignoring independently confirmed account activity?",
    "options": [
      {
        "id": "dismiss",
        "text": "Wait for another email alert before investigating the unfamiliar session."
      },
      {
        "id": "email",
        "text": "Return to the original email and use its link to fix the problem."
      },
      {
        "id": "secure",
        "text": "Review the session through the app’s security controls and follow the service’s process to secure the account if it is not yours."
      }
    ],
    "correct": "secure",
    "explanation": "You reached the account independently and found supporting evidence there. Review it using the service’s genuine controls. If the session is not yours, follow its account-recovery guidance. For a work account, involve IT or security promptly. The original email itself has not been authenticated by this check.",
    "takeaway": "Check alerts independently, then act on concerns confirmed in the genuine service.",
    "guidanceUrl": "https://www.ncsc.gov.uk/collection/phishing-scams/spot-scams",
    "level": 4,
    "evidence": [
      {
        "title": "How you arrived",
        "body": "Displayed sender: App opened directly from your device. You opened the account app yourself rather than following an alert link."
      },
      {
        "title": "Session record",
        "body": "The app lists an unfamiliar signed-in session."
      },
      {
        "title": "Available controls",
        "body": "The real account provides controls to end the session and review account security."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What should you do with this information?",
        "options": [
          {
            "id": "dismiss",
            "text": "Wait for another email alert before investigating the unfamiliar session.",
            "label": "Wait for another alert",
            "tool": "archive"
          },
          {
            "id": "email",
            "text": "Return to the original email and use its link to fix the problem.",
            "label": "Go back to the email link",
            "tool": "link"
          },
          {
            "id": "secure",
            "text": "Review the session through the app’s security controls and follow the service’s process to secure the account if it is not yours.",
            "label": "Review and secure the account in the app",
            "tool": "task"
          }
        ],
        "correct": "secure",
        "explanation": "You reached the account independently and found supporting evidence there. Review it using the service’s genuine controls. If the session is not yours, follow its account-recovery guidance. For a work account, involve IT or security promptly. The original email itself has not been authenticated by this check.",
        "next": {
          "correct": "followup",
          "incorrect": "followup"
        },
        "insight": "Check alerts independently, then act on concerns confirmed in the genuine service."
      },
      {
        "id": "followup",
        "reveal": "You end the unfamiliar session in the real app. It also lists a connected app you do not recognise.",
        "question": "What else needs attention?",
        "options": [
          {
            "id": "a",
            "text": "Review and revoke unfamiliar app access, secure the account and get trusted help if needed.",
            "label": "Review app access and secure the account",
            "tool": "task"
          },
          {
            "id": "b",
            "text": "Assume ending one session removes all possible access.",
            "label": "Assume ending the session fixed everything",
            "tool": "archive"
          },
          {
            "id": "c",
            "text": "Contact the unfamiliar app using details in an alert message.",
            "label": "Contact the app through the alert",
            "tool": "reply",
            "draft": "Please help me through the contact in the alert."
          }
        ],
        "correct": "a",
        "explanation": "Sessions and connected app permissions can be separate. Review both through real account settings.",
        "insight": "Sessions and connected app permissions can be separate."
      }
    ],
    "setup": "You skip an email link and open your usual app. It shows an unfamiliar session.",
    "surface": "app",
    "contact": {
      "name": "Account security",
      "source": "Saved app",
      "response": "The real account settings show the unfamiliar session and controls to end it and review other access."
    }
  },
  {
    "id": "thread",
    "topic": "Verify changes in familiar conversations",
    "channel": "Email",
    "sender": "Northline Accounts",
    "address": "accounts@northline.example",
    "subject": "Re: October invoice 1042",
    "context": "The email appears in your existing supplier thread and quotes the correct invoice amount.",
    "message": "A final change: please use the new bank details attached. The finance lead is travelling, so please confirm by replying here.",
    "displayLink": "Example message: inspection stays inside the game.",
    "question": "Does the existing thread establish that the payment change is genuine?",
    "options": [
      {
        "id": "a",
        "text": "No. Pause payment and verify the change using an established supplier contact."
      },
      {
        "id": "b",
        "text": "Yes, because the earlier conversation is genuine."
      },
      {
        "id": "c",
        "text": "Ask for a second email from another address in the signature."
      }
    ],
    "correct": "a",
    "hint": "Which action gives you reliable evidence or contains the risk without trusting this message?",
    "explanation": "An existing conversation and accurate invoice details do not establish that a new payment instruction is authorised. A compromised mailbox can make a request convincing.",
    "takeaway": "Verify sensitive changes even inside familiar conversations.",
    "judgement": "verify",
    "level": 4,
    "evidence": [
      {
        "title": "Conversation history",
        "body": "Displayed sender: accounts@northline.example. The message appears in a genuine earlier conversation. This does not establish who currently controls the mailbox."
      },
      {
        "title": "Invoice details",
        "body": "The invoice number and amount are correct. The bank details have changed."
      },
      {
        "title": "Saved contact",
        "body": "Your finance records contain a supplier number saved before this message."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "Does the existing thread establish that the payment change is genuine?",
        "options": [
          {
            "id": "a",
            "text": "No. Pause payment and verify the change using an established supplier contact.",
            "label": "Call the supplier on a saved number",
            "tool": "verify"
          },
          {
            "id": "b",
            "text": "Yes, because the earlier conversation is genuine.",
            "label": "Trust the earlier emails",
            "tool": "pay"
          },
          {
            "id": "c",
            "text": "Ask for a second email from another address in the signature.",
            "label": "Ask another contact from the signature",
            "tool": "reply",
            "draft": "Please confirm the payment change using the other contact in your signature."
          }
        ],
        "correct": "a",
        "explanation": "An existing conversation and accurate invoice details do not establish that a new payment instruction is authorised. A compromised mailbox can make a request convincing.",
        "next": {
          "correct": "followup",
          "incorrect": "followup"
        },
        "insight": "Verify sensitive changes even inside familiar conversations."
      },
      {
        "id": "followup",
        "reveal": "You call the supplier on the number in your saved records. They confirm the invoice is real, but the new bank details are not.",
        "question": "What does this tell you?",
        "options": [
          {
            "id": "a",
            "text": "A genuine invoice can contain an unauthorised payment instruction. Keep payment paused and report it.",
            "label": "Pause payment. Report the change",
            "tool": "report"
          },
          {
            "id": "b",
            "text": "The valid invoice makes the new account safe to use.",
            "label": "Pay the new account. The invoice is real",
            "tool": "pay"
          },
          {
            "id": "c",
            "text": "The supplier must have forgotten their own change, so pay it anyway.",
            "label": "Assume the supplier forgot the change",
            "tool": "reply",
            "draft": "You may have forgotten the change. I will use the new details."
          }
        ],
        "correct": "a",
        "explanation": "Assess the changed instruction separately from the legitimate background details.",
        "insight": "Assess the changed instruction separately from the legitimate background details."
      }
    ],
    "setup": "An existing supplier email thread contains a new payment instruction.",
    "surface": "email",
    "contact": {
      "name": "Northline finance",
      "source": "Saved supplier number",
      "response": "Northline confirms the invoice is genuine but the new bank details are not theirs."
    }
  },
  {
    "id": "portfolio",
    "topic": "Assess permissions",
    "channel": "Developer message",
    "sender": "Review Tools",
    "address": "review@portfolio-review.example",
    "subject": "Your portfolio review is ready",
    "context": "A reviewer offers feedback on your public coding portfolio.",
    "message": "Connect this app to receive comments. It needs access to read and write all your private repositories.",
    "displayLink": "Example message: inspection stays inside the game.",
    "question": "What is the best next step?",
    "options": [
      {
        "id": "a",
        "text": "Decline the broad access and ask for a review method limited to the public portfolio."
      },
      {
        "id": "b",
        "text": "Approve access temporarily and remove it after the review."
      },
      {
        "id": "c",
        "text": "Approve because the reviewer knows the name of your project."
      }
    ],
    "correct": "a",
    "hint": "Which action gives you reliable evidence or contains the risk without trusting this message?",
    "explanation": "Writing to all private repositories exceeds what is needed to comment on a public portfolio. Personalised details do not justify those permissions.",
    "takeaway": "Match access to the task, and question permissions that exceed it.",
    "judgement": "suspicious",
    "level": 4,
    "evidence": [
      {
        "title": "Project details",
        "body": "Displayed sender: review@portfolio-review.example. The reviewer knows your public project name. Anyone can read a public portfolio."
      },
      {
        "title": "App permissions",
        "body": "The app asks to read and write all private repositories, although the review concerns a public project."
      },
      {
        "title": "Review alternatives",
        "body": "Comments can be provided on the public work without granting broad private repository access."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What is the best next step?",
        "options": [
          {
            "id": "a",
            "text": "Decline the broad access and ask for a review method limited to the public portfolio.",
            "label": "Decline. Ask for a public-only review",
            "tool": "task"
          },
          {
            "id": "b",
            "text": "Approve access temporarily and remove it after the review.",
            "label": "Allow access just for the review",
            "tool": "access"
          },
          {
            "id": "c",
            "text": "Approve because the reviewer knows the name of your project.",
            "label": "Accept. They know my project",
            "tool": "access"
          }
        ],
        "correct": "a",
        "explanation": "Writing to all private repositories exceeds what is needed to comment on a public portfolio. Personalised details do not justify those permissions.",
        "next": {
          "correct": "followup",
          "incorrect": "followup"
        },
        "insight": "Match access to the task, and question permissions that exceed it."
      },
      {
        "id": "followup",
        "reveal": "The reviewer says everyone grants the access and you will lose your review slot if you refuse.",
        "question": "Does that establish a need for the permissions?",
        "options": [
          {
            "id": "a",
            "text": "No. Keep access declined and use a review method limited to the work being reviewed.",
            "label": "Keep access declined",
            "tool": "task"
          },
          {
            "id": "b",
            "text": "Yes. Other applicants have already accepted it.",
            "label": "Accept. Other applicants did",
            "tool": "access"
          },
          {
            "id": "c",
            "text": "Grant access now and hope the reviewer does not use it.",
            "label": "Approve and hope they don’t use it",
            "tool": "access"
          }
        ],
        "correct": "a",
        "explanation": "Social pressure and a deadline do not justify unnecessary access.",
        "insight": "Social pressure and a deadline do not justify unnecessary access."
      }
    ],
    "setup": "Someone offers to review your public coding portfolio.",
    "surface": "text",
    "contact": {
      "name": "Portfolio review",
      "source": "Public project page",
      "response": "The public portfolio can be reviewed without access to write to your private repositories."
    }
  },
  {
    "id": "recovery",
    "topic": "Act quickly and ask for help",
    "channel": "After a suspicious sign-in",
    "sender": "Your own browser",
    "address": "An unfamiliar sign-in page",
    "subject": "You entered a work password",
    "context": "You followed an email link and entered your work password. The page then failed, and you noticed the address was unfamiliar.",
    "message": "Something went wrong. Please try signing in again.",
    "displayLink": "workplace-access.example/login",
    "question": "What is the most useful next step?",
    "hint": "Prompt action matters. You do not need to hide a mistake or handle it alone.",
    "options": [
      {
        "id": "wait",
        "text": "Wait to see whether the account behaves strangely."
      },
      {
        "id": "again",
        "text": "Try the same page again to see whether it works now."
      },
      {
        "id": "help",
        "text": "Contact IT or security promptly through a trusted route, stop using the page and follow the account-recovery process."
      }
    ],
    "correct": "help",
    "explanation": "Tell your IT or security team what happened so they can help secure the account. A password change through the genuine service may be needed, alongside checks for active sessions and other access. Do not return to the suspicious page. If you reused that password elsewhere, secure those accounts too.",
    "takeaway": "Ask for help promptly after entering information on a suspicious page.",
    "judgement": "suspicious",
    "level": 5,
    "evidence": [
      {
        "title": "What happened",
        "body": "Displayed sender: An unfamiliar sign-in page. You entered your work password on a page reached from an unexpected message."
      },
      {
        "title": "Account route",
        "body": "Your saved work portal and established IT contact are available independently of that page."
      },
      {
        "title": "Why act promptly",
        "body": "The password may have been captured. Reporting helps your team assess sessions and other access."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What is the most useful next step?",
        "options": [
          {
            "id": "wait",
            "text": "Wait to see whether the account behaves strangely.",
            "label": "Wait for unusual activity",
            "tool": "archive"
          },
          {
            "id": "again",
            "text": "Try the same page again to see whether it works now.",
            "label": "Try signing in on that page again",
            "tool": "link"
          },
          {
            "id": "help",
            "text": "Contact IT or security promptly through a trusted route, stop using the page and follow the account-recovery process.",
            "label": "Stop. Contact IT through a trusted route",
            "tool": "verify"
          }
        ],
        "correct": "help",
        "explanation": "Tell your IT or security team what happened so they can help secure the account. A password change through the genuine service may be needed, alongside checks for active sessions and other access. Do not return to the suspicious page. If you reused that password elsewhere, secure those accounts too.",
        "next": {
          "correct": "followup",
          "incorrect": "followup"
        },
        "insight": "Ask for help promptly after entering information on a suspicious page."
      },
      {
        "id": "followup",
        "reveal": "IT helps you change the password through the real portal. You had reused that password on a personal account.",
        "question": "What should you do about the other account?",
        "options": [
          {
            "id": "a",
            "text": "Change the reused password there through its real app or website and enable stronger sign-in protection.",
            "label": "Give that account a unique password",
            "tool": "task"
          },
          {
            "id": "b",
            "text": "Leave it because only the work account was involved.",
            "label": "Leave the personal account alone",
            "tool": "archive"
          },
          {
            "id": "c",
            "text": "Reuse your new work password so both accounts stay consistent.",
            "label": "Reuse my new work password there",
            "tool": "task"
          }
        ],
        "correct": "a",
        "explanation": "A captured password can be tried elsewhere. Give the other account a unique password; follow IT’s advice for the work account.",
        "insight": "A captured password can be tried elsewhere."
      }
    ],
    "setup": "You entered your work password through an email link, then noticed an unfamiliar address.",
    "surface": "app",
    "contact": {
      "name": "IT security",
      "source": "Staff directory",
      "response": "Your incident report is open. Use the real work portal to secure the account and follow our recovery instructions."
    }
  },
  {
    "id": "clicked",
    "topic": "Respond proportionately",
    "channel": "Incident",
    "sender": "Your browser",
    "address": "Link opened; no information entered",
    "subject": "I opened the link",
    "context": "You opened an unexpected work email link. You have not entered information, downloaded a file or approved anything.",
    "message": "The page asks you to sign in to keep your account active.",
    "displayLink": "Example message: inspection stays inside the game.",
    "question": "What should you do first?",
    "options": [
      {
        "id": "a",
        "text": "Close the page, stop interacting and report the message through your workplace security route."
      },
      {
        "id": "b",
        "text": "Sign in once to find out whether it is genuine."
      },
      {
        "id": "c",
        "text": "Delete the message and take no further action because you did not enter anything."
      }
    ],
    "correct": "a",
    "hint": "Which action gives you reliable evidence or contains the risk without trusting this message?",
    "explanation": "Opening a link does not by itself prove account compromise. Stop interacting and report what happened so the security team can assess the risk.",
    "takeaway": "Report the facts promptly without assuming either safety or compromise.",
    "judgement": "suspicious",
    "level": 5,
    "evidence": [
      {
        "title": "Actions taken",
        "body": "You opened the page, but entered nothing, downloaded no file and approved no request."
      },
      {
        "title": "Current page",
        "body": "The page asks you to sign in. There is no need to interact further to report it."
      },
      {
        "title": "Reporting route",
        "body": "Your established workplace security route is available outside this page."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What should you do first?",
        "options": [
          {
            "id": "a",
            "text": "Close the page, stop interacting and report the message through your workplace security route.",
            "label": "Close it. Report through our usual route",
            "tool": "report"
          },
          {
            "id": "b",
            "text": "Sign in once to find out whether it is genuine.",
            "label": "Sign in once to test it",
            "tool": "link"
          },
          {
            "id": "c",
            "text": "Delete the message and take no further action because you did not enter anything.",
            "label": "Delete the email. Do nothing else",
            "tool": "archive"
          }
        ],
        "correct": "a",
        "explanation": "Opening a link does not by itself prove account compromise. Stop interacting and report what happened so the security team can assess the risk.",
        "next": {
          "correct": "followup",
          "incorrect": "followup"
        },
        "insight": "Report the facts promptly without assuming either safety or compromise."
      },
      {
        "id": "followup",
        "reveal": "The security team asks what you did on the page. You feel embarrassed but entered no information.",
        "question": "What should you tell them?",
        "options": [
          {
            "id": "a",
            "text": "Give an accurate account of the link, time and actions, including what you did not enter or download.",
            "label": "Explain exactly what happened",
            "tool": "report"
          },
          {
            "id": "b",
            "text": "Say you never opened it to avoid making extra work.",
            "label": "Say I didn’t open it",
            "tool": "report"
          },
          {
            "id": "c",
            "text": "Reopen the page to check whether it can capture a password.",
            "label": "Reopen the page to investigate",
            "tool": "link"
          }
        ],
        "correct": "a",
        "explanation": "Clear facts help the team assess risk. There is no need to revisit a suspicious page to investigate on your own.",
        "insight": "Clear facts help the team assess risk."
      }
    ],
    "setup": "You opened the link, but entered nothing, downloaded nothing and approved nothing.",
    "surface": "app",
    "contact": {
      "name": "IT security",
      "source": "Staff directory",
      "response": "You report the link and explain that you entered nothing, downloaded nothing and approved nothing."
    }
  },
  {
    "id": "paid",
    "topic": "Act after a payment",
    "channel": "Incident",
    "sender": "Finance colleague",
    "address": "Payment sent 15 minutes ago",
    "subject": "The supplier did not change its details",
    "context": "A supplier has independently confirmed that the new bank details were not theirs. Your team already paid.",
    "message": "Your colleague asks whether to wait until the supplier investigates tomorrow.",
    "displayLink": "Example message: inspection stays inside the game.",
    "question": "What should happen now?",
    "options": [
      {
        "id": "a",
        "text": "Contact the bank immediately through a trusted route and alert the finance and security teams."
      },
      {
        "id": "b",
        "text": "Wait for the supplier’s investigation before contacting the bank."
      },
      {
        "id": "c",
        "text": "Email the suspected sender and request a refund first."
      }
    ],
    "correct": "a",
    "hint": "Which action gives you reliable evidence or contains the risk without trusting this message?",
    "explanation": "Act promptly. The bank can advise on possible recovery, and internal teams can coordinate the response. Recovery is not guaranteed.",
    "takeaway": "A suspected fraudulent payment needs prompt escalation.",
    "judgement": "suspicious",
    "level": 5,
    "evidence": [
      {
        "title": "Independent confirmation",
        "body": "The supplier, reached through an established route, says the bank details did not change."
      },
      {
        "title": "Payment record",
        "body": "Your team sent the payment 15 minutes ago. Save the transaction reference for the bank and finance team."
      },
      {
        "title": "Trusted contacts",
        "body": "Your bank’s existing app or saved contact route and your internal finance and security teams are available."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What should happen now?",
        "options": [
          {
            "id": "a",
            "text": "Contact the bank immediately through a trusted route and alert the finance and security teams.",
            "label": "Contact the bank and alert our teams now",
            "tool": "verify"
          },
          {
            "id": "b",
            "text": "Wait for the supplier’s investigation before contacting the bank.",
            "label": "Wait for the supplier to investigate",
            "tool": "archive"
          },
          {
            "id": "c",
            "text": "Email the suspected sender and request a refund first.",
            "label": "Ask the sender for a refund",
            "tool": "reply",
            "draft": "Please refund the payment."
          }
        ],
        "correct": "a",
        "explanation": "Act promptly. The bank can advise on possible recovery, and internal teams can coordinate the response. Recovery is not guaranteed.",
        "next": {
          "correct": "followup",
          "incorrect": "followup"
        },
        "insight": "A suspected fraudulent payment needs prompt escalation."
      },
      {
        "id": "followup",
        "reveal": "You reached the bank and alerted the internal teams. A new message offers guaranteed recovery for an upfront fee.",
        "question": "What should you do with this offer?",
        "options": [
          {
            "id": "a",
            "text": "Do not pay it. Keep working through your bank and established reporting channels.",
            "label": "Keep working with my bank",
            "tool": "verify"
          },
          {
            "id": "b",
            "text": "Pay because recovering the original payment is urgent.",
            "label": "Pay the recovery fee",
            "tool": "pay"
          },
          {
            "id": "c",
            "text": "Share banking access so the recovery agent can investigate.",
            "label": "Give the recovery agent bank access",
            "tool": "access"
          }
        ],
        "correct": "a",
        "explanation": "Be alert to follow-up recovery fraud. No stranger can establish guaranteed recovery by messaging you.",
        "insight": "Be alert to follow-up recovery fraud."
      }
    ],
    "setup": "Your team paid. The supplier confirms the new bank details weren’t theirs.",
    "surface": "app",
    "contact": {
      "name": "Your bank",
      "source": "Saved bank contact",
      "response": "We’ll investigate the payment now. Please keep the transaction reference and alert your finance and security teams. Recovery cannot be guaranteed."
    }
  },
  {
    "id": "access",
    "topic": "Remove unwanted access",
    "channel": "Incident",
    "sender": "Account settings",
    "address": "App access confirmed in your account",
    "subject": "You approved an unfamiliar app",
    "context": "You approved an app from a message. Your account settings show access to read mail and files.",
    "message": "You now realise you do not recognise the service.",
    "displayLink": "Example message: inspection stays inside the game.",
    "question": "What is a useful immediate response?",
    "options": [
      {
        "id": "a",
        "text": "Revoke the app’s access through trusted account settings and report it to your security team."
      },
      {
        "id": "b",
        "text": "Change only your password and leave the app connected."
      },
      {
        "id": "c",
        "text": "Ask the app’s message sender to disconnect it for you."
      }
    ],
    "correct": "a",
    "hint": "Which action gives you reliable evidence or contains the risk without trusting this message?",
    "explanation": "An app permission grant can persist separately from your password. Revoke it through the real account, then ask the security team to assess what was accessed.",
    "takeaway": "Check connected apps as well as passwords after an access mistake.",
    "judgement": "suspicious",
    "level": 5,
    "evidence": [
      {
        "title": "Grant record",
        "body": "The real account settings confirm you approved the app."
      },
      {
        "title": "Access scope",
        "body": "The grant covers reading mail and files. A password change alone may not remove this permission."
      },
      {
        "title": "Account controls",
        "body": "The real account settings let you revoke app access. Your security team can assess the incident."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What is a useful immediate response?",
        "options": [
          {
            "id": "a",
            "text": "Revoke the app’s access through trusted account settings and report it to your security team.",
            "label": "Revoke access in settings. Alert IT",
            "tool": "task"
          },
          {
            "id": "b",
            "text": "Change only your password and leave the app connected.",
            "label": "Change my password only",
            "tool": "task"
          },
          {
            "id": "c",
            "text": "Ask the app’s message sender to disconnect it for you.",
            "label": "Ask the app’s sender to disconnect it",
            "tool": "reply",
            "draft": "Please disconnect your app from my account."
          }
        ],
        "correct": "a",
        "explanation": "An app permission grant can persist separately from your password. Revoke it through the real account, then ask the security team to assess what was accessed.",
        "next": {
          "correct": "followup",
          "incorrect": "followup"
        },
        "insight": "Check connected apps as well as passwords after an access mistake."
      },
      {
        "id": "followup",
        "reveal": "You revoked the app. Your security team asks which permissions you granted and when.",
        "question": "What is the most helpful next action?",
        "options": [
          {
            "id": "a",
            "text": "Provide the details you have and follow their account review and containment instructions.",
            "label": "Share the details with our security team",
            "tool": "report"
          },
          {
            "id": "b",
            "text": "Assume revoking access proves no data was seen.",
            "label": "Assume no information was accessed",
            "tool": "archive"
          },
          {
            "id": "c",
            "text": "Reconnect the app to take a better look at it.",
            "label": "Reconnect the app to investigate",
            "tool": "access"
          }
        ],
        "correct": "a",
        "explanation": "Revocation stops that grant, but does not establish what happened beforehand. The team needs evidence to assess the impact.",
        "insight": "Revocation stops that grant, but does not establish what happened beforehand."
      }
    ],
    "setup": "You approved an unfamiliar app. Account settings confirm it can read mail and files.",
    "surface": "app",
    "contact": {
      "name": "Account settings",
      "source": "Saved app",
      "response": "You open connected-app settings in the real account. Access grants can be revoked separately from changing the password."
    }
  },
  {
    "id": "colleague",
    "topic": "Support reporting",
    "channel": "Work chat",
    "sender": "A colleague",
    "address": "Your usual team chat",
    "subject": "I think I sent them the code",
    "context": "A colleague says they shared a work sign-in code with someone claiming to be IT.",
    "message": "I feel silly. Can we just keep this between us?",
    "displayLink": "Example message: inspection stays inside the game.",
    "question": "What is the most helpful response?",
    "options": [
      {
        "id": "a",
        "text": "Thank them for speaking up and help them contact the security team immediately."
      },
      {
        "id": "b",
        "text": "Promise to keep it private unless anything unusual happens."
      },
      {
        "id": "c",
        "text": "Help them reset the password but keep the incident from the security team."
      }
    ],
    "correct": "a",
    "hint": "Which action gives you reliable evidence or contains the risk without trusting this message?",
    "explanation": "A calm response helps someone report quickly. Shared sign-in codes may allow account access, so the security team needs to assess and contain the incident.",
    "takeaway": "Help people report quickly and without blame.",
    "judgement": "suspicious",
    "level": 5,
    "evidence": [
      {
        "title": "What was shared",
        "body": "Displayed sender: Your usual team chat. A work sign-in code was sent to someone claiming to be IT."
      },
      {
        "title": "What remains uncertain",
        "body": "You do not know whether the code was used. Waiting for proof could delay containment."
      },
      {
        "title": "Available help",
        "body": "The security team can assess access and coordinate recovery. A calm response makes reporting easier."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What is the most helpful response?",
        "options": [
          {
            "id": "a",
            "text": "Thank them for speaking up and help them contact the security team immediately.",
            "label": "Thank them. Help them report it now",
            "tool": "report"
          },
          {
            "id": "b",
            "text": "Promise to keep it private unless anything unusual happens.",
            "label": "Keep it private unless something happens",
            "tool": "archive"
          },
          {
            "id": "c",
            "text": "Help them reset the password but keep the incident from the security team.",
            "label": "Reset the password without telling IT",
            "tool": "task"
          }
        ],
        "correct": "a",
        "explanation": "A calm response helps someone report quickly. Shared sign-in codes may allow account access, so the security team needs to assess and contain the incident.",
        "next": {
          "correct": "followup",
          "incorrect": "followup"
        },
        "insight": "Help people report quickly and without blame."
      },
      {
        "id": "followup",
        "reveal": "Your colleague reports it. Another teammate wants to post their name and mistake in a public channel as a warning.",
        "question": "How can you support learning?",
        "options": [
          {
            "id": "a",
            "text": "Share an anonymised lesson through the appropriate team process, with security guidance.",
            "label": "Share an anonymous lesson appropriately",
            "tool": "report"
          },
          {
            "id": "b",
            "text": "Publish their name so everyone remembers the incident.",
            "label": "Post their name as a warning",
            "tool": "forward",
            "draft": "Here is who made the mistake and what they did."
          },
          {
            "id": "c",
            "text": "Avoid sharing any useful lesson with the team.",
            "label": "Keep every lesson private",
            "tool": "archive"
          }
        ],
        "correct": "a",
        "explanation": "Learning can help others without exposing or blaming the person who reported the incident.",
        "insight": "Learning can help others without exposing or blaming the person who reported the incident."
      }
    ],
    "setup": "A colleague shared a work sign-in code with someone claiming to be IT.",
    "surface": "text",
    "contact": {
      "name": "Security team",
      "source": "Staff directory",
      "response": "You help your colleague report promptly, without blame. The team can assess whether the sign-in code was used."
    }
  },
  {
    "id": "attachment",
    "topic": "Respond to an opened file",
    "channel": "Incident",
    "sender": "Your device",
    "address": "Unexpected attachment opened",
    "subject": "A document asked me to enable content",
    "context": "You opened an unexpected work attachment and enabled content. The device is now behaving unusually.",
    "message": "A colleague suggests running a cleanup tool from a search advert.",
    "displayLink": "Example message: inspection stays inside the game.",
    "question": "What should you do?",
    "options": [
      {
        "id": "a",
        "text": "Stop using the device and contact IT or security from another trusted device, following your incident procedure."
      },
      {
        "id": "b",
        "text": "Install the first highly rated cleanup tool you can find."
      },
      {
        "id": "c",
        "text": "Restart the device and wait to see whether the unusual behaviour returns."
      }
    ],
    "correct": "a",
    "hint": "Which action gives you reliable evidence or contains the risk without trusting this message?",
    "explanation": "Avoid adding untrusted software or spreading the file. Follow your organisation’s incident procedure; the security team can give appropriate containment instructions.",
    "takeaway": "Get trusted help and avoid spreading a suspicious file.",
    "judgement": "suspicious",
    "level": 5,
    "evidence": [
      {
        "title": "Actions taken",
        "body": "An unexpected work file was opened and content was enabled."
      },
      {
        "title": "Device behaviour",
        "body": "Unusual behaviour followed. This needs assessment rather than a diagnosis from the pop-up or a search advert."
      },
      {
        "title": "Trusted help",
        "body": "You can contact IT from another trusted device and follow your organisation’s incident procedure."
      }
    ],
    "stages": [
      {
        "id": "initial",
        "question": "What should you do?",
        "options": [
          {
            "id": "a",
            "text": "Stop using the device and contact IT or security from another trusted device, following your incident procedure.",
            "label": "Stop. Contact IT from a trusted device",
            "tool": "verify"
          },
          {
            "id": "b",
            "text": "Install the first highly rated cleanup tool you can find.",
            "label": "Install a cleanup tool from an advert",
            "tool": "link"
          },
          {
            "id": "c",
            "text": "Restart the device and wait to see whether the unusual behaviour returns.",
            "label": "Restart and see if the problem returns",
            "tool": "task"
          }
        ],
        "correct": "a",
        "explanation": "Avoid adding untrusted software or spreading the file. Follow your organisation’s incident procedure; the security team can give appropriate containment instructions.",
        "next": {
          "correct": "followup",
          "incorrect": "followup"
        },
        "insight": "Get trusted help and avoid spreading a suspicious file."
      },
      {
        "id": "followup",
        "reveal": "IT has taken over the investigation. You remember another colleague received the same file.",
        "question": "What should you do?",
        "options": [
          {
            "id": "a",
            "text": "Tell the security team who else may have received it and warn the colleague through a trusted route without forwarding the file.",
            "label": "Tell IT and warn them without the file",
            "tool": "report"
          },
          {
            "id": "b",
            "text": "Send the attachment again so the colleague recognises it.",
            "label": "Forward the file again",
            "tool": "forward",
            "draft": "Here is the same attachment again."
          },
          {
            "id": "c",
            "text": "Ask the colleague to open it and compare results.",
            "label": "Ask them to open it and compare",
            "tool": "reply",
            "draft": "Please open that file and compare what happens."
          }
        ],
        "correct": "a",
        "explanation": "Help the team find others at risk without spreading or reopening the attachment.",
        "insight": "Help the team find others at risk without spreading or reopening the attachment."
      }
    ],
    "setup": "You opened an unexpected work file and enabled content. Your device is behaving unusually.",
    "surface": "app",
    "contact": {
      "name": "IT security",
      "source": "Staff directory",
      "response": "Stop using the affected device and follow the incident procedure. Contact us from another trusted device; do not forward the file."
    }
  }
]
function shuffle(items, random = Math.random) { const a = items.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
if(typeof module !== 'undefined') module.exports={SCAM_LEVELS,SCAM_QUESTIONS,shuffle};
