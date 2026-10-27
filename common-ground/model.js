// Local, fictional booking rules. No network calls or saved personal details.
export const workshops = Object.freeze([
  Object.freeze({id:'javascript',title:'Introduction to JavaScript',date:'Tuesday 10 November 2026',time:'18:00 to 19:30',room:'Community room 2',level:'Know a little HTML? Start here.',description:'Make a button respond to a click and understand the code behind it.',bring:'A laptop with a web browser',access:'Step-free entrance and an accessible toilet on the same floor.',available:true}),
  Object.freeze({id:'first-page',title:'Your first web page',date:'Saturday 14 November 2026',time:'10:00 to 11:30',room:'Community room 1',level:'No coding experience needed.',description:'Create a small web page with headings, text and your own colours.',bring:'A laptop with a web browser',access:'Step-free entrance and an accessible toilet on the same floor.',available:true}),
  Object.freeze({id:'product',title:'From idea to first prototype',date:'Wednesday 11 November 2026',time:'18:00 to 19:30',room:'Community room 2',level:'For curious beginners.',description:'Turn a customer problem into a small idea you can test.',bring:'A notebook or laptop',access:'Step-free entrance and an accessible toilet on the same floor.',available:false})
]);

export const findWorkshop = id => workshops.find(workshop => workshop.id===id);
export const freshBooking = () => ({step:'choose',selected:'',details:{name:'',email:''},errors:{},booking:null});

export function validateDetails(details) {
  const value={name:String(details?.name??'').trim(),email:String(details?.email??'').trim()};
  const errors={};
  if(!value.name)errors.name='Enter your name so we know who the place is for.';
  else if(value.name.length>100)errors.name='Use 100 characters or fewer for your name.';
  if(!value.email)errors.email='Enter your email address.';
  else if(value.email.length>254 || !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(value.email))errors.email='Enter an email address with an @ sign, such as jo@example.com.';
  return {value,errors};
}

export function chooseWorkshop(state,id) {
  if(state.step!=='choose')return state;
  const workshop=findWorkshop(id);
  if(!workshop)return {...state,errors:{workshop:'Choose a workshop before continuing.'}};
  if(!workshop.available)return {...state,errors:{workshop:'That workshop is full. Choose an available workshop.'}};
  return {...state,selected:id,step:'details',errors:{}};
}

export function reviewDetails(state,details) {
  if(state.step!=='details')return state;
  const {value,errors}=validateDetails(details);
  // Keep the exact text on error so the visitor can correct only what needs changing.
  return {...state,details:Object.keys(errors).length?{...details}:value,errors,step:Object.keys(errors).length?'details':'review'};
}

export function confirmBooking(state,makeReference) {
  // A repeated submit returns the same booking, never a second reference.
  if(state.step!=='review')return state;
  if(!findWorkshop(state.selected)?.available)return {...state,step:'choose',errors:{workshop:'That workshop is not available. Choose another workshop.'}};
  const {value,errors}=validateDetails(state.details);
  if(Object.keys(errors).length)return {...state,step:'details',errors};
  const booking={workshopId:state.selected,...value,reference:state.booking?.reference||makeReference()};
  return {...state,details:value,step:'confirmed',errors:{},booking,updated:Boolean(state.booking)};
}

export function editBooking(state,step='details') {
  if(!['confirmed','review','details'].includes(state.step)||!['details','choose'].includes(step))return state;
  return {...state,step,errors:{}};
}

export function discardChanges(state) {
  if(!state.booking)return state;
  return {...state,step:'confirmed',selected:state.booking.workshopId,details:{name:state.booking.name,email:state.booking.email},errors:{}};
}

export function bookingNotes(booking) {
  const workshop=findWorkshop(booking.workshopId);
  return ['COMMON GROUND | PRACTICE BOOKING','Fictional learning example. No real place is reserved and no email has been sent.',`Reference: ${booking.reference}`,`Workshop: ${workshop.title}`,`When: ${workshop.date}, ${workshop.time}`,`Where: ${workshop.room}, Common Ground (fictional venue)`,`Name: ${booking.name}`,`Email: ${booking.email}`,'Cost: Free',`Bring: ${workshop.bring}`,`Access: ${workshop.access}`,'Change this practice booking using Change my booking while the page is open.','This summary is a local copy. Reloading the page clears the practice booking.'].join('\n');
}
