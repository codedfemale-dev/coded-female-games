// All amounts are integer pence. These are fictional, local practice orders.
export const prices=Object.freeze({box:1200,delivery:300,giftWrap:400});
export const exampleDetails=Object.freeze({name:'Jo Example',email:'jo@example.com',address:'12 Example Lane',address2:'',town:'Sampleton',postcode:'AB12 3CD'});
export const emptyDetails=()=>({name:'',email:'',address:'',address2:'',town:'',postcode:''});
export function createState(today) {
  if(!/^\d{4}-\d{2}-\d{2}$/.test(today)||!Number.isFinite(Date.parse(today+'T12:00:00Z'))||new Date(today+'T12:00:00Z').toISOString().slice(0,10)!==today)throw Error('A valid practice date is required');
  return {step:'offer',today,giftWrap:false,newsletter:false,details:emptyDetails(),errors:{},subscription:null,resetRequested:false};
}
export const money=pence=>new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP',maximumFractionDigits:pence%100?2:0}).format(pence/100);
export const displayDate=iso=>new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(iso+'T12:00:00Z'));
export function nextMonth(iso) {
  const [year,month,day]=iso.split('-').map(Number);
  const lastDay=new Date(Date.UTC(year,month+1,0)).getUTCDate();
  return new Date(Date.UTC(year,month,Math.min(day,lastDay),12)).toISOString().slice(0,10);
}
export const totals=giftWrap=>({box:prices.box,delivery:prices.delivery,giftWrap:giftWrap?prices.giftWrap:0,today:prices.box+prices.delivery+(giftWrap?prices.giftWrap:0),recurring:prices.box+prices.delivery});
export function setGiftWrap(state,selected) {return state.step==='offer'?{...state,giftWrap:selected===true}:state;}
export function continueToDetails(state) {return state.step==='offer'?{...state,step:'details',errors:{}}:state;}
export function validateDetails(input) {
  const value=Object.fromEntries(Object.keys(emptyDetails()).map(key=>[key,String(input?.[key]??'').trim()]));
  const errors={};
  const required={name:'Enter a name for the delivery.',email:'Enter an email address.',address:'Enter the first line of the delivery address.',town:'Enter a town or city.',postcode:'Enter a UK postcode, such as AB12 3CD.'};
  for(const [key,message] of Object.entries(required))if(!value[key])errors[key]=message;
  for(const key of ['name','address','address2','town'])if(value[key].length>100)errors[key]='Use 100 characters or fewer.';
  if(value.email&&(value.email.length>254||!/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(value.email)))errors.email='Enter an email address with an @ sign, such as jo@example.com.';
  const postcode=value.postcode.toUpperCase().replace(/\s/g,'');
  if(value.postcode&&!/^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/.test(postcode))errors.postcode='Enter a UK postcode, such as AB12 3CD.';
  if(!errors.postcode)value.postcode=postcode.slice(0,-3)+' '+postcode.slice(-3);
  return {value,errors};
}
export function reviewOrder(state,input,newsletter=false) {
  if(state.step!=='details')return state;
  const {value,errors}=validateDetails(input);
  return {...state,details:Object.keys(errors).length?{...input}:value,newsletter:newsletter===true,errors,step:Object.keys(errors).length?'details':'review'};
}
export function backTo(state,step) {
  if(!['offer','details'].includes(step)||!['details','review'].includes(state.step))return state;
  return {...state,step,errors:{}};
}
export function subscribe(state,makeReference) {
  if(state.step!=='review'||state.subscription)return state;
  const {value,errors}=validateDetails(state.details);
  if(Object.keys(errors).length)return {...state,step:'details',errors};
  const subscription={reference:makeReference(),status:'active',started:state.today,periodEnds:nextMonth(state.today),giftWrap:state.giftWrap,newsletter:state.newsletter,details:{...value},amounts:totals(state.giftWrap),cancellation:null};
  return {...state,details:value,step:'subscribed',errors:{},subscription};
}
export function beginCancellation(state) {return state.step==='subscribed'&&state.subscription?.status==='active'?{...state,step:'cancel'}:state;}
export function keepSubscription(state) {return state.step==='cancel'?{...state,step:'subscribed'}:state;}
export function cancelSubscription(state) {
  if(state.step!=='cancel'||state.subscription?.status!=='active')return state;
  return {...state,step:'cancelled',subscription:{...state.subscription,status:'cancelled',newsletter:false,cancellation:{reference:state.subscription.reference.replace('LB-DEMO-','LB-CANCEL-'),confirmed:state.today,effective:state.subscription.periodEnds}}};
}
export function receipt(subscription) {
  const s=subscription;
  return ['LOOPBOX | PRACTICE SUBSCRIPTION','Fictional order. No payment, parcel or email.',`Order reference: ${s.reference}`,`Status: ${s.status}`,`Practice order date: ${displayDate(s.started)}`,`Craft box: ${money(s.amounts.box)}`,`Delivery: ${money(s.amounts.delivery)}`,`Gift wrap, first box only: ${money(s.amounts.giftWrap)}`,`First order total: ${money(s.amounts.today)}`,...(s.status==='cancelled'?[`Cancellation reference: ${s.cancellation.reference}`,`Cancellation confirmed: ${displayDate(s.cancellation.confirmed)}`,`Current subscription ends: ${displayDate(s.cancellation.effective)}`,'No further renewal payments. Your first practice box stays in the order.','Optional project-news emails are off.']:[`Next renewal: ${money(s.amounts.recurring)} on ${displayDate(s.periodEnds)}`,'Renews every month until cancelled. Cancel through the practice account before the next renewal.']),`Name: ${s.details.name}`,`Email: ${s.details.email}`,`Delivery: ${[s.details.address,s.details.address2,s.details.town,s.details.postcode].filter(Boolean).join(', ')}`,'Refreshing or closing the page clears this practice subscription.'].join('\n');
}
