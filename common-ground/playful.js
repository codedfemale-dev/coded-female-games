// Small, local learning rewards. No timers, scores or saved personal details.
export const townMessages=[
 'The workshop is quiet. Make your first repair.',
 'The sign is lit. A clearer welcome starts here.',
 'The windows are glowing. Two repairs complete.',
 'The door is open. Three repairs complete.',
 'The first visitor has arrived. Four repairs complete.',
 'The group is gathering. All five repairs complete.'
];
export function townScene(count){
 const stage=Math.max(0,Math.min(5,Number.isInteger(count)?count:0));
 const person=(x,shirt)=>`<g transform="translate(${x} 88)"><rect x="4" y="0" width="10" height="11" fill="#dfb79d"/><path d="M4 0h10v4H4z" fill="#30273f"/><rect x="1" y="11" width="16" height="15" fill="${shirt}"/><path d="M4 26v10m8-10v10" stroke="#f7f0dd" stroke-width="5"/></g>`;
 return `<figure class="of-town" data-stage="${stage}"><svg viewBox="0 0 480 140" aria-hidden="true" focusable="false" shape-rendering="crispEdges"><path fill="#29213b" d="M0 0h480v140H0z"/><path fill="#44364e" d="M0 116h480v24H0z"/><path fill="#8f7a9e" d="M139 36h202v80H139z"/><path fill="#bc9aee" d="M129 29h222v9H129z"/><path fill="${stage>=1?'#d1ee87':'#625471'}" d="M178 46h124v9H178z"/><path fill="${stage>=2?'#eedb9b':'#40344f'}" d="M155 68h40v29h-40zm130 0h40v29h-40z"/><path stroke="#211c32" stroke-width="4" d="M175 68v29m-20-14h40m110-15v29m-20-14h40"/><path fill="#171422" d="M215 67h50v49h-50z"/>${stage>=3?'<path fill="#d1ee87" d="M215 67l17 7v42h-17z"/>':'<path fill="#625471" d="M218 70h44v46h-44z"/>'}<path fill="#ad9cba" d="M210 116h60l30 24H180z"/>${stage>=4?person(100,'#bc9aee'):''}${stage>=5?person(355,'#85d8ce')+person(385,'#d1ee87'):''}<path fill="#bc9aee" d="M33 97h38v5H33zm375-11h38v5h-38z"/></svg><figcaption><strong>Common Ground · ${stage}/5 repairs</strong><span>${townMessages[stage]}</span></figcaption></figure>`;
}
export const freshMission=()=>({chosen:false,emailErrorSeen:false,recovered:false,confirmed:false});
export function advanceMission(previous,state){
 const emailErrorSeen=previous.emailErrorSeen||Boolean(state.errors?.email);
 return {chosen:previous.chosen||Boolean(state.selected&&state.step!=='choose'),emailErrorSeen,recovered:previous.recovered||(emailErrorSeen&&['review','confirmed'].includes(state.step)&&!Object.keys(state.errors||{}).length),confirmed:previous.confirmed||state.step==='confirmed'};
}
export const missionTasks=[['chosen','Choose a workshop'],['recovered','Recover from an email mistake'],['confirmed','Confirm a practice booking']];
export function missionNotes(mission){return ['OPTIONAL BOOKING MISSION',...missionTasks.map(([key,label])=>`${mission[key]?'Completed':'Not yet tried'}: ${label}`)].join('\n');}
