const {test}=require('node:test');
const assert=require('node:assert/strict');
const model=import('./model.js');
test('choose a free workshop, correct an error, review and confirm one booking',async()=>{
  const {freshBooking,chooseWorkshop,reviewDetails,confirmBooking}=await model;
  let state=chooseWorkshop(freshBooking(),'javascript');
  state=reviewDetails(state,{name:'Jo Patel',email:'jo.example'});
  assert.equal(state.step,'details');assert.equal(state.details.name,'Jo Patel');assert.equal(state.details.email,'jo.example');assert(state.errors.email);assert(!state.errors.name);
  state=reviewDetails(state,{...state.details,email:'jo@example.com'});assert.equal(state.step,'review');
  state=confirmBooking(state,()=> 'CG-DEMO-ONE');assert.equal(state.step,'confirmed');assert.equal(state.booking.email,'jo@example.com');assert.equal(state.booking.workshopId,'javascript');
});
test('missing, unknown and full workshops cannot reach the details or confirmation',async()=>{
  const {freshBooking,chooseWorkshop,confirmBooking}=await model;
  for(const id of ['', 'unknown','product']){const state=chooseWorkshop(freshBooking(),id);assert.equal(state.step,'choose');assert(state.errors.workshop);assert.equal(state.booking,null);}
  const tampered={...freshBooking(),step:'review',selected:'product',details:{name:'Jo',email:'jo@example.com'}};
  assert.equal(confirmBooking(tampered,()=>assert.fail('no reference should be made')).step,'choose');
});
test('validation supports ordinary names and email aliases, trims valid entries and explains empty/oversize fields',async()=>{
  const {validateDetails}=await model;
  const good=validateDetails({name:'  Jo O’Brien  ',email:'  jo+workshop@example.co.uk  '});assert.deepEqual(good.errors,{});assert.equal(good.value.name,'Jo O’Brien');assert.equal(good.value.email,'jo+workshop@example.co.uk');
  for(const email of ['', 'jo.example', 'jo@@example.com','jo@ example.com','jo@example..com','x'.repeat(255)+'@example.com'])assert(validateDetails({name:'Jo',email}).errors.email,email);
  assert(validateDetails({name:'  ',email:'jo@example.com'}).errors.name);assert(validateDetails({name:'J'.repeat(101),email:'jo@example.com'}).errors.name);
});
test('back to workshops preserves entered details and permits a different available workshop',async()=>{
  const {freshBooking,chooseWorkshop,editBooking}=await model;
  const state={...chooseWorkshop(freshBooking(),'javascript'),details:{name:'Jo',email:'not finished'}};
  const changed=chooseWorkshop(editBooking(state,'choose'),'first-page');assert.deepEqual(changed.details,state.details);assert.equal(changed.selected,'first-page');
});
test('a double confirmation is idempotent',async()=>{
  const {freshBooking,chooseWorkshop,reviewDetails,confirmBooking}=await model;
  let calls=0;const reference=()=>`CG-DEMO-${++calls}`;
  const ready=reviewDetails(chooseWorkshop(freshBooking(),'javascript'),{name:'Jo',email:'jo@example.com'});
  const confirmed=confirmBooking(ready,reference),again=confirmBooking(confirmed,reference);assert.strictEqual(confirmed,again);assert.equal(calls,1);
});
test('amending a booking retains its reference and changes only after confirmation',async()=>{
  const {freshBooking,chooseWorkshop,reviewDetails,confirmBooking,editBooking}=await model;
  const original=confirmBooking(reviewDetails(chooseWorkshop(freshBooking(),'javascript'),{name:'Jo',email:'jo@example.com'}),()=> 'CG-DEMO-ORIGINAL');
  const selected=chooseWorkshop(editBooking(original,'choose'),'first-page');
  const reviewed=reviewDetails(selected,{name:'Jo Patel',email:'jo+new@example.com'});
  assert.equal(reviewed.booking.email,'jo@example.com');assert.equal(reviewed.booking.workshopId,'javascript');
  const changed=confirmBooking(reviewed,()=>assert.fail('must reuse reference'));assert.equal(changed.booking.reference,original.booking.reference);assert.equal(changed.booking.workshopId,'first-page');assert.equal(changed.booking.email,'jo+new@example.com');assert.equal(original.booking.email,'jo@example.com');assert.equal(changed.updated,true);
});
test('discarding amendments restores every original detail',async()=>{
  const {freshBooking,chooseWorkshop,reviewDetails,confirmBooking,editBooking,discardChanges}=await model;
  const original=confirmBooking(reviewDetails(chooseWorkshop(freshBooking(),'javascript'),{name:'Jo',email:'jo@example.com'}),()=> 'CG-DEMO-ORIGINAL');
  const draft={...chooseWorkshop(editBooking(original,'choose'),'first-page'),details:{name:'Changed',email:'unfinished'}};
  const restored=discardChanges(draft);assert.equal(restored.step,'confirmed');assert.equal(restored.selected,'javascript');assert.deepEqual(restored.details,original.details);assert.deepEqual(restored.booking,original.booking);
});
test('invalid amended details cannot overwrite a confirmed booking',async()=>{
  const {freshBooking,chooseWorkshop,reviewDetails,confirmBooking,editBooking}=await model;
  const original=confirmBooking(reviewDetails(chooseWorkshop(freshBooking(),'javascript'),{name:'Jo',email:'jo@example.com'}),()=> 'CG-DEMO-ORIGINAL');
  const draft=reviewDetails(editBooking(original),{name:'',email:'bad'});assert.equal(draft.step,'details');assert.deepEqual(draft.booking,original.booking);
  assert.equal(confirmBooking({...draft,step:'review'},()=>assert.fail()).step,'details');
});
test('the local summary carries the confirmed workshop, reference, access and simulation limits',async()=>{
  const {bookingNotes}=await model;
  const notes=bookingNotes({workshopId:'first-page',name:'Jo',email:'jo@example.com',reference:'CG-DEMO-TEST'});
  for(const expected of ['Your first web page','Saturday 14 November 2026','CG-DEMO-TEST','jo@example.com','Step-free entrance'])assert(notes.includes(expected),expected);
  assert(notes.includes('No real place is reserved'));assert(notes.includes('Reloading the page clears'));
});
