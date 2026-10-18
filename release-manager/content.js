export const developers = [
 {id:'ada',name:'Ada',role:'Full-stack anchor',cost:5,speed:2,skill:'core',colour:'#ec9e75',quote:'A small release is still a release.'},
 {id:'nia',name:'Nia',role:'UX engineer',cost:4,speed:2,skill:'ux',colour:'#a29bdb',quote:'The user is not a rounding error.'},
 {id:'bo',name:'Bo',role:'Reliability wizard',cost:4,speed:2,skill:'quality',colour:'#81bfa7',quote:'My demo is a graph that stays flat.'},
 {id:'lex',name:'Lex',role:'AI prototyper',cost:3,speed:3,skill:'ai',colour:'#e9bf63',quote:'It works on my prompt. Review it, please.'},
 {id:'sam',name:'Sam',role:'Thoughtful junior',cost:2,speed:1,skill:'core',colour:'#8db9d4',quote:'Pair with me and tomorrow gets easier.'},
 {id:'kit',name:'Kit',role:'Platform engineer',cost:4,speed:2,skill:'platform',colour:'#d59cb2',quote:'I made the boring thing dependable.'}
];
// Synthetic estimates share one six-day release horizon. Confidence is a fraction.
const task=(id,title,kind,effort,value,owner,must,why,reach=100,impact=2,confidence=.8)=>({id,title,kind,effort:effort*2,value,owner,must,why,reach,impact,confidence});
const option=(label,effect,feedback,later=null)=>({label,effect,feedback,later});
const event=(day,who,title,text,options)=>({day,who,title,text,options});
export const levels=[
 {name:'Minimum Viable Panic',tag:'THE FIRST SINGLE',goal:'Let customers complete their first purchase.',boss:'Vera · CEO',brief:'Friday launch. Tuesday confidence. Monday codebase. The CEO has already ordered the celebration cupcakes.',tasks:[
 task('checkout','Fix the payment dead end','core',7,18,'customers',true,'A purchase that cannot complete blocks the release outcome.',300,3,.95),
 task('errors','Readable payment errors','ux',5,11,'customers',false,'Recovery helps customers finish; a workaround exists through support.',180,2,.9),
 task('monitor','Checkout monitoring','quality',5,10,'engineering',false,'A release needs a way to detect failure after launch.',300,1,.9),
 task('confetti','CEO confetti cannon','ux',6,3,'leadership',false,'Delight has value after the core journey works. Cupcakes are not acceptance criteria.',300,.5,.4)],events:[
 event(2,'Vera · CEO','One tiny sparkle','“Can we make the Buy button an AI-powered celebration experience?” The button currently does not buy.',[
 option('Promise the sparkle for Friday',{leadership:10,energy:-8},'A firm promise creates an expectation. If confetti is not shipped, leadership will remember.',{type:'promise',task:'confetti'}),
 option('Show the failed purchase; agree the launch goal',{leadership:-3,customers:5},'You traded a little immediate approval for a shared outcome. Explain what is deferred and why.'),
 option('Say “no” and close the laptop',{leadership:-10},'The scope stays small, but unexplained refusal leaves the underlying request unresolved.')]),
 event(4,'Jo · Support','The workaround has a workaround','Support is manually rescuing payment attempts. They would quite like to eat lunch.',[
 option('Pair on recovery instructions',{customers:7,energy:-3},'A temporary support path reduces harm while the fix is built. It is a bridge, not a permanent solution.'),
 option('Call failed purchases “high intent engagement”',{leadership:4,customers:-9},'Renaming a failure improves a slide, not the customer outcome.')])]},
 {name:'The Agent Has Entered the Chat',tag:'DIFFICULT SECOND ALBUM',goal:'Trial an assistant without giving it unlimited authority.',boss:'Chad · Sales',brief:'Sales has sold an “autonomous everything” pilot. The agent has requested a company card and admin access.',tasks:[
 task('bounds','Permission boundaries','quality',7,18,'customers',true,'A bounded pilot needs limited actions, review and a way to stop.',120,3,.9),
 task('eval','Real-task evaluation set','ai',6,14,'engineering',false,'Measure task success and failure before expanding a demo.',120,3,.7),
 task('pilot','Human-reviewed pilot','ai',7,12,'leadership',false,'A narrow pilot can test value without pretending the system is ready for everything.',80,2,.65),
 task('avatar','Animated agent headshot','ux',5,2,'leadership',false,'An expressive avatar does not establish reliability.',400,.5,.25)],events:[
 event(2,'Chad · Sales','The demo needs a credit card','“Just let it buy things. We can add a confirmation button in Q4.”',[
 option('Enable purchases for the demo',{leadership:10,debt:10},'The demo is smoother today. You created an unreviewed action path.',{type:'impact',offset:1,effect:{customers:-12,debt:8},text:'The demo agent renewed a fictional subscription twelve times. Permission shortcuts became cleanup work.'}),
 option('Sandbox the demo and review real actions',{leadership:-4,customers:5},'Separate demonstration from authority. Agree what evidence would justify a larger pilot.'),
 option('Cancel every AI experiment',{leadership:-9,energy:3},'You avoid this exposure but also lose a bounded chance to learn. A smaller pilot was available.')]),
 event(4,'Lex · Engineering','The benchmark is suspiciously perfect','The agent scores 100% on examples it has already seen.',[
 option('Add unseen failures and adversarial cases',{energy:-4,customers:7},'A representative evaluation includes failure modes and a held-out set.'),
 option('Put 100% in the sales deck',{leadership:7,customers:-8},'An easy benchmark overstates what you know. Confidence is not evidence.')])]},
 {name:'Vibe Now, Debug Later',tag:'THE TECH DEBT TOUR',goal:'Keep a fast prototype from becoming a fragile production service.',boss:'Mina · Engineering',brief:'The prototype took eleven minutes. Nobody can explain the other 18,000 lines. The launch thread has 93 rocket emojis.',tasks:[
 task('tests','Critical-path regression tests','quality',7,18,'engineering',true,'Review and tests protect the behaviour customers rely on.',300,3,.9),
 task('refactor','Untangle generated code','core',8,14,'engineering',false,'Smaller, understood components reduce future change cost.',200,2,.8),
 task('access','Keyboard-friendly flows','ux',6,14,'customers',false,'Keyboard access is part of usable delivery, not decorative polish.',160,3,.85),
 task('rewrite','Rewrite it in Trend.js','platform',9,3,'leadership',false,'A new framework without a diagnosed bottleneck adds migration work.',300,1,.2)],events:[
 event(2,'Mina · Engineering','An overnight miracle?','“We could ask the team for one heroic weekend.” Their calendars already say heroic weekend.',[
 option('Order the weekend push',{energy:-18,leadership:8},'Extra pressure has an immediate energy cost and a later retention cost.',{type:'impact',effect:{energy:-10},text:'The heroic weekend became the default expectation. Team energy took another hit.'}),
 option('Cut scope and pair on the riskiest code',{leadership:-4,debt:-6,energy:5},'Make the trade-off explicit. Review risky behaviour before expanding scope.')]),
 event(4,'Sam · Engineering','A junior asks a useful question','“What is this service actually meant to do?” Nobody answers for seven seconds.',[
 option('Write examples and pair with Sam',{energy:-2,debt:-5},'Shared understanding costs time now and improves future capacity.',{type:'mentor'}),
 option('Tell Sam to read the generated code',{energy:-6,debt:4},'Unclear intent survives. Documentation and examples are engineering work.')])]},
 {name:'The Retention Intervention',tag:'CUSTOMERS LEAVE THE GROUP CHAT',goal:'Improve successful onboarding without disguising churn.',boss:'Priya · Growth',brief:'Sign-ups are up. Successful first tasks are down. Someone suggests moving the cancellation button into a maze.',tasks:[
 task('activation','Fix the first-task drop-off','ux',7,18,'customers',true,'The goal is successful use, not just more accounts.',500,3,.9),
 task('measure','Measure completed tasks','platform',6,13,'engineering',false,'Use an outcome measure with a denominator and guardrail.',500,2,.85),
 task('interviews','Instrument exit feedback','core',5,10,'customers',false,'Learn why customers leave rather than trapping them.',130,2,.65),
 task('streak','Mandatory daily streak','ux',6,3,'leadership',false,'Daily activity is not automatically customer value.',600,1,.3)],events:[
 event(2,'Priya · Growth','The cancellation escape room','“What if cancelling required a phone call, a fax and a moon phase?”',[
 option('Make cancellation harder',{leadership:10,customers:-10},'You improve a short-term number by adding friction, then lose trust.',{type:'impact',effect:{customers:-10,leadership:-5},text:'Support complaints exposed the cancellation maze. Apparent retention was not loyalty.'}),
 option('Keep an easy exit; investigate churn',{leadership:-4,customers:8},'Pair an honest retention measure with customer research and a clear exit.')]),
 event(4,'Priya · Growth','The denominator went missing','“We increased completed tasks!” The customer base doubled; completion rate fell.',[
 option('Show completion rate and support contacts',{customers:6,leadership:-2},'A count alone hides changes in population. Pair the outcome rate with a harm guardrail.'),
 option('Publish the bigger number',{leadership:6,customers:-7},'The slide is technically a count, but it conceals whether the product improved.')])]},
 {name:'Cloudy With a Chance of Invoices',tag:'THE PLATFORM REUNION',goal:'Keep the service dependable within its operating budget.',boss:'Fin · Finance',brief:'An AI summary of an AI summary is calling seven models. Finance has printed the bill on a scroll.',tasks:[
 task('limits','Usage caps and alerts','platform',7,18,'engineering',true,'A bounded cost path is required for this release.',400,3,.9),
 task('fallback','Graceful service fallback','quality',7,15,'customers',false,'A dependency outage should not stop the core customer task.',400,3,.8),
 task('cache','Cache repeated requests','core',6,12,'leadership',false,'Reuse safe results before increasing infrastructure spend.',250,2,.8),
 task('summary','Summarise every hover','ai',6,2,'leadership',false,'Not every interaction needs a model call.',500,.5,.3)],events:[
 event(2,'Fin · Finance','A surprisingly finite budget','“Can we switch every request to the cheapest model by lunch?”',[
 option('Switch everything without evaluation',{leadership:8,customers:-6},'Unit price is only part of cost. Failure and rework can erase savings.',{type:'impact',offset:1,effect:{debt:6,customers:-6},text:'Cheap requests needed expensive retries. Total cost rose after the blanket switch.'}),
 option('Compare cost per successful task',{leadership:-2,debt:-5},'Evaluate quality and total cost on representative tasks before a staged change.')]),
 event(4,'Kit · Platform','A vendor has a small outage','Their status page says “some users”. Those users are yours.',[
 option('Communicate impact and offer a fallback',{customers:7,energy:-3},'Specific updates and a usable fallback reduce uncertainty.'),
 option('Wait until the status page is green',{customers:-9,energy:2},'Customers experience the failure now. Silence does not pause their work.')])]},
 {name:'The Board Wants a Demo',tag:'LIVE AT THE BOARDROOM',goal:'Ship a credible release and communicate what remains uncertain.',boss:'Vera · CEO',brief:'Six releases. One team. A board that has discovered the phrase “agentic product-led hypergrowth”. Time to play the actual hits.',tasks:[
 task('rollback','Staged rollout and rollback','quality',8,18,'customers',true,'A reversible launch limits impact when assumptions fail.',500,3,.9),
 task('outcomes','Outcome dashboard','platform',6,13,'leadership',false,'Show successful tasks, reliability and operating cost, not only activity.',500,2,.85),
 task('handover','Support and team handover','core',6,12,'engineering',false,'A sustainable release includes operational ownership.',200,2,.9),
 task('vision','Holographic roadmap','ai',8,3,'leadership',false,'An impressive story is useful only if it matches evidence and commitments.',500,1,.3)],events:[
 event(2,'Vera · CEO','Can you guarantee it?','“Put 100% reliable on the slide. Investors love round numbers.”',[
 option('Guarantee perfection',{leadership:12},'A guarantee creates an expectation the evidence cannot support.',{type:'impact',effect:{leadership:-18,customers:-5},text:'The first ordinary incident broke the perfection promise. Trust was harder to restore than the service.'}),
 option('Show evidence, limits and rollout gates',{leadership:-3,customers:6},'State what you know, how you measured it, and what would stop expansion.')]),
 event(4,'The team','One more thing','A stakeholder asks to add four features. The team asks to go home at a reasonable hour.',[
 option('Agree the smallest useful release',{energy:8,leadership:-3},'Make scope and consequences visible. A sustainable team can improve the product next week.'),
 option('Call everything a Must',{energy:-15,leadership:8,debt:8},'MoSCoW loses its purpose when everything is mandatory. Negotiate scope against the outcome.')])]}
];
export const sources=[['MoSCoW · Agile Business Consortium','https://www.agilebusiness.org/resource/what-is-moscow-prioritization/'],['RICE · Intercom','https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers'],['AI complexity and engineering fundamentals · Thoughtworks, 2026','https://www.thoughtworks.com/about-us/news/2026/combat-ai-cognitive-debt-radar-v34']];
