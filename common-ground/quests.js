// Original extension challenges. Supporting guidance: W3C WAI.
export const quests=[
 {id:'images',title:'The missing directions',skill:'Image alternatives',brief:'The centre adds a map showing the entrance on Market Lane, beside the library. That route is not explained anywhere else. Help visitors get the same useful information without seeing the map.',options:['Use alt="Map"','Describe the route: Entrance on Market Lane, beside the library','Use alt="" for every image'],good:1,why:['“Map” names the format but leaves out the route. Describe the information that matters in this context.','The alternative conveys the route. Decorative images can use empty alt text; this map contains useful information.','Empty alt text is appropriate for decoration or information already provided nearby. Here it would hide the only directions.'],hint:'Ask what someone would miss if this particular image disappeared.',code:'<img src="entrance-map.svg"\n  alt="Entrance on Market Lane, beside the library">',source:'https://www.w3.org/WAI/tutorials/images/decision-tree/'},
 {id:'captions',title:'An announcement you can read',skill:'Captions',brief:'A welcome video explains that the pottery session has moved to Room 2. A bell also signals the start. Make both pieces of information available when the sound is off.',options:['Make the volume louder','Add a transcript as the only alternative','Provide checked, synchronised captions for speech and relevant sounds'],good:2,why:['Volume does not help someone who cannot hear the audio or is watching with sound off.','A transcript is useful, but it does not replace synchronised captions for this video with audio.','Captions follow the video and include relevant sounds as well as speech. Review automatic captions and correct them.'],hint:'The information needs to arrive at the same time as the video.',code:'<video controls>\n  <source src="welcome.mp4" type="video/mp4">\n  <track kind="captions" src="welcome-en.vtt"\n    srclang="en" label="English" default>\n</video>',source:'https://www.w3.org/WAI/media/av/captions/'},
 {id:'colour',title:'More than a green dot',skill:'Colour cues',brief:'Workshop availability is shown with green and red dots. Add a cue that still makes sense without distinguishing those colours.',options:['Add visible “Places available” and “Fully booked” text','Change the red dot to orange','Explain that green means available at the bottom of the page'],good:0,why:['Words make the status explicit alongside the dots. Colour can still reinforce the message.','Changing the palette still asks visitors to distinguish colours to understand availability.','A colour key still relies on recognising the colours. Put a readable status beside each workshop.'],hint:'Try describing the status without naming a colour.',code:'<p><span aria-hidden="true">●</span> Places available</p>\n<p><span aria-hidden="true">●</span> Fully booked</p>',source:'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html'}
];
export const visitorReports=[['Jo · booking a first workshop','Which details belong in this box?'],['Sam · reading the location','I need to read the address clearly.'],['Alex · choosing an action','Where will this button take me?'],['Rae · using a keyboard','Let me follow the form in a sensible order.'],['Jo · correcting a mistake','Tell me what to fix and keep what I entered.']];
export const freshQuests=()=>quests.map(()=>({selected:null,attempts:[],complete:false}));
export function checkQuest(state,index,choice){
 if(!quests[index]||!Number.isInteger(choice)||!quests[index].options[choice]||state[index].complete)return state;
 return state.map((s,i)=>i===index?{selected:choice,attempts:[...s.attempts,choice],complete:choice===quests[index].good}:s);
}
export function nextRepair(progress,index){
 for(let n=1;n<=progress.length;n++){const i=(index+n)%progress.length;if(!progress[i].complete)return i;}
 return null;
}
export const checkpointKey='cf-open-for-everyone-workshop-v1';
export function makeCheckpoint(progress,index,bonus){
 const clean=(entries,definitions)=>entries.map((s,i)=>({selected:Number.isInteger(s.selected)&&definitions[i].options[s.selected]?s.selected:null,attempts:s.attempts.filter(c=>Number.isInteger(c)&&definitions[i].options[c]).slice(-100),complete:Boolean(s.complete&&s.selected===definitions[i].good)}));
 return {version:2,index,progress:clean(progress,baseDefinitions),bonus:clean(bonus,quests)};
}
// Avoid coupling checkpoint validation to the rendering module.
import {lessons as baseDefinitions} from './access-lessons.js?v=20261107-mobile1';
export function readCheckpoint(raw){
 try{
  const s=JSON.parse(raw);
  if(!s||![1,2].includes(s.version)||!Number.isInteger(s.index)||s.index<0||s.index>=(s.version===1?5:baseDefinitions.length))return null;
  if(s.version===1){if(!Array.isArray(s.progress)||s.progress.length!==5)return null;s.progress=[...s.progress,...baseDefinitions.slice(5).map(()=>({selected:null,attempts:[],complete:false}))];}
  for(const [entries,defs] of [[s.progress,baseDefinitions],[s.bonus,quests]]){
   if(!Array.isArray(entries)||entries.length!==defs.length)return null;
   if(entries.some((e,i)=>!e||!Array.isArray(e.attempts)||e.attempts.length>100||typeof e.complete!=='boolean'||(e.selected!==null&&(!Number.isInteger(e.selected)||!defs[i].options[e.selected]))||e.attempts.some(c=>!Number.isInteger(c)||!defs[i].options[c])||(e.complete&&(e.selected!==defs[i].good||!e.attempts.includes(defs[i].good)))))return null;
  }
  return makeCheckpoint(s.progress,s.index,s.bonus);
 }catch{return null;}
}
export function questNotes(state){return ['','EXTRA CHALLENGES',...quests.map((q,i)=>`${q.skill}: ${state[i].complete?'completed':'still to explore'}\n${state[i].attempts.map(c=>`Checked: ${q.options[c]}\nWhy: ${q.why[c]}`).join('\n')}\nGuidance: ${q.source}`)].join('\n');}
