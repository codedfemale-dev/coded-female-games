import {stations,missions} from './content.js';

export const visitLabel=station=>station.id==='crew'?'Speak to Pip':`Visit ${station.name}`;

// One description of the player's next useful action, shared by the interface.
export function journeyFor(state) {
  const mission=missions[state.mission];
  const common={mission:`Mission ${state.mission+1} of ${missions.length}: ${mission.title}`};
  if(state.phase==='brief')return {...common,title:'Your mission briefing',detail:'You lead the Curiosity’s tech crew. Read the problem, then start investigating.',label:`Start mission ${state.mission+1}`,action:'start',ready:true};
  if(state.phase==='observe'){
    const next=stations.find(s=>!state.clues.includes(s.id));
    return next?{...common,title:'Step 1 of 4 · Find the clues',detail:`${state.clues.length} of 3 clues collected. Next suggested stop: ${next.name}. Any order works.`,label:visitLabel(next),action:'visit',station:next.id,ready:true}:{...common,title:'Step 1 complete · All 3 clues found',detail:'Next, sort what you know from what you are assuming. You can reopen your evidence at any time.',label:'Sort the evidence →',action:'to-orient',ready:true};
  }
  if(state.phase==='orient'){
    const count=Object.keys(state.classifications).length;
    if(state.orientationChecked)return {...common,title:'Step 2 complete · Evidence sorted',detail:'You have checked your interpretation. Now choose a plan.',label:'Choose a plan →',action:'to-decide',ready:true};
    return {...common,title:'Step 2 of 4 · Sort the evidence',detail:state.orientationAttempts>0?'Read the feedback, correct any mistaken categories and check again. You can reopen the clues above the statements.':count===3?'All 3 statements have a category. Check your thinking to continue.':`Classify each statement: fact, assumption or unknown. ${count} of 3 answered.`,label:state.orientationAttempts>0?'Check again →':'Check my thinking',action:'check',ready:count===3};
  }
  if(state.phase==='decide')return {...common,title:'Step 3 of 4 · Choose a plan',detail:state.choice?`Selected: ${mission.options.find(o=>o.id===state.choice).title}. Apply it when you are ready.`:'Select one plan below. You can change your selection before applying it.',label:'Apply this plan →',action:'execute',ready:!!state.choice};
  if(state.phase==='act')return {...common,title:'Step 4 of 4 · Check the result and adapt',detail:'Read what happened and the new evidence, then choose how to respond. Your response completes the mission.',label:'Read the new evidence ↓',action:'read-update',ready:true};
  if(state.phase==='debrief')return {...common,title:`Mission ${state.mission+1} complete`,detail:'Read your practical takeaway, then continue. Worked examples and further reading are optional.',label:state.mission===missions.length-1?'View flight report →':`Next: ${missions[state.mission+1].title} →`,action:'next',ready:true};
  return {...common,title:'Expedition complete · All 3 missions finished',detail:'Download your field notes to keep the lessons. Reloading starts a fresh expedition.',label:'Save my field notes ↓',action:'download',ready:true};
}
