// Original pixel scenes in the Product Quest palette and sprite style.
// The sprite grammar follows the collection's own Product Quest art system.
import {developers} from './content.js';
const colours={bg:'#30273f',floor:'#44364e',edge:'#211e31',lime:'#d1ee87',purple:'#bc9aee'};
const pixels=['...HHHHH....','..HHHHHHH...','..HSSSSSH...','..HSXSSXS...','...SSSSS....','....SSS.....','..CCWWCCC...','.CCCWWCCCC..','.CSCWCCCSC..','..SCWCCCS...','...CCCCC....','...PPPPP....','...PP.PP....','...PP.PP....','..DDD.DDD...'];
function sprite(ctx,x,y,coat,skin,scale=3){const palette={H:'#412b4a',S:skin,X:'#2c2336',C:coat,W:'#eee4d3',P:'#302b46',D:'#171725'};pixels.forEach((row,yy)=>[...row].forEach((p,xx)=>{if(p!=='.'){ctx.fillStyle=palette[p];ctx.fillRect(x+xx*scale,y+yy*scale,scale,scale);}}));}
export function drawPortrait(canvas,dev){const c=canvas.getContext('2d');canvas.width=48;canvas.height=56;c.imageSmoothingEnabled=false;sprite(c,6,5,dev.colour,['#d49c84','#edc5a0','#b57a68','#e5af90'][developers.indexOf(dev)%4],3);}
export function drawStudio(canvas,state){const ctx=canvas.getContext('2d');canvas.width=480;canvas.height=200;ctx.imageSmoothingEnabled=false;const rect=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
 rect(0,0,480,200,colours.bg);rect(0,117,480,83,colours.floor);rect(0,113,480,5,colours.edge);
 for(let y=122;y<200;y+=16){rect(0,y,480,1,'#54415a');for(let x=(y%32?0:18);x<480;x+=42)rect(x,y,1,16,'#54415a');}
 for(const x of [22,354]){rect(x-4,14,106,78,'#1d1b30');rect(x,18,98,70,'#645579');rect(x,48,98,40,'#82668d');for(let k=0;k<6;k++){const h=12+(k*17%35);rect(x+k*17,88-h,14,h,'#363249');for(let q=0;q<h-4;q+=9)rect(x+k*17+4,90-h+q,3,3,'#d0a57e');}rect(x+46,18,4,70,colours.edge);rect(x,51,98,4,colours.edge);}
 rect(158,14,163,53,colours.edge);rect(162,18,155,45,'#3b324d');ctx.textAlign='center';ctx.fillStyle=colours.lime;ctx.font='bold 13px monospace';ctx.fillText('RELEASE STUDIO',240,38);ctx.fillStyle='#ac99bc';ctx.font='7px monospace';ctx.fillText('SCOPE IS A LOVE LANGUAGE',240,53);
 // Tiny original kanban board, clock and the obligatory plant.
 rect(174,76,132,31,'#211c32');for(let x=181;x<300;x+=40){rect(x,81,31,3,'#bc9aee');rect(x,89,12,9,'#d1ee87');rect(x+16,89,12,9,'#e7bb77');}
 rect(331,35,12,16,'#171422');rect(333,37,8,12,'#eee4d3');rect(337,39,1,5,'#302b46');rect(337,43,3,1,'#302b46');
 rect(16,163,20,20,'#bf8791');rect(13,159,26,5,'#e7adac');rect(24,130,4,30,'#698c72');rect(14,137,12,10,'#87ae83');rect(28,127,12,10,'#a5c092');rect(17,122,10,10,'#87ae83');
 const team=state.team.length?state.team.map(id=>developers.find(d=>d.id===id)):developers.slice(0,3);
 team.forEach((d,i)=>{const x=72+i*128;rect(x-10,184,72,6,'#30283c');sprite(ctx,x+12,104,d.colour,['#d49c84','#b57a68','#edc5a0'][i],3);rect(x,153,80,7,'#a77978');rect(x+4,160,72,11,'#765565');rect(x+7,171,5,15,colours.edge);rect(x+67,171,5,15,colours.edge);rect(x+23,137,29,23,'#211c32');rect(x+26,140,23,16,'#518277');rect(x+29,144,12,2,colours.lime);rect(x+29,148,16,2,'#b5abc8');rect(x+35,160,5,3,'#cec2d2');rect(x+59,147,7,7,'#ede1c7');rect(x+61,146,3,1,'#bc9aee');ctx.fillStyle='#d1c3df';ctx.font='7px monospace';ctx.textAlign='center';ctx.fillText(d.name.toUpperCase(),x+39,196);});
}
