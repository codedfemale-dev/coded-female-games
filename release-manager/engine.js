import {developers,levels} from './content.js';
export const clamp=n=>Math.max(0,Math.min(100,n));
export const rice=t=>Math.round(t.reach*t.impact*t.confidence/t.effort);
export function fresh(mode='arcade'){return {version:1,mode,framework:'moscow',phase:'hire',level:0,day:0,team:[],budget:12,customers:60,leadership:60,energy:85,debt:10,score:0,tasks:[],pending:[],log:[],reports:[],mentor:false,delayed:false,eventIndex:0,event:null};}
export function effect(s,changes){for(const [k,v] of Object.entries(changes))if(['customers','leadership','energy','debt'].includes(k))s[k]=clamp(s[k]+v);}
export function hire(s,id){if(s.phase!=='hire')return;const dev=developers.find(d=>d.id===id);if(!dev)return;if(s.team.includes(id)){s.team=s.team.filter(x=>x!==id);s.budget+=dev.cost;}else if(s.team.length<3&&s.budget>=dev.cost){s.team.push(id);s.budget-=dev.cost;}}
export function begin(s){if(s.phase!=='hire'||s.team.length!==3)return false;s.tasks=levels[s.level].tasks.map(t=>({...t,progress:0,priority:'Could',dev:''}));s.day=0;s.phase='run';s.eventIndex=0;s.delayed=false;s.log.push(`Release ${s.level+1}: ${levels[s.level].name}. Team: ${s.team.join(', ')}.`);return true;}
export function setFramework(s,value){if(!['moscow','rice'].includes(value))return false;s.framework=value;s.log.push(`Planning method: ${value==='rice'?'RICE':'MoSCoW'}.`);return true;}
export function orderedTasks(s){const order={Must:0,Should:1,Could:2,'Won’t':3};return [...s.tasks].sort(s.framework==='rice'?(a,b)=>rice(b)-rice(a):(a,b)=>order[a.priority]-order[b.priority]);}
export function plan(s,id,key,value){if(s.phase!=='run')return;const t=s.tasks.find(t=>t.id===id);if(!t)return;if(key==='priority'&&['Must','Should','Could','Won’t'].includes(value))t.priority=value;if(key==='scope'&&value==='defer')t.priority='Won’t';if(key==='scope'&&value==='include'&&t.priority==='Won’t')t.priority='Could';if(key==='dev'&&(value===''||s.team.includes(value)))t.dev=value;}
export function capacity(s,d,t){return Math.max(1,d.speed+(d.skill===t.kind?1:0)+(s.mentor&&d.id==='sam'?1:0)-(s.energy<35?1:0)-(s.debt>55?1:0));}
export function advance(s){if(s.phase!=='run')return false;s.day++;
 const due=s.pending.filter(p=>p.level<=s.level&&p.day<=s.day);s.pending=s.pending.filter(p=>!due.includes(p));for(const p of due){effect(s,p.effect||{});s.log.push(`LATER: ${p.text}`);}
 for(const id of s.team){const d=developers.find(d=>d.id===id);const t=orderedTasks(s).filter(t=>t.dev===id&&t.priority!=='Won’t'&&t.progress<t.effort)[0];if(t){t.progress=Math.min(t.effort,t.progress+capacity(s,d,t));if(t.progress===t.effort)s.log.push(`Day ${s.day}: ${t.title} ready for release.`);}}
 effect(s,{energy:-2});
 const e=levels[s.level].events[s.eventIndex];if(e&&s.day>=e.day){s.event=s.eventIndex;s.eventIndex++;s.phase='event';}else if(s.day>=6+(s.delayed?1:0))s.phase='gate';return true;
}
export function choose(s,index){if(s.phase!=='event')return false;const e=levels[s.level].events[s.event],o=e.options[index];if(!o)return false;effect(s,o.effect);s.log.push(`${e.title} → ${o.label}. ${o.feedback}`);
 if(o.later?.type==='impact')s.pending.push({level:s.level+(o.later.offset||0),day:o.later.offset?1:s.day+2,...o.later});
 if(o.later?.type==='promise')s.promise=o.later.task;
 if(o.later?.type==='mentor')s.mentor=true;
 s.lastFeedback=o.feedback;s.event=null;s.phase=s.day>=6+(s.delayed?1:0)?'gate':'run';return true;
}
export function delay(s){if(s.phase!=='gate'||s.delayed)return false;s.delayed=true;effect(s,{leadership:-6,energy:-3});s.log.push('Release delayed one day: leadership −6, energy −3.');s.phase='run';return true;}
// Explain observed outcomes and current allocations without treating people as fixed good/bad hires.
export function reviewStrategy(s){
 const result=[],add=(kind,title,text)=>result.push({kind,title,text}),done=t=>t.progress>=t.effort;
 const required=s.tasks.filter(t=>t.must),missing=required.filter(t=>!done(t));
 if(!missing.length)add('good','You protected the outcome',`You completed ${required.map(t=>t.title).join(', ')}. That made the agreed outcome possible: ${levels[s.level].goal} ${s.tasks.some(t=>!t.must&&!done(t))?'Leaving optional work unfinished was a sensible trade-off here.':'You also delivered the optional work.'}`);
 for(const t of missing){const d=developers.find(d=>d.id===t.dev),specialist=developers.find(d=>s.team.includes(d.id)&&d.skill===t.kind);
 add('improve','The release requirement needed more protection',`${t.title} finished at ${t.progress}/${t.effort} work. ${t.priority==='Won’t'?'You deferred work that the agreed outcome depended on. Include this before optional work.':!d?'It ended without an owner. Give the requirement a developer before advancing the first day.':`It ended assigned to ${d.name}. Put this ahead of optional work in ${d.name}’s queue and check capacity before committing.`} Missing it reduced customer trust by 18 and the score by 100.`);
 if(!specialist)add('improve','Your roster missed a useful skill',`This requirement is ${t.kind} work, but none of your hires has that specialism. A matching specialist gets +1 work per active day. Next time, compare the roster with the release brief; other developers can still do the work, but may need more days or less competing scope.`);
 else if(d&&d.skill!==t.kind)add('tip','There was a specialist in your party',`${specialist.name} specialises in ${t.kind}, while ${t.title} ended with ${d.name}. Compare their displayed work rates before assigning it. Reassignment keeps progress; it does not create extra days.`);
 }
 const matched=s.tasks.filter(t=>done(t)&&developers.some(d=>d.id===t.dev&&d.skill===t.kind));
 if(matched.length)add('good','Your skills matched the work',`${matched.map(t=>`${developers.find(d=>d.id===t.dev).name} on ${t.title}`).join('; ')}. These tasks finished with a matching specialist assigned, which adds +1 work on days they work on that task. Final assignments do not show every earlier reassignment.`);
 const idle=s.team.filter(id=>!s.tasks.some(t=>t.dev===id&&t.priority!=='Won’t'));
 if(idle.length)add('tip','Check how you spread the work',`${idle.map(id=>developers.find(d=>d.id===id).name).join(', ')} had no included task at the final planning check. One developer can only advance one task each day. Next time, check everyone’s queue early; the final board alone cannot tell whether they were idle throughout.`);
 const overloaded=s.team.map(id=>({d:developers.find(d=>d.id===id),queue:s.tasks.filter(t=>t.dev===id&&t.priority!=='Won’t'&&!done(t))})).filter(x=>x.queue.length>1);
 for(const {d,queue} of overloaded)add('tip','Several tasks were competing for one person',`${queue.map(t=>t.title).join(' and ')} were still unfinished in ${d.name}’s queue. Priority changes the order, not the amount of time available. Share suitable work with another developer or defer optional scope.`);
 const start=s.log.findLastIndex(l=>l.startsWith(`Release ${s.level+1}:`));
 const decisions=s.log.slice(start+1).filter(l=>l.includes(' → '));
 for(const d of decisions)add('choice','Your stakeholder choice',d);
 if(s.promise){const kept=s.tasks.some(t=>t.id===s.promise&&done(t));add(kept?'good':'improve',kept?'You kept the confetti promise':'The confetti promise created a gap',kept?'You promised the CEO confetti and delivered it. Check whether the core outcome and team health were protected too.':'You promised confetti but it did not ship. That costs 12 leadership support. Next time, negotiate optional sparkle against capacity before making a firm commitment.');}
 if(s.energy<35)add('improve','The pace is costing the team',`Team energy is ${s.energy}/100 before recovery. Below 35, daily capacity drops by one. Cut optional scope and question pressure for extra work before the next release.`);
 if(s.debt>55)add('improve','Debt is slowing delivery',`Technical debt is ${s.debt}/100 before release effects. Above 55, daily capacity drops by one. Give quality work a deliberate place in the next plan.`);
 if(s.delayed)add('choice','You bought one more day','The extension gave one working day in exchange for 6 leadership support and 3 energy. Review whether the extra day completed a requirement or only added optional scope.');
 return result;
}
export function release(s){if(s.phase!=='gate')return false;const strategyFeedback=reviewStrategy(s);const done=s.tasks.filter(t=>t.progress>=t.effort);const missing=s.tasks.filter(t=>t.must&&!done.includes(t));const value=done.reduce((n,t)=>n+t.value,0);const over=s.tasks.filter(t=>s.framework!=='rice'&&t.priority==='Must'&&!done.includes(t));
 effect(s,{customers:Math.round(value/5)-missing.length*18,leadership:done.filter(t=>t.owner==='leadership').length*6+3-missing.length*10-over.length*3,energy:10,debt:done.some(t=>t.kind==='quality')?-7:8});
 if(s.promise){if(!done.some(t=>t.id===s.promise))effect(s,{leadership:-12});s.log.push(`Confetti commitment ${done.some(t=>t.id===s.promise)?'kept':'missed: leadership −12'}.`);delete s.promise;}
 const points=Math.max(0,value*10-missing.length*100-over.length*20);s.score+=points;
 const report={strategyFeedback,name:levels[s.level].name,framework:s.framework,points,day:s.day,missing:missing.length,feedback:s.tasks.map(t=>({title:t.title,done:done.includes(t),text:`${done.includes(t)?'Shipped':'Deferred / unfinished'} · ${s.framework==='rice'?`RICE ${rice(t)} · ${t.priority==='Won’t'?'Deferred':'Included'}`:t.priority}. ${t.why}${t.must&&!done.includes(t)?' Missing this release requirement reduced customer trust by 18.':''}${s.framework!=='rice'&&t.priority==='Must'&&!done.includes(t)?' An unmet Must also reduced leadership support.':''}`})),meters:{customers:s.customers,leadership:s.leadership,energy:s.energy,debt:s.debt}};
 s.reports.push(report);s.phase='retro';s.log.push(`Released ${report.name}: ${points} points. ${missing.length} release requirement(s) missed.`);return report;
}
export function next(s){if(s.phase!=='retro')return false;if(s.level===levels.length-1){s.phase='end';return true;}s.level++;s.phase='hire';s.team=[];s.budget=12;s.tasks=[];effect(s,{energy:8});return true;}
export function notes(s){return ['RELEASE MANAGER: SHIP HAPPENS','Fictional learning simulation. Scores are designed trade-offs, not forecasts.',`Score: ${s.score}`,`Mode: ${s.mode}`,`Planning method: ${s.framework==='rice'?'RICE':'MoSCoW'}`,...s.log,...s.reports.flatMap(r=>['',r.name,...(r.strategyFeedback||[]).map(f=>f.title+': '+f.text),...r.feedback.map(t=>t.title+': '+t.text)])].join('\n');}
export function restore(raw){try{
 const s=JSON.parse(raw),phases=['hire','run','event','gate','retro','end'];
 if(!s||s.version!==1||!['arcade','practice'].includes(s.mode)||!phases.includes(s.phase)||!Number.isInteger(s.level)||s.level<0||s.level>=levels.length)return null;
 if(s.framework===undefined)s.framework='moscow';if(!['moscow','rice'].includes(s.framework))return null;
 for(const k of ['customers','leadership','energy','debt','score','day','budget'])if(!Number.isFinite(s[k])||s[k]<0)return null;
 if(['customers','leadership','energy','debt'].some(k=>s[k]>100)||s.day>7||s.budget>12)return null;
 if(!Array.isArray(s.team)||s.team.length>3||new Set(s.team).size!==s.team.length||s.team.some(id=>!developers.some(d=>d.id===id)))return null;
 if(!Array.isArray(s.tasks)||!Array.isArray(s.log)||!s.log.every(x=>typeof x==='string')||!Array.isArray(s.pending)||!Array.isArray(s.reports))return null;
 if(['run','event','gate','retro'].includes(s.phase)&&(s.tasks.length!==4||s.team.length!==3))return null;
 if(new Set(s.tasks.map(t=>t.id)).size!==s.tasks.length)return null;
 const rebuilt=[];for(const t of s.tasks){const canonical=levels[s.level].tasks.find(x=>x.id===t.id);if(!canonical||!Number.isFinite(t.progress)||t.progress<0||t.progress>canonical.effort||!['Must','Should','Could','Won’t'].includes(t.priority)||(t.dev!==''&&!s.team.includes(t.dev)))return null;rebuilt.push({...canonical,progress:t.progress,priority:t.priority,dev:t.dev});}
 if(s.reports.length>6||s.reports.some(r=>typeof r.name!=='string'||!Number.isFinite(r.points)||!Array.isArray(r.feedback)||r.feedback.length!==4||r.feedback.some(t=>typeof t.title!=='string'||typeof t.text!=='string'||typeof t.done!=='boolean')))return null;
 if(s.pending.some(p=>!Number.isInteger(p.level)||!Number.isInteger(p.day)||typeof p.text!=='string'||!p.effect||Object.entries(p.effect).some(([k,v])=>!['customers','leadership','energy','debt'].includes(k)||!Number.isFinite(v))))return null;
 if(s.phase==='event'&&!levels[s.level].events[s.event])return null;
 s.tasks=rebuilt;return s;
 }catch{return null;}}
