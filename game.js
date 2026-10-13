import {games} from './data.js';
import {contrast,runCodeTests,originalChoice,initialAgent,applyAgentDecision,initialPeople,applyPeopleDecision,makeNotes} from './models.js';

const slug=document.body.dataset.game, game=games[slug], app=document.getElementById('app');
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const symbols={window:'▤',code:'{ }',agent:'◎',design:'◇',metrics:'▥',people:'◌'};
let index=0, log=[], score=0, state, selected=null, tested=false, prediction=null, question=null, phase=0, metric=null, fields=[-1,-1], attempts=0, cleared=false;
const $=id=>document.getElementById(id);
function focus(id){$(id)?.focus({preventScroll:true});$(id)?.scrollIntoView({behavior:'instant',block:'nearest'});}
function choices(items,handler,active=null,disabled=false,id='choices'){
  const node=$(id), keepFocus=node.contains(document.activeElement);node.replaceChildren();
  items.forEach((text,i)=>{
    const button=document.createElement('button');button.type='button';button.className='choice';button.dataset.choice=i;
    button.innerHTML=`<span class="letter" aria-hidden="true">${String.fromCharCode(65+i)}</span><span>${escape(text)}</span>`;
    if(active!==null)button.setAttribute('aria-pressed',String(active===i));
    button.disabled=disabled;button.addEventListener('click',()=>handler(i));node.append(button);if(keepFocus&&active===i&&!disabled)button.focus({preventScroll:true});
  });
}
function hint(round){return `<details class="hint"><summary>Need a hint?</summary><p>${escape(round.hint)}</p></details>`;}
function feedback(title,text,takeaway){return `<section id="feedback" class="feedback" tabindex="-1" aria-labelledby="feedback-heading"><h3 id="feedback-heading">${escape(title)}</h3><p>${escape(text)}</p><p class="takeaway"><strong>Take it with you:</strong> ${escape(takeaway)}</p></section>`;}
function showFeedback(title,text,takeaway,canContinue=true){
  $('feedback-slot').innerHTML=feedback(title,text,takeaway)+(canContinue?`<button id="next" class="primary">${index===game.rounds.length-1?'See my results':'Next challenge'} →</button>`:'');
  if(canContinue)$('next').onclick=next;
  focus('feedback');
}
function next(){index++;if(index>=game.rounds.length){finish();return;}resetRound();render();focus('round-title');}
function resetRound(){selected=null;tested=false;prediction=null;question=null;phase=0;metric=null;fields=[-1,-1];attempts=0;cleared=false;}
function begin(){
  index=0;score=0;log=[];resetRound();
  if(game.mode==='agent')state=initialAgent(Object.fromEntries(['draft','send','spend','share','calendar'].map(key=>[key,$(`permission-${key}`)?.checked??false])));
  if(game.mode==='people')state=initialPeople();
  render();focus('round-title');
}
function renderMeters(){
  if(!['agent','people'].includes(game.mode))return '';
  const values=game.mode==='agent'?[['Plan prepared',state.progress,'%'],['Trust',state.trust,'/100'],['Budget left',state.budget,'£']]:[['Trust',state.trust,'/100'],['Clarity',state.clarity,'/100'],['Team capacity',state.capacity,'/100']];
  return `<div class="meters" aria-label="Simulation state">${values.map(([name,value,unit])=>`<div class="meter"><label>${name}</label><strong>${unit==='£'?'£':''}${value}${unit==='£'?'':unit}</strong>${unit==='£'?'':`<progress value="${value}" max="100" aria-label="${name}"></progress>`}</div>`).join('')}</div>`;
}
function render(){
  const round=game.rounds[index];
  app.innerHTML=`<div class="game-top"><p class="eyebrow">${escape(game.title)} · ${index+1} of ${game.rounds.length}</p><button id="restart" class="text-button">Restart game</button></div><div class="progress-track" aria-label="${index} of ${game.rounds.length} challenges complete">${game.rounds.map((_,i)=>`<span class="progress-dot ${i<index?'done':i===index?'current':''}"></span>`).join('')}</div>${renderMeters()}<div class="game-grid"><article class="panel ${game.mode==='code'?'dark':''}" id="scene"><p class="eyebrow">Fictional learning exercise</p><h2 id="round-title" tabindex="-1">${escape(round.title)}</h2>${round.brief?`<p class="brief">${escape(round.brief)}</p>`:""}<div id="evidence"></div>${hint(round)}</article><section class="panel" aria-labelledby="decision-title"><h2 id="decision-title" tabindex="-1"></h2><div id="controls"></div><div id="feedback-slot"></div></section></div>`;
  $('restart').onclick=intro;
  ({access:renderAccess,code:renderCode,agent:renderAgent,design:renderDesign,metrics:renderMetrics,people:renderPeople}[game.mode])();
}
function accessPreview(round,choice){
  let content='';
  if(round.kind==='label')content=`<p class="mock-label">${choice===1?'Email address':choice===2?'Details':'Your details'}</p><div class="preview mock-input">${choice===0?'Email address':'jo@example.com'}</div><p class="simulation-note">${choice===1?'The visible label is connected to the field.':'No specific visible label is connected to the email field.'}</p>`;
  if(round.kind==='contrast'){
    const colour=choice===null?'#BBBBBB':round.options[choice],ratio=contrast(colour).toFixed(2);
    content=`<div style="background:#FFFFFF;padding:16px;border-radius:3px"><p style="color:${colour};margin:0">The workshop is at Common Ground, 24 Market Lane.</p></div><p class="simulation-note">Text sample: ${colour} on white. Contrast: ${ratio}:1. Target: 4.5:1.</p>`;
  }
  if(round.kind==='button')content=`<span class="preview-button">${choice===null?'→':escape(round.options[choice])}</span><p class="simulation-note">Button name: ${choice===null||choice===2?'an arrow with no described action':escape(round.options[choice])}.</p>`;
  if(round.kind==='order')content=`<p class="mock-label">Visual order: Name → Email → Book</p><p class="order-list">Keyboard order: ${choice===null?round.options[0]:escape(round.options[choice])}</p><p class="simulation-note">${choice===2?'Document order matches the sequence of the form.':'The keyboard sequence jumps between parts of the form.'}</p>`;
  if(round.kind==='error')content=`<p class="mock-label">Email address</p><div class="preview mock-input">jo.example</div><div class="error-demo">${choice===null?'A red border, with no explanation':escape(round.options[choice])}</div><p class="simulation-note">${choice===1?'The error is described and linked to the field. The entered value stays available to edit.':'The visitor still needs clearer help to recover.'}</p>`;
  return `<div class="preview"><p class="eyebrow">Common Ground · page preview</p><h3>Book a community workshop</h3>${content}</div><p class="simulation-note">This is an illustrated preview. Use the repair controls beside it.</p>`;
}
function renderAccess(){
  const round=game.rounds[index];$('decision-title').textContent=round.question;
  $('evidence').innerHTML=accessPreview(round,null);
  $('controls').innerHTML='<p class="instruction">Select a repair to preview it, then check your work.</p><div id="choices" class="choices"></div><button id="check" class="primary">Check repair</button><p id="validation" class="status-error" role="status"></p>';
  choices(round.options,i=>{selected=i;choices(round.options,chooseAccess,i);$('evidence').innerHTML=accessPreview(round,i);$('feedback-slot').innerHTML='';},null);
  function chooseAccess(i){selected=i;choices(round.options,chooseAccess,i);$('evidence').innerHTML=accessPreview(round,i);$('feedback-slot').innerHTML='';$('validation').textContent='';}
  choices(round.options,chooseAccess);
  $('check').onclick=()=>{
    if(selected===null){$('validation').textContent='Choose a repair before checking.';return;}
    attempts++;const good=selected===round.good;
    if(good){if(attempts===1)score++;cleared=true;log.push({title:round.title,choice:round.options[selected],result:round.feedback,takeaway:round.takeaway,firstTry:attempts===1});choices(round.options,chooseAccess,selected,true);$('check').hidden=true;$('evidence').innerHTML=accessPreview(round,selected)+`<p class="visitor">${escape(round.reaction)}</p><details><summary>See the code behind this repair</summary><pre class="source-code">${escape(round.code)}</pre></details>`;}
    showFeedback(good?'Repair complete':'Keep working on this repair',good?round.feedback:round.hint,round.takeaway,good);
  };
}
function renderCode(){
  const round=game.rounds[index];$('decision-title').textContent='Predict before you test';
  $('evidence').innerHTML=`<p class="speaker">Pip says: “Looks ready to me!”</p><pre class="code-block">${escape(round.code)}</pre><p class="instruction" style="color:#d9d6cc">Expected behaviour</p><ul class="plain-list">${round.tests.map(([name,input,expected])=>`<li>${escape(name)}: ${escape(JSON.stringify(input))} → ${escape(JSON.stringify(expected))}</li>`).join('')}</ul><div id="terminal"></div>`;
  $('controls').innerHTML='<p class="instruction">Will Pip’s original code pass every listed test, including preserving the input?</p><div id="choices" class="choices"></div>';
  choices(['All tests will pass','At least one test will fail'],i=>{
    prediction=i;const original=runCodeTests(round,originalChoice[round.task]),passes=original.every(t=>t.passed);
    if((i===0)===passes)score++;
    $('decision-title').textContent='Review the test evidence';
    showTerminal(original);
    $('controls').innerHTML=`<p class="instruction">${(i===0)===passes?'Your prediction matches the tests.':'The tests reveal something different from your prediction.'} Choose a patch, or keep the working code.</p><div id="choices" class="choices"></div><button id="run" class="secondary">Run selected code</button><p id="validation" class="status-error" role="status"></p>`;
    choices(round.options,choosePatch);
    $('run').onclick=()=>{
      if(selected===null){$('validation').textContent='Choose an implementation to test.';return;}
      attempts++;const results=runCodeTests(round,selected),good=results.every(t=>t.passed);tested=true;showTerminal(results);
      if(good){log.push({title:round.title,choice:round.options[selected],result:round.feedback,takeaway:round.takeaway});choices(round.options,choosePatch,selected,true);$('run').hidden=true;}
      showFeedback(good?'Tests passed. Ready for review.':'A test still fails',good?round.feedback:'Read the failed result and the requirement, then try another implementation. '+round.hint,round.takeaway,good);
    };
    focus('decision-title');
  });
  function choosePatch(i){selected=i;choices(round.options,choosePatch,i);$('feedback-slot').innerHTML='';$('validation').textContent='';tested=false;}
}
function showTerminal(results){$('terminal').innerHTML=`<div class="terminal" role="status" aria-label="Test results">${results.map(t=>`<p class="${t.passed?'pass':'fail'}">${t.passed?'PASS':'FAIL'} · ${escape(t.label)}<br>${t.error?'Error: '+escape(t.error):'Actual: '+escape(JSON.stringify(t.actual))+' · Expected: '+escape(JSON.stringify(t.expected))}${t.unchanged?'':' · Input was changed'}</p>`).join('')}</div>`;}
function renderAgent(){
  const round=game.rounds[index];$('decision-title').textContent='What should happen next?';
  $('evidence').innerHTML=`<p class="speaker">${round.speaker}</p><div class="bubble">${escape(round.message)}</div><p class="instruction">Tools enabled: ${Object.entries(state.permissions).filter(([,v])=>v).map(([key])=>escape(key)).join(', ')||'none'}. Tools stay limited for this mission. Explicitly reviewed purchases can be carried out by a human.</p>${index===3?`<p class="takeaway">${state.venuePaid?'The venue deposit is already in the log.':`Before this order, a human pays the reviewed £120 venue deposit. That will leave £${state.budget-120}.`}</p>`:''}`;
  $('controls').innerHTML='<p class="instruction">The simulation follows your decision and tool boundaries. No real messages or purchases are made.</p><div id="choices" class="choices"></div>';
  choices(round.options.map(o=>o.text),i=>{
    state=applyAgentDecision(state,round,i,index);const item=state.log.at(-1);if(item.good)score++;log=[...state.log];
    choices(round.options.map(o=>o.text),()=>{},i,true);
    document.querySelector('.meters').outerHTML=renderMeters();
    showFeedback(item.good?'A considered next step':'Review the consequence',item.result,round.takeaway);
  });
}
function designPreview(round,values){
  const [a,b]=values.map(v=>v===-1?0:v);let html='';
  if(round.kind==='price')html=`<p class="big-price">${a===1?'£15 total':'£12'}</p><p>${a===1?'Includes £3 delivery':'Delivery added at checkout'}</p><p>${b===0?'£15 each month. Renews until cancelled.':'Subscription details in the small print.'}</p>`;
  if(round.kind==='extra')html=`<p class="big-price">£${a===0?'19':'15'}</p><p><span class="decorative-check" aria-hidden="true">${a===0?'✓':' '}</span>${b===1?'Optional gift wrap: add £4 to this order':'Recommended upgrade'}</p><p class="simulation-note">${a===0?'Gift wrap was already selected.':'Gift wrap stays off until the visitor chooses it.'}</p>`;
  if(round.kind==='buttons')html=`<p>Would you like our newsletter?</p><div class="mock-pair"><span class="mock-button">Yes, subscribe</span><span class="mock-button ${b===0?'subtle':''}">${a===0?'No thanks':'No, I dislike beautiful things'}</span></div>`;
  if(round.kind==='timer')html=`<p class="big-price">${a===0?'Last chance!':'Current price: £15 per month'}</p><p>${b===0?'No invented deadline.':'04:59 remaining · restarts on every visit'}</p>`;
  if(round.kind==='cancel')html=`<h3>Cancel your subscription</h3><span class="preview-button">${a===1?'Cancel through my account':'Call 10 to 11 on Tuesdays'}</span><p>${b===0?'After cancellation: Your subscription is cancelled. Access ends on 31 October.':'After cancellation: Request received.'}</p>`;
  return `<div class="preview"><p class="eyebrow">Loopbox · fictional screen preview</p>${html}</div><p class="simulation-note">The buttons inside this preview are illustrations. Change the settings beside it.</p>`;
}
function renderDesign(){
  const round=game.rounds[index];$('decision-title').textContent='Make two design changes';
  // The initial screen always shows the deliberately problematic treatment.
  const initial={price:[0,1],extra:[0,0],buttons:[1,0],timer:[0,1],cancel:[0,1]}[round.kind];
  $('evidence').innerHTML=designPreview(round,initial);
  $('controls').innerHTML=`<p class="instruction">Choose both settings. The preview changes as you design.</p>${round.fields.map((field,i)=>`<label class="field"><span>${escape(field.label)}</span><select id="field-${i}"><option value="-1">Choose a setting</option>${field.options.map((text,j)=>`<option value="${j}">${escape(text)}</option>`).join('')}</select></label>`).join('')}<button id="check" class="primary">Check redesign</button><p id="validation" class="status-error" role="status"></p>`;
  round.fields.forEach((_,i)=>{$(`field-${i}`).onchange=()=>{fields[i]=Number($(`field-${i}`).value);$('evidence').innerHTML=designPreview(round,fields.map((v,j)=>v===-1?initial[j]:v));$('feedback-slot').innerHTML='';$('validation').textContent='';};});
  $('check').onclick=()=>{
    if(fields.some(v=>v<0)){ $('validation').textContent='Choose both settings before checking.';return;}
    attempts++;const good=round.fields.every((f,i)=>fields[i]===f.good);
    if(good){if(attempts===1)score++;log.push({title:round.title,choice:fields.map((v,i)=>round.fields[i].options[v]).join('; '),result:round.feedback,takeaway:round.takeaway});round.fields.forEach((_,i)=>{$(`field-${i}`).disabled=true;});$('check').hidden=true;$('evidence').innerHTML=designPreview(round,fields)+`<p class="visitor">Visitor: ${escape(round.reaction)}</p>`;}
    showFeedback(good?'A clearer choice':'One part still needs work',good?round.feedback:round.hint,round.takeaway,good);
  };
}
function renderMetrics(){
  const round=game.rounds[index];$('decision-title').textContent='Choose a measure for the goal';
  $('evidence').innerHTML=`<p class="takeaway"><strong>Goal:</strong> ${escape(round.goal)}</p><div class="table-wrap"><table><caption class="sr-only">Fictional product evidence for ${escape(round.title)}</caption><thead><tr>${round.columns.map(text=>`<th scope="col">${escape(text)}</th>`).join('')}</tr></thead><tbody>${round.rows.map(row=>`<tr>${row.map((text,i)=>i===0?`<th scope="row">${escape(text)}</th>`:`<td>${escape(text)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  $('controls').innerHTML='<p class="instruction">Start with what people need to achieve.</p><div id="choices" class="choices"></div>';
  choices(round.metrics,i=>{
    metric=i;if(i===round.good)score++;phase=1;
    $('decision-title').textContent='Choose the next investigation';
    $('controls').innerHTML=`<p class="instruction">${i===round.good?'That measure connects to the goal.':'A better measure is: '+escape(round.metrics[round.good])+'.'} Now use the evidence to choose a next step.</p><div id="choices" class="choices"></div>`;
    choices(round.actions,j=>{
      if(j===round.actionGood)score++;choices(round.actions,()=>{},j,true);
      log.push({title:round.title,choice:`Measure: ${round.metrics[metric]}. Next step: ${round.actions[j]}`,result:round.feedback,takeaway:round.takeaway});
      showFeedback(j===round.actionGood?'A useful next investigation':'Look at the whole picture',round.feedback,round.takeaway);
    });focus('decision-title');
  });
}
function renderPeople(){
  const round=game.rounds[index];$('decision-title').textContent='Ask a question first';
  const previous=state.promises.length?state.promises.map(p=>`<li><strong>${escape(p.title)}:</strong> ${escape(p.text)}</li>`).join(''):'';
  $('evidence').innerHTML=`<p class="speaker">${escape(round.speaker)}</p><div class="bubble">${escape(round.message)}</div>${round.dynamic==='promise'?`<p class="takeaway">Earlier, you chose: ${escape(state.promises[0].text)}. Check whether the current build supports the wording.</p>`:''}<div id="reply"></div>${previous?`<details class="notebook"><summary>Promise notebook · ${state.promises.length} agreements</summary><ul>${previous}</ul></details>`:''}`;
  $('controls').innerHTML='<p class="instruction">Your question changes what the team understands. Then choose a response.</p><div id="choices" class="choices"></div>';
  choices(round.questions.map(q=>q.text),i=>{
    question=i;$('reply').innerHTML=`<p class="speaker">Their reply</p><div class="bubble">${escape(round.questions[i].answer)}</div>`;
    $('decision-title').textContent='How will you respond?';$('controls').innerHTML='<p class="instruction">Consider trust, clarity and the team’s available capacity.</p><div id="choices" class="choices"></div>';
    choices(round.responses.map(r=>r.text),j=>{
      state=applyPeopleDecision(state,round,question,j);log=[...state.log];choices(round.responses.map(r=>r.text),()=>{},j,true);document.querySelector('.meters').outerHTML=renderMeters();
      const item=state.log.at(-1);showFeedback('The conversation moves on',item.result,item.takeaway);
    });focus('decision-title');
  });
}
function summary(){
  if(game.mode==='agent')return `Plan ${state.progress}% · Trust ${state.trust}/100 · Budget remaining £${state.budget}`;
  if(game.mode==='people')return `Trust ${state.trust}/100 · Clarity ${state.clarity}/100 · Team capacity ${state.capacity}/100`;
  if(game.mode==='code')return `5 features reviewed and tested · ${score}/5 predictions matched the original tests`;
  if(game.mode==='metrics')return `${score}/10 evidence-led choices`;
  return `${game.rounds.length} ${game.mode==='access'?'repairs':'redesigns'} completed · ${score}/${game.rounds.length} completed on the first check`;
}
function finish(){
  const stat=summary();let ending=game.finish;
  if(game.mode==='agent')ending=state.trust>=80&&state.budget>=0?'A thoughtful mission, with a log worth reviewing.':'The log shows where your mission needs a closer review.';
  if(game.mode==='people')ending=state.trust>=70&&state.clarity>=70&&state.capacity>=30?'A clearer plan, with room for people.':state.capacity<30?'The plan needs a more realistic capacity agreement.':'The team needs another conversation about its agreement.';
  const finalPreview=game.mode==='access'?`<div class="result-status"><p class="eyebrow">Your repaired page</p><h2>Book a Common Ground workshop</h2><p>Venue information in readable dark text. Clearly named controls. Name → Email → Book in a sensible keyboard order.</p><p><strong>Email address</strong><br>jo@example.com</p><span class="preview-button">Book a workshop</span><p class="simulation-note">If an email needs correcting, the form explains how and preserves the entered value. This illustrated page shows the five repairs, rather than a full accessibility audit.</p></div>`:game.mode==='people'?`<div class="result-status"><h2>Your agreement notebook</h2><ul class="plain-list">${state.promises.map(p=>`<li>${escape(p.text)}</li>`).join('')}</ul><p class="simulation-note">The meters are simplified learning feedback. Real conversations have context, and several responses can be reasonable.</p></div>`:game.mode==='agent'?`<div class="result-status"><h2>Before a real handover</h2><p>Check the bookings, invitation drafts, access confirmation, any blocked actions and remaining spend. The plan percentage measures preparation in this simulation; it does not certify that the event is ready.</p></div>`:'';
  app.innerHTML=`<section class="results"><p class="eyebrow">${escape(game.title)} · complete</p><h1 id="result-heading" tabindex="-1">${escape(ending)}</h1><p class="result-stat">${escape(stat)}</p><p class="lead">${escape(game.lesson)}</p>${finalPreview}<div class="actions"><button id="download" class="primary">Download my field notes</button><button id="replay" class="secondary">Play again</button><a class="secondary" href="../">Choose another game</a></div><details class="about"><summary>Read or copy my field notes</summary><label class="field"><span>My field notes</span><textarea id="notes-text" readonly rows="12">${escape(makeNotes(game,log,stat))}</textarea></label></details><h2>Your decisions</h2>${log.map((item,i)=>`<details class="review"><summary>${i+1}. ${escape(item.title)}</summary>${item.question?`<p><strong>You asked:</strong> ${escape(item.question)}</p><p><strong>Reply:</strong> ${escape(item.answer)}</p>`:''}<p><strong>Your choice:</strong> ${escape(item.choice)}</p><p>${escape(item.result)}</p><p><strong>Takeaway:</strong> ${escape(item.takeaway)}</p></details>`).join('')}</section>`;
  $('replay').onclick=intro;
  $('download').onclick=()=>{
    const blob=new Blob([makeNotes(game,log,stat)],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),link=document.createElement('a');
    link.href=url;link.download=`${slug}-field-notes.txt`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  focus('result-heading');
}
function intro(){
  app.innerHTML=`<section class="hero"><div class="hero-copy"><p class="eyebrow">${escape(game.kicker)}</p><h1>${escape(game.title)}</h1><p class="lead">${escape(game.short)}</p><p>${escape(game.intro)}</p>${game.mode==='agent'?`<fieldset class="permissions"><legend>Choose Orbit’s available tools</legend><p class="instruction">Start with draft access for a cautious mission, or enable more tools to explore the consequences. These are simulation controls.</p>${[['draft','Draft plans from public information',true],['send','Send invitations',false],['spend','Make purchases',false],['share','Share attendee details',false],['calendar','Write to the calendar',false]].map(([key,text,checked])=>`<label><input type="checkbox" id="permission-${key}" ${checked?'checked':''}>${text}</label>`).join('')}</fieldset>`:''}<button id="start" class="primary">${escape(game.verb)} →</button><div class="facts"><span>${escape(game.facts)}</span><span>No timer</span><span>No sign-up</span></div></div><div class="hero-art" aria-hidden="true"><span class="caption">The Coded Female learning collection</span><div class="art-board"><span class="art-symbol">${symbols[game.icon]}</span><p class="art-title">${escape(game.mode==='code'?'“Looks ready to me!”':game.mode==='agent'?'A little human judgement':game.mode==='people'?'Let’s talk it through':'A useful little change')}</p><div class="art-line"></div><div class="art-line short"></div><span class="art-chip">Try · Observe · Learn</span></div><p class="art-footer">Original challenges. Practical takeaways.</p></div></section>`;
  $('start').onclick=begin;
}
if(game) { $('start').onclick=begin; } else {app.textContent='This game could not be found. Return to the games collection.';}
