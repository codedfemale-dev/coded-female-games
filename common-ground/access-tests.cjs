const {test}=require('node:test');
const assert=require('node:assert/strict');
const model=import('./access-lessons.js');
test('every repair has a distinct explanation for each choice and a practical check',async()=>{
 const {lessons}=await model;assert.equal(lessons.length,15);
 for(const lesson of lessons){assert.equal(lesson.explanations.length,lesson.options.length);assert.equal(new Set(lesson.explanations).size,lesson.options.length);assert(lesson.explanations[lesson.good]);assert(lesson.test.length>30);}
});
test('wrong checks preserve attempts, successful checks complete one repair, repeats do not duplicate it',async()=>{
 const {freshProgress,checkRepair}=await model;const start=freshProgress();
 const wrong=checkRepair(start,0,0);assert.equal(wrong[0].complete,false);assert.deepEqual(wrong[0].attempts,[0]);assert.equal(start[0].attempts.length,0);
 const good=checkRepair(wrong,0,1);assert.equal(good[0].complete,true);assert.deepEqual(good[0].attempts,[0,1]);assert.equal(good.filter(p=>p.complete).length,1);
 assert.strictEqual(checkRepair(good,0,1),good);assert.strictEqual(checkRepair(good,0,2),good);
});
test('invalid choices cannot repair a lesson or pollute notes',async()=>{
 const {freshProgress,checkRepair}=await model;const start=freshProgress();for(const [index,choice] of [[-1,0],[15,0],[0,-1],[0,3],[0,1.5],[0,'1']])assert.strictEqual(checkRepair(start,index,choice),start);
});
test('contrast decisions use actual ratios, including the near-threshold failing colour',async()=>{
 const {colourEvidence}=await model;assert.equal(colourEvidence('#BBBBBB').passes,false);assert.equal(colourEvidence('#CA9B52').passes,false);assert.equal(colourEvidence('#333333').passes,true);
 assert.equal(colourEvidence('#777777').passes,false);assert.equal(colourEvidence('#767676').passes,true);assert.equal(colourEvidence('#000000').ratio,21);assert.equal(colourEvidence('#FFFFFF').ratio,1);
});
test('field notes retain checked alternatives, partial progress, reflection and guidance',async()=>{
 const {freshProgress,checkRepair,fieldNotes}=await model;let p=checkRepair(freshProgress(),0,0);p=checkRepair(p,0,1);
 const notes=fieldNotes(p,{practice:['Keep values and explain the correction.'],reflection:'Test the form with only a keyboard. <example>'});
 for(const expected of ['1/15 repairs completed','placeholder','for and id','Contrast: still to explore','Keep values','<example>','https://www.w3.org/','not a full accessibility audit'])assert(notes.includes(expected),expected);
});
test('all fifteen repairs can be completed without first-attempt scoring and appear in the export',async()=>{
 const {freshProgress,checkRepair,fieldNotes,lessons}=await model;let p=freshProgress();for(let i=0;i<lessons.length;i++){p=checkRepair(p,i,(lessons[i].good+1)%3);p=checkRepair(p,i,lessons[i].good);}assert.equal(p.filter(r=>r.complete).length,15);assert(fieldNotes(p).includes('15/15 repairs completed'));assert.equal(p.flatMap(r=>r.attempts).length,30);
});
