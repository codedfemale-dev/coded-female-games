// Refresh only the marked presentation regions; standalone game mechanics stay local.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {worlds,scenePanel,sceneSvg,pixelIcon} from './arcade-worlds.js';
export const standaloneSlugs=['spot-the-scam','ai-escape-room','prompt-practice','hallucination-detective','sprint-survival','bug-bash','first-code-playground'];
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const example=`<details class="world-example"><summary>See a before-and-after prompt</summary><div class="intro-art"><p class="eyebrow">THE SMALL CHANGE THAT HELPS</p><div class="before"><span class="card-label">A STARTING POINT</span><p>“Explain JavaScript.”</p></div><div class="connector" aria-hidden="true">↓ <span>Add a little direction</span></div><div class="after"><span class="card-label">A MORE USEFUL BRIEF</span><p>“Explain JavaScript to someone who knows basic HTML. Use a button-click example and finish with one small exercise.”</p><div class="chips"><span>Context</span><span>Example</span><span>Next step</span></div></div><p class="art-note">More direction. Less guesswork.</p></div></details>`;
function intro(slug){const w=worlds[slug];return `<aside class="world-intro" aria-label="${esc(w.mission)}">${scenePanel(slug)}<div class="world-brief"><p class="eyebrow">YOUR MISSION / ${esc(w.mission)}</p><p>${esc(w.brief)}</p><p class="world-skills">${esc(w.focus)}</p><p class="world-quip">“${esc(w.quip)}”</p>${slug==='prompt-practice'?example:''}</div></aside>`;}
function hud(slug){const w=worlds[slug];return `<aside class="world-hud" aria-label="World mission"><div class="world-mini" aria-hidden="true">${sceneSvg(w.art)}</div><div><span>${esc(w.sector)}</span><strong>${esc(w.mission)}</strong></div><p>${esc(w.loop)}</p></aside>`;}
export async function refreshStandalone(){
 for(const slug of standaloneSlugs){const file=new URL(`${slug}/index.html`,import.meta.url);let html=await readFile(file,'utf8');const regions={intro:intro(slug),hud:hud(slug),finish:`<div class="world-finish-art" aria-hidden="true">${sceneSvg(worlds[slug].art)}</div>`};
  for(const [name,content] of Object.entries(regions)){const start=`<!-- arcade-world:${name} -->`,end=`<!-- /arcade-world:${name} -->`;const a=html.indexOf(start),b=html.indexOf(end);if(a<0){if(name==='finish'&&['bug-bash','sprint-survival','first-code-playground'].includes(slug))continue;throw Error(`Missing ${slug} ${name} world marker`);}if(b<a)throw Error('Incomplete world region');html=html.slice(0,a)+start+content+end+html.slice(b+end.length);}
  await writeFile(file,html);
 }
 await mkdir(new URL('arcade-assets/',import.meta.url),{recursive:true});for(const kind of ['bug','coffee','duck'])await writeFile(new URL(`arcade-assets/${kind}.svg`,import.meta.url),pixelIcon(kind));
}
