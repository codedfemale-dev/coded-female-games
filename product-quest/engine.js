// Pure rules. Readiness is earned through decisions, never through confidence,
// caffeine or an unexplained preference for one defensible approach.
import {bosses} from './content.js';
export {bosses};
export const TARGET=80;
export const initialState=()=>({phase:'intro',boss:0,round:0,alignment:0,energy:80,breakUsed:false,approved:0,turns:0,score:0,log:[],feedback:null,notice:''});
const clamp=n=>Math.max(0,Math.min(100,n));
export const openQuestions=s=>s.log.filter(l=>l.boss===s.boss&&l.kind==='gap');
const recalculate=s=>({...s,alignment:s.log.filter(l=>l.boss===s.boss).reduce((n,l)=>n+l.gain,0),score:s.log.filter(l=>l.kind==='sound').length*100});

export function act(state,action) {
  if(!action||typeof action.type!=='string')return state;
  let s={...state,log:[...state.log]};
  if(action.type==='start'&&s.phase==='intro')return {...s,phase:'battle'};
  if(action.type==='next'&&s.phase==='won')return {...s,boss:s.boss+1,round:0,alignment:0,energy:clamp(s.energy+18),breakUsed:false,feedback:null,notice:'',phase:'battle'};
  if(action.type==='break'&&['battle','review','feedback'].includes(s.phase)) {
    if(s.breakUsed||s.energy===100)return state;
    return {...s,energy:clamp(s.energy+24),breakUsed:true,notice:'You took a breather. Energy +24. Your decisions and XP stay the same.'};
  }
  if(action.type==='continue'&&s.phase==='feedback') {
    if(!s.feedback.review&&s.round<2)return {...s,round:s.round+1,phase:'battle',feedback:null,notice:''};
    const gaps=openQuestions(s);
    if(gaps.length)return {...s,round:gaps[0].round,phase:'review',feedback:null,notice:''};
    if(s.alignment<TARGET)return state;
    return {...s,approved:s.approved+1,phase:s.boss===bosses.length-1?'complete':'won',feedback:null,notice:''};
  }
  if(action.type!=='choose'||!['battle','review'].includes(s.phase)||!Number.isInteger(action.index))return state;
  const r=bosses[s.boss]?.rounds[s.round],choice=r?.choices[action.index];
  if(!choice)return state;
  const review=s.phase==='review',existing=s.log.find(l=>l.boss===s.boss&&l.round===s.round);
  if(!review&&existing)return state;
  const entry={boss:s.boss,round:s.round,name:bosses[s.boss].name,question:r.question,answer:choice.text,kind:choice.kind,gain:choice.gain,result:choice.result,tradeoff:choice.tradeoff,commitment:choice.commitment,firstAnswer:existing?.firstAnswer||choice.text,firstKind:existing?.firstKind||choice.kind,revisions:existing?[...existing.revisions,{answer:choice.text,kind:choice.kind}]:[]};
  s.log=existing?s.log.map(l=>l===existing?entry:l):[...s.log,entry];
  s.energy=clamp(s.energy-6);s.turns++;
  s=recalculate(s);
  return {...s,phase:'feedback',notice:'',feedback:{review,kind:choice.kind,title:choice.kind==='sound'?'A defensible next step':'An assumption needs checking',answer:choice.text,result:choice.result,tradeoff:choice.tradeoff,commitment:choice.commitment,gain:choice.gain,change:existing?choice.gain-existing.gain:choice.gain}};
}

export function scorecard(s) {
  const reviewed=s.log.filter(l=>l.revisions.length).length;
  return {total:s.score+s.approved*150,status:s.phase==='complete'?'PILOT PLAN AGREED':'PLAN IN PROGRESS',title:s.phase==='complete'?'A plan you can explain.':'A useful next decision.',decisions:s.log.length,reviewed,meetings:s.approved,independent:s.log.filter(l=>l.firstKind==='sound').length};
}

export function fieldNotes(s) {
  const card=scorecard(s);
  return ['PRODUCT QUEST | CODED FEMALE',card.status,`${card.total} completion XP`,`${s.approved}/7 stakeholder agreements`,`${s.log.length}/21 decisions recorded`,`${card.reviewed} decisions revisited`,'Fictional learning exercise. XP records completion, not professional ability.','',...s.log.flatMap(l=>[`${l.name}: ${l.question}`,`First choice: ${l.firstAnswer}`,`Current decision: ${l.answer}`,`Reasoning: ${l.result}`,`Trade-off: ${l.tradeoff}`,`Next check: ${l.commitment}`,...l.revisions.map((r,i)=>`Review ${i+1}: ${r.answer}`),'']),'Agreement on a plan is not evidence that the product is ready for public release. Verify the conditions before participant use.'].join('\n');
}
