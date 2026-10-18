import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,access} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {games} from './data.js';
import {legacyGames} from './legacy-games.js';
const root=fileURLToPath(new URL('.',import.meta.url));
test('all catalogue games are local catalogue entries with return links',async()=>{
 const html=await readFile(path.join(root,'index.html'),'utf8');
 assert.equal((html.match(/<article class="card"(?:\s[^>]*)?>/g)||[]).length,Object.keys(games).length+Object.keys(legacyGames).length);
 for(const slug of [...Object.keys(games),...Object.keys(legacyGames)]){
  assert(html.includes(`href="${slug}/"`));
  const page=await readFile(path.join(root,slug,'index.html'),'utf8');
  assert(page.includes('href="../"'),slug+' collection link');
  assert(!page.match(/https:\/\/codedfemale-dev.github.io\/(?!coded-female-games\/)/),slug+' standalone cross-link');
 }
 const sources=JSON.parse(await readFile(path.join(root,'MIGRATION.json'),'utf8'));
 assert.equal(sources.games.length,7);
 for(const source of sources.games)assert.match(source.sourceCommit,/^[a-f0-9]{40}$/);
});
test('moved pages, scripts and styles retain resolvable local asset paths',async()=>{
 async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){
  const full=path.join(dir,entry.name);
  if(entry.isDirectory()){await walk(full);continue;}
  if(!/\.(html|css|js)$/.test(entry.name))continue;
  const text=await readFile(full,'utf8');
  const refs=entry.name.endsWith('.html')?[...text.matchAll(/(?:src|href)="([^"]+)"/g)].map(x=>x[1]):entry.name.endsWith('.css')?[...text.matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g)].map(x=>x[1]):[...text.matchAll(/(?:from\s+|import\s*)['"](\.\.?\/[^'"]+)['"]/g)].map(x=>x[1]);
  for(const ref of refs){if(/^(https?:|data:|blob:|#|mailto:)/.test(ref))continue;const target=path.resolve(dir,ref.split(/[?#]/)[0]);assert((target===path.resolve(root)||target.startsWith(root)),full+' escapes collection');await access(target).catch(()=>assert.fail(full+': missing '+ref));}
 }}
 await walk(root);
});
