const test=require('node:test');
const assert=require('node:assert/strict');
require('./engine.js');
const G=globalThis.SprintGame;
const select=(s,ids)=>ids.forEach(id=>G.toggle(s,id));
const run=(s,ids,choice=0)=>{select(s,ids);s.phase='event';G.choose(s,choice);G.deliver(s);};
test('dependencies gate selection and removing a prerequisite cascades',()=>{const s=G.createState();G.toggle(s,'booking');assert.deepEqual(s.selected,[]);select(s,['profile','slots','booking']);G.toggle(s,'profile');assert.deepEqual(s.selected,[]);});
test('balanced three-sprint route delivers every goal sustainably',()=>{const s=G.createState();run(s,['profile','slots','booking']);G.next(s);run(s,['privacy','access','reminder']);G.next(s);run(s,['feedback','measure','improve']);G.next(s);assert.equal(s.phase,'final');assert.equal(s.history.filter(r=>r.goal).length,3);assert.equal(s.wellbeing,96);assert.equal(s.done.length,9);});
test('overfull plans stop at the first task that cannot fit',()=>{const s=G.createState();run(s,['profile','slots','booking','privacy','banner'],1);assert.deepEqual(s.history[0].finished,['profile','slots','booking','privacy']);assert.deepEqual(s.history[0].unfinished,['banner']);assert.equal(s.wellbeing,76);G.next(s);assert.ok(!s.selected.includes('banner'));assert.ok(G.available(s,G.find('banner')));});
test('burnout reduces future capacity, never recalculates this sprint mid-delivery',()=>{const s=G.createState();s.wellbeing=46;s.stance='stretch';select(s,['profile','slots','booking']);s.phase='event';G.choose(s,2);assert.equal(G.capacity(s),16);G.deliver(s);assert.equal(s.wellbeing,22);assert.equal(s.history[0].cap,16);G.next(s);assert.equal(G.capacity(s),9);});
test('empty sprints and repeated commands are safe',()=>{const s=G.createState();s.phase='event';G.choose(s,0);G.choose(s,2);assert.equal(s.choice,0);G.deliver(s);G.deliver(s);assert.equal(s.history.length,1);assert.deepEqual(s.done,[]);assert.equal(s.wellbeing,84);});
test('wellbeing caps at 100 and completed prerequisites remain usable',()=>{const s=G.createState();s.wellbeing=99;s.stance='support';run(s,['profile','slots','booking']);assert.equal(s.wellbeing,100);G.next(s);assert.ok(G.available(s,G.find('access')));});
test('all 27 event paths complete with valid capacity and unique deliveries',()=>{for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let c=0;c<3;c++){const s=G.createState();for(const choice of [a,b,c]){for(const t of G.TASKS)if(G.available(s,t))G.toggle(s,t.id);s.phase='event';G.choose(s,choice);G.deliver(s);const r=s.history.at(-1);assert.ok(r.used<=r.cap);assert.ok(s.wellbeing>=0&&s.wellbeing<=100);assert.equal(new Set(s.done).size,s.done.length);G.next(s);}assert.equal(s.phase,'final');}});

test('every pack supports all 27 response paths with ordered dependencies',()=>{for(const p of G.PACKS)for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let c=0;c<3;c++){const s=G.createState(p.id);for(const choice of [a,b,c]){for(const t of G.TASKS)if(G.available(s,t))G.toggle(s,t.id);s.phase='event';G.choose(s,choice);assert.equal(G.eventFor(s),p.events[s.round]);G.deliver(s);const r=s.history.at(-1);assert.ok(r.used<=r.cap);assert.ok(s.wellbeing>=0&&s.wellbeing<=100);assert.equal(new Set(s.done).size,s.done.length);const prior=s.history.slice(0,-1).flatMap(h=>h.finished);for(const id of r.finished){assert.ok(G.find(id).deps.every(dep=>prior.includes(dep)));prior.push(id);}G.next(s);}assert.equal(s.phase,'final');assert.equal(s.pack,p.id);}});
test('packs include three unique events with practical conversation prompts',()=>{assert.equal(G.PACKS.length,5);const titles=[];for(const p of G.PACKS){assert.equal(p.events.length,3);for(const e of p.events){titles.push(e.title);assert.ok(e.trySaying&&e.question);assert.equal(e.options.length,3);for(const o of e.options){assert.ok(Number.isFinite(o.capacity)&&Number.isFinite(o.wellbeing)&&o.lesson);}}}assert.equal(new Set(titles).size,15);});
test('unknown packs fall back to the classic route',()=>{assert.equal(G.createState('missing').pack,'classic');});

test('interface controls complete each pack, preserve replay and export conversation notes',async()=>{
  const vm=require('node:vm'),fs=require('node:fs');
  for(const p of G.PACKS){
    let handler,downloaded;
    const game={innerHTML:'',addEventListener:(type,fn)=>{handler=fn;},querySelector:()=>({focus(){}}),scrollIntoView(){}};
    const context={window:{SprintGame:G},document:{querySelector:sel=>sel==='#game'?game:{focus(){},textContent:''},createElement:()=>({click(){},remove(){}}),body:{append(){}}},Blob,URL:{createObjectURL:blob=>{downloaded=blob;return 'blob:test';},revokeObjectURL(){}},setTimeout:fn=>fn()};
    vm.createContext(context);vm.runInContext(fs.readFileSync(__dirname+'/script.js','utf8'),context);
    const click=dataset=>handler({target:{closest:()=>({dataset,disabled:false})}});
    click({pack:p.id});assert.ok(game.innerHTML.includes('Scenario pack: '+p.title));
    click({task:'profile'});click({pack:'release'});assert.equal(vm.runInContext('state.pack',context),p.id);click({task:'profile'});
    for(let round=0;round<3;round++){
      click({action:'lock'});assert.ok(game.innerHTML.includes(p.events[round].title));
      click({choice:'0'});assert.ok(game.innerHTML.includes(p.events[round].trySaying));
      click({action:'deliver'});assert.ok(game.innerHTML.includes(p.events[round].question));
      click({action:'next'});
    }
    assert.equal(vm.runInContext('state.phase',context),'final');
    click({action:'download'});const text=await downloaded.text();
    assert.ok(text.includes('Scenario pack: '+p.title));
    for(const e of p.events)assert.ok(text.includes(e.trySaying)&&text.includes(e.question));
    click({action:'restart'});assert.equal(vm.runInContext('state.pack',context),p.id);
  }
});
