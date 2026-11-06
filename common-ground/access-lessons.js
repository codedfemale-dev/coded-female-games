import {missionNotes} from './playful.js?v=20261106-teal1';
import {games} from '../data.js';
import {contrast} from '../models.js';
export const game=games['open-for-everyone'];
const explanations=[
 ['A placeholder disappears when someone types. It cannot replace a persistent label.','A visible label linked with for and id identifies the input. Clicking the label also focuses it.','A heading above the whole form does not identify this particular input.'],
 ['Pale grey does not reach 4.5:1 against white.','This gold does not reach 4.5:1 against white for ordinary text. Keep it for suitable accents or check another background.','Dark grey reaches the contrast target against white.'],
 ['The visible words explain the action and become the button’s accessible name.','“Click here” does not distinguish this action from other controls.','An arrow alone does not provide a clear action name. An icon button needs an accessible name; visible action text is clearer here.'],
 ['Starting with Book skips the details someone needs to enter first.','Starting with Email and jumping to Book puts Name last.','The natural document order lets someone enter Name, then Email, then reach Book.'],
 ['This does not identify the field or say how to recover.','The message names the problem and gives an example. Keep the value and associate the message with the field.','“Invalid input” gives no useful correction. Explain what the email address needs.']
];
const checks=[
 'Click the Email address label. Focus should move to its input. Type a fictional address: the label should stay visible.',
 'Compare the ratios for all three colours. Only dark grey reaches 4.5:1 against white for this ordinary text.',
 'Activate Book a workshop with Enter or Space. The local status confirms the action without making a booking.',
 'Start at Name and press Tab to Email, then Book. Shift+Tab takes you back. There is no keyboard trap.',
 'Submit jo.example. Follow the error link, correct it to jo@example.com and resubmit. Your name should stay in place.'
];
export const lessons=game.rounds.map((round,i)=>({...round,explanations:explanations[i],test:checks[i],short:['Labels','Contrast','Button names','Keyboard order','Error recovery'][i]}));
lessons[4].code='<label for="email">Email address</label>\n<input id="email" type="email" value="jo.example"\n  aria-invalid="true" aria-describedby="email-error">\n<p id="email-error">Enter an email address,\n  such as jo@example.com.</p>\n<!-- After correction, remove aria-invalid and the error. -->';
export const freshProgress=()=>lessons.map(()=>({selected:null,attempts:[],complete:false}));
export function checkRepair(progress,index,choice){
 if(!Number.isInteger(index)||!lessons[index]||!Number.isInteger(choice)||!lessons[index].options[choice]||progress[index].complete)return progress;
 return progress.map((entry,i)=>i===index?{selected:choice,attempts:[...entry.attempts,choice],complete:choice===lessons[index].good}:entry);
}
export const colourEvidence=colour=>({ratio:contrast(colour),passes:contrast(colour)>=4.5});
export function fieldNotes(progress,{practice=[],reflection='',mission=null,remember=false}={}){
 return ['OPEN FOR EVERYONE | MY FIELD NOTES','Fictional learning exercise. Five repairs are a starting point, not a full accessibility audit.',`${progress.filter(p=>p.complete).length}/5 repairs completed. ${remember?'Repair progress is saved in this tab. Booking details and reflections clear on reload.':'Progress clears on reload unless you enable the optional tab save.'}`,...lessons.map((lesson,i)=>['',`${i+1}. ${lesson.short}: ${progress[i].complete?'repaired':'still to explore'}`,...progress[i].attempts.map(choice=>`Checked: ${lesson.options[choice]}\nWhy: ${lesson.explanations[choice]}`),`Takeaway: ${lesson.takeaway}`,`Try it: ${lesson.test}`].join('\n')),...(mission?['',missionNotes(mission)]:[]),'','NEXT SITUATION',...practice,'','MY REFLECTION',reflection||'No reflection entered.','','NEXT REAL-WORLD CHECK','Try a complete task using only a keyboard, inspect names and errors with assistive technology, and include people with access needs in testing.','Supporting guidance:',...game.sources.map(([title,url])=>`${title}: ${url}`)].join('\n');
}
