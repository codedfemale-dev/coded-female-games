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
export function release(s){if(s.phase!=='gate')return false;const done=s.tasks.filter(t=>t.progress>=t.effort);const missing=s.tasks.filter(t=>t.must&&!done.includes(t));const value=done.reduce((n,t)=>n+t.value,0);const over=s.tasks.filter(t=>s.framework!=='rice'&&t.priority==='Must'&&!done.includes(t));
 effect(s,{customers:Math.round(value/5)-missing.length*18,leadership:done.filter(t=>t.owner==='leadership').length*6+3-missing.length*10-over.length*3,energy:10,debt:done.some(t=>t.kind==='quality')?-7:8});
 if(s.promise){if(!done.some(t=>t.id===s.promise))effect(s,{leadership:-12});s.log.push(`Confetti commitment ${done.some(t=>t.id===s.promise)?'kept':'missed: leadership −12'}.`);delete s.promise;}
 const points=Math.max(0,value*10-missing.length*100-over.length*20);s.score+=points;
 const report={name:levels[s.level].name,framework:s.framework,points,day:s.day,missing:missing.length,feedback:s.tasks.map(t=>({title:t.title,done:done.includes(t),text:`${done.includes(t)?'Shipped':'Deferred / unfinished'} · ${s.framework==='rice'?`RICE ${rice(t)} · ${t.priority==='Won’t'?'Deferred':'Included'}`:t.priority}. ${t.why}${t.must&&!done.includes(t)?' Missing this release requirement reduced customer trust by 18.':''}${s.framework!=='rice'&&t.priority==='Must'&&!done.includes(t)?' An unmet Must also reduced leadership support.':''}`})),meters:{customers:s.customers,leadership:s.leadership,energy:s.energy,debt:s.debt}};
 s.reports.push(report);s.phase='retro';s.log.push(`Released ${report.name}: ${points} points. ${missing.length} release requirement(s) missed.`);return report;
}
export function next(s){if(s.phase!=='retro')return false;if(s.level===levels.length-1){s.phase='end';return true;}s.level++;s.phase='hire';s.team=[];s.budget=12;s.tasks=[];effect(s,{energy:8});return true;}
export function notes(s){return ['RELEASE MANAGER: SHIP HAPPENS','Fictional learning simulation. Scores are designed trade-offs, not forecasts.',`Score: ${s.score}`,`Mode: ${s.mode}`,`Planning method: ${s.framework==='rice'?'RICE':'MoSCoW'}`,...s.log,...s.reports.flatMap(r=>['',r.name,...r.feedback.map(t=>t.title+': '+t.text)])].join('\n');}
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
