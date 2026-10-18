// Walking uses a clear aisle in front of the table and the corridor on its right.
export const home={x:133,y:300};
export const destinations={ceo:{x:226,y:300},engineer:{x:420,y:300},support:{x:625,y:232}};
export function routeTo(from,target){
 const end=destinations[target];if(!end)return null;
 const points=[{...from}];
 if(from.y<300)points.push({x:625,y:300});
 if(target==='support')points.push({x:625,y:300});
 points.push({...end});
 const clean=points.filter((p,i)=>i===0||p.x!==points[i-1].x||p.y!==points[i-1].y);
 const length=clean.slice(1).reduce((n,p,i)=>n+Math.hypot(p.x-clean[i].x,p.y-clean[i].y),0);
 return {points:clean,length,duration:length?Math.max(250,length/190*1000):0};
}
export function positionOn(route,progress){
 let distance=route.length*Math.max(0,Math.min(1,progress));
 for(let i=1;i<route.points.length;i++){
  const a=route.points[i-1],b=route.points[i],length=Math.hypot(b.x-a.x,b.y-a.y);
  if(distance<=length&&length){const t=distance/length;return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t};}distance-=length;
 }
 return {...route.points.at(-1)};
}
