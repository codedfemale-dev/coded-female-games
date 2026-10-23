export const stations=[
 {id:'scan',name:'Ship scanner',short:'SCAN',x:27,y:46,icon:'◎'},
 {id:'signal',name:'Signal terminal',short:'SIGNAL',x:50,y:34,icon:'⌁'},
 {id:'crew',name:'Speak to Pip',short:'CREW',x:73,y:54,icon:'♧'}
];
export const missions=[
 {
 title:'The unknown signal',sector:'07',subtitle:'First contact protocol',brief:'An alien craft is following the Curiosity. Your crew thinks it is preparing to attack. Work out what the evidence supports before you respond.',alien:'ZIG',transmission:'“Three pulses. A pause. Three more pulses.”',
 clues:[
 {station:'scan',title:'A ship in trouble',text:'The craft’s engines flicker. Its shields and weapon systems are offline. It is drifting towards the asteroid belt.'},
 {station:'signal',title:'A repeated pattern',text:'The transmission repeats every eight seconds. Your translator finds no match. A repeated pattern alone does not reveal its meaning.'},
 {station:'crew',title:'Pip has a theory',text:'“They are following us, so they must be hostile!” Pip has seen their position on the radar, but has no evidence of their intentions.'}
 ],
 claims:[{text:'The craft’s engines are unstable.',kind:'fact',why:'The scanner directly reports flickering engines.'},{text:'The aliens are preparing to attack.',kind:'assumption',why:'This is Pip’s interpretation. Following you does not establish hostile intent.'},{text:'The signal means “help us”.',kind:'unknown',why:'There is no translation yet. It might be a request for help, but its meaning is not established.'}],
 options:[
 {id:'hail',title:'Send a simple greeting',text:'Keep a safe distance, send a neutral signal and watch the response.',points:3,effect:{signal:12,energy:-3,oxygen:0},result:'You leave room for a reply without assuming what the signal means. Your crew stands down from panic stations.'},
 {id:'flee',title:'Use an emergency jump',text:'Get away immediately, before the craft can reply.',points:1,effect:{signal:-8,energy:-15,oxygen:-3},result:'You create distance, but use a large energy reserve and lose the chance to clarify the signal.'},
 {id:'accuse',title:'Broadcast a warning',text:'Tell the aliens you know they are planning an attack.',points:0,effect:{signal:-12,energy:-7,oxygen:0},result:'You present an assumption as a fact. The craft backs away and its transmission becomes harder to read.'}
 ],
 update:'A picture arrives: two aliens beside a cracked fuel cell. A navigation marker points to a nearby repair station.',
 adapt:[{id:'revise',title:'Update the working explanation',text:'Treat a request for assistance as more likely, verify the repair marker and offer directions.',good:true},{id:'stick',title:'Keep the original threat theory',text:'Dismiss the picture and keep treating the craft as hostile.',good:false}],
 lesson:'A strong first impression is still an interpretation. Keep facts, assumptions and unanswered questions separate.',transfer:'At work: “People stopped at the payment screen” is evidence. “The price is too high” is one explanation to investigate.'
 },
 {
 title:'The airlock alarm',sector:'08',subtitle:'Find the fault',brief:'Zig is now helping from the comms channel. An oxygen warning lights up after a software patch. Is the ship leaking, or is the reading wrong?',alien:'ZIG',transmission:'“Your ship is making the unhappy noise.”',
 clues:[
 {station:'scan',title:'Two sensors disagree',text:'The bridge oxygen sensor reads 91% and is stable. The cargo sensor reads 38%. Cabin pressure is stable in both areas.'},
 {station:'signal',title:'The patch record',text:'The warning began just after patch 2.4 changed the cargo sensor’s calibration. This timing suggests a link, but does not prove the patch caused it.'},
 {station:'crew',title:'A useful boundary',text:'Pip can isolate the cargo bay without cutting oxygen to the bridge. An independent portable sensor is available for a check.'}
 ],
 claims:[{text:'The two oxygen sensors disagree.',kind:'fact',why:'Both readings are recorded and they differ.'},{text:'Patch 2.4 definitely caused the warning.',kind:'assumption',why:'The timing is a clue, not proof of a cause.'},{text:'The cargo bay’s true oxygen level is safe.',kind:'unknown',why:'The sensors disagree. An independent measurement is still needed.'}],
 options:[
 {id:'vent',title:'Purge the entire ship',text:'Reset every oxygen system and hope the warning disappears.',points:0,effect:{signal:0,energy:-18,oxygen:-18},result:'A broad reset spends oxygen and power without narrowing down the fault. The crew switches to emergency reserves.'},
 {id:'test',title:'Isolate and measure',text:'Keep the cargo bay closed and check it with the portable sensor.',points:3,effect:{signal:5,energy:-4,oxygen:-2},result:'You contain a possible hazard and test the explanation with an independent reading.'},
 {id:'ignore',title:'Silence the warning',text:'Assume the patch broke the display and carry on.',points:0,effect:{signal:-4,energy:-2,oxygen:-5},result:'The noise stops, but nobody has established whether it is safe to enter the cargo bay.'}
 ],
 update:'The portable sensor reads 90%. Reverting the calibration makes the cargo display match. Pressure remains stable.',
 adapt:[{id:'stick',title:'Keep the cargo bay closed indefinitely',text:'Disregard the new measurements and continue treating the warning as a confirmed leak.',good:false},{id:'revise',title:'Restore access with monitoring',text:'Record the faulty calibration, restore the tested setting and keep watching the readings.',good:true}],
 lesson:'Choose a small, reversible action that tests your explanation. Check the result before expanding the action.',transfer:'At work: isolate the affected feature, compare independent evidence and test a rollback before restarting an entire service.'
 },
 {
 title:'The rescue window',sector:'09',subtitle:'Adapt the plan',brief:'A small shuttle needs help before an ion storm arrives. Zig proposes a direct tow. Pip’s shift is nearly over. Choose a plan the crew can actually sustain.',alien:'MOSS',transmission:'“We have snacks. We do not have an engine.”',
 clues:[
 {station:'scan',title:'A narrow route',text:'The direct tow takes 18 minutes. The latest forecast puts the storm here in 14 minutes. A sheltered rendezvous is six minutes away.'},
 {station:'signal',title:'Help is nearby',text:'A rescue tug confirms it can meet you at the sheltered rendezvous in ten minutes. Its message includes its identity and approach route.'},
 {station:'crew',title:'Capacity is a constraint',text:'Pip has worked a long shift. Zig can navigate to the rendezvous, but is not trained to operate your towing equipment.'}
 ],
 claims:[{text:'The direct tow finishes before the forecast storm.',kind:'assumption',why:'The recorded times contradict this optimistic claim: 18 minutes is longer than 14.'},{text:'A tug has confirmed a rendezvous.',kind:'fact',why:'The tug has provided an explicit response and approach route.'},{text:'The storm will arrive at exactly the forecast time.',kind:'unknown',why:'A forecast is an estimate. The exact future arrival remains uncertain.'}],
 options:[
 {id:'direct',title:'Push through the direct tow',text:'Ask Pip to keep working and try to beat the storm.',points:0,effect:{signal:0,energy:-22,oxygen:-8},result:'The tow exposes both craft to the storm and relies on an exhausted crew member. The schedule was already longer than the forecast window.'},
 {id:'wait',title:'Wait in open space',text:'Leave the shuttle where it is until the tug arrives.',points:1,effect:{signal:-5,energy:-6,oxygen:-5},result:'The tug is coming, but waiting in the exposed route leaves little margin if the storm moves.'},
 {id:'shelter',title:'Move to the sheltered rendezvous',text:'Let Zig navigate, protect Pip’s rest and hand over to the verified tug.',points:3,effect:{signal:10,energy:-5,oxygen:-2},result:'You match the task to available skills, build in shelter and arrange a clear handover.'}
 ],
 update:'The storm accelerates. The exposed route is now unsafe. The rescue tug confirms the sheltered approach is still open.',
 adapt:[{id:'revise',title:'Recheck the sheltered route and confirm handover',text:'Use the new forecast, tell the shuttle what changed and coordinate the tug’s approach.',good:true},{id:'stick',title:'Follow the first plan without another check',text:'Avoid changing anything because the original plan has already been agreed.',good:false}],
 lesson:'A plan is a working choice, not a promise to ignore new evidence. Adapt it and tell the people affected.',transfer:'At work: when a deadline or dependency changes, revisit scope, capacity and the handover instead of asking everyone to push harder.'
 }
];
