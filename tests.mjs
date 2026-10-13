import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {games} from './data.js';
import {contrast,runCodeTests,originalChoice,initialAgent,applyAgentDecision,initialPeople,applyPeopleDecision,makeNotes} from './models.js';

test('all six games contain complete original challenges and usable page links',async()=>{
  assert.equal(Object.keys(games).length,6);
  const catalogue=await readFile(new URL('index.html',import.meta.url),'utf8');
  let challenges=0;
  for(const [slug,g] of Object.entries(games)){
    assert(g.rounds.length>=5);assert(g.sources.length);challenges+=g.rounds.length;
    assert(catalogue.includes(`href="${slug}/"`));
    const html=await readFile(new URL(`${slug}/index.html`,import.meta.url),'utf8');
    assert(html.includes(`data-game="${slug}"`));assert(html.includes('id="start"'));assert(html.includes('lang="en-GB"'));
    const titles=new Set();
    for(const r of g.rounds){assert(r.title&&r.hint);assert(!titles.has(r.title));titles.add(r.title);assert(r.takeaway||r.responses?.every(x=>x.takeaway));}
  }
  assert.equal(challenges,32);
  for(const path of ['style.css','game.js','models.js','data.js','favicon.svg','assets/open-sans.ttf','assets/playfair-display.ttf'])await access(new URL(path,import.meta.url));
});
test('code game executes every implementation against the actual boundary examples',()=>{
  const rounds=games['ship-it-or-fix-it'].rounds;
  for(const round of rounds){
    for(let i=0;i<round.options.length;i++)assert.equal(runCodeTests(round,i).every(t=>t.passed),i===round.good,`${round.task} implementation ${i}`);
    assert.equal(runCodeTests(round,originalChoice[round.task]).every(t=>t.passed),round.task==='active');
  }
  assert.equal(runCodeTests(rounds[3],0).every(t=>t.unchanged),false);
  assert.equal(runCodeTests(rounds[4],2).at(-1).passed,false);
});
test('contrast choices meet the stated normal-text threshold only with dark text',()=>{
  assert(contrast('#333333')>4.5);assert(contrast('#CA9B52')<4.5);assert(contrast('#BBBBBB')<4.5);assert.equal(contrast('#FFFFFF'),1);
});
test('agent permissions block consequential actions; reviewed human purchases respect the budget',()=>{
  const rounds=games['agent-mission-control'].rounds;
  const none=initialAgent({draft:false,send:false,spend:false,share:false,calendar:false});
  const blocked=applyAgentDecision(none,rounds[0],2,0);
  assert.equal(blocked.budget,200);assert.equal(blocked.venuePaid,false);assert.equal(none.log.length,0);
  const draft=initialAgent({draft:true,send:false,spend:false,share:false,calendar:false});
  const unsafe=applyAgentDecision(draft,rounds[2],0,2);assert(unsafe.log[0].result.includes('unavailable'));
  const review=applyAgentDecision(draft,rounds[3],0,3);assert.equal(review.budget,80);assert(review.log[0].result.includes('hold'));
  const enabled=initialAgent({draft:true,send:true,spend:true,share:true,calendar:true});
  const paid=applyAgentDecision(enabled,rounds[0],2,0);assert.equal(paid.budget,80);assert.equal(paid.venuePaid,true);
  const overspent=applyAgentDecision(paid,rounds[3],2,3);assert.equal(overspent.budget,-10);assert(overspent.log.at(-1).result.includes('exceeded'));
});
test('every complete agent path has bounded meters and a six-decision log',()=>{
  const rounds=games['agent-mission-control'].rounds;
  for(const enabled of [false,true])for(let path=0;path<3**6;path++){
    let state=initialAgent({draft:true,send:enabled,spend:enabled,share:enabled,calendar:enabled}),p=path;
    rounds.forEach((r,i)=>{state=applyAgentDecision(state,r,p%3,i);p=Math.floor(p/3);assert(state.trust>=0&&state.trust<=100);assert(state.progress>=0&&state.progress<=100);assert(Number.isFinite(state.budget));});
    assert.equal(state.log.length,6);
  }
});
test('conversation remembers commitments, distinguishes questions and respects capacity',()=>{
  const rounds=games['the-stakeholder-room'].rounds;
  const original=initialPeople(),helpful=applyPeopleDecision(original,rounds[0],0,0),pressure=applyPeopleDecision(original,rounds[0],1,0);
  assert(helpful.clarity>pressure.clarity);assert.equal(original.promises.length,0);assert.equal(helpful.promises[0].key,'prototype');
  let state=original;
  for(const r of rounds)state=applyPeopleDecision(state,r,1,2);
  assert.equal(state.promises.length,6);assert.equal(state.log.length,6);assert(state.capacity>=0&&state.capacity<=100);
  assert(makeNotes(games['the-stakeholder-room'],state.log,'Practice complete').includes('Question:'));
});
test('design and metric answer keys are complete and within range',()=>{
  for(const r of games['undo-the-nudge'].rounds){assert.equal(r.fields.length,2);for(const f of r.fields)assert(f.good>=0&&f.good<f.options.length);}
  for(const r of games['metric-makeover'].rounds){assert(r.good>=0&&r.good<r.metrics.length);assert(r.actionGood>=0&&r.actionGood<r.actions.length);assert(r.rows.every(row=>row.length===r.columns.length));}
});
