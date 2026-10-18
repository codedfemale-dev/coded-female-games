import {developers,levels} from './content.js';
import {capacity} from './engine.js';
export const profiles={
 ada:{about:'An experienced full-stack developer who focuses on the core product journey.',best:'Core features, checkout fixes and simplifying application code.',tradeoff:'5 credits. Base pace 2; core work gets +1. A strong core specialist, with less budget left for the other two hires.'},
 nia:{about:'A UX engineer who connects design with working interfaces.',best:'Clear error messages, accessible flows and other UX work.',tradeoff:'4 credits. Base pace 2; UX work gets +1. A good fit for usability, but the release requirement still comes first.'},
 bo:{about:'A reliability engineer who makes failures easier to prevent and detect.',best:'Tests, monitoring, permission boundaries and quality work.',tradeoff:'4 credits. Base pace 2; quality work gets +1. Useful when the release depends on dependable behaviour.'},
 lex:{about:'A fast AI prototyper who asks the team to review what gets built.',best:'Evaluations, assistant pilots and other AI tasks. Also a fast generalist.',tradeoff:'3 credits. Base pace 3; AI work gets +1. Can match some specialists on other work. The game gives Lex no hidden quality penalty.'},
 sam:{about:'A thoughtful junior developer who benefits from pairing and mentoring.',best:'Core work when you can allow more time and support learning.',tradeoff:'2 credits. Base pace 1; core work gets +1. A mentoring choice adds +1 to future capacity. Low cost leaves room in the hiring budget; plan around the lower starting pace.'},
 kit:{about:'A platform engineer who focuses on the foundations a product runs on.',best:'Infrastructure, cost controls, fallbacks and other platform work.',tradeoff:'4 credits. Base pace 2; platform work gets +1. Check the task type: not every technical task is platform work.'}
};
export function fitFor(s,d,task=null){
 const tasks=task?[task]:levels[s.level].tasks;
 const matched=tasks.filter(t=>t.kind===d.skill);
 const required=matched.some(t=>t.must);
 const rates=tasks.map(t=>({title:t.title,kind:t.kind,rate:capacity(s,d,t),days:Math.ceil(Math.max(0,t.effort-(t.progress||0))/capacity(s,d,t))}));
 const daysLeft=s.phase==='hire'?6:Math.max(0,6+(s.delayed?1:0)-s.day);
 const tight=matched.filter(t=>t.must&&Math.ceil(Math.max(0,t.effort-(t.progress||0))/capacity(s,d,t))>daysLeft);
 return {matched,required,rates,tight:!!tight.length,label:tight.length?'Specialist · needs more time':matched.length?(required?'Requirement specialist':'Specialist match'):'Generalist option',reason:matched.length?`${d.name} specialises in ${d.skill}: +1 work on ${matched.map(t=>t.title).join(', ')}.${tight.length?` At the current pace, the required work needs more than ${daysLeft} remaining working days. Allow more time, mentoring or another owner.`:''}`:`No ${d.skill} specialist task here. ${d.name} can still take other work; compare pace, cost and the rest of your team.`};
}
