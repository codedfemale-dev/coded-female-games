const assert=require('node:assert/strict');const {CASES,gradeCase}=require('./cases.js');
assert.equal(CASES.length,5);
for(const c of CASES){assert.equal(c.claims.length,3);for(const cl of c.claims){assert.ok(['supported','contradicted','unknown'].includes(cl[1]));assert.ok(c.sources.some(s=>s[0]===cl[2]));assert.ok(cl[3].length>30);}let perfect=0;for(const a of ['supported','contradicted','unknown'])for(const b of ['supported','contradicted','unknown'])for(const d of ['supported','contradicted','unknown'])for(let f=0;f<c.fixes.length;f++){const r=gradeCase(c,[a,b,d],f);if(r.correct===3&&r.fixCorrect)perfect++;}assert.equal(perfect,1);assert.deepEqual(gradeCase(c,c.claims.map(cl=>cl[1]),c.fix),{correct:3,fixCorrect:true});}
assert.ok(CASES.some(c=>c.claims.every(cl=>cl[1]==='supported')));
console.log('Passed: all 405 verdict/summary combinations, source references and clean-case coverage.');
