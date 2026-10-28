const {test}=require('node:test');
const assert=require('node:assert/strict');
const model=import('./model.js');
async function ready({gift=false,newsletter=false,date='2026-10-28'}={}) {
  const m=await model;return m.reviewOrder(m.continueToDetails(m.setGiftWrap(m.createState(date),gift)),m.exampleDetails,newsletter);
}
test('new practice starts without paid extras, marketing consent or an existing order',async()=>{
  const m=await model,s=m.createState('2026-10-28');assert.equal(s.giftWrap,false);assert.equal(s.newsletter,false);assert.equal(s.subscription,null);assert.equal(s.step,'offer');
});
test('first payment and renewal reconcile with the £12 box and £3 delivery',async()=>{
  const m=await model;assert.deepEqual(m.totals(false),{box:1200,delivery:300,giftWrap:0,today:1500,recurring:1500});assert.deepEqual(m.totals(true),{box:1200,delivery:300,giftWrap:400,today:1900,recurring:1500});assert.equal(m.money(1500),'£15');assert.equal(m.money(1900),'£19');
});
test('gift wrap can be removed again before starting the subscription',async()=>{
  const m=await model,yes=m.setGiftWrap(m.createState('2026-10-28'),true),no=m.setGiftWrap(yes,false);assert.equal(m.totals(no.giftWrap).today,1500);assert.equal(yes.giftWrap,true);
});
test('invalid email or postcode preserves every delivery entry and the optional choice',async()=>{
  const m=await model,start=m.continueToDetails(m.createState('2026-10-28'));
  const input={...m.exampleDetails,email:'jo.example',postcode:'not yet'};
  const bad=m.reviewOrder(start,input,true);assert.equal(bad.step,'details');assert.deepEqual(bad.details,input);assert(bad.errors.email);assert(bad.errors.postcode);assert.equal(bad.newsletter,true);assert.equal(bad.subscription,null);
  const good=m.reviewOrder(bad,{...input,email:'jo@example.com',postcode:'ab123cd'},true);assert.equal(good.step,'review');assert.equal(good.details.postcode,'AB12 3CD');assert.equal(good.details.name,'Jo Example');assert.deepEqual(good.errors,{});
});
test('required delivery fields produce specific errors; the second address line is optional',async()=>{
  const m=await model,empty=m.validateDetails(m.emptyDetails());assert.deepEqual(Object.keys(empty.errors).sort(),['address','email','name','postcode','town']);
  const valid=m.validateDetails({...m.exampleDetails,address2:''});assert.deepEqual(valid.errors,{});
});
test('normal names, aliases and trimmed address input validate without losing meaningful characters',async()=>{
  const m=await model,input={...m.exampleDetails,name:'  Jo O’Brien  ',email:' jo+craft@example.co.uk ',address:'  12 Example Lane  '};
  const {value,errors}=m.validateDetails(input);assert.deepEqual(errors,{});assert.equal(value.name,'Jo O’Brien');assert.equal(value.email,'jo+craft@example.co.uk');assert.equal(value.address,'12 Example Lane');
  assert(m.validateDetails({...input,email:'jo@@example.com'}).errors.email);assert(m.validateDetails({...input,address:'x'.repeat(101)}).errors.address);
});
test('returning to the offer and delivery preserves the entered details and consent',async()=>{
  const m=await model,s=await ready({gift:true,newsletter:true}),offer=m.backTo(s,'offer'),details=m.continueToDetails(offer);assert.deepEqual(details.details,s.details);assert.equal(details.giftWrap,true);assert.equal(details.newsletter,true);
});
test('only a validated review can become an active subscription',async()=>{
  const m=await model;assert.equal(m.subscribe(m.createState('2026-10-28'),()=>assert.fail()).step,'offer');
  const malformed={...await ready(),details:{...m.exampleDetails,email:'bad'}};
  const blocked=m.subscribe(malformed,()=>assert.fail('invalid data cannot create a reference'));assert.equal(blocked.step,'details');assert(blocked.errors.email);assert.equal(blocked.subscription,null);
});
test('subscription snapshots both first payment and recurring payment, with immutable delivery details',async()=>{
  const m=await model,s=await ready({gift:true,newsletter:true}),active=m.subscribe(s,()=> 'LB-DEMO-TEST');assert.equal(active.step,'subscribed');assert.equal(active.subscription.reference,'LB-DEMO-TEST');assert.equal(active.subscription.amounts.today,1900);assert.equal(active.subscription.amounts.recurring,1500);assert.equal(active.subscription.periodEnds,'2026-11-28');assert.equal(active.subscription.newsletter,true);
  s.details.name='Later edit';assert.equal(active.subscription.details.name,'Jo Example');assert.equal(s.subscription,null);
});
test('repeat confirmation cannot create a second order or charge',async()=>{
  const m=await model,s=await ready();let calls=0;const active=m.subscribe(s,()=>`LB-DEMO-${++calls}`);assert.strictEqual(m.subscribe(active,()=>assert.fail()),active);assert.equal(calls,1);assert.strictEqual(m.setGiftWrap(active,true),active);
});
test('opening cancellation does not cancel; Keep subscription returns to the active account',async()=>{
  const m=await model,active=m.subscribe(await ready(),()=> 'LB-DEMO-TEST'),review=m.beginCancellation(active),kept=m.keepSubscription(review);assert.equal(review.step,'cancel');assert.equal(review.subscription.status,'active');assert.equal(kept.step,'subscribed');assert.equal(kept.subscription.status,'active');assert.equal(kept.subscription.reference,'LB-DEMO-TEST');assert.equal(kept.subscription.cancellation,null);
});
test('confirmed cancellation stops renewals, records the end date, retains the first order and turns off news',async()=>{
  const m=await model,active=m.subscribe(await ready({gift:true,newsletter:true}),()=> 'LB-DEMO-TEST'),cancelled=m.cancelSubscription(m.beginCancellation(active));
  assert.equal(cancelled.step,'cancelled');assert.equal(cancelled.subscription.status,'cancelled');assert.equal(cancelled.subscription.cancellation.reference,'LB-CANCEL-TEST');assert.equal(cancelled.subscription.cancellation.effective,'2026-11-28');assert.equal(cancelled.subscription.cancellation.confirmed,'2026-10-28');assert.equal(cancelled.subscription.newsletter,false);assert.equal(cancelled.subscription.amounts.today,1900);assert.equal(active.subscription.status,'active');
});
test('cancellation is idempotent and cannot run before a subscription or outside its review',async()=>{
  const m=await model,start=m.createState('2026-10-28');assert.strictEqual(m.beginCancellation(start),start);assert.strictEqual(m.cancelSubscription(start),start);
  const active=m.subscribe(await ready(),()=> 'LB-DEMO-TEST');assert.strictEqual(m.cancelSubscription(active),active);
  const cancelled=m.cancelSubscription(m.beginCancellation(active));assert.strictEqual(m.cancelSubscription(cancelled),cancelled);assert.strictEqual(m.beginCancellation(cancelled),cancelled);
});
test('monthly renewal dates handle month ends, leap years and year boundaries',async()=>{
  const m=await model;for(const [from,to] of [['2026-01-31','2026-02-28'],['2028-01-31','2028-02-29'],['2026-12-31','2027-01-31'],['2026-08-31','2026-09-30'],['2026-10-28','2026-11-28']])assert.equal(m.nextMonth(from),to);
  assert.throws(()=>m.createState('2026-02-31'));assert.throws(()=>m.createState('not a date'));
});
test('active and cancelled summaries match the actual subscription state and keep the fictional context',async()=>{
  const m=await model,active=m.subscribe(await ready({gift:true}),()=> 'LB-DEMO-TEST');const before=m.receipt(active.subscription);
  for(const expected of ['No payment, parcel or email','First order total: £19','Next renewal: £15 on 28 November 2026','Jo Example','AB12 3CD'])assert(before.includes(expected),expected);
  const cancelled=m.cancelSubscription(m.beginCancellation(active)),after=m.receipt(cancelled.subscription);assert(after.includes('LB-CANCEL-TEST'));assert(after.includes('No further renewal payments'));assert(after.includes('Current subscription ends: 28 November 2026'));assert(!after.includes('Next renewal:'));assert(after.includes('First order total: £19'));
});
