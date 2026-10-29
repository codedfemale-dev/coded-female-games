'use strict';
const CODE_PROJECT=(()=>{
 const starter={html:'<h1>My code garden</h1>\n<p>A small experiment, made by me.</p>',css:':root {\n  --accent: #f3cd65;\n}',js:'const greeting = "Hello";\nconst increment = 1;'};
 const quote='(?:"(?:\\\\.|[^"\\\\])*"|\'(?:\\\\.|[^\'\\\\])*\')';
 function readString(value){
  let text='';for(let i=1;i<value.length-1;i++){let c=value[i];if(c==='\\'){c=value[++i];if(c==='u'){const hex=value.slice(i+1,i+5);if(!/^[0-9a-f]{4}$/i.test(hex))throw Error('escape');text+=String.fromCharCode(parseInt(hex,16));i+=4;continue;}const escapes={'\\':'\\','"':'"',"'":"'",n:'\n',r:'\r',t:'\t'};if(!(c in escapes))throw Error('escape');c=escapes[c];}text+=c;}return text;
 }
 function validate(draft){
  const errors=[];const fail=(file,message)=>errors.push({file,message});
  for(const key of ['html','css','js'])if(typeof draft?.[key]!=='string'||draft[key].length>4000)fail(key,'Keep this section under 4,000 characters. Reset this section if you need a fresh start.');
  if(errors.length)return {ok:false,errors};
  const h=draft.html.match(/^\s*<h1>([^<>]{1,160})<\/h1>\s*<p>([^<>]{1,500})<\/p>\s*$/i);
  if(!h||!h[1].trim()||!h[2].trim())fail('html','Keep one <h1>heading</h1> followed by one <p>paragraph</p>, with plain text inside. Both need some text. This small editor supports those two elements.');
  const c=draft.css.replace(/\/\*[\s\S]*?\*\//g,'').match(/^\s*:root\s*\{\s*--accent\s*:\s*(#[0-9a-f]{3}(?:[0-9a-f]{3})?)\s*;\s*\}\s*$/i);
  if(!c)fail('css','Keep :root { --accent: #f3cd65; }. Change the colour to a three- or six-digit hex code, such as #f1a4d5. Keep the #, semicolon and braces.');
  const values={};let jsError=false;
  for(const [i,line] of draft.js.split(/\r?\n/).entries()){
   if(!line.trim()||line.trim().startsWith('//'))continue;
   const m=line.match(new RegExp('^\\s*const\\s+(greeting|increment)\\s*=\\s*('+quote+'|[+-]?\\d+(?:\\.\\d+)?)\\s*;\\s*(?://.*)?$'));
   if(!m||Object.hasOwn(values,m?.[1])){if(/^\s*const\s+increment\s*=\s*;/.test(line)){fail('js','Line '+(i+1)+': increment needs a number after the = sign. Try const increment = 2;.');jsError=true;break;}fail('js','Line '+(i+1)+': use one const greeting = "Hello"; and one const increment = 1;. Keep the names, quotes around the greeting and semicolons. Extra code is outside this guided editor.');jsError=true;break;}
   try{values[m[1]]=/^["']/.test(m[2])?readString(m[2]):Number(m[2]);}catch{fail('js','Line '+(i+1)+': use simple quoted text for the greeting. For example, "Hello" or \'Welcome\'.');jsError=true;break;}
  }
  if(!jsError){
   if(typeof values.greeting!=='string'||!values.greeting.trim()||values.greeting.length>40||/[\u0000-\u001f\u007f\u2028\u2029]/.test(values.greeting))fail('js','Set greeting to 1–40 characters of quoted text on one line, for example const greeting = "Welcome";.');
   if(!Number.isInteger(values.increment)||values.increment<1||values.increment>10)fail('js','Set increment to a whole number from 1 to 10, for example const increment = 2;. This is the amount added on each click.');
  }
  return errors.length?{ok:false,errors}:{ok:true,errors:[],config:{accent:c[1],greeting:values.greeting,increment:values.increment},source:{...draft}};
 }
 const body=(html)=>`<main><p class="eyebrow">MY FIRST WEB PROJECT</p>${html}
<section class="card"><h2>Say hello</h2><label for="visitor">A name to try</label><div class="row"><input id="visitor" maxlength="40" placeholder="Try a fictional name" autocomplete="off"><button id="say-hello" type="button">Say hello</button></div><p id="hello-output" role="status">Try a name, then say hello.</p></section>
<section class="card"><h2>Grow the counter</h2><output id="project-count" aria-live="polite" aria-label="Click count">0</output><p id="increment-note"></p><div class="row"><button id="project-add" type="button">Add to the counter</button><button id="project-reset" class="secondary" type="button">Reset counter</button></div></section><p class="footnote">Made with HTML, CSS and JavaScript. Your name stays in this page.</p></main>`;
 const styles=(css)=>`/* Your editable colour section. */\n${css}\n
/* The rest of your page: layout, readable text and responsive controls. */
*{box-sizing:border-box}body{margin:0;background:#171422;color:#f7f0dd;font:16px/1.7 system-ui,sans-serif}main{max-width:680px;margin:auto;padding:24px}h1,h2{font-family:monospace;line-height:1.3}h1{font-size:30px;overflow-wrap:anywhere}h2{font-size:20px}.eyebrow{font:11px/1.7 monospace;letter-spacing:1px;color:#bc9aee}.card{margin:20px 0;padding:20px;border:1px solid #514462;background:#211c32}label{display:block;margin-bottom:8px}input,button{font:inherit;border-radius:3px;min-height:48px}input{padding:10px;background:#171422;color:#f7f0dd;border:1px solid #b5abc8;min-width:0;flex:1;width:100%}button{padding:10px 16px;background:var(--accent);color:var(--button-ink,#171422);border:1px solid var(--accent);cursor:pointer;font-weight:600}button.secondary{background:#171422;color:#f7f0dd;border-color:#b5abc8}.row{display:flex;gap:10px;flex-wrap:wrap}.row button{flex-shrink:0}input:focus-visible,button:focus-visible{outline:3px solid #f7f0dd;outline-offset:3px}output{font:700 44px/1.4 monospace;display:block;color:#f7f0dd}.footnote{font-size:12px;color:#b5abc8}#hello-output{overflow-wrap:anywhere}@media(max-width:420px){main{padding:16px}.card{padding:16px}.row{flex-direction:column}.row button{width:100%}h1{font-size:27px}}`;
 const runtime=(js)=>`// Your editable JavaScript section.\n${js}\n
// Read a name and update the page with text, rather than HTML.
const nameInput = document.querySelector('#visitor');
function sayHello() {
  const name = nameInput.value.trim() || 'future developer';
  document.querySelector('#hello-output').textContent = greeting + ', ' + name + '!';
}
document.querySelector('#say-hello').addEventListener('click', sayHello);
nameInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') sayHello(); });
// A variable stores the count. Each click adds your chosen increment.
let count = 0;
const countOutput = document.querySelector('#project-count');
document.querySelector('#project-add').addEventListener('click', () => {
  count += increment;
  countOutput.textContent = count;
});
document.querySelector('#project-reset').addEventListener('click', () => {
  count = 0;
  countOutput.textContent = count;
});
document.querySelector('#increment-note').textContent = 'Each click adds ' + increment + '.';
// Pick readable button text for the accent colour, including after local CSS edits.
const channels = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim().replace('#', '');
const hex = channels.length === 3 ? channels.split('').map(c => c + c).join('') : channels;
const rgb = [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
const linear = rgb.map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const light = linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
document.documentElement.style.setProperty('--button-ink', light > 0.179 ? '#000000' : '#ffffff');`;
 function projectFiles(draft){
  const result=validate(draft);if(!result.ok)return null;
  return {
   'index.html':`<!doctype html>\n<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>My first code project</title><link rel="stylesheet" href="style.css"><script src="script.js" defer></script></head><body>${body(draft.html)}</body></html>`,
   'style.css':styles(draft.css),'script.js':runtime(draft.js),
   'README.txt':`MY FIRST CODE PROJECT\n\n1. Extract (unzip) the whole downloaded folder.\n2. Keep index.html, style.css and script.js together.\n3. Double-click index.html to open it in a browser. No server or installation is needed.\n4. Try a name, add to the counter and reset it. Each click adds ${result.config.increment}.\n\nWHAT YOU EDITED\nindex.html: the heading and introductory paragraph.\nstyle.css: the --accent colour.\nscript.js: the greeting and increment constants.\nThe rest of each file was supplied by First Code Playground.\n\nNEXT SMALL PROJECT\nChange the increment, save script.js and refresh index.html. Then try adding a second paragraph to the HTML. The downloaded files are complete and can be edited beyond the guided browser sections. Check both appearance and behaviour after each change.\n\nYour project works offline. No personal information is sent anywhere.\nCreated with Coded Female First Code Playground.\n`
  };
 }
 function previewDocument(draft){
  const files=projectFiles(draft);if(!files)return null;
  const policy="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-code-garden'; connect-src 'none'; base-uri 'none'; form-action 'none'";
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="${policy}"><title>Your code garden preview</title><style>${files['style.css'].replace(/<\/style/gi,'<\\/style')}</style></head><body>${body(draft.html)}<script nonce="code-garden">${files['script.js'].replace(/<\/script/gi,'<\\/script')}</script></body></html>`;
 }
 const encoder=new TextEncoder();
 function crc32(bytes){let crc=0xffffffff;for(const b of bytes){crc^=b;for(let k=0;k<8;k++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}return (crc^0xffffffff)>>>0;}
 // Store-only ZIP: no library, network request or binary runtime dependency.
 function zip(files){
  const chunks=[],central=[];let offset=0;
  function record(length,signature){const a=new Uint8Array(length);new DataView(a.buffer).setUint32(0,signature,true);return a;}
  for(const [name,text] of Object.entries(files)){
   const path=encoder.encode(name),data=encoder.encode(text),crc=crc32(data),local=record(30+path.length,0x04034b50),v=new DataView(local.buffer);
   v.setUint16(4,20,true);v.setUint16(6,0x800,true);v.setUint16(12,0x21,true);v.setUint32(14,crc,true);v.setUint32(18,data.length,true);v.setUint32(22,data.length,true);v.setUint16(26,path.length,true);local.set(path,30);chunks.push(local,data);
   const entry=record(46+path.length,0x02014b50),c=new DataView(entry.buffer);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x800,true);c.setUint16(14,0x21,true);c.setUint32(16,crc,true);c.setUint32(20,data.length,true);c.setUint32(24,data.length,true);c.setUint16(28,path.length,true);c.setUint32(42,offset,true);entry.set(path,46);central.push(entry);offset+=local.length+data.length;
  }
  const size=central.reduce((n,c)=>n+c.length,0),end=record(22,0x06054b50),e=new DataView(end.buffer);e.setUint16(8,central.length,true);e.setUint16(10,central.length,true);e.setUint32(12,size,true);e.setUint32(16,offset,true);chunks.push(...central,end);
  const all=new Uint8Array(offset+size+22);let at=0;for(const chunk of chunks){all.set(chunk,at);at+=chunk.length;}return all;
 }
 return {starter,validate,projectFiles,previewDocument,zip};
})();
if(typeof module!=='undefined')module.exports=CODE_PROJECT;
