import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {games} from './data.js';
import {legacyGames} from './legacy-games.js';
import {withArcadeReturn,navigationVersion} from './arcade-navigation.mjs';

test('every catalogue game has a static return link outside the changing game content',async()=>{
  const slugs=[...Object.keys(games),...Object.keys(legacyGames)];
  assert.equal(new Set(slugs).size,16);
  for(const slug of slugs){
    const html=await readFile(new URL(`${slug}/index.html`,import.meta.url),'utf8');
    assert.equal((html.match(/data-arcade-return\b/g)||[]).length,1,slug);
    assert.match(html,/<a data-arcade-return href="\.\.\/">← Return to arcade<\/a>/,slug);
    assert.ok(html.indexOf('class="arcade-return-bar"')<html.indexOf('<main'),slug);
    assert.ok(html.includes(`../arcade-navigation.css?v=${navigationVersion}`),slug);
    assert.ok(html.includes(`../arcade-navigation.js?v=${navigationVersion}`),slug);
  }
});

test('regenerating the game shell preserves its skip link and adds return navigation only once',()=>{
  const page='<!doctype html><html><head></head><body data-arcade-design="studio"><a class="skip" href="#main">Skip</a><main id="main"><div id="app">Game</div></main></body></html>';
  const once=withArcadeReturn(page);
  assert.equal(withArcadeReturn(once),once);
  assert.ok(once.indexOf('class="skip"')<once.indexOf('data-arcade-return'));
  assert.ok(once.includes('<div id="app">Game</div>'));
});

test('keyboard navigation on Return to arcade cannot trigger game shortcuts or block normal navigation',async()=>{
  let listener,stopped=0,prevented=0;
  const source=await readFile(new URL('arcade-navigation.js',import.meta.url),'utf8');
  vm.runInNewContext(source,{document:{querySelector(){return {addEventListener(type,fn){assert.equal(type,'keydown');listener=fn;}};}}});
  for(const key of ['Enter','Tab','ArrowLeft',' '])listener({key,stopPropagation(){stopped++;},preventDefault(){prevented++;}});
  assert.equal(stopped,4);assert.equal(prevented,0);
});

test('Release Manager caches the navigation assets with its updated offline shell',async()=>{
  const sw=await readFile(new URL('release-manager/sw.js',import.meta.url),'utf8');
  assert.ok(sw.includes(`../arcade-navigation.css?v=${navigationVersion}`));
  assert.ok(sw.includes(`../arcade-navigation.js?v=${navigationVersion}`));
});
