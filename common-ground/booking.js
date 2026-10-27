import {workshops,findWorkshop,freshBooking,chooseWorkshop,reviewDetails,confirmBooking,editBooking,discardChanges,bookingNotes} from './model.js';

const esc=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

export function mountBooking(host,{standalone=false}={}) {
  let state=freshBooking();
  const top=standalone?'h1':'h2',sub=standalone?'h2':'h3';
  host.classList.add('cg-booking');
  const find=selector=>host.querySelector(selector);
  function focus(selector) {
    const target=find(selector);
    target?.focus({preventScroll:true});
    target?.scrollIntoView({block:'start',behavior:'instant'});
  }
  function captureDetails() {
    if(find('#cg-name'))state={...state,details:{name:find('#cg-name').value,email:find('#cg-email').value}};
  }
  function summary(workshop,person=false) {
    return `<dl class="cg-summary"><div><dt>Workshop</dt><dd>${esc(workshop.title)}</dd></div><div><dt>When</dt><dd>${esc(workshop.date)}<br>${esc(workshop.time)}</dd></div><div><dt>Where</dt><dd>${esc(workshop.room)}<br>Common Ground <span class="cg-muted">(fictional venue)</span></dd></div>${person?`<div><dt>Your name</dt><dd>${esc(state.details.name)}</dd></div><div><dt>Email address</dt><dd>${esc(state.details.email)}</dd></div>`:''}<div><dt>Cost</dt><dd>Free. No payment details needed.</dd></div></dl>`;
  }
  function errorSummary() {
    const entries=Object.entries(state.errors);
    if(!entries.length)return '';
    return `<div class="cg-errors" id="cg-error-summary" tabindex="-1" aria-labelledby="cg-error-title"><${sub} id="cg-error-title">Check ${entries.length===1?'one thing':'these details'} before continuing</${sub}><ul>${entries.map(([key,message])=>`<li><a href="#cg-${key==='workshop'?'workshops':key}">${esc(message)}</a></li>`).join('')}</ul><p>Your entries are still here. Change only what needs fixing.</p></div>`;
  }
  function field(key,label,hint,type,limit) {
    const error=state.errors[key];
    return `<div class="cg-field${error?' cg-field-error':''}"><label for="cg-${key}">${label} <span class="cg-required">(required)</span></label><p id="cg-${key}-hint" class="cg-hint">${hint}</p>${error?`<p id="cg-${key}-error" class="cg-field-message">${esc(error)}</p>`:''}<input id="cg-${key}" name="${key}" type="${type}" autocomplete="${key==='name'?'name':'email'}" maxlength="${limit}" value="${esc(state.details[key])}" required aria-describedby="cg-${key}-hint${error?` cg-${key}-error`:''}" ${error?'aria-invalid="true"':''}${key==='email'?' inputmode="email" autocapitalize="none" spellcheck="false"':''}></div>`;
  }
  function chooseScreen() {
    return `${errorSummary()}<form id="cg-choose-form" novalidate><fieldset id="cg-workshops" tabindex="-1" ${state.errors.workshop?'aria-describedby="cg-workshop-error"':''}><legend class="sr-only">Choose an available workshop</legend>${state.errors.workshop?`<p class="cg-field-message" id="cg-workshop-error">${esc(state.errors.workshop)}</p>`:''}<div class="cg-workshop-list">${workshops.map(w=>`<label class="cg-workshop${w.available?'':' cg-full'}"><div class="cg-workshop-top"><input type="radio" name="workshop" value="${w.id}" ${state.selected===w.id?'checked':''} ${w.available?'required':'disabled'} aria-describedby="cg-meta-${w.id}"><span class="cg-workshop-title">${esc(w.title)}</span><span class="cg-badge">${w.available?'Free':'Full'}</span></div><p class="cg-workshop-level">${esc(w.level)}</p><p>${esc(w.description)}</p><p id="cg-meta-${w.id}" class="cg-workshop-meta">${esc(w.date)}<br>${esc(w.time)} · ${esc(w.room)}${w.available?'':'<br><strong>No places available. Choose one of the other workshops.</strong>'}</p></label>`).join('')}</div></fieldset><div class="cg-actions"><button type="submit" class="primary">Continue to your details <span aria-hidden="true">→</span></button></div></form>`;
  }
  function detailsScreen(workshop) {
    return `${errorSummary()}<div class="cg-layout"><form id="cg-details-form" novalidate><p class="cg-intro">Just a name and email address. Try <strong>Jo</strong> and <strong>jo@example.com</strong> for this practice booking.</p>${field('name','Your name','The name you would use at the workshop.','text',100)}${field('email','Email address','A real service would use this for your confirmation. This example sends nothing.','email',254)}<div class="cg-actions"><button type="submit" class="primary">Review my booking <span aria-hidden="true">→</span></button><button type="button" class="cg-text" data-cg="choose">Back to workshops</button></div></form><aside class="cg-aside" aria-label="Selected workshop"><p class="eyebrow">Your workshop</p>${summary(workshop)}<details class="cg-access"><summary>Access and what to bring</summary><p>${esc(workshop.access)}</p><p>Bring: ${esc(workshop.bring)}.</p></details></aside></div>`;
  }
  function reviewScreen(workshop) {
    return `<p class="cg-intro">Check the workshop and your details. You can change either before you confirm.</p><div class="cg-review">${summary(workshop,true)}<p class="cg-review-note">This is a practice booking. Confirming will show the next screen on this device. No email is sent and no real place is reserved.</p><div class="cg-actions"><button type="button" class="cg-text" data-cg="details">Change my details</button><button type="button" class="cg-text" data-cg="choose">Change workshop</button></div></div><form id="cg-confirm-form"><div class="cg-actions"><button type="submit" class="primary">${state.booking?'Confirm my changes':'Confirm my free place'} <span aria-hidden="true">→</span></button></div></form>`;
  }
  function confirmedScreen(workshop) {
    return `<div class="cg-confirm-banner"><span class="cg-check" aria-hidden="true">✓</span><div><p class="eyebrow">Practice booking ${state.updated?'updated':'confirmed'}</p><p class="cg-reference">Your reference <strong>${esc(state.booking.reference)}</strong></p></div></div><p class="cg-intro">You have completed the booking journey, ${esc(state.booking.name)}. No real place has been reserved and no email has been sent.</p><div class="cg-layout"><div>${summary(workshop,true)}<div class="cg-actions"><button type="button" class="primary" data-cg="download">Save my booking summary <span aria-hidden="true">↓</span></button><button type="button" class="secondary" data-cg="details">Change my booking</button></div><p class="cg-hint">Your summary downloads as a text file. This practice booking clears when you reload or close this page.</p><p id="cg-download-status" class="cg-hint" role="status"></p></div><aside class="cg-aside"><p class="eyebrow">Before your workshop</p><${sub}>You know what happens next.</${sub}><ul class="cg-next"><li><strong>Bring</strong> ${esc(workshop.bring.toLowerCase())}.</li><li><strong>Find</strong> ${esc(workshop.room.toLowerCase())} at the fictional Common Ground centre.</li><li><strong>Access</strong> ${esc(workshop.access)}</li></ul><p class="cg-hint">In a live service, these details would also be sent by email.</p></aside></div><details class="cg-learning"><summary>See the five repairs in action</summary><ul><li>Labels stay visible and are connected to their fields.</li><li>Text and controls use readable colour combinations.</li><li>Button names explain the next action.</li><li>Keyboard focus follows the journey and moves to useful feedback.</li><li>Errors explain what to fix and keep the details you entered.</li></ul><p>This is a working learning example, with fictional availability. A live booking service would also need server-side checks, secure storage and real delivery of confirmations.</p></details>`;
  }
  function render({moveFocus=true}={}) {
    const workshop=findWorkshop(state.selected);
    const stage=['choose','details','review','confirmed'].indexOf(state.step);
    const titles=['Choose your workshop.','A place for you.','Everything look right?',state.updated?'Your booking is updated.':'Your next step is booked.'];
    const intro=state.step==='choose'?'<p class="cg-intro">Choose a free workshop. Practise booking a place, from your first click to confirmation.</p>':'';
    host.innerHTML=`<div class="cg-masthead"><div><span class="cg-pixel-mark" aria-hidden="true">▥</span><span>COMMON GROUND<small>THE COMMUNITY WORKSHOP</small></span></div><span class="cg-demo-label">FICTIONAL PRACTICE WEBSITE</span></div><div class="cg-content"><ol class="cg-steps" aria-label="Booking progress">${['Workshop','Your details','Review','Confirmation'].map((name,i)=>`<li${i===stage?' aria-current="step"':''} class="${i<stage?'cg-done':''}"><span aria-hidden="true">${i<stage?'✓':String(i+1).padStart(2,'0')}</span>${name}</li>`).join('')}</ol><p class="eyebrow">${stage===3?'Journey complete':`Step ${stage+1} of 4`}</p><${top} id="cg-heading" tabindex="-1">${titles[stage]}</${top}>${intro}${stage<2?'<p class="cg-demo-note">Fictional workshops and dates. No real booking or email. Your entries clear on reload.</p>':''}${state.step==='choose'?chooseScreen():state.step==='details'?detailsScreen(workshop):state.step==='review'?reviewScreen(workshop):confirmedScreen(workshop)}${state.booking&&state.step!=='confirmed'?'<div class="cg-edit-note"><p>You are editing your practice booking. Changes apply when you confirm. Your original booking stays in place until then.</p><button type="button" class="cg-text" data-cg="discard">Keep my original booking</button></div>':''}</div>`;
    wire();
    if(moveFocus)focus(Object.keys(state.errors).length?'#cg-error-summary':'#cg-heading');
  }
  function wire() {
    find('#cg-choose-form')?.addEventListener('submit',event=>{
      event.preventDefault();
      state=chooseWorkshop(state,find('input[name="workshop"]:checked')?.value||'');
      render();
    });
    find('#cg-details-form')?.addEventListener('submit',event=>{
      event.preventDefault();
      state=reviewDetails(state,{name:find('#cg-name').value,email:find('#cg-email').value});render();
    });
    find('#cg-confirm-form')?.addEventListener('submit',event=>{
      event.preventDefault();
      state=confirmBooking(state,()=>`CG-DEMO-${crypto.randomUUID().slice(0,8).toUpperCase()}`);render();
    });
    host.querySelectorAll('[data-cg]').forEach(button=>button.addEventListener('click',()=>{
      const action=button.dataset.cg;
      if(action==='download') {download();return;}
      captureDetails();
      state=action==='discard'?discardChanges(state):editBooking(state,action==='choose'?'choose':'details');render();
    }));
    host.querySelectorAll('.cg-errors a').forEach(anchor=>anchor.addEventListener('click',event=>{
      event.preventDefault();focus(anchor.getAttribute('href'));
    }));
  }
  function download() {
    const url=URL.createObjectURL(new Blob([bookingNotes(state.booking)],{type:'text/plain;charset=utf-8'}));
    const anchor=document.createElement('a');anchor.href=url;anchor.download='common-ground-practice-booking.txt';document.body.append(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
    find('#cg-download-status').textContent='Your booking summary is ready to save. If downloads are blocked, you can copy the details above.';
  }
  render({moveFocus:false});
}
