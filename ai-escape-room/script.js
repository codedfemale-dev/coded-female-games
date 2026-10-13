'use strict';
const $=id=>document.getElementById(id);
let roomIndex=0, solved=[false,false,false], fragments=[], attempts=[0,0,0], hintRooms=new Set();
const keyNames=['Clarity','Evidence','Control'];
function say(text){$('announcement').textContent=text;}
function focus(id){$(id).focus();$(id).scrollIntoView({block:'start'});}
function start(){
 roomIndex=0;solved=[false,false,false];attempts=[0,0,0];hintRooms.clear();
 fragments=Array.from({length:3},()=>Math.floor(Math.random()*9)+1);
 $('intro').hidden=true;$('results').hidden=true;$('adventure').hidden=false;$('room').hidden=false;$('exit').hidden=true;
 $('exit-form').reset();$('exit-feedback').textContent='';
 renderKeys();renderRoom();
}
function renderKeys(){
 $('keys').replaceChildren();
 keyNames.forEach((name,i)=>{const el=document.createElement('span');el.className='key'+(solved[i]?' collected':'');el.append(document.createTextNode(name+' '));const digit=document.createElement('b');digit.textContent=solved[i]?fragments[i]:'?';el.append(digit);$('keys').append(el);});
 for(let i=0;i<3;i++) {const map=$('map-'+i);map.className=solved[i]?'complete':i===roomIndex?'current':'';map.querySelector('small').textContent=solved[i]?'Opened':i===roomIndex?'Exploring':'Locked';if(i===roomIndex&&!solved[i])map.setAttribute('aria-current','step');else map.removeAttribute('aria-current');}
}
function showClue(index){
 const c=ROOMS[roomIndex].clues[index];$('clue-label').textContent=c.label;$('clue-title').textContent=c.title;$('clue-content').replaceChildren();
 c.lines.forEach(line=>{const p=document.createElement('p');p.textContent=line;$('clue-content').append(p);});
 $('clue-buttons').querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
}
function selectControl(id,label,options){
 const wrapper=document.createElement('label');wrapper.className='setting';wrapper.htmlFor=id;wrapper.append(document.createTextNode(label));
 const select=document.createElement('select');select.id=id;select.name=id;select.required=true;
 options.forEach((text,i)=>{const o=document.createElement('option');o.textContent=text;o.value=i===0?'':String(i);select.append(o);});wrapper.append(select);return wrapper;
}
function renderRoom(){
 const r=ROOMS[roomIndex];renderKeys();
 for(const [id,value] of Object.entries({'room-number':`ROOM ${roomIndex+1} OF 3`,'room-title':r.title,'room-story':r.story,'scene-sign':r.sign,'puzzle-label':r.puzzleLabel,'puzzle-title':r.puzzleTitle,'puzzle-instruction':r.instruction,'hint-text':r.hint,'strong-hint':r.strongHint}))$(id).textContent=value;
 $('feedback').hidden=true;$('unlocked').hidden=true;$('hint').open=false;$('strong-hint').hidden=true;$('more-hint').hidden=false;$('mini-door').classList.remove('open');$('mini-door').querySelector('span').textContent='LOCKED';
 $('check').disabled=false;$('clue-buttons').replaceChildren();
 r.clues.forEach((c,i)=>{const button=document.createElement('button');button.type='button';button.className='clue-button';button.textContent=c.title;button.addEventListener('click',()=>showClue(i));$('clue-buttons').append(button);});showClue(0);
 const controls=$('puzzle-controls');controls.replaceChildren();
 if(roomIndex===0)r.settings.forEach(s=>controls.append(selectControl(s.id,s.label,s.options)));
 if(roomIndex===1)r.claims.forEach((c,i)=>{
  const wrapper=document.createElement('div');wrapper.className='claim';const p=document.createElement('p');p.textContent=c.text;wrapper.append(p);
  const label=document.createElement('label');label.className='sr-only';label.htmlFor='claim-'+i;label.textContent=`Classify claim ${i+1}: ${c.text}`;
  const select=document.createElement('select');select.id='claim-'+i;select.name='claim-'+i;select.required=true;
  [['','Choose a classification…'],['supported','Supported by the record'],['contradicted','Contradicted by the record'],['not-stated','Not stated in the record']].forEach(([value,text])=>{const o=document.createElement('option');o.value=value;o.textContent=text;select.append(o);});wrapper.append(label,select);controls.append(wrapper);
 });
 if(roomIndex===2){
  const lines=document.createElement('fieldset');const legend=document.createElement('legend');legend.textContent='Keep the two relevant source lines';lines.append(legend);
  r.lines.forEach((line,i)=>{const label=document.createElement('label');label.className='source-option';const input=document.createElement('input');input.type='checkbox';input.name='source-line';input.value=i;const text=document.createElement('span');text.textContent=line.text;label.append(input,text);lines.append(label);});controls.append(lines);
  const actions=document.createElement('fieldset');const aLegend=document.createElement('legend');aLegend.textContent='Choose the authorised action';actions.append(aLegend);
  r.actions.forEach(([value,text])=>{const label=document.createElement('label');label.className='action-option';const input=document.createElement('input');input.type='radio';input.name='action';input.value=value;input.required=true;const span=document.createElement('span');span.textContent=text;label.append(input,span);actions.append(label);});controls.append(actions);
 }
 focus('room-title');
}
function readAnswer(){
 if(roomIndex===0)return Object.fromEntries(ROOMS[0].settings.map(s=>[s.id,$(s.id).value]));
 if(roomIndex===1)return ROOMS[1].claims.map((_,i)=>$('claim-'+i).value);
 return {lines:[...$('puzzle-controls').querySelectorAll('input[name="source-line"]:checked')].map(el=>Number(el.value)),action:$('puzzle-controls').querySelector('input[name="action"]:checked')?.value};
}
function check(event){
 event.preventDefault();if(solved[roomIndex])return;
 attempts[roomIndex]++;
 const checks=evaluateRoom(roomIndex,readAnswer());const correct=checks.every(c=>c.correct);
 if(!correct){
  const passed=checks.filter(c=>c.correct).map(c=>c.label);const retry=checks.filter(c=>!c.correct).map(c=>c.label);
  $('feedback').textContent=`Still locked. ${passed.length?'Already fitting: '+passed.join(', ')+'. ':''}Revisit: ${retry.join(', ')}. Inspect the clues or use a hint, then try again.`;$('feedback').hidden=false;say('The lock is still closed. Feedback is below the controls.');return;
 }
 solved[roomIndex]=true;renderKeys();$('feedback').hidden=true;$('check').disabled=true;
 $('puzzle-controls').querySelectorAll('input,select').forEach(el=>el.disabled=true);
 $('mini-door').classList.add('open');$('mini-door').querySelector('span').textContent='OPEN';
 const r=ROOMS[roomIndex];$('unlock-title').textContent=r.unlockTitle;$('unlock-copy').textContent=r.unlockCopy;
 $('fragment').textContent=`${keyNames[roomIndex]} fragment: ${fragments[roomIndex]}`;
 $('next').textContent=roomIndex===2?'Head to the exit →':'Enter the next room →';
 if(roomIndex===1){const ul=document.createElement('ul');ul.className='audit-notes';r.claims.forEach((c,i)=>{const li=document.createElement('li');li.textContent=`Claim ${i+1}: ${c.reason}`;ul.append(li);});$('unlock-copy').append(ul);}
 $('unlocked').hidden=false;focus('unlocked');say(`${r.title} unlocked. ${keyNames[roomIndex]} fragment ${fragments[roomIndex]} collected.`);
}
function next(){
 if(!solved[roomIndex])return;
 if(roomIndex<2){roomIndex++;renderRoom();return;}
 $('room').hidden=true;$('exit').hidden=false;focus('exit-heading');
}
function finish(event){
 event.preventDefault();if(!solved.every(Boolean))return;
 if($('exit-code').value!==fragments.join('')){$('exit-feedback').textContent='Not quite. Read your collected digits in the order Clarity, Evidence, Control.';return;}
 $('adventure').hidden=true;$('results').hidden=false;
 $('journey').textContent=hintRooms.size?`You explored all three rooms and used hints in ${hintRooms.size===1?'one room':hintRooms.size+' rooms'}. Asking for a nudge is part of learning.`:'You explored all three rooms. Take the habits into your next real AI task.';
 focus('result-heading');say('Exit unlocked. You escaped the lab.');
}
function download(){
 const text=['AI ESCAPE ROOM: EXIT THE LOOP | CODED FEMALE','https://codedfemale.com','','You escaped the fictional Loop Lab.','',...ROOMS.flatMap((r,i)=>[`${i+1}. ${r.title}`,r.takeaway,r.unlockCopy,'']), 'These puzzles are scripted learning examples, not a security assessment. Real AI systems also need technical safeguards.','Check important claims, protect private information and keep human review in the process.'].join('\n');
 const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='coded-female-ai-escape-notes.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);say('Your escape notes have been downloaded.');
}
$('start').addEventListener('click',start);$('replay').addEventListener('click',start);
$('restart').addEventListener('click',()=>{if(confirm('Return to the first room? Your fragments will reset.'))start();});
$('puzzle-form').addEventListener('submit',check);$('next').addEventListener('click',next);$('exit-form').addEventListener('submit',finish);$('download').addEventListener('click',download);
$('hint').addEventListener('toggle',()=>{if($('hint').open)hintRooms.add(roomIndex);});
$('more-hint').addEventListener('click',()=>{$('strong-hint').hidden=false;$('more-hint').hidden=true;hintRooms.add(roomIndex);});
