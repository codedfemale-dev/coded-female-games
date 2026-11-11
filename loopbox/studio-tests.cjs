const {test}=require('node:test');
const assert=require('node:assert/strict');
const modules=Promise.all([import('./studio-model.js'),import('./studio-content.js'),import('./studio-preview.js')]);

test('all 47 design configurations have previews and only the complete repair passes',async()=>{
  const [m,{cases},p]=await modules;let configurations=0;
  for(const c of cases){
    assert(c.person&&c.pattern&&c.check&&c.takeaway);
    for(let a=0;a<c.fields[0].options.length;a++)for(let b=0;b<c.fields[1].options.length;b++){
      const values=[a,b],checks=m.assess(c,values);configurations++;
      assert.equal(checks.every(r=>r.passed),a===c.fields[0].good&&b===c.fields[1].good);
      assert(checks.every(r=>r.chosen&&r.reason));const html=p.designPreview(c,values);assert(html.includes('cm-screen'));assert(!/undefined|NaN/.test(html));
    }
    assert.notEqual(p.designPreview(c,c.initial),p.designPreview(c,c.fields.map(f=>f.good)));
  }
  assert.equal(configurations,47);
});
test('both settings and an actual check are needed for completion; retries keep the earlier evidence',async()=>{
  const [m,{cases}]=await modules;let s=m.createStudio();const c=cases[0];
  assert.equal(m.checkDesign(s),s);
  s=m.selectSetting(s,0,c.fields[0].good);assert.equal(m.checkDesign(s),s);
  s=m.selectSetting(s,1,c.initial[1]);s=m.checkDesign(s);assert.equal(m.completedCount(s),0);
  const prior=s;s=m.selectSetting(s,1,c.fields[1].good);assert.equal(m.completedCount(s),0);s=m.checkDesign(s);
  assert.equal(m.completedCount(s),1);assert.equal(s.entries[c.id].trials.length,2);assert.equal(prior.entries[c.id].trials.length,1);
  assert.equal(m.checkDesign(s),s);assert.equal(m.selectSetting(s,1,c.initial[1]),s);
});
test('all eight cases can be solved in arbitrary order, restored and exported without fabricated user results',async()=>{
  const [m,{caseById}]=await modules;let s=m.createStudio('challenge',()=>0);
  assert.notDeepEqual(s.order,m.createStudio().order);assert.equal(new Set(s.order).size,8);
  for(let i=7;i>=0;i--){s={...s,position:i};const c=caseById[s.order[i]];s=m.selectSetting(m.selectSetting(s,0,c.fields[0].good),1,c.fields[1].good);s=m.checkDesign(s);}
  assert.equal(m.completedCount(s),8);assert.deepEqual(m.readCheckpoint(JSON.stringify(s)),s);
  const text=m.fieldNotes(s,'Check the total with a person. <script>literal notes</script>');
  assert(text.includes('8 of 8'));assert(text.includes('not real user-test results'));assert(text.includes('<script>literal notes</script>'));
  for(const c of Object.values(caseById))assert(text.includes(c.check));
});
test('checkpoint rejects corrupt, duplicate, out-of-range and malformed repairs and strips unrelated data',async()=>{
  const [m]=await modules;assert.equal(m.readCheckpoint('broken'),null);assert.equal(m.readCheckpoint('null'),null);
  const s=m.createStudio();
  for(const change of [x=>x.version=2,x=>x.position=8,x=>x.order[0]=x.order[1],x=>x.entries.price.values=[99,0],x=>x.entries.price.trials=[[-1,0]],x=>x.entries.price.reviews=[4]]){
    const bad=structuredClone(s);change(bad);assert.equal(m.readCheckpoint(JSON.stringify(bad)),null);
  }
  const extra={...s,reflection:'private reflection',subscription:{email:'private@example.com'}};const clean=m.readCheckpoint(JSON.stringify(extra));assert(!('reflection' in clean));assert(!('subscription' in clean));
});
test('previews expose partial fixes and escape literal text for safe rendering',async()=>{
  const [,{cases},p]=await modules;
  const privacy=cases.find(c=>c.id==='privacy');assert(p.designPreview(privacy,[1,2]).includes('No way to change them later'));
  const sponsor=cases.find(c=>c.id==='sponsor');assert(p.designPreview(sponsor,[1,2]).includes('Renewal cost not shown'));
  assert.equal(p.escape('<script> & "'), '&lt;script&gt; &amp; &quot;');
});
