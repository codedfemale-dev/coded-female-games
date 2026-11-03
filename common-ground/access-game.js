import {lessons,freshProgress,checkRepair,colourEvidence,fieldNotes} from './access-lessons.js?v=20261103-1';
import {learning} from '../learning.js?v=20261014-1';
import {mountBooking} from './booking.js?v=20261103-1';
const app=document.getElementById('app'),intro=app.innerHTML;
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let progress=freshProgress(),index=0,reflection='',practice=[],practiceChoice=null,resultsNode=null;
const $=id=>document.getElementById(id);
function focus(id){const el=$(id);el?.focus({preventScroll:true});el?.scrollIntoView({block:'start',behavior:'instant'});}
function restart(){
 const dialog=document.createElement('dialog');dialog.className='of-dialog';dialog.setAttribute('aria-labelledby','of-reset-heading');
 dialog.innerHTML='<h2 id="of-reset-heading">Start a fresh workshop?</h2><p>Your repairs, practice booking and reflection will clear. Download your field notes first if you want to keep them.</p><div class="actions"><button class="secondary" id="of-keep">Keep exploring</button><button class="primary" id="of-reset">Start again</button></div>';
 const previous=document.activeElement;document.body.append(dialog);dialog.showModal();$('of-keep').focus();
 const close=()=>{dialog.close();dialog.remove();previous?.focus();};
 $('of-keep').onclick=close;dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
 $('of-reset').onclick=()=>{dialog.close();dialog.remove();progress=freshProgress();index=0;reflection='';practice=[];practiceChoice=null;resultsNode=null;app.innerHTML=intro;document.title='Open for Everyone | Coded Female';wireStart();focus('start');};
}
function notes(){return fieldNotes(progress,{reflection,practice:practice.map(i=>`${learning['open-for-everyone'].options[i][0]}\n${learning['open-for-everyone'].options[i][1]}`)});}
function download(){
 const url=URL.createObjectURL(new Blob([notes()],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');
 a.href=url;a.download='open-for-everyone-field-notes.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 if($('of-save-status'))$('of-save-status').textContent='Field notes are ready to save. You can also read and copy them below.';
}
function ledger(){return `<ol class="of-ledger" aria-label="Repair checklist">${lessons.map((lesson,i)=>`<li ${i===index?'aria-current="step"':''}>${progress[i].complete?`<button type="button" data-review="${i}"><span aria-hidden="true">✓</span> ${esc(lesson.short)}<span class="sr-only">: repaired, review this lesson</span></button>`:`<span><span aria-hidden="true">${i+1}.</span> ${esc(lesson.short)}<span class="sr-only">${i===index?': current repair':': not yet repaired'}</span></span>`}</li>`).join('')}</ol>`;}
function preview(choice){
 const round=lessons[index],good=choice===round.good;
 if(round.kind==='contrast'){
  const colour=choice===null?'#BBBBBB':round.options[choice],e=colourEvidence(colour);
  return `<div class="of-paper"><p style="color:${colour}" aria-hidden="true">The workshop is at Common Ground, 24 Market Lane.</p></div><p class="of-readable">Sample text: The workshop is at Common Ground, 24 Market Lane.</p><p><strong>${e.ratio.toFixed(2)}:1 · ${e.passes?'Meets':'Below'} the 4.5:1 target</strong><br><code>${colour}</code> on <code>#FFFFFF</code></p><p class="instruction">The faint sample is deliberately flawed. Its text is repeated above in a readable colour.</p>`;
 }
 if(round.kind==='label')return `<p class="mock-label">${good?'Email address':choice===2?'Details':'Your details'}</p><div class="of-faux-input">${choice===0?'Email address (placeholder)':'jo@example.com'}</div><p>${good?'A persistent, connected label.':'No specific, connected label for this input.'}</p>`;
 if(round.kind==='button')return `<span class="of-faux-button">${choice===null?'→':esc(round.options[choice])}</span><p>${good?'The action is clear from its visible name.':'The action still needs a clear name.'}</p>`;
 if(round.kind==='order')return `<p>Visual order: Name → Email → Book</p><p class="of-sequence">Keyboard order: ${esc(round.options[choice??0])}</p><p>${good?'The sequence follows the form.':'The sequence jumps around the form.'}</p>`;
 return `<p class="mock-label">Email address</p><div class="of-faux-input">jo.example</div><p class="of-error">${choice===null?'A red border, with no explanation.':esc(round.options[choice])}</p><p>${good?'Error text is associated with the input. Entered details are kept.':'The visitor needs more specific help to recover.'}</p>`;
}
function render(){
 const round=lessons[index],entry=progress[index],count=progress.filter(p=>p.complete).length;
 document.title=`${round.short} · Open for Everyone | Coded Female`;
 app.innerHTML=`<section class="of-workshop"><div class="game-top"><p class="eyebrow">Open for Everyone · ${count} of 5 repaired</p><button id="restart" class="text-button">Restart game</button></div>${ledger()}<h1 id="round-title" tabindex="-1" class="of-title">${esc(round.title)}</h1><p class="of-brief">${esc(round.brief)}</p><div class="game-grid of-grid"><section class="panel" aria-labelledby="decision-title"><p class="eyebrow">${entry.complete?'Repair complete':'1. Choose a repair'}</p><h2 id="decision-title">${esc(round.question)}</h2><p class="instruction">Compare the choices in the preview. You can try again without a penalty.</p><div class="choices" id="choices">${round.options.map((text,i)=>`<button type="button" class="choice" data-choice="${i}" aria-pressed="${entry.selected===i}" ${entry.complete?'disabled':''}><span class="letter" aria-hidden="true">${String.fromCharCode(65+i)}</span><span>${esc(text)}</span></button>`).join('')}</div><p id="of-preview-status" class="sr-only" role="status"></p><button id="check" class="primary" ${entry.complete?'hidden':''}>Check repair</button><p id="validation" class="status-error" role="status"></p><div id="feedback-slot"></div><details class="hint"><summary>Need a hint?</summary><p>${esc(round.hint)}</p></details></section><section class="panel of-preview" aria-labelledby="of-preview-heading"><p class="eyebrow">2. Inspect the change</p><h2 id="of-preview-heading">Common Ground preview</h2><p class="instruction">An illustration of the selected repair. Working controls appear after you complete it.</p><div id="of-sample">${preview(entry.selected)}</div><details><summary>Compare with the original problem</summary><p>${esc(round.brief)}</p><div class="of-original">${preview(null)}</div></details><div id="of-try-slot"></div></section></div><div class="actions of-navigation">${index>0?'<button id="previous" class="secondary">← Previous repair</button>':''}<button id="of-download" class="text-button">Download field notes so far</button>${count===5?'<button id="of-results" class="secondary">Back to completed workshop →</button>':''}</div><p class="instruction">Progress stays in this tab until you restart, reload or leave. Download notes to keep your learning.</p><details class="about"><summary>Read or copy field notes so far</summary><label class="field" for="of-partial-notes"><span>Field notes so far</span><textarea id="of-partial-notes" readonly rows="8"></textarea></label></details></section>`;
 $('restart').onclick=restart;$('of-download').onclick=download;$('of-partial-notes').value=notes();
 $('previous')?.addEventListener('click',()=>{index--;render();focus('round-title');});
 $('of-results')?.addEventListener('click',finish);
 wireReview();
 app.querySelectorAll('[data-choice]').forEach(button=>button.onclick=()=>{
  progress[index].selected=Number(button.dataset.choice);
  app.querySelectorAll('[data-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  $('of-sample').innerHTML=preview(progress[index].selected);$('feedback-slot').replaceChildren();$('validation').textContent='';
  $('of-preview-status').textContent=round.kind==='contrast'?`Preview updated. ${colourEvidence(round.options[progress[index].selected]).ratio.toFixed(2)} to 1. ${colourEvidence(round.options[progress[index].selected]).passes?'Meets':'Below'} the target.`:`Preview updated for choice ${String.fromCharCode(65+progress[index].selected)}. Check repair for feedback.`;
 });
 $('check').onclick=()=>{
  if(progress[index].selected===null){$('validation').textContent='Choose a repair before checking.';return;}
  progress=checkRepair(progress,index,progress[index].selected);
  if(progress[index].complete){render();focus('of-feedback');}
  else {showFeedback(false);$('of-partial-notes').value=notes();focus('of-feedback');}
 };
 if(entry.complete){showFeedback(true);$('of-try-slot').innerHTML=tryControl();wireTry();}
}
function wireReview(){app.querySelectorAll('[data-review]').forEach(button=>button.onclick=()=>{index=Number(button.dataset.review);render();focus('round-title');});}
function showFeedback(good){
 const round=lessons[index],entry=progress[index];
 $('feedback-slot').innerHTML=`<section class="feedback" id="of-feedback" tabindex="-1" aria-labelledby="of-feedback-heading"><h3 id="of-feedback-heading">${good?'Repair complete':'This repair needs another look'}</h3><p>${esc(round.explanations[entry.selected])}</p>${good?`<p>${esc(round.feedback)}</p><p class="takeaway"><strong>Take it with you:</strong> ${esc(round.takeaway)}</p><p class="visitor">${esc(round.reaction)}</p><p>Try the working example before moving on.</p><div class="actions"><button id="of-try-repair" class="secondary">Try this repair</button><button id="next" class="primary">${index===4?'Try the complete booking journey':'Next repair'} →</button></div>`:'<button id="of-retry" class="secondary">Try another repair</button>'}</section>`;
 $('of-try-repair')?.addEventListener('click',()=>focus('of-try-heading'));
 $('next')?.addEventListener('click',()=>{if(index===4)finish();else{index++;render();focus('round-title');}});
 if($('of-retry'))$('of-retry').onclick=()=>{app.querySelector('[data-choice]')?.focus();};
}
function tryControl(){
 const round=lessons[index];let controls='';
 if(index===0)controls='<label for="of-demo-email">Email address</label><input id="of-demo-email" type="email" value="jo@example.com" autocomplete="off">';
 if(index===1)controls=`<ul class="of-ratios">${round.options.map(colour=>{const e=colourEvidence(colour);return `<li><code>${colour}</code>: ${e.ratio.toFixed(2)}:1 · ${e.passes?'Meets target':'Below target'}</li>`;}).join('')}</ul><p class="instruction">4.5:1 applies to ordinary text at WCAG AA. Large text has a 3:1 threshold. Check other requirements separately.</p>`;
 if(index===2)controls='<button type="button" class="secondary" id="of-demo-book">Book a workshop</button><p id="of-demo-status" role="status"></p>';
 if(index===3)controls='<form id="of-order-form"><label for="of-demo-name">Name</label><input id="of-demo-name" value="Jo" autocomplete="off"><label for="of-demo-email">Email address</label><input id="of-demo-email" type="email" value="jo@example.com" autocomplete="off"><button type="submit" class="secondary" id="of-demo-book">Book a workshop</button></form><p id="of-demo-status" role="status"></p>';
 if(index===4)controls='<form id="of-error-form" novalidate><div id="of-demo-errors"></div><label for="of-demo-name">Name</label><input id="of-demo-name" value="Jo" autocomplete="off" maxlength="100"><label for="of-demo-email">Email address</label><p id="of-email-hint">Use fictional details. Nothing is sent.</p><input id="of-demo-email" type="email" value="jo.example" aria-describedby="of-email-hint" autocomplete="off" maxlength="254"><p id="of-email-error" class="of-error" hidden></p><button type="submit" class="secondary">Check these details</button><p id="of-demo-status" role="status"></p></form>';
 return `<section class="of-try"><p class="eyebrow">3. Try the repaired version</p><h3 id="of-try-heading" tabindex="-1">See why it works</h3><p>${esc(round.test)}</p>${controls}<details class="of-code"><summary>See the code behind this repair</summary><pre class="source-code">${esc(round.code)}</pre></details></section>`;
}
function wireTry(){
 $('of-demo-book')?.addEventListener('click',()=>{if(index===2)$('of-demo-status').textContent='Workshop action recognised. This demonstration has not made a booking.';});
 $('of-order-form')?.addEventListener('submit',event=>{event.preventDefault();$('of-demo-status').textContent='You reached the booking action. No booking was made.';});
 $('of-error-form')?.addEventListener('submit',event=>{
  event.preventDefault();const email=$('of-demo-email'),valid=/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(email.value.trim());
  $('of-demo-status').textContent='';
  if(!valid){email.setAttribute('aria-invalid','true');email.setAttribute('aria-describedby','of-email-hint of-email-error');$('of-email-error').hidden=false;$('of-email-error').textContent='Enter an email address such as jo@example.com.';$('of-demo-errors').innerHTML='<div class="cg-errors" id="of-demo-summary" tabindex="-1"><h4>Check the email address</h4><a href="#of-demo-email">Enter an email address such as jo@example.com.</a><p>Your entries are still here.</p></div>';$('of-demo-errors').querySelector('a').onclick=e=>{e.preventDefault();focus('of-demo-email');};focus('of-demo-summary');}
  else {email.removeAttribute('aria-invalid');email.setAttribute('aria-describedby','of-email-hint');$('of-email-error').hidden=true;$('of-demo-errors').replaceChildren();$('of-demo-status').textContent='Email format accepted. Your entries are still here. No booking or email was sent.';}
 });
}
function finish(){
 document.title='Workshop complete · Open for Everyone | Coded Female';
 if(resultsNode){app.replaceChildren(resultsNode);$('notes-text').value=notes();focus('result-heading');return;}
 const exercise=learning['open-for-everyone'];
 app.innerHTML=`<section class="results of-results"><p class="eyebrow">Open for Everyone · Workshop complete</p><h1 id="result-heading" tabindex="-1">Five repairs. A clearer way in.</h1><p class="lead">You have repaired labels, contrast, button names, keyboard order and error recovery. Now try them together.</p><p class="instruction">These five repairs are a starting point. A complete accessibility review also considers other barriers and testing with people.</p><details class="of-repair-record"><summary>Review your five repairs</summary><ul>${lessons.map((lesson,i)=>`<li><strong>${esc(lesson.short)}</strong><p>${esc(lesson.takeaway)}</p><button class="text-button" data-review="${i}">Revisit ${esc(lesson.short.toLowerCase())}</button></li>`).join('')}</ul></details><h2>Try the complete booking journey</h2><p>Choose a fictional workshop. Use Jo and jo@example.com, or try an invalid address to see the error recovery. Your entries stay in this tab and clear on reload.</p><div id="common-ground-booking"></div><section class="practice" aria-labelledby="practice-heading"><p class="eyebrow">Optional · Apply what you learned</p><h2 id="practice-heading">${esc(exercise.title)}</h2><p>${esc(exercise.scenario)}</p><p class="instruction">Compare all three responses. This does not change your repairs or booking.</p><div class="choices" id="practice-choices">${exercise.options.map(([text],i)=>`<button class="choice" type="button" data-practice="${i}" aria-pressed="${practiceChoice===i}">${esc(text)}</button>`).join('')}</div><div id="practice-feedback"></div><details class="review"><summary>See a worked example</summary><p>${esc(exercise.worked)}</p></details><label class="field" for="reflection"><span>${esc(exercise.reflect)}</span><textarea id="reflection" rows="4" maxlength="4000"></textarea></label><p class="instruction">Optional. Your reflection stays in this tab and is included in field notes. Download it before leaving. Use fictional examples and avoid confidential information.</p><p><a href="../undo-the-nudge/">Keep practising with Undo the Nudge →</a></p></section><section aria-labelledby="of-notes-heading"><h2 id="of-notes-heading">Take your learning with you</h2><p>Keep the repair explanations, choices you checked and your reflection.</p><div class="actions"><button id="download" class="primary">Download my field notes</button><button id="restart" class="secondary">Start again</button><a href="../" class="secondary">Choose another game</a></div><p id="of-save-status" role="status"></p><details class="about"><summary>Read or copy my field notes</summary><label class="field" for="notes-text"><span>My field notes</span><textarea id="notes-text" readonly rows="12"></textarea></label></details></section></section>`;
 resultsNode=app.firstElementChild;mountBooking($('common-ground-booking'));
 $('download').onclick=download;$('restart').onclick=restart;wireReview();
 const updateNotes=()=>{$('notes-text').value=notes();};
 const feedback=i=>{$('practice-feedback').innerHTML=`<section class="feedback" tabindex="-1" id="practice-response"><h3>${i===exercise.good?'A useful next step':'Consider the trade-off'}</h3><p>${esc(exercise.options[i][1])}</p></section>`;};
 app.querySelectorAll('[data-practice]').forEach(button=>button.onclick=()=>{const i=Number(button.dataset.practice);practiceChoice=i;if(!practice.includes(i))practice.push(i);app.querySelectorAll('[data-practice]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));feedback(i);updateNotes();focus('practice-response');});
 $('reflection').value=reflection;$('reflection').oninput=()=>{reflection=$('reflection').value;updateNotes();};updateNotes();focus('result-heading');
}
function wireStart(){$('start')?.addEventListener('click',()=>{render();focus('round-title');});}
wireStart();
