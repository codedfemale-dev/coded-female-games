'use strict';
(()=>{
 const P=CODE_PROJECT,files=['html','css','js'],names={html:'HTML',css:'CSS',js:'JavaScript'};
 const $=id=>document.getElementById(id);
 let active='html',timer=null,undo=null,lastWorking=null;
 const draft=()=>Object.fromEntries(files.map(f=>[f,$('edit-'+f).value]));
 function tab(file,focus=false){active=file;for(const f of files){$('panel-'+f).hidden=f!==file;$('tab-'+f).setAttribute('aria-selected',String(f===file));$('tab-'+f).tabIndex=f===file?0:-1;}$('reset-section').textContent='Reset '+names[file]+' section';if(focus)$('tab-'+file).focus();}
 function showFeedback(result){
  const box=$('editor-feedback');box.replaceChildren();box.className='editor-feedback '+(result.ok?'valid':'invalid');
  files.forEach(f=>$('edit-'+f).setAttribute('aria-invalid',String(!result.ok&&result.errors.some(e=>e.file===f))));
  if(result.ok){box.textContent='Preview updated. Try your changes in the live preview.';return;}
  const title=document.createElement('p');title.textContent='Your edits are kept. The preview still shows the last working code.';box.append(title);
  for(const error of result.errors){const item=document.createElement('p');const button=document.createElement('button');button.type='button';button.className='error-link';button.textContent=names[error.file]+' section';button.addEventListener('click',()=>{tab(error.file);$('edit-'+error.file).focus();});item.append(button,document.createTextNode(': '+error.message));box.append(item);}
 }
 function apply(force=false){
  clearTimeout(timer);const input=draft(),result=P.validate(input);showFeedback(result);$('download-project').disabled=!result.ok;
  $('preview-state').textContent=result.ok?'Latest valid code':'Last working code';
  if(!result.ok){$('project-summary').textContent='Fix the highlighted section before downloading, so the project matches your latest edits.';$('change-summary').textContent='Download paused until every section is valid.';return false;}
  const source=JSON.stringify(input);if(force||source!==lastWorking){$('project-preview').srcdoc=P.previewDocument(input);lastWorking=source;}
  $('project-summary').textContent='Your project uses the greeting “'+result.config.greeting+'”, accent '+result.config.accent+' and adds '+result.config.increment+' per click.';
  const changed=files.filter(f=>input[f]!==P.starter[f]);$('change-summary').textContent=changed.length?'Sections you changed: '+changed.map(f=>names[f]).join(', ')+'.':'Starter project ready. Change one section to make it your own.';
  return true;
 }
 function reset(selected){undo=draft();for(const f of selected)$('edit-'+f).value=P.starter[f];$('undo-reset').hidden=false;apply(true);$('project-status').textContent=(selected.length===3?'Project':names[selected[0]]+' section')+' reset to the starter. Undo reset restores your previous edits.';}
 files.forEach(f=>{$('edit-'+f).value=P.starter[f];$('edit-'+f).addEventListener('input',()=>{clearTimeout(timer);$('preview-state').textContent='Checking edits…';$('project-status').textContent='';$('download-project').disabled=true;timer=setTimeout(()=>apply(),400);});$('tab-'+f).addEventListener('click',()=>tab(f));$('tab-'+f).addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=files[(files.indexOf(f)+1)%3];if(e.key==='ArrowLeft')next=files[(files.indexOf(f)+2)%3];if(e.key==='Home')next=files[0];if(e.key==='End')next=files[2];if(next){e.preventDefault();tab(next,true);}});});
 $('run-preview').addEventListener('click',()=>{if(!apply(true))$('editor-feedback').focus();});
 $('reset-section').addEventListener('click',()=>reset([active]));$('reset-project').addEventListener('click',()=>reset(files));
 $('undo-reset').addEventListener('click',()=>{if(!undo)return;for(const f of files)$('edit-'+f).value=undo[f];undo=null;$('undo-reset').hidden=true;apply(true);$('project-status').textContent='Your previous edits are restored.';});
 $('download-project').addEventListener('click',()=>{
  if(!apply())return;const zip=P.zip(P.projectFiles(draft())),url=URL.createObjectURL(new Blob([zip],{type:'application/zip'}));const a=document.createElement('a');a.href=url;a.download='first-code-project.zip';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);$('project-status').textContent='Project ZIP ready to save. Extract it, then open index.html. Your latest valid edits are included.';
 });
 apply(true);
})();
