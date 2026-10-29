'use strict';
/* One committed action per decision. Alternatives are labelled, separate views. */
const SCAM_TIMELINES=(()=>{
 const valid=(q,step,id)=>Number.isInteger(step)&&step>=0&&step<q.stages.length&&q.stages[step].options.some(o=>o.id===id);
 const cleanHistory=list=>Array.isArray(list)?list.filter(h=>h&&['outgoing','system','incoming'].includes(h.side)&&typeof h.text==='string'&&h.text.length<1200).slice(-60).map(h=>({side:h.side,text:h.text})):[];
 function events(q,step,id,slot){
  const s=q.stages[step],o=s.options.find(o=>o.id===id);if(!o)return [];
  const success={verify:step?s.insight:q.contact.response.startsWith(q.contact.name+':')?q.contact.response:q.contact.name+': '+q.contact.response,report:'Your report has been recorded through the established reporting route.',task:'The action was completed in the app.',archive:'The item was left for later.'};
  const other={reply:'Reply sent to the contact in the message.',forward:'The message was forwarded in this simulation.',pay:'Simulated payment choice recorded. No real money moved.',access:'The access request was approved in this simulation.',link:'The supplied page opened inside this simulation.',call:'You called using the contact details in the message.',verify:'You checked through this contact route.',archive:'You left the request for later.',task:'The app action was recorded.',report:'The report was recorded.'};
  return [...(o.tool==='task'&&slot?[{side:'outgoing',text:'Selected interview slot: '+slot}]:[]),...(['reply','forward'].includes(o.tool)?[{side:'outgoing',text:o.draft}]:[]),{side:'system',text:(id===s.correct&&success[o.tool])||other[o.tool]||'Action recorded.'},{side:'incoming',text:o.consequence}];
 }
 function visibleEvents(q,a){
  const list=[];
  for(let i=0;i<=a.step;i++){
   if(i>0)list.push({side:'incoming',text:q.stages[i].reveal,followup:true});
   const id=a.compareMode&&i===a.step?a.compareChoice:a.guided&&i===0?q.stages[0].correct:a.answers[i];
   if(id)list.push(...events(q,i,id,(!a.compareMode||i!==a.step)?a.slots?.[i]:null));
  }
  return list;
 }
 function primaryEvents(q,a){return visibleEvents(q,{...a,compareMode:false,compareChoice:null});}
 function fields(q,a){
  const comparisons=[];
  for(const c of Array.isArray(a.comparisons)?a.comparisons:[]){if(c&&valid(q,c.step,c.option)&&a.answers[c.step]&&c.option!==a.answers[c.step]&&!comparisons.some(v=>v.step===c.step&&v.option===c.option))comparisons.push({step:c.step,option:c.option});}
  const out={timelineVersion:1,comparisons,compareMode:!!a.compareMode&&!!a.answers[a.step]&&!a.detour,compareChoice:null,guided:!!a.guided||(a.step>0&&a.answers[0]!==q.stages[0].correct),legacyHistory:cleanHistory(a.timelineVersion===1?a.legacyHistory:a.history),legacyLatest:(Array.isArray(a.timelineVersion===1?a.legacyLatest:a.latest)?(a.timelineVersion===1?a.legacyLatest:a.latest):[]).filter((id,i)=>valid(q,i,id)),slots:{}};
  if(out.compareMode&&comparisons.some(c=>c.step===a.step&&c.option===a.compareChoice))out.compareChoice=a.compareChoice;
  for(const [step,slot] of Object.entries(a.slots||{}))if(['Tuesday, 10:00','Tuesday, 14:30','Wednesday, 11:00'].includes(slot)&&q.id==='verified-interview'&&step==='0')out.slots[step]=slot;
  return out;
 }
 function beginComparison(q,a){if(!a.answers[a.step]||a.detour)return false;a.compareMode=true;a.compareChoice=null;return true;}
 function returnOriginal(a){a.compareMode=false;a.compareChoice=null;}
 function commit(q,a,id,slot){
  if(!valid(q,a.step,id)||a.detour)return false;
  if(a.compareMode){
   if(a.compareChoice||!a.answers[a.step]||id===a.answers[a.step])return false;
   if(!a.comparisons.some(c=>c.step===a.step&&c.option===id))a.comparisons.push({step:a.step,option:id});
   a.compareChoice=id;return true;
  }
  if(a.answers[a.step])return false;
  a.answers[a.step]=id;a.latest=a.answers.slice();
  if(q.id==='verified-interview'&&['Tuesday, 10:00','Tuesday, 14:30','Wednesday, 11:00'].includes(slot))a.slots[a.step]=slot;
  a.history=primaryEvents(q,a);return true;
 }
 function optionFor(a){return a.compareMode?a.compareChoice:a.answers[a.step];}
 function canAct(a){return !a.detour&&!(a.compareMode?a.compareChoice:a.answers[a.step]);}
 function routeLabel(a){return a.compareMode?'Alternative timeline':a.guided?'Guided follow-up timeline':'Original timeline';}
 function record(q,a){return {...a,answers:a.answers.slice(),latest:a.answers.slice(),flags:(a.flags||[]).slice(),inspected:(a.inspected||[]).slice(),comparisons:a.comparisons.map(c=>({...c})),compareMode:false,compareChoice:null,history:primaryEvents(q,a),complete:true};}
 return {events,visibleEvents,primaryEvents,fields,beginComparison,returnOriginal,commit,optionFor,canAct,routeLabel,record};
})();
if(typeof module!=='undefined')module.exports=SCAM_TIMELINES;
