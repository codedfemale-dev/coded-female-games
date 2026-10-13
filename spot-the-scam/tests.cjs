const test = require('node:test');
const assert = require('node:assert/strict');
const {SCAM_QUESTIONS, shuffle, buildRound} = require('./questions.js');

test('Every published scenario has a unique identity, valid answer and useful learning content', () => {
  assert.equal(SCAM_QUESTIONS.length, 20);
  assert.equal(new Set(SCAM_QUESTIONS.map(q => q.id)).size, 20);
  for (const q of SCAM_QUESTIONS) {
    assert.equal(q.options.length, 3);
    assert.equal(new Set(q.options.map(o => o.id)).size, 3);
    assert.equal(q.options.filter(o => o.id === q.correct).length, 1);
    assert.ok(['suspicious', 'supported', 'verify'].includes(q.judgement));
    for (const field of ['topic', 'context', 'question', 'hint', 'explanation', 'takeaway']) {
      assert.ok(q[field].length > 15, `${q.id}: ${field}`);
    }
  }
});

test('Rounds preserve eight distinct questions and a balanced mix after shuffling', () => {
  const before = JSON.stringify(SCAM_QUESTIONS);
  for (const value of [0, 0.25, 0.75, 0.999]) {
    const round = buildRound(SCAM_QUESTIONS, () => value);
    assert.equal(round.length, 8);
    assert.equal(new Set(round.map(q => q.id)).size, 8);
    for (const [group, expected] of Object.entries({suspicious:4, supported:2, verify:2})) {
      assert.equal(round.filter(q => q.judgement === group).length, expected);
    }
    for (const q of round) assert.equal(q.options.filter(o => o.id === q.correct).length, 1);
  }
  assert.equal(JSON.stringify(SCAM_QUESTIONS), before);
  assert.throws(() => buildRound([]), /Not enough scenarios/);
});

test('Every question can appear, and replay selection can change without changing source answers', () => {
  let seed = 42;
  const random = () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 4294967296);
  const seen = new Set();
  const selections = new Set();
  for (let i = 0; i < 100; i++) {
    const round = buildRound(SCAM_QUESTIONS, random);
    selections.add(round.map(q => q.id).sort().join(','));
    for (const q of round) {
      seen.add(q.id);
      const source = SCAM_QUESTIONS.find(s => s.id === q.id);
      assert.deepEqual(q.options.map(o => o.id).sort(), source.options.map(o => o.id).sort());
      assert.equal(q.correct, source.correct);
    }
  }
  assert.equal(seen.size, 20);
  assert.ok(selections.size > 1);
});

test('Shuffling preserves all content without mutating its source', () => {
  const before = JSON.stringify(SCAM_QUESTIONS);
  for (const value of [0, 0.25, 0.75, 0.999]) {
    assert.deepEqual(shuffle(SCAM_QUESTIONS, () => value).map(q => q.id).sort(), SCAM_QUESTIONS.map(q => q.id).sort());
  }
  assert.equal(JSON.stringify(SCAM_QUESTIONS), before);
});
