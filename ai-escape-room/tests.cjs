const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {ROOMS,evaluateRoom}=require('./puzzles.js');
const passes=(room,input)=>evaluateRoom(room,input).every(r=>r.correct);
test('brief lock opens for exactly the mission-matching settings',()=>{
 let count=0;
 for(let task=1;task<=3;task++)for(let audience=1;audience<=3;audience++)for(let boundary=1;boundary<=3;boundary++)if(passes(0,{task,audience,boundary}))count++;
 assert.equal(count,1);assert.ok(passes(0,{task:1,audience:2,boundary:3}));
 assert.equal(passes(0,{}),false);
});
test('evidence lock distinguishes a contradiction from a missing fact',()=>{
 assert.ok(passes(1,['supported','contradicted','supported','not-stated']));
 assert.equal(passes(1,['supported','contradicted','supported','contradicted']),false);
 const choices=['supported','contradicted','not-stated'];let count=0;
 for(const a of choices)for(const b of choices)for(const c of choices)for(const d of choices)if(passes(1,[a,b,c,d]))count++;
 assert.equal(count,1);
});
test('control lock requires both relevant facts and draft-only action',()=>{
 let count=0;
 for(let mask=0;mask<16;mask++)for(const action of ['draft','send','export']){
  const lines=[0,1,2,3].filter(i=>mask&(1<<i));if(passes(2,{lines,action}))count++;
 }
 assert.equal(count,1);assert.ok(passes(2,{lines:[1,0],action:'draft'}));
 assert.equal(passes(2,{lines:[0,1,2],action:'draft'}),false);
 assert.equal(passes(2,{lines:[0,1],action:'send'}),false);
});
test('all rooms have clues, two hint levels and a takeaway',()=>{
 assert.equal(ROOMS.length,3);
 for(const r of ROOMS){assert.equal(r.clues.length,3);for(const c of r.clues){assert.ok(c.title);assert.ok(c.lines.length>0);}for(const field of ['title','story','hint','strongHint','unlockTitle','unlockCopy','takeaway'])assert.ok(r[field]);}
});
test('page wiring and local assets are complete',()=>{
 const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');const ids=[...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
 const js=fs.readFileSync(path.join(__dirname,'script.js'),'utf8');for(const m of js.matchAll(/\$\('([^']+)'\)/g))assert.ok(ids.includes(m[1]),m[1]);
 for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g))if(!m[1].startsWith('https://'))assert.ok(fs.existsSync(path.join(__dirname,m[1].split(/[?#]/)[0])),m[1]);
 const css=fs.readFileSync(path.join(__dirname,'style.css'),'utf8');for(const m of css.matchAll(/url\('([^']+)'\)/g))assert.ok(fs.existsSync(path.join(__dirname,m[1].split(/[?#]/)[0])),m[1]);
});
const {roomOutput,wordCount,TRANSFER,evaluateTransfer,transferOutput}=require('./puzzles.js');
test('repaired welcome email uses verified details and stays inside the requested limit',()=>{
 const out=roomOutput(0);assert.ok(wordCount(out.text)<120);assert.match(out.text,/18:00 on Tuesday/);assert.match(out.text,/laptop with a browser/);assert.match(out.text,/basic HTML/);assert.match(out.text,/no previous JavaScript/);assert.doesNotMatch(out.text,/qualification|certificate|guarantee/i);assert.match(out.kind,/Authored/);
});
test('claim audit keeps respondent denominators and records all verdicts and sources',()=>{
 const out=roomOutput(1);assert.equal(out.claims.length,4);assert.deepEqual(out.claims.map(c=>c.verdict),ROOMS[1].claims.map(c=>c.answer));assert.ok(out.claims.every(c=>c.source&&c.reason));assert.match(out.text,/four of those five respondents/);assert.match(out.text,/does not establish/);assert.ok(out.notes.includes('Attendance: 9/12 = 75% of registered people.'));assert.ok(out.notes.includes('Confidence: 4/5 = 80% of respondents, not 80% of all attendees.'));
});
test('control output is two sentences, retains the facts and carries no instruction payload',()=>{
 const out=roomOutput(2);assert.equal(out.text.match(/\./g).length,2);assert.match(out.text,/HTML and CSS/);assert.match(out.text,/adults who are new/);assert.doesNotMatch(out.text,/override|export|send|bonus/i);assert.match(out.kind,/draft only/);assert.equal(roomOutput(8),null);
});
test('both bounded transfer summaries succeed and every other combination stays closed',()=>{
 let count=0;
 for(const summary of TRANSFER.groups[0].options.map(o=>o.value))for(const boundary of TRANSFER.groups[1].options.map(o=>o.value))for(const action of TRANSFER.groups[2].options.map(o=>o.value)){
  const input={summary,boundary,action};const passed=evaluateTransfer(input).every(c=>c.correct);const output=transferOutput(input);
  if(passed){count++;assert.ok(['respondents','counts'].includes(summary));assert.equal(boundary,'source');assert.equal(action,'draft');assert.ok(wordCount(output.text)<=60);assert.match(output.text,/respondents/);assert.match(output.kind,/Authored example/);assert.ok(output.notes.includes('Register unchanged. Directory unopened. No messages sent.'));}
  else assert.equal(output,null);
 }
 assert.equal(count,2);assert.ok(evaluateTransfer().every(c=>!c.correct));
});
test('incorrect transfer decisions give targeted reasons and evaluation leaves answers intact',()=>{
 const input={summary:'all',boundary:'routine',action:'send'};const copy=JSON.stringify(input);const errors=evaluateTransfer(input);assert.equal(errors.filter(c=>!c.correct).length,3);assert.ok(errors.every(c=>c.reason));assert.match(errors[0].reason,/respondents/);assert.match(errors[1].reason,/user’s request/);assert.match(errors[2].reason,/review a draft/);assert.equal(JSON.stringify(input),copy);
});
test('empty, unknown and inherited summary keys cannot pass',()=>{
 for(const summary of [undefined,'','toString','__proto__','all','recommend'])assert.equal(evaluateTransfer({summary,boundary:'source',action:'draft'})[0].correct,false);
});
test('transfer record does not label the answer and supports its authored summaries',()=>{
 assert.equal(TRANSFER.record.length,4);assert.match(TRANSFER.record[0],/32.*20/);assert.match(TRANSFER.record[1],/8.*6/);assert.doesNotMatch(TRANSFER.record.join(' '),/prompt injection|malicious|ignore the user|SYSTEM OVERRIDE/i);for(const s of Object.values(TRANSFER.summaries))assert.ok(wordCount(s)<=60);
});
