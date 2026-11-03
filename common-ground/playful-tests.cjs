const {test}=require('node:test'),assert=require('node:assert/strict');
const fun=import('./playful.js'),booking=import('./model.js');
test('town rewards have six distinct stages with text alternatives and no motion or interactive SVG',async()=>{
 const {townScene,townMessages}=await fun;assert.equal(townMessages.length,6);assert.equal(new Set(townMessages).size,6);
 for(let stage=0;stage<=5;stage++){const html=townScene(stage);assert(html.includes(`data-stage="${stage}"`));assert(html.includes(townMessages[stage]));assert(html.includes('aria-hidden="true"'));assert(!/<animate|<script|tabindex|<button/.test(html));}
 assert(townScene(99).includes('data-stage="5"'));assert(townScene(-3).includes('data-stage="0"'));assert(townScene(NaN).includes('data-stage="0"'));
});
test('mission checks actual selection, error recovery and confirmation in order',async()=>{
 const {freshMission,advanceMission}=await fun;const {freshBooking,chooseWorkshop,reviewDetails,confirmBooking}=await booking;
 let mission=freshMission(),state=freshBooking();mission=advanceMission(mission,state);assert.deepEqual(mission,freshMission());
 state=chooseWorkshop(state,'first-page');mission=advanceMission(mission,state);assert(mission.chosen);assert(!mission.recovered);assert(!mission.confirmed);
 state=reviewDetails(state,{name:'Jo',email:'jo.example'});mission=advanceMission(mission,state);assert(mission.emailErrorSeen);assert(!mission.recovered);
 state=reviewDetails(state,{name:'Jo',email:'jo@example.com'});mission=advanceMission(mission,state);assert(mission.recovered);assert(!mission.confirmed);
 state=confirmBooking(state,()=> 'CG-DEMO-MISSION');mission=advanceMission(mission,state);assert(mission.confirmed);
});
test('a clean booking does not falsely complete the optional recovery task',async()=>{
 const {freshMission,advanceMission}=await fun;const {freshBooking,chooseWorkshop,reviewDetails,confirmBooking}=await booking;
 let m=freshMission(),s=chooseWorkshop(freshBooking(),'first-page');m=advanceMission(m,s);s=reviewDetails(s,{name:'Jo',email:'jo@example.com'});m=advanceMission(m,s);s=confirmBooking(s,()=> 'CG-DEMO-CLEAN');m=advanceMission(m,s);assert(m.chosen);assert(m.confirmed);assert(!m.recovered);assert(!m.emailErrorSeen);
});
test('failed selection and name-only errors do not count as email recovery',async()=>{
 const {freshMission,advanceMission}=await fun;const {freshBooking,chooseWorkshop,reviewDetails}=await booking;
 for(const id of ['', 'product'])assert(!advanceMission(freshMission(),chooseWorkshop(freshBooking(),id)).chosen);
 let s=chooseWorkshop(freshBooking(),'first-page'),m=advanceMission(freshMission(),s);s=reviewDetails(s,{name:'',email:'jo@example.com'});m=advanceMission(m,s);assert(!m.emailErrorSeen);assert(!m.recovered);s=reviewDetails(s,{name:'Jo',email:'jo@example.com'});m=advanceMission(m,s);assert(!m.recovered);
});
test('email correction with another error outstanding is not yet a completed recovery',async()=>{
 const {freshMission,advanceMission}=await fun;let m=advanceMission(freshMission(),{selected:'first-page',step:'details',errors:{email:'Bad'}});m=advanceMission(m,{selected:'first-page',step:'details',errors:{name:'Missing'}});assert(!m.recovered);m=advanceMission(m,{selected:'first-page',step:'review',errors:{}});assert(m.recovered);
});
test('task history survives booking edits; mission notes contain only achievements',async()=>{
 const {freshMission,advanceMission,missionNotes}=await fun;let m=advanceMission(freshMission(),{step:'confirmed',selected:'first-page',errors:{},details:{name:'Private'}});m=advanceMission(m,{step:'details',selected:'first-page',errors:{}});assert(m.confirmed);assert(m.chosen);const text=missionNotes(m);assert(text.includes('Completed: Confirm a practice booking'));assert(text.includes('Not yet tried: Recover from an email mistake'));assert(!text.includes('Private'));
});
test('field notes include all optional mission statuses without losing reflections',async()=>{
 const {freshMission}=await fun;const {fieldNotes,freshProgress}=await import('./access-lessons.js');
 const text=fieldNotes(freshProgress(),{mission:{...freshMission(),chosen:true},reflection:'Check an error.'});
 assert(text.includes('OPTIONAL BOOKING MISSION'));assert(text.includes('Completed: Choose a workshop'));assert(text.includes('Not yet tried: Recover from an email mistake'));assert(text.includes('Check an error.'));
});
