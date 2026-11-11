import {cases,caseById} from './studio-content.js?v=20261110-choice1';
export const SAVE_KEY='coded-female-choice-matters-v1';
export function shuffled(items,random=Math.random) {const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.min(i,Math.max(0,Math.floor(random()*(i+1))));[result[i],result[j]]=[result[j],result[i]];}return result;}
export function createStudio(mode='guided',random=Math.random) {
  const ids=cases.map(c=>c.id);
  return {version:1,mode:mode==='challenge'?'challenge':'guided',order:mode==='challenge'?shuffled(ids,random):ids,position:0,entries:Object.fromEntries(ids.map(id=>[id,{values:[-1,-1],trials:[],reviews:[]}]))};
}
export const isComplete=(c,entry)=>entry.values.every((v,i)=>v===c.fields[i].good)&&entry.trials.some(t=>t.every((v,i)=>v===c.fields[i].good));
export const completedCount=s=>s.order.filter(id=>isComplete(caseById[id],s.entries[id])).length;
export function assess(c,values) {return c.fields.map((f,i)=>({chosen:Number.isInteger(values[i])&&values[i]>=0&&values[i]<f.options.length,passed:values[i]===f.good,reason:f.reason}));}
export function checkDesign(s) {
  const id=s.order[s.position],e=s.entries[id];
  if(isComplete(caseById[id],e)||assess(caseById[id],e.values).some(r=>!r.chosen))return s;
  return {...s,entries:{...s.entries,[id]:{...e,trials:[...e.trials,[...e.values]]}}};
}
export function selectSetting(s,index,value) {
  const id=s.order[s.position],c=caseById[id],e=s.entries[id];
  if(isComplete(c,e)||![0,1].includes(index)||!Number.isInteger(value)||value< -1||value>=c.fields[index].options.length)return s;
  return {...s,entries:{...s.entries,[id]:{...e,values:e.values.map((v,i)=>i===index?value:v)}}};
}
export function readCheckpoint(raw) {
  try {
    const s=JSON.parse(raw),ids=cases.map(c=>c.id);
    if(s.version!==1||!['guided','challenge'].includes(s.mode)||!Array.isArray(s.order)||s.order.length!==ids.length||new Set(s.order).size!==ids.length||!s.order.every(id=>ids.includes(id))||!Number.isInteger(s.position)||s.position<0||s.position>=ids.length)return null;
    const clean=createStudio(s.mode);clean.order=s.order;clean.position=s.position;
    for(const id of ids){
      const e=s.entries[id],c=caseById[id];
      const valid=values=>Array.isArray(values)&&values.length===2&&values.every((v,i)=>Number.isInteger(v)&&v>=-1&&v<c.fields[i].options.length);
      if(!valid(e.values)||!Array.isArray(e.trials)||!e.trials.every(t=>valid(t)&&t.every(v=>v>=0))||!Array.isArray(e.reviews)||!e.reviews.every(v=>Number.isInteger(v)&&v>=0&&v<3))return null;
      clean.entries[id]={values:e.values,trials:e.trials,reviews:e.reviews};
    }
    return clean;
  }catch{return null;}
}
export function fieldNotes(s,reflection='') {
  return ['CHOICE MATTERS | MY DESIGN FIELD NOTES',`${completedCount(s)} of ${cases.length} repairs checked. ${s.mode==='guided'?'Guided studio':'Mixed casebook'}.`,'Fictional learning cases. Review prompts are not real user-test results.','',...s.order.flatMap(id=>{
    const c=caseById[id],e=s.entries[id];return [c.title,c.pattern,`Status: ${isComplete(c,e)?'Repair checked':'In progress'}`,...e.values.map((v,i)=>`${c.fields[i].label}: ${v===-1?'Not selected':c.fields[i].options[v]}`),...e.trials.map((v,i)=>`Check ${i+1}: ${v.map((n,j)=>c.fields[j].options[n]).join('; ')}`),...e.reviews.map(n=>`Review check: ${c.review.options[n].text}\nFeedback: ${c.review.options[n].reason}`),`Takeaway: ${c.takeaway}`,`Try with a person: ${c.check}`,''];
  }),'MY NEXT DESIGN REVIEW',reflection||'No reflection written.','','Use this checklist: full cost; clear commitment; voluntary extras; readable decline; truthful urgency; easy cancellation; separate permissions; visible sponsorship.','Supporting guidance: https://www.oecd.org/en/publications/dark-commercial-patterns_44f5e846-en.html','Pattern vocabulary: https://deceptive.design/types/'].join('\n');
}
