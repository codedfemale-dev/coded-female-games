import test from 'node:test';
import assert from 'node:assert/strict';
import {access} from 'node:fs/promises';
import {games} from './data.js';
import {learning,practiceNotes} from './learning.js';

test('every shared game has a follow-up with feedback, worked reasoning and a reachable next game',async()=>{
  assert.deepEqual(Object.keys(learning).sort(),Object.keys(games).sort());
  for(const exercise of Object.values(learning)){
    assert.equal(exercise.options.length,3);
    assert(Number.isInteger(exercise.good)&&exercise.good>=0&&exercise.good<3);
    for(const [choice,feedback] of exercise.options){assert(choice.length>20);assert(feedback.length>50);}
    assert(exercise.scenario&&exercise.worked&&exercise.reflect&&exercise.nextWhy);
    assert(exercise.sources.every(([title,url])=>title&&url.startsWith('https://')));
    await access(new URL(`${exercise.next}/index.html`,import.meta.url));
  }
});
test('field notes preserve every compared response and literal reflection text, including unanswered practice',()=>{
  for(const exercise of Object.values(learning)){
    assert(practiceNotes(exercise).includes('Not attempted.'));
    assert(practiceNotes(exercise).includes('Not added.'));
    const reflection='<script>example</script> & a next step';
    const notes=practiceNotes(exercise,[2,0,1],reflection);
    for(const [choice,feedback] of exercise.options){assert(notes.includes(choice));assert(notes.includes(feedback));}
    assert(notes.includes('Try 3:'));assert(notes.includes(reflection));
    assert(notes.includes(exercise.worked));assert(notes.includes('optional, unscored'));
  }
});
test('worked JavaScript boundary examples execute as described without changing the input',()=>{
  const available=places=>places.filter(n=>n>=3);
  for(const [input,expected] of [[[0,3,5],[3,5]],[[],[]],[[2],[]],[[3],[3]],[[4],[4]]]){
    const original=[...input];assert.deepEqual(available(input),expected);assert.deepEqual(input,original);
  }
});
test('worked completion-rate example distinguishes volume, percentage points and relative change',()=>{
  const before=80/100*100,after=120/200*100;
  assert.equal(before,80);assert.equal(after,60);assert.equal(after-before,-20);
  assert.equal((after-before)/before*100,-25);assert.equal((120-80)/80*100,50);
});
