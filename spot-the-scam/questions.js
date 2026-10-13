/* Fictional examples. Stable answer IDs remain correct after shuffling. */
const SCAM_QUESTIONS = [
  {
    "id": "invoice",
    "topic": "Verify payment changes",
    "channel": "Email",
    "sender": "Northline Accounts",
    "address": "accounts@northline-payments.example",
    "subject": "New bank details. Payment due today.",
    "context": "You work with Northline, a fictional supplier. An invoice arrives with different bank details.",
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
    "judgement": "verify"
  },
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
        "text": "Pay because the fee is too small to be a serious risk."
      }
    ],
    "correct": "trusted",
    "explanation": "A timely message can still be a scam. Check the order through a route you know rather than the supplied link. A small payment request can be used to obtain card details.",
    "takeaway": "Check delivery claims independently, even when you expect a parcel.",
    "judgement": "verify"
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
        "text": "Approve it if repeated notifications become distracting."
      }
    ],
    "correct": "deny",
    "explanation": "Multi-factor authentication (MFA) adds a further check at sign-in. Do not approve a request you did not initiate. Repeated prompts can pressure people into allowing access. Report the unexpected request and follow your organisation’s account-security process.",
    "takeaway": "Only approve sign-ins you initiated and recognise.",
    "judgement": "suspicious"
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
    "judgement": "verify"
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
        "text": "Send half of the code and ask Sam to confirm the rest."
      },
      {
        "id": "keep",
        "text": "Keep the code private and contact Sam independently using a known route."
      }
    ],
    "correct": "keep",
    "explanation": "A sign-in or recovery code can unlock an account. Keep it private even when the request appears to come from someone you know. Independently check on the colleague and contact IT if a work account may be compromised.",
    "takeaway": "Do not share sign-in or account recovery codes.",
    "judgement": "suspicious"
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
        "text": "Delete the app because every collection notification is a scam."
      },
      {
        "id": "public",
        "text": "Post the order confirmation publicly to check whether other people recognise it."
      }
    ],
    "correct": "collect",
    "explanation": "This scenario provides independent context: you placed the order and checked its details in the app yourself. That supports following the collection instructions. Stay alert to unexpected changes, and keep order details private.",
    "takeaway": "Trusted routes and matching context support informed decisions.",
    "judgement": "supported"
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
    "judgement": "suspicious"
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
    "judgement": "suspicious"
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
    "guidanceUrl": "https://consumer.ftc.gov/consumer-alerts/2023/12/how-spot-latest-job-scams"
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
        "text": "Ask the recruiter for a discount before using the converter."
      }
    ],
    "correct": "check",
    "explanation": "A supposed recruiter directing applicants to a paid CV conversion service is a documented scam pattern. Paying less does not verify it. Independently check the vacancy and ask about accepted formats. Legitimate paid CV advice exists, but that does not make this compulsory job-access fee trustworthy.",
    "takeaway": "Do not pay a recruiter’s chosen service just to remain eligible for a job.",
    "guidanceUrl": "https://consumer.ftc.gov/consumer-alerts/2022/05/applying-jobs-be-lookout-scams"
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
    "guidanceUrl": "https://consumer.ftc.gov/consumer-alerts/2025/08/how-spot-avoid-task-scams"
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
        "text": "Trust the invitation if the account uses a professional logo."
      }
    ],
    "correct": "check",
    "explanation": "An unexpected opportunity combined with a payment demand, secrecy and pressure deserves independent checking. A mission you support or polished logo does not verify the organisation. Paid mentoring can be legitimate; this particular invitation has not supplied trustworthy evidence.",
    "takeaway": "Check opportunities independently, even when their mission matters to you.",
    "guidanceUrl": "https://www.ncsc.gov.uk/collection/phishing-scams/spot-scams"
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
    "guidanceUrl": "https://consumer.ftc.gov/comment/180311"
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
    "guidanceUrl": "https://consumer.ftc.gov/articles/how-spot-avoid-and-report-tech-support-scams"
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
    "guidanceUrl": "https://www.ncsc.gov.uk/collection/phishing-scams/spot-scams"
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
    "guidanceUrl": "https://www.ncsc.gov.uk/collection/phishing-scams/spot-scams"
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
    "guidanceUrl": "https://www.ncsc.gov.uk/collection/phishing-scams/spot-scams"
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
        "text": "Reject the invitation because all online interview requests are scams."
      },
      {
        "id": "bank",
        "text": "Send bank details now to make a good impression."
      }
    ],
    "correct": "book",
    "explanation": "You have independently verified the invitation and reached the application portal through your own saved record. That evidence supports booking. No bank details are needed for this step. If a later request changes the process or adds a payment, assess that request separately.",
    "takeaway": "Independent checks help you pursue genuine opportunities confidently.",
    "guidanceUrl": "https://www.ncsc.gov.uk/collection/phishing-scams/spot-scams"
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
        "text": "No. Remote support is always a scam."
      },
      {
        "id": "proceed",
        "text": "Yes, through the verified appointment and approved tool, following your organisation’s support procedure."
      },
      {
        "id": "password",
        "text": "Yes, and send your password to the technician to save time."
      }
    ],
    "correct": "proceed",
    "explanation": "Remote support can be legitimate when you requested it, independently verified the appointment and use an approved process. That differs from an unsolicited warning demanding access. Stay present and do not send your password. Pause if the session departs from the agreed procedure.",
    "takeaway": "Verify the support process; remote access alone does not establish a scam.",
    "guidanceUrl": "https://consumer.ftc.gov/articles/how-spot-avoid-and-report-tech-support-scams"
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
        "text": "Dismiss the alert because security notifications are always scams."
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
    "guidanceUrl": "https://www.ncsc.gov.uk/collection/phishing-scams/spot-scams"
  }
];

function shuffle(items, random = Math.random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
// Eight questions per round: four concerns, two supported actions, two requests to verify.
// These internal groups balance practice; they are never displayed as clues to an answer.
function buildRound(items = SCAM_QUESTIONS, random = Math.random) {
  const quotas = {suspicious: 4, supported: 2, verify: 2};
  const selected = [];
  for (const [group, count] of Object.entries(quotas)) {
    const pool = items.filter(q => q.judgement === group);
    if (pool.length < count) throw new Error('Not enough scenarios in group: ' + group);
    selected.push(...shuffle(pool, random).slice(0, count));
  }
  return shuffle(selected, random).map(q => ({...q, options: shuffle(q.options, random)}));
}
if (typeof module !== 'undefined') module.exports = {SCAM_QUESTIONS, shuffle, buildRound};
