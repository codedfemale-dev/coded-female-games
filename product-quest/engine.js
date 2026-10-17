// Pure game rules: no browser APIs and no random answer keys.
const round = (question, good, okay, bad, lesson) => ({question, lesson, choices:[
 {text:good, gain:40, cost:14, confidence:4, verdict:'Critical alignment!'},
 {text:okay, gain:24, cost:8, confidence:-5, verdict:'Some traction. Some raised eyebrows.'},
 {text:bad, gain:8, cost:4, confidence:-24, verdict:'A bold addition to the meeting minutes.'}
]});
export const bosses = [
 {name:'Vivian Vision',role:'THE CEO',room:'Corner office',color:'#bd9af7',tell:'Wants a clear customer problem. Allergic to incremental thinking.',intro:'A spoon? Interesting. But what’s the AI strategy?',rounds:[
 round('Why should MEGACORP build a spoon?', 'People cannot eat soup with our forks. Let’s solve that problem first.', 'Position it as a new category in our cutlery portfolio.', 'An AI-powered soup-to-mouth ecosystem. With blockchain.', 'Start with a real customer problem before choosing technology.'),
 round('How will we know this is worth doing?', 'Pilot with 20 soup eaters. Measure spills and repeat use.', 'Track interest with a landing page before a full launch.', 'Count how many times the board says “disruptive”.', 'A small test and a useful outcome beat a big promise.'),
 round('What is the long-term vision?', 'Reliable everyday utensils, starting with one excellent spoon.', 'A coordinated kitchen range if the pilot works.', 'Replace every human hand by Q3.', 'Make the vision ambitious and the first step achievable.') ]},
 {name:'Penny Pincher',role:'THE CFO',room:'Finance dungeon',color:'#f8ca79',tell:'Wants numbers, assumptions and an affordable first step.',intro:'I have a spreadsheet older than you. Impress it.',rounds:[
 round('Where is the return on investment?', 'At £3 price and £1 unit cost, test whether £2 margin covers acquisition.', 'Compare pricing with similar utensils first.', 'The total addressable market is everyone with a mouth.', 'Unit economics need explicit assumptions, not a giant market slide.'),
 round('What if demand is lower than forecast?', 'Cap the pilot at 100 units and set a stop-loss before ordering.', 'Start with pre-orders to reduce unsold stock.', 'Rename the losses “strategic negative revenue”.', 'Limit downside before scaling an uncertain idea.'),
 round('Can you guarantee the forecast?', 'No. Here are low, base and high cases, and what changes each.', 'We can refine it as orders arrive.', 'Absolutely. I made the cells green.', 'Show uncertainty instead of disguising it as precision.') ]},
 {name:'Ada Stack',role:'ENGINEERING LEAD',room:'Server sanctuary',color:'#92d8d1',tell:'Wants a small scope and a product that can actually ship.',intro:'Before you ask: the spoon does not need Bluetooth.',rounds:[
 round('What is in the first release?', 'One durable shape. Scoop soup. No app. Test a physical prototype.', 'Offer two sizes using the same manufacturing process.', 'A companion app, social feed and spoon-to-spoon messaging.', 'A useful first release has a deliberately small scope.'),
 round('The prototype bends in hot soup. Now what?', 'Pause the pilot, test materials and agree a heat-resistance threshold.', 'Try a sturdier sample before committing to tooling.', 'Call it adaptive curvature and ship on Friday.', 'Quality criteria should describe actual use conditions.'),
 round('Sales just promised a smart handle.', 'Review the trade-off together. Keep it out unless we remove other scope.', 'Put it in discovery after the basic spoon works.', 'Add it quietly. Engineering loves surprises.', 'New scope needs an explicit trade-off.') ]},
 {name:'Margo Market',role:'MARKETING DIRECTOR',room:'Brand dimension',color:'#f4a4b8',tell:'Wants a specific audience and an honest reason to care.',intro:'Forks have four points. What is our point?',rounds:[
 round('Who is this spoon for?', 'Soup lovers who want a comfortable grip and fewer spills.', 'Busy households replacing worn-out utensils.', 'Everyone. Including people who do not eat.', 'A clear audience makes positioning more useful.'),
 round('Give me the launch headline.', 'Less soup on your shirt. More soup in your mouth.', 'Meet your dependable everyday soup spoon.', 'The world’s first liquid-enabled consumption platform.', 'Lead with a benefit people can recognise.'),
 round('Can we say it is the best spoon ever?', 'Only with evidence. Show the grip test and say exactly what improved.', 'Let pilot customers describe their experience.', 'Yes. Add an asterisk too small to read.', 'Specific, supported claims build trust.') ]},
 {name:'Jules Clause',role:'LEGAL COUNSEL',room:'Terms & conditions',color:'#a5b7f9',tell:'Wants foreseeable risks addressed before launch.',intro:'I have a few notes. There are 47 pages.',rounds:[
 round('What about soup-related liability?', 'Test food-contact materials, heat safety and clear care instructions.', 'Review the supplier’s safety documentation before ordering.', 'Put “soup happens” in the terms and conditions.', 'Design out foreseeable risks; a disclaimer is not a fix.'),
 round('Why does the spoon app collect location?', 'It does not need an app. Remove unnecessary data collection.', 'Make research optional and explain what data we collect.', 'To personalise the soup journey. Obviously.', 'Collect only data needed for a clear purpose.'),
 round('We found a sharp edge on one sample.', 'Stop shipment, inspect the batch and verify the manufacturing fix.', 'Quarantine the affected batch while we investigate.', 'List it as a bonus knife feature.', 'Respond to safety evidence before exposing customers.') ]},
 {name:'Sal Pipeline',role:'SALES DIRECTOR',room:'Quarter-end arena',color:'#c7d888',tell:'Wants something sellable without impossible promises.',intro:'Can we upsell the spoon to an enterprise ladle?',rounds:[
 round('A buyer wants 10,000 custom spoons next week.', 'Check capacity and agree a paid sample plus a realistic delivery date.', 'Offer the standard spoon from available stock.', 'Sign first. Manufacture through positive thinking.', 'A sale is only useful if the team can deliver it.'),
 round('How do we grow account value?', 'Offer an optional matching set after the customer likes the spoon.', 'Test a clearly priced bulk pack.', 'Charge a monthly subscription to unlock scooping.', 'Growth should add value for the customer.'),
 round('Can I promise a lifetime guarantee?', 'Agree coverage and costs with finance and operations first.', 'Use the existing returns policy for the pilot.', 'Promise two lifetimes. It sounds more premium.', 'Coordinate commitments with the people who must honour them.') ]},
 {name:'The Executive Board',role:'FINAL BOSS',room:'The alignment chamber',color:'#e6bdff',tell:'Wants the whole story: customer, evidence, risk and a decision.',intro:'We have aligned on needing another alignment meeting.',rounds:[
 round('You have one slide. Make the case.', 'Soup spills are the problem. Test 100 safe spoons with a capped budget.', 'A small cutlery pilot can test demand before scaling.', 'A 94-slide deck. The first 30 explain what soup is.', 'Connect the customer problem, evidence and a bounded next step.'),
 round('What decision do you need from us?', 'Approve the pilot budget, one owner and a review against agreed metrics.', 'Nominate a sponsor to review the pilot plan.', 'Permission to book a meeting about booking the next meeting.', 'End a pitch with a clear decision and ownership.'),
 round('And if the pilot fails?', 'Share what we learned, stop spending and change the hypothesis.', 'Review feedback before deciding whether to retry.', 'Rebrand it as a fork with a very ambitious middle.', 'A useful experiment can end in a responsible stop.') ]}
];
export const initialState = () => ({phase:'intro',boss:0,round:0,alignment:0,energy:80,confidence:80,coffees:2,coffeeUsed:false,approved:0,turns:0,buzzwords:0,score:0,log:[],feedback:null});
const clamp=n=>Math.max(0,Math.min(100,n));
export function act(state, action){
 const s={...state,log:[...state.log]};
 if(action.type==='start' && s.phase==='intro'){s.phase='battle';return s;}
 if(action.type==='next' && s.phase==='won'){
  s.boss++;s.round=0;s.alignment=0;s.coffeeUsed=false;s.feedback=null;
  s.energy=clamp(s.energy+18);s.confidence=clamp(s.confidence+8);s.phase='battle';return s;
 }
 if(s.phase!=='battle')return state;
 if(action.type==='coffee'){
  if(s.coffees===0||s.coffeeUsed||s.energy===100)return state;
  s.coffees--;s.coffeeUsed=true;s.energy=clamp(s.energy+32);s.confidence=clamp(s.confidence+8);
  s.feedback={title:'Coffee acquired. Personality restored.',text:'+32 energy · +8 confidence. One break per stakeholder.'};return s;
 }
 if(action.type!=='choose')return state;
 const r=bosses[s.boss].rounds[s.round], c=r.choices[action.index];
 if(!c||s.energy<c.cost)return state;
 s.energy=clamp(s.energy-c.cost);s.confidence=clamp(s.confidence+c.confidence);s.alignment=clamp(s.alignment+c.gain);
 s.turns++;s.score+=c.gain*10;s.buzzwords+=action.index===2?1:0;
 s.log.push({boss:bosses[s.boss].name,question:r.question,answer:c.text,gain:c.gain});
 s.feedback={title:c.verdict,text:`+${c.gain} alignment · −${c.cost} energy. ${r.lesson}`};
 if(s.confidence===0){s.phase='lost';s.reason='Your confidence left the meeting before you did.';}
 else if(s.alignment>=80){s.approved++;s.phase=s.boss===bosses.length-1?'complete':'won';}
 else if(s.round===2){s.phase='lost';s.reason='The stakeholder requested “more alignment”. The pilot is on hold.';}
 else {s.round++;if(s.energy<4&&(s.coffees===0||s.coffeeUsed)){s.phase='lost';s.reason='Your energy budget has been fully stakeholdered.';}}
 return s;
}
export function scorecard(s){return {total:s.score+s.approved*250+s.confidence*5+s.energy*3,title:s.phase==='complete'?'Chief Spoon Officer':s.approved>=4?'Senior Alignment Wizard':'Associate Meeting Survivor',status:s.phase==='complete'?'SPOON APPROVED FOR PILOT':'PILOT ON HOLD',meetings:s.turns,avoided:s.approved*3,buzzwords:s.buzzwords};}
