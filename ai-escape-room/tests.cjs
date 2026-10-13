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
 for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g))if(!m[1].startsWith('https://'))assert.ok(fs.existsSync(path.join(__dirname,m[1])),m[1]);
 const css=fs.readFileSync(path.join(__dirname,'style.css'),'utf8');for(const m of css.matchAll(/url\('([^']+)'\)/g))assert.ok(fs.existsSync(path.join(__dirname,m[1])),m[1]);
});
