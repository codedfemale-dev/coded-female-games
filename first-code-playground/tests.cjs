const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const P=require('./project.js');
const custom=()=>({html:'<h1>My first creation</h1>\n<p>A project I can change.</p>',css:':root { --accent: #f1a4d5; }',js:'const greeting = "Welcome";\nconst increment = 2;'});
function runtime(draft){const f=P.projectFiles(draft);assert.ok(f);const elements={};function el(id){return elements[id]??={textContent:'',value:'',events:{},addEventListener(type,fn){this.events[type]=fn;}};}const style={};vm.runInNewContext(f['script.js'],{document:{querySelector:el,documentElement:{style:{setProperty(k,v){style[k]=v;}}}},getComputedStyle(){return {getPropertyValue(){return P.validate(draft).config.accent;}}}});return {el,style,click:id=>el(id).events.click()};}
test('starter and edited sections produce complete projects and a matching bounded configuration',()=>{
 const before=JSON.stringify(P.starter);for(const draft of [P.starter,custom()]){const r=P.validate(draft);assert.equal(r.ok,true);assert.deepEqual(Object.keys(P.projectFiles(draft)),['index.html','style.css','script.js','README.txt']);assert.ok(P.projectFiles(draft)['index.html'].includes(draft.html));assert.ok(P.projectFiles(draft)['style.css'].includes(draft.css));assert.ok(P.projectFiles(draft)['script.js'].includes(draft.js));}assert.equal(JSON.stringify(P.starter),before);
});
test('downloaded JavaScript uses the actual greeting, increment, name and counter reset',()=>{
 const app=runtime(custom());app.el('#visitor').value='Ada';app.click('#say-hello');assert.equal(app.el('#hello-output').textContent,'Welcome, Ada!');app.click('#project-add');assert.equal(app.el('#project-count').textContent,2);app.click('#project-add');assert.equal(app.el('#project-count').textContent,4);app.click('#project-reset');assert.equal(app.el('#project-count').textContent,0);app.el('#visitor').value='';app.el('#visitor').events.keydown({key:'Enter'});assert.equal(app.el('#hello-output').textContent,'Welcome, future developer!');assert.equal(app.el('#increment-note').textContent,'Each click adds 2.');
});
test('all allowed increments run correctly and never confuse zero with an unset count',()=>{
 for(let n=1;n<=10;n++){const d={...P.starter,js:'const greeting = "Hello";\nconst increment = '+n+';'};const app=runtime(d);for(let k=1;k<=3;k++){app.click('#project-add');assert.equal(app.el('#project-count').textContent,n*k);}app.click('#project-reset');assert.equal(app.el('#project-count').textContent,0);}
});
test('single quotes, escaped quotes, declaration order and line comments remain valid JavaScript',()=>{
 const d={...P.starter,js:'// A comment\nconst increment = 3; // Three each time\nconst greeting = \'You\\\'re welcome\';'};assert.equal(P.validate(d).ok,true);const app=runtime(d);app.click('#say-hello');assert.equal(app.el('#hello-output').textContent,"You're welcome, future developer!");assert.equal(P.validate({...d,js:'const greeting = "Hello // friend";\nconst increment = 2;'}).ok,true);
});
test('invalid or missing edits give file-specific errors and cannot produce an export or executable preview',()=>{
 const cases=[['html',''],['html','<h1></h1><p>text</p>'],['html','<h1>Hello</h1>'],['html','<h1 onclick="alert(1)">Hi</h1><p>text</p>'],['html','<script>alert(1)</script>'],['css',':root { --accent: red; }'],['css',':root { --accent: #12345; }'],['css',':root { --accent: #fff; } body { background:url(https://example.com); }'],['js','const greeting = "Hello";'],['js','const increment = 2;'],['js','const greeting = "Hello";\nconst increment = 0;'],['js','const greeting = "Hello";\nconst increment = 1.5;'],['js','const greeting = "Hello";\nconst increment = 11;'],['js','const greeting = "Hello";\nconst increment = 2;\nfetch("https://example.com");'],['js','const greeting = "Hello";\nconst greeting = "Hi";\nconst increment = 2;']];
 for(const [file,value] of cases){const draft={...P.starter,[file]:value},r=P.validate(draft);assert.equal(r.ok,false,value);assert.ok(r.errors.some(e=>e.file===file&&e.message.length>20));assert.equal(P.projectFiles(draft),null);assert.equal(P.previewDocument(draft),null);}
 assert.equal(P.validate({}).ok,false);assert.equal(P.validate({...P.starter,js:'x'.repeat(4001)}).ok,false);
});
test('multiple file errors are retained together and valid drafts are not mutated by checking',()=>{
 const d={html:'',css:'',js:''},copy=JSON.stringify(d);assert.deepEqual([...new Set(P.validate(d).errors.map(e=>e.file))],['html','css','js']);assert.equal(JSON.stringify(d),copy);
});
test('preview and download share the same HTML, CSS and runtime, without external dependencies',()=>{
 const d=custom(),files=P.projectFiles(d),preview=P.previewDocument(d);assert.ok(preview.includes(d.html));assert.ok(preview.includes(files['style.css']));assert.ok(preview.includes(files['script.js']));assert.match(preview,/default-src 'none'/);assert.match(preview,/script-src 'nonce-code-garden'/);assert.match(files['index.html'],/href="style.css"/);assert.match(files['index.html'],/src="script.js"/);assert.doesNotMatch(files['index.html'],/https?:/);assert.match(files['README.txt'],/Extract/);assert.match(files['README.txt'],/Each click adds 2/);
});
test('source strings and CSS comments cannot break out of their inline preview containers',()=>{
 const d={...P.starter,css:':root { --accent: #fff; } /* </style><script nonce="code-garden">bad()</script> */',js:'const greeting = "</script><script>bad()</script>";\nconst increment = 2;'};assert.equal(P.validate(d).ok,true);const preview=P.previewDocument(d);assert.equal((preview.match(/<script nonce=/g)||[]).length,2); // One is inert text inside the escaped CSS comment, one is the actual runtime.
 assert.equal((preview.match(/<\/style>/g)||[]).length,1);const runtimeText=preview.slice(preview.lastIndexOf('<script nonce=')+ '<script nonce="code-garden">'.length,preview.lastIndexOf('</script>'));assert.doesNotMatch(runtimeText,/<\/script>/i);const app=runtime(d);app.click('#say-hello');assert.match(app.el('#hello-output').textContent,/<script>bad/);
});
test('button text uses a high-contrast colour for both light and dark chosen accents',()=>{
 assert.equal(runtime({...P.starter,css:':root { --accent: #fff; }'}).style['--button-ink'],'#000000');assert.equal(runtime({...P.starter,css:':root { --accent: #000; }'}).style['--button-ink'],'#ffffff');
});
test('ZIP entries retain exact UTF-8 file contents and central directory offsets',()=>{
 const files=P.projectFiles(custom()),bytes=P.zip(files),view=new DataView(bytes.buffer);let at=0,names=[];
 while(view.getUint32(at,true)===0x04034b50){const size=view.getUint32(at+18,true),nameLength=view.getUint16(at+26,true),name=new TextDecoder().decode(bytes.slice(at+30,at+30+nameLength)),text=new TextDecoder().decode(bytes.slice(at+30+nameLength,at+30+nameLength+size));assert.equal(text,files[name]);assert.equal(view.getUint16(at+8,true),0);names.push(name);at+=30+nameLength+size;}
 assert.deepEqual(names,Object.keys(files));assert.equal(view.getUint32(at,true),0x02014b50);assert.equal(view.getUint32(bytes.length-22,true),0x06054b50);assert.equal(view.getUint32(bytes.length-6,true),at);

});
test('editor wiring uses semantic tabs, labelled fields, isolated preview and complete local assets',()=>{
 const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');const ids=[...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);for(const file of ['html','css','js'])for(const prefix of ['edit-','tab-','panel-'])assert.ok(ids.includes(prefix+file));assert.match(html,/sandbox="allow-scripts"/);assert.match(html,/aria-label="Choose a code section"/);assert.match(html,/title="My first code project live preview"/);for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g))if(!m[1].startsWith('http'))assert.ok(fs.existsSync(path.join(__dirname,m[1].split(/[?#]/)[0])),m[1]);
});
