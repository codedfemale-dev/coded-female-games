const {test}=require('node:test');
const assert=require('node:assert/strict');
const engine=import('./engine.js');
async function run(indices=()=>1,{reviewIndex=0,breathers=false}={}) {
  const m=await engine;let s=m.act(m.initialState(),{type:'start'}),guard=0;
  while(s.phase!=='complete'&&guard++<250) {
    if(s.phase==='battle'||s.phase==='review') {
      if(breathers&&!s.breakUsed)s=m.act(s,{type:'break'});
      s=m.act(s,{type:'choose',index:s.phase==='review'?reviewIndex:indices(s)});
    }else s=m.act(s,{type:s.phase==='feedback'?'continue':'next'});
  }
  assert.equal(s.phase,'complete');return s;
}
test('each of the 21 situations supplies relevant evidence and two equally credited defensible approaches',async()=>{
  const {bosses}=await engine;assert.equal(bosses.length,7);assert.equal(new Set(bosses.map(b=>b.name)).size,7);
  for(const b of bosses){assert.equal(b.rounds.length,3);for(const r of b.rounds){assert(r.question&&r.brief);assert(r.evidence.length>=2);assert.equal(r.choices.length,3);assert.equal(new Set(r.choices.map(c=>c.text)).size,3);const sound=r.choices.filter(c=>c.kind==='sound');assert.equal(sound.length,2);assert(sound.every(c=>c.gain===30));assert.equal(r.choices.filter(c=>c.kind==='gap').length,1);for(const c of r.choices){assert(c.result.length>40);assert(c.tradeoff.length>30);assert(c.commitment);}}}
});
test('the formerly punished cautious route can finish all seven meetings without coffee or breaks',async()=>{
  const m=await engine,s=await run(()=>1);assert.equal(s.approved,7);assert.equal(s.log.length,21);assert.equal(s.energy,62);assert.equal(m.scorecard(s).total,3150);assert.equal(m.scorecard(s).reviewed,0);
});
test('both sensible routes and mixed sensible routes earn the same completion credit',async()=>{
  const m=await engine;
  for(const indices of [()=>0,()=>1,s=>(s.boss+s.round)%2]){const s=await run(indices);assert.equal(m.scorecard(s).total,3150);assert.equal(s.log.length,21);assert(s.log.every(l=>l.kind==='sound'));}
});
test('every meeting covers all three decisions and does not end immediately after a choice',async()=>{
  const m=await engine;let s=m.act(m.initialState(),{type:'start'});
  for(let r=0;r<3;r++){assert.equal(s.round,r);s=m.act(s,{type:'choose',index:0});assert.equal(s.phase,'feedback');assert.equal(s.approved,0);s=m.act(s,{type:'continue'});assert.equal(s.phase,r===2?'won':'battle');}
  assert.equal(s.log.length,3);assert.equal(s.alignment,90);assert.equal(s.approved,1);assert.strictEqual(m.act(s,{type:'continue'}),s);
});
test('a known gap requires review even when the other two decisions are sound',async()=>{
  const m=await engine;let s=m.act(m.initialState(),{type:'start'});
  for(const index of [2,0,1]){s=m.act(s,{type:'choose',index});s=m.act(s,{type:'continue'});}
  assert.equal(s.phase,'review');assert.equal(s.round,0);assert.equal(s.alignment,70);assert.equal(s.approved,0);
  const before=s;s=m.act(s,{type:'choose',index:1});assert.equal(s.alignment,90);assert.equal(s.score,300);assert.equal(s.feedback.change,20);assert.equal(before.alignment,70);assert.equal(before.log[0].revisions.length,0);
  assert.equal(s.log.length,3);assert.equal(s.log[0].revisions.length,1);assert.equal(s.log[0].firstKind,'gap');s=m.act(s,{type:'continue'});assert.equal(s.phase,'won');
});
test('every initial three-choice path in every room can recover without a restart or a resource lock',async()=>{
  const m=await engine;
  for(let boss=0;boss<7;boss++)for(let path=0;path<27;path++){
    let s={...m.initialState(),phase:'battle',boss,approved:boss,energy:0},p=path;
    for(let r=0;r<3;r++){s=m.act(s,{type:'choose',index:p%3});p=Math.floor(p/3);s=m.act(s,{type:'continue'});}
    let reviews=0;while(s.phase==='review'&&reviews++<3){s=m.act(s,{type:'choose',index:reviews%2});s=m.act(s,{type:'continue'});}
    assert.equal(s.phase,boss===6?'complete':'won');assert.equal(s.approved,boss+1);assert.equal(s.alignment,90);assert.equal(s.log.length,3);assert(s.log.every(l=>l.kind==='sound'));assert(s.energy>=0);
  }
});
test('repeated weak revisions and duplicate submits cannot farm alignment, decisions or XP',async()=>{
  const m=await engine;let s=m.act(m.initialState(),{type:'start'});
  for(const index of [2,0,0]){s=m.act(s,{type:'choose',index});assert.strictEqual(m.act(s,{type:'choose',index}),s);s=m.act(s,{type:'continue'});}
  const score=s.score;for(let i=0;i<5;i++){s=m.act(s,{type:'choose',index:2});s=m.act(s,{type:'continue'});assert.equal(s.phase,'review');assert.equal(s.score,score);assert.equal(s.alignment,70);assert.equal(s.log.length,3);}
  s=m.act(s,{type:'choose',index:0});s=m.act(s,{type:'continue'});assert.equal(s.phase,'won');assert.equal(s.score,300);
});
test('energy never hides a sound choice and breaks do not affect credit or overwrite the reasoning',async()=>{
  const m=await engine;let s={...m.act(m.initialState(),{type:'start'}),energy:0};s=m.act(s,{type:'choose',index:0});assert.equal(s.phase,'feedback');assert.equal(s.energy,0);
  const feedback=s.feedback,score=s.score;s=m.act(s,{type:'break'});assert.equal(s.energy,24);assert.equal(s.score,score);assert.strictEqual(s.feedback,feedback);assert.strictEqual(m.act(s,{type:'break'}),s);
  const rested=await run(()=>1,{breathers:true}),plain=await run(()=>1);assert.equal(m.scorecard(rested).total,m.scorecard(plain).total);
});
test('invalid actions and actions in the wrong phase leave the state unchanged',async()=>{
  const m=await engine,initial=m.initialState();for(const action of [{type:'choose',index:0},{type:'continue'},{type:'next'},{type:'break'},null])assert.strictEqual(m.act(initial,action),initial);
  const s=m.act(initial,{type:'start'});for(const index of [-1,3,NaN,1.5,'0'])assert.strictEqual(m.act(s,{type:'choose',index}),s);
  const end=await run(()=>0);for(const action of [{type:'choose',index:0},{type:'continue'},{type:'next'},{type:'start'},{type:'break'}])assert.strictEqual(m.act(end,action),end);
});
test('full cautious, mixed and repaired campaigns retain immutable, bounded records',async()=>{
  const m=await engine;let seed=17;
  for(let campaign=0;campaign<60;campaign++){
    const s=await run(()=>{seed=(seed*1664525+1013904223)>>>0;return seed%3;},{reviewIndex:campaign%2});assert.equal(s.approved,7);assert.equal(s.log.length,21);assert.equal(new Set(s.log.map(l=>`${l.boss}/${l.round}`)).size,21);assert(s.energy>=0&&s.energy<=100);assert.equal(m.scorecard(s).total,3150);
  }
});
test('a responsible hold and a conditional pilot approval both produce a useful final plan',async()=>{
  const m=await engine,hold=await run(()=>1),conditional=await run(()=>0);assert.equal(m.scorecard(hold).status,'PILOT PLAN AGREED');assert.equal(m.scorecard(conditional).status,'PILOT PLAN AGREED');assert(hold.log.find(l=>l.boss===6&&l.round===0).commitment.includes('Hold'));assert(conditional.log.find(l=>l.boss===6&&l.round===0).commitment.includes('subject to verification'));
});
test('the exported decision record preserves first choices, corrections, reasoning and actual conditions',async()=>{
  const m=await engine,s=await run(()=>2),notes=m.fieldNotes(s);assert.equal(m.scorecard(s).reviewed,21);assert(notes.includes('3150 completion XP'));assert(notes.includes('First choice:'));assert(notes.includes('Review 1:'));assert(notes.includes('Trade-off:'));assert(notes.includes('Next check:'));assert(notes.includes('not professional ability'));assert(notes.includes('not evidence that the product is ready'));
});
