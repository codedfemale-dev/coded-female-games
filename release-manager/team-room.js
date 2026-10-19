import {developers} from './content.js';
import {orderedTasks,capacity} from './engine.js';
export const seats=[{x:228,y:180,walk:{x:228,y:300}},{x:366,y:180,walk:{x:366,y:300}},{x:504,y:180,walk:{x:504,y:300}}];
export function roomTeam(s){return (s.team||[]).map((id,i)=>{const d=developers.find(d=>d.id===id);return d&&seats[i]?{...d,seat:seats[i],slot:i}:null;}).filter(Boolean);}
export function developerWork(s,id){
 const dev=developers.find(d=>d.id===id);if(!dev||!s.team.includes(id))return null;
 const assigned=orderedTasks(s).filter(t=>t.dev===id),ready=assigned.filter(t=>t.progress>=t.effort),deferred=assigned.filter(t=>t.progress<t.effort&&t.priority==='Won’t'),queue=assigned.filter(t=>t.progress<t.effort&&t.priority!=='Won’t');
 const current=queue[0]||null,rate=current?capacity(s,dev,current):0;
 const daysLeft=Math.max(0,6+(s.delayed?1:0)-s.day),remaining=current?current.effort-current.progress:0;
 const concerns=[];if(s.energy<35)concerns.push('Low team energy is reducing my pace by one work per day.');if(s.debt>55)concerns.push('Technical debt is reducing my pace by one work per day.');
 if(current&&Math.ceil(remaining/rate)>daysLeft)concerns.push(`At ${rate} work per day, this task needs ${Math.ceil(remaining/rate)} active days; only ${daysLeft} remain. Reassigning, cutting other scope or negotiating time may help.`);
 if(queue.length>1)concerns.push('I work on one task per day. My next task waits until the current one is finished; work does not spill into a second task on the same day.');
 if(!current)concerns.push(ready.length?'My assigned work is ready. You can give me another task if there is time.':deferred.length?'My only unfinished assignments are deferred, so I will not work on them this release.':'I have no included work assigned. Choose a task on the project board before advancing the day.');
 return {dev,current,rate,remaining,daysLeft,queue,ready,deferred,concerns};
}

export function eventRepresentative(s,who){
 if(/support|customer|Jo ·/i.test(who))return 'support';
 if(/engineering|Lex|Mina|Sam|Kit|Bo ·|The team|Platform/i.test(who)){
  const named=roomTeam(s).find(d=>who.split(' · ')[0]===d.name);
  return named?.id||(/The team/i.test(who)?roomTeam(s)[0]?.id:null)||'engineer';
 }
 return 'ceo';
}
