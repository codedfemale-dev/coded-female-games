const {test}=require('node:test'),assert=require('node:assert/strict');
const extension=import('./quests.js'),base=import('./access-lessons.js');
test('out-of-order exploration visits every unfinished repair before completing',async()=>{
 const {nextRepair}=await extension,{freshProgress,checkRepair,lessons}=await base;let p=freshProgress();
 for(const i of [4,2,0,3,1]){assert.notEqual(nextRepair(p,i),null);p=checkRepair(p,i,lessons[i].good);}
 assert.equal(nextRepair(p,4),null);let partial=freshProgress();partial=checkRepair(partial,4,lessons[4].good);assert.equal(nextRepair(partial,4),0);
});
test('extra challenges give specific feedback, allow retries and freeze completed achievements',async()=>{
 const {quests,freshQuests,checkQuest,questNotes}=await extension;let state=freshQuests();
 for(let i=0;i<quests.length;i++){for(let c=0;c<3;c++){assert(quests[i].why[c]);if(c===quests[i].good)continue;state=checkQuest(state,i,c);assert.equal(state[i].complete,false);}state=checkQuest(state,i,quests[i].good);assert(state[i].complete);assert.strictEqual(checkQuest(state,i,0),state);}
 assert.equal(state.filter(s=>s.complete).length,3);assert(questNotes(state).includes('Captions: completed'));
});
test('checkpoint round-trip excludes booking, reflection and unexpected extra properties',async()=>{
 const {makeCheckpoint,readCheckpoint,freshQuests}=await extension,{freshProgress,checkRepair,lessons}=await base;let p=checkRepair(freshProgress(),3,lessons[3].good);p[3].private='sensitive';
 const checkpoint=makeCheckpoint(p,3,freshQuests());checkpoint.booking={email:'private@example.com'};checkpoint.reflection='private';const clean=readCheckpoint(JSON.stringify(checkpoint));
 assert(clean.progress[3].complete);assert.equal(clean.index,3);assert(!JSON.stringify(clean).includes('private'));assert(!JSON.stringify(clean).includes('sensitive'));
});
test('malformed, incompatible and falsified checkpoints cannot resume',async()=>{
 const {makeCheckpoint,readCheckpoint,freshQuests}=await extension,{freshProgress}=await base;const fresh=()=>makeCheckpoint(freshProgress(),0,freshQuests());
 for(const raw of ['',null,'{','null','[]','{"version":2}'])assert.equal(readCheckpoint(raw),null);
 for(const mutate of [s=>s.index=5,s=>s.progress=[],s=>s.bonus=null,s=>s.progress[0].selected=9,s=>s.progress[0].attempts=[NaN],s=>s.progress[0].complete=true,s=>s.progress[0].attempts=Array(101).fill(0)]){let s=fresh();mutate(s);assert.equal(readCheckpoint(JSON.stringify(s)),null);}
});
test('saved attempt history is bounded without losing the latest repair',async()=>{
 const {makeCheckpoint,readCheckpoint,freshQuests}=await extension,{freshProgress,lessons}=await base;let p=freshProgress();p[0]={selected:lessons[0].good,complete:true,attempts:[...Array(200).fill(0),lessons[0].good]};const s=makeCheckpoint(p,0,freshQuests());assert.equal(s.progress[0].attempts.length,100);assert(readCheckpoint(JSON.stringify(s)).progress[0].complete);
});
