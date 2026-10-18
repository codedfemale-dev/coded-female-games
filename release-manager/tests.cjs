const test=require('node:test'),assert=require('node:assert/strict');
const mod=()=>import('./engine.js'),content=()=>import('./content.js');
async function setup(){const e=await mod(),s=e.fresh('practice');['ada','nia','lex'].forEach(id=>e.hire(s,id));assert(e.begin(s));return {e,s};}
test('hiring respects budget, three slots and release boundaries',async()=>{const e=await mod(),s=e.fresh();['ada','nia','bo'].forEach(id=>e.hire(s,id));assert.equal(s.team.length,2);assert.equal(s.budget,3);e.hire(s,'lex');assert.equal(s.budget,0);e.hire(s,'sam');assert.equal(s.team.length,3);e.begin(s);e.hire(s,'lex');assert.equal(s.team.length,3);});
test('one developer works one card daily and Won’t is excluded',async()=>{const {e,s}=await setup();for(const t of s.tasks){e.plan(s,t.id,'dev','ada');e.plan(s,t.id,'priority','Could');}e.plan(s,s.tasks[1].id,'priority','Must');e.advance(s);assert.equal(s.tasks[0].progress,0);assert.equal(s.tasks[1].progress,2);e.plan(s,s.tasks[1].id,'priority','Won’t');e.advance(s);assert.equal(s.tasks[0].progress,3);assert.equal(s.tasks[1].progress,2);assert.equal(s.phase,'event');assert.equal(e.advance(s),false);});
test('events cannot be skipped or applied twice; commitments affect actual release',async()=>{const {e,s}=await setup();e.advance(s);e.advance(s);assert.equal(e.choose(s,99),false);assert.equal(s.phase,'event');e.choose(s,0);assert.equal(s.promise,'confetti');const support=s.leadership;assert.equal(e.choose(s,0),false);while(s.phase!=='gate'){if(s.phase==='event')e.choose(s,0);else e.advance(s);}const r=e.release(s);assert.equal(r.missing,1);assert(s.leadership<support-10);assert.equal(e.release(s),false);});
test('specialists, energy, debt and mentoring affect daily capacity',async()=>{const e=await mod(),{developers}=await content(),s=e.fresh(),sam=developers.find(d=>d.id==='sam');assert.equal(e.capacity(s,sam,{kind:'core'}),2);s.mentor=true;assert.equal(e.capacity(s,sam,{kind:'core'}),3);s.energy=20;s.debt=80;assert.equal(e.capacity(s,sam,{kind:'core'}),1);});
test('extension only grants one day and release waits for gate',async()=>{const {e,s}=await setup();assert.equal(e.release(s),false);while(s.phase!=='gate'){if(s.phase==='event')e.choose(s,1);else e.advance(s);}assert.equal(s.day,6);assert(e.delay(s));assert.equal(e.delay(s),false);e.advance(s);assert.equal(s.day,7);assert.equal(s.phase,'gate');e.release(s);assert(e.next(s));assert.equal(s.level,1);assert.equal(s.budget,12);});
test('all 6 levels can finish with requirements and a full journal',async()=>{const e=await mod(),s=e.fresh('practice');for(let l=0;l<6;l++){if(l===0||s.phase==='hire'){['ada','bo','lex'].forEach(id=>e.hire(s,id));assert(e.begin(s));}for(const t of s.tasks){e.plan(s,t.id,'dev',t.must?(t.kind==='core'?'ada':t.kind==='quality'?'bo':'lex'):t.kind==='ai'?'lex':'ada');e.plan(s,t.id,'priority',t.must?'Must':'Should');}while(s.phase!=='gate'){if(s.phase==='event')e.choose(s,1);else e.advance(s);}const report=e.release(s);assert.equal(report.missing,0,`level ${l+1}`);e.next(s);for(const k of ['customers','leadership','energy','debt'])assert(s[k]>=0&&s[k]<=100);}assert.equal(s.phase,'end');assert.equal(s.reports.length,6);assert(e.notes(s).includes('Staged rollout and rollback'));assert(e.restore(JSON.stringify(s)));});
test('later effects reveal only on their due day and survive release boundaries',async()=>{const {e,s}=await setup();s.pending.push({level:1,day:1,effect:{customers:-12},text:'A previous decision returns.'});e.advance(s);assert.equal(s.customers,60);while(s.phase!=='gate'){if(s.phase==='event')e.choose(s,1);else e.advance(s);}e.release(s);e.next(s);['ada','bo','lex'].forEach(id=>e.hire(s,id));e.begin(s);const before=s.customers;e.advance(s);assert.equal(s.customers,before-12);assert(s.log.some(x=>x.includes('A previous decision returns.')));});
test('RICE uses a confidence fraction and rejects invalid saves',async()=>{const e=await mod();assert.equal(e.rice({reach:100,impact:2,confidence:.5,effort:5}),20);for(const x of ['nope','null','{}',JSON.stringify({...e.fresh(),level:900}),JSON.stringify({...e.fresh(),energy:null})])assert.equal(e.restore(x),null);});

test('authored next-release consequence fires after the agent shortcut, not before',async()=>{const e=await mod(),s=e.fresh('practice');s.level=1;['ada','bo','lex'].forEach(id=>e.hire(s,id));e.begin(s);e.advance(s);e.advance(s);e.choose(s,0);assert.equal(s.pending[0].level,2);assert.equal(s.pending[0].day,1);while(s.phase!=='gate'){if(s.phase==='event')e.choose(s,0);else e.advance(s);}assert(!s.log.some(x=>x.startsWith('LATER:')));e.release(s);e.next(s);['ada','bo','lex'].forEach(id=>e.hire(s,id));e.begin(s);const before=s.customers;e.advance(s);assert.equal(s.customers,Math.max(0,before-12));assert(s.log.some(x=>x.startsWith('LATER:')));});

test('offline shell installs every required file and stays scoped to this game',async()=>{
 const fs=require('node:fs/promises'),path=require('node:path'),vm=require('node:vm');
 const handlers={},stored=new Map(),deleted=[];let added=[];
 const cache={addAll:async urls=>{added=urls;for(const u of urls)stored.set(u,{cached:u});},match:async r=>stored.get(typeof r==='string'?r:r.url)};
 const sandbox={URL,self:{location:{href:'https://codedfemale-dev.github.io/coded-female-games/release-manager/sw.js'},clients:{claim:async()=>{}},addEventListener:(name,cb)=>handlers[name]=cb},caches:{open:async()=>cache,keys:async()=>['other-game','cf-release-manager-obsolete','cf-release-manager-v10'],delete:async k=>deleted.push(k)},fetch:async()=>{throw Error('offline');}};
 vm.runInNewContext(await fs.readFile(path.join(__dirname,'sw.js'),'utf8'),sandbox);
 let pending;handlers.install({waitUntil:p=>pending=p});await pending;
 for(const u of added){const relative=new URL(u).pathname.replace('/coded-female-games/','');await fs.access(path.join(__dirname,'..',relative));}
 assert(added.some(u=>u.endsWith('/art.js')));assert(added.some(u=>u.endsWith('/assets/open-sans.ttf')));
 handlers.activate({waitUntil:p=>pending=p});await pending;assert.deepEqual(deleted,['cf-release-manager-obsolete']);
 let response;handlers.fetch({request:{method:'GET',url:'https://codedfemale-dev.github.io/coded-female-games/release-manager/',mode:'navigate'},respondWith:p=>response=p});assert((await response).cached.endsWith('/release-manager/'));
 response=undefined;handlers.fetch({request:{method:'GET',url:'https://codedfemale-dev.github.io/coded-female-games/product-quest/',mode:'navigate'},respondWith:p=>response=p});assert.equal(response,undefined);
 handlers.fetch({request:{method:'GET',url:'https://codedfemale-dev.github.io/coded-female-games/release-manager/engine.js',mode:'cors'},respondWith:p=>response=p});assert((await response).cached.endsWith('/engine.js'));
 const manifest=JSON.parse(await fs.readFile(path.join(__dirname,'manifest.webmanifest'),'utf8'));assert.equal(manifest.scope,'./');assert.equal(manifest.start_url,'./');assert.equal(manifest.display,'standalone');
 for(const icon of manifest.icons){const buffer=await fs.readFile(path.join(__dirname,icon.src)),size=Number(icon.sizes.split('x')[0]);assert.equal(buffer.readUInt32BE(16),size);assert.equal(buffer.readUInt32BE(20),size);}
});

test('varied campaigns always finish, with finite bounded meters and resumable progress',async()=>{const e=await mod();for(let run=0;run<40;run++){const s=e.fresh('practice');for(let l=0;l<6;l++){['ada','bo','lex'].forEach(id=>e.hire(s,id));e.begin(s);s.tasks.forEach((t,i)=>{e.plan(s,t.id,'dev',['ada','bo','lex'][(i+run)%3]);e.plan(s,t.id,'priority',['Must','Should','Could','Won’t'][(i+run)%4]);});let turns=0;while(s.phase!=='gate'){assert(++turns<15);if(s.phase==='event')e.choose(s,(run+l)%2);else e.advance(s);assert(e.restore(JSON.stringify(s)));}e.release(s);e.next(s);for(const k of ['customers','leadership','energy','debt'])assert(Number.isFinite(s[k])&&s[k]>=0&&s[k]<=100);}assert.equal(s.phase,'end');assert.equal(s.reports.length,6);}});

test('RICE ranks the developer queue by score rather than hidden MoSCoW labels',async()=>{const {e,s}=await setup();s.tasks.forEach(t=>e.plan(s,t.id,'dev','ada'));e.plan(s,'confetti','priority','Must');e.setFramework(s,'rice');assert.deepEqual(e.orderedTasks(s).map(t=>t.id),['checkout','errors','monitor','confetti']);e.advance(s);assert.equal(s.tasks.find(t=>t.id==='checkout').progress,3);assert.equal(s.tasks.find(t=>t.id==='confetti').progress,0);});
test('RICE Include and Defer affect work without losing assignments or progress',async()=>{const {e,s}=await setup();e.plan(s,'checkout','dev','ada');e.plan(s,'errors','dev','ada');e.setFramework(s,'rice');e.advance(s);e.plan(s,'checkout','scope','defer');e.advance(s);assert.equal(s.tasks[0].progress,3);assert.equal(s.tasks[1].progress,2);e.choose(s,1);e.plan(s,'checkout','scope','include');assert.equal(s.tasks[0].dev,'ada');assert.equal(s.tasks[0].progress,3);e.advance(s);assert.equal(s.tasks[0].progress,6);});
test('selected method survives resume, old saves migrate, and invalid methods are rejected',async()=>{const {e,s}=await setup();e.plan(s,'checkout','dev','ada');e.advance(s);e.setFramework(s,'rice');const resumed=e.restore(JSON.stringify(s));assert.equal(resumed.framework,'rice');assert.equal(resumed.tasks[0].progress,3);delete s.framework;const legacy=e.restore(JSON.stringify(s));assert.equal(legacy.framework,'moscow');assert.equal(legacy.tasks[0].dev,'ada');assert.equal(legacy.tasks[0].progress,3);assert.equal(e.setFramework(legacy,'other'),false);assert.equal(e.restore(JSON.stringify({...s,framework:'other'})),null);});
test('RICE retrospectives explain scores and scope rather than MoSCoW labels',async()=>{const {e,s}=await setup();e.plan(s,'confetti','priority','Must');e.setFramework(s,'rice');while(s.phase!=='gate'){if(s.phase==='event')e.choose(s,1);else e.advance(s);}const r=e.release(s);assert.equal(r.framework,'rice');assert(r.feedback.every(t=>t.text.includes('RICE ')));assert(!r.feedback.some(t=>t.text.includes('· Must.')||t.text.includes('· Could.')||t.text.includes('An unmet Must')));assert(e.notes(s).includes('Planning method: RICE'));});

test('review ties missing requirements to roster and assignment and records broken promises',async()=>{
 const e=await mod(),s=e.fresh('practice');['nia','lex','kit'].forEach(id=>e.hire(s,id));e.begin(s);
 while(s.phase!=='gate'){if(s.phase==='event')e.choose(s,0);else e.advance(s);}
 const r=e.release(s),text=r.strategyFeedback.map(x=>x.title+' '+x.text).join('\n');
 for(const expected of ['0/14','without an owner','none of your hires','promised confetti','12 leadership','Promise the sparkle'])assert(text.includes(expected),expected);
 assert(e.notes(s).includes('Your roster missed a useful skill'));assert(e.restore(JSON.stringify(s)));
});
test('required delivery and skill match earn grounded positive feedback',async()=>{
 const e=await mod(),s=e.fresh('practice');['ada','bo','lex'].forEach(id=>e.hire(s,id));e.begin(s);e.plan(s,'checkout','dev','ada');e.plan(s,'checkout','priority','Must');e.plan(s,'monitor','dev','bo');
 while(s.phase!=='gate'){if(s.phase==='event')e.choose(s,1);else e.advance(s);}
 const r=e.release(s);assert.equal(r.missing,0);assert(r.strategyFeedback.some(x=>x.title==='You protected the outcome'&&x.kind==='good'));assert(r.strategyFeedback.some(x=>x.title==='Your skills matched the work'&&x.text.includes('Ada')));assert(!r.strategyFeedback.some(x=>x.title==='Your roster missed a useful skill'));assert(r.strategyFeedback.some(x=>x.title==='Your stakeholder choice'&&x.text.includes('shared outcome')));
});
test('feedback distinguishes deferral from slow delivery and supports legacy reviews',async()=>{
 const e=await mod(),s=e.fresh('practice');['ada','bo','lex'].forEach(id=>e.hire(s,id));e.begin(s);e.plan(s,'checkout','dev','lex');e.plan(s,'checkout','priority','Won’t');
 while(s.phase!=='gate'){if(s.phase==='event')e.choose(s,1);else e.advance(s);}
 const r=e.release(s);assert(r.strategyFeedback.some(x=>x.text.includes('You deferred work')));assert(r.strategyFeedback.some(x=>x.text.includes('Ada specialises in core')));delete r.strategyFeedback;assert(e.restore(JSON.stringify(s)));assert(e.notes(s).includes('Minimum Viable Panic'));
});

test('walking routes use the aisle, reach each person and clamp progress',async()=>{
 const {home,destinations,routeTo,positionOn}=await import('./movement.js');
 for(const from of [home,...Object.values(destinations)])for(const target of Object.keys(destinations)){
  const route=routeTo(from,target);assert.deepEqual(positionOn(route,-1),from);assert.deepEqual(positionOn(route,1),destinations[target]);assert.deepEqual(positionOn(route,2),destinations[target]);
  assert(Number.isFinite(route.duration));if(route.length)assert(route.duration>=250);
  for(let i=1;i<route.points.length;i++)assert(route.points[i].x===route.points[i-1].x||route.points[i].y===route.points[i-1].y,'walk follows aisle corners');
 }
 const route=routeTo(home,'engineer');const mid=positionOn(route,.5);assert(mid.x>home.x&&mid.x<destinations.engineer.x);assert.equal(mid.y,300);assert.equal(routeTo(home,'nobody'),null);
});
test('developer fit follows actual tasks, required skills, mentoring and capacity',async()=>{
 const {fitFor,profiles}=await import('./people.js'),{developers,levels}=await content(),e=await mod(),s=e.fresh();
 assert.equal(Object.keys(profiles).length,developers.length);
 for(let l=0;l<levels.length;l++){s.level=l;for(const d of developers){const fit=fitFor(s,d);assert.equal(fit.matched.length,levels[l].tasks.filter(t=>t.kind===d.skill).length);assert.equal(fit.required,levels[l].tasks.some(t=>t.must&&t.kind===d.skill));assert(fit.rates.every(r=>r.rate>=1));}}
 s.level=0;const sam=developers.find(d=>d.id==='sam'),lex=developers.find(d=>d.id==='lex');assert(fitFor(s,sam).required);assert(fitFor(s,sam).tight);s.mentor=true;assert(!fitFor(s,sam).tight);s.mentor=false;assert.equal(fitFor(s,lex).matched.length,0);assert.equal(fitFor(s,lex,levels[0].tasks[0]).rates[0].rate,3);
 const before=fitFor(s,sam,levels[0].tasks[0]).rates[0].rate;s.mentor=true;assert.equal(fitFor(s,sam,levels[0].tasks[0]).rates[0].rate,before+1);s.energy=20;s.debt=80;assert.equal(fitFor(s,sam,levels[0].tasks[0]).rates[0].rate,1);
});
test('reduced-motion room finishes movement immediately and opens conversation once',async()=>{
 const {drawRoom,players}=await import('./scene.js'),{routeTo,home,destinations}=await import('./movement.js');
 const ctx={fillRect(){},fillText(){}},canvas={getContext:()=>ctx,isConnected:true};let arrived=0,at;
 const stop=drawRoom(canvas,{level:0},players[0],{motion:false,walking:{route:routeTo(home,'support'),started:performance.now()},onPosition:p=>at=p,onArrive:()=>arrived++});
 await Promise.resolve();assert.deepEqual(at,destinations.support);assert.equal(arrived,1);stop();
});
