const {test}=require('node:test');
const assert=require('node:assert/strict');
const engine=import('./engine.js');
test('seven distinct stakeholders have complete dialogue and bounded choices',async()=>{
 const {bosses}=await engine;assert.equal(bosses.length,7);assert.equal(new Set(bosses.map(b=>b.name)).size,7);
 for(const b of bosses){assert.equal(b.rounds.length,3);for(const r of b.rounds){assert(r.question&&r.lesson);assert.equal(r.choices.length,3);assert.equal(new Set(r.choices.map(c=>c.text)).size,3);assert(r.choices.every(c=>c.cost>0&&c.gain>0));}}
});
test('a strategic full run wins with coffee and leaves original state unchanged',async()=>{
 const {act,initialState,scorecard}=await engine;const original=initialState();let s=act(original,{type:'start'}),used=0;
 for(let i=0;i<7;i++){
  if(s.energy<28){s=act(s,{type:'coffee'});used++;}
  s=act(s,{type:'choose',index:0});s=act(s,{type:'choose',index:0});
  assert.equal(s.approved,i+1);assert.equal(s.phase,i===6?'complete':'won');
  if(i<6)s=act(s,{type:'next'});
 }
 assert(used>0);assert.equal(s.log.length,14);assert.equal(s.buzzwords,0);assert.equal(original.phase,'intro');assert.equal(original.log.length,0);assert.equal(scorecard(s).status,'SPOON APPROVED FOR PILOT');assert.equal(act(s,{type:'choose',index:0}),s);
});
test('partial alignment can be rescued on turn three; three weak answers lose',async()=>{
 const {act,initialState}=await engine;let s=act(initialState(),{type:'start'});
 for(const index of [1,1,0])s=act(s,{type:'choose',index});assert.equal(s.phase,'won');assert.equal(s.alignment,88);
 s=act(initialState(),{type:'start'});for(let i=0;i<3;i++)s=act(s,{type:'choose',index:2});assert.equal(s.phase,'lost');assert.equal(s.approved,0);
});
test('energy, confidence and coffee limits cannot be bypassed',async()=>{
 const {act,initialState}=await engine;let s=act(initialState(),{type:'start'});
 s=act(s,{type:'coffee'});assert.equal(s.energy,100);assert.equal(s.coffees,1);assert.equal(act(s,{type:'coffee'}),s);
 s={...s,energy:5};assert.equal(act(s,{type:'choose',index:0}),s);assert.equal(act(s,{type:'choose',index:-1}),s);
 const loss=act(s,{type:'choose',index:2});assert.equal(loss.phase,'lost');assert.equal(loss.energy,1);
 const low={...act(initialState(),{type:'start'}),confidence:20};assert.equal(act(low,{type:'choose',index:2}).phase,'lost');
 const none={...act(initialState(),{type:'start'}),coffees:0};assert.equal(act(none,{type:'coffee'}),none);
});
test('all short battle paths keep resources bounded and a way forward',async()=>{
 const {act,initialState}=await engine;
 for(let boss=0;boss<7;boss++)for(let energy=4;energy<=100;energy+=8)for(let path=0;path<27;path++){
  let s={...initialState(),phase:'battle',boss,energy,coffees:0},p=path;
  for(let turn=0;turn<3&&s.phase==='battle';turn++){
   const index=p%3;p=Math.floor(p/3);const cost=[14,8,4][index];if(s.energy<cost)continue;
   s=act(s,{type:'choose',index});for(const key of ['energy','confidence','alignment'])assert(s[key]>=0&&s[key]<=100);
   if(s.phase==='battle')assert(s.energy>=4);
  }
 }
});
