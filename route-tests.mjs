import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {gamePath,choiceRedirect} from './game-routes.js';

test('old game and practice-shop links replace history and preserve query strings and fragments',()=>{
 for(const shop of [false,true])for(const [search,hash] of [['',''],['?source=shared','#main'],['?note=%26%22%3Cscript%3E','#a%20b']]){
  const html=choiceRedirect(shop);let destination;
  vm.runInNewContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],{location:{search,hash,replace(value){destination=value;}}});
  const target='../choice-matters/'+(shop?'loopbox.html':'');
  assert.equal(destination,target+search+hash);
  assert(html.includes(`content="0; url=${target}"`));assert(html.includes(`href="${target}"`));
 }
});
test('canonical game and shop are generated separately from the legacy redirect pages',async()=>{
 assert.equal(gamePath('undo-the-nudge'),'choice-matters');assert.equal(gamePath('open-for-everyone'),'open-for-everyone');
 for(const shop of [false,true]){
  const page=shop?'loopbox.html':'index.html';
  const legacy=await readFile(new URL(`undo-the-nudge/${page}`,import.meta.url),'utf8');assert.equal(legacy,choiceRedirect(shop));
  const current=await readFile(new URL(`choice-matters/${page}`,import.meta.url),'utf8');
  assert(!current.includes('http-equiv="refresh"'));assert(current.includes('rel="canonical"'));
  assert(current.includes(shop?'id="loopbox-shop"':'id="start"'));
 }
 const index=await readFile(new URL('index.html',import.meta.url),'utf8');
 assert(index.includes('href="choice-matters/"'));assert(!index.includes('href="undo-the-nudge/"'));
 const access=await readFile(new URL('common-ground/access-game.js',import.meta.url),'utf8');assert(access.includes('href="../choice-matters/"'));
});
