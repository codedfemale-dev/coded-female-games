// Original pixel artwork. Characters and room are drawn locally, with no image services.
export const players=[
 {id:'rae',name:'Rae',tag:'The calm in the chaos',coat:'#b69de4',skin:'#ad7253',hair:'#30202f',style:0},
 {id:'jules',name:'Jules',tag:'Good questions. Better coffee.',coat:'#85bfa6',skin:'#f0c5a1',hair:'#ad5f40',style:1},
 {id:'imani',name:'Imani',tag:'Big picture. Small releases.',coat:'#e7b869',skin:'#885438',hair:'#251e2c',style:2},
 {id:'alex',name:'Alex',tag:'Here for the useful work',coat:'#8fbbd7',skin:'#dba17c',hair:'#493647',style:3}
];
export function person(c,x,y,p,scale=2,step=0){
 const r=(a,b,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round(x+a*scale),Math.round(y+b*scale),w*scale,h*scale);};
 r(1,16,12,2,'#15121e');r(3,10,8,5,p.coat);r(2,11,2,4,p.skin);r(11,11,2,4,p.skin);r(4,15,3,5+step,'#323044');r(8,15,3,5-step,'#323044');r(3,20+step,4,2,'#1c1a28');r(8,20-step,4,2,'#1c1a28');
 r(3,1,9,8,p.hair);if(p.style===2){r(1,0,13,8,p.hair);r(2,-1,10,3,p.hair);}if(p.style===1)r(1,2,4,12,p.hair);if(p.style===3){r(2,1,10,6,p.coat);r(2,5,3,8,p.coat);}
 r(4,4,7,6,p.skin);r(5,6,1,1,'#292133');r(9,6,1,1,'#292133');r(7,9,2,1,'#694455');r(6,11,3,2,'#f7ecdb');
}
export function drawPlayer(canvas,p){canvas.width=80;canvas.height=92;const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;person(c,12,8,p,4);}
export function drawRoom(canvas,state,p,{arrival=false,title=false,motion=true,focus=''}={}){
 canvas.width=800;canvas.height=400;const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;let start=performance.now(),frame;
 const render=now=>{
 const r=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(x,y,w,h);};
 const text=(s,x,y,col='#c8b9d7',size=8)=>{c.font=`${size}px monospace`;c.fillStyle=col;c.textAlign='center';c.fillText(s,x,y);};
 r(0,0,800,400,'#2c253b');r(0,0,800,12,'#171420');r(0,226,800,174,'#494052');r(0,221,800,7,'#1b1929');
 for(let y=238;y<400;y+=24){r(0,y,800,1,'#605268');for(let x=(y%48?0:30);x<800;x+=60)r(x,y,1,24,'#605268');}
 // Late afternoon city windows.
 for(const x of [178,322,466]){r(x-5,36,127,136,'#1c192b');r(x,41,117,126,'#9f828f');r(x,41,117,50,'#6f6d91');r(x,91,117,36,'#b28d9b');for(let k=0;k<6;k++){const h=18+(k*23+x)%57;r(x+k*21,167-h,18,h,'#39354f');for(let q=0;q<h-6;q+=12)r(x+k*21+6,172-h+q,3,4,'#dcbd8a');}r(x+55,41,5,126,'#2e293f');r(x,102,117,5,'#2e293f');r(x-7,170,131,7,'#8c7287');}
 // Door, coat hook, brief and low sideboard.
 r(21,72,108,164,'#171623');r(26,77,98,154,arrival?'#090a14':'#716178');r(30,81,90,151,arrival?'#111220':'#5b4c66');if(arrival){r(103,81,17,149,'#8a758c');r(102,81,4,149,'#b59aa2');}else r(108,149,4,8,'#e6c287');r(25,235,100,5,'#c2a17f');text('MEETING ROOM 01',75,65,'#c3b2ce',7);
 r(645,57,128,95,'#171623');r(650,62,118,85,'#e9dfca');text('RELEASE / '+String((state.level||0)+1).padStart(2,'0'),709,79,'#51425e',9);for(let i=0;i<3;i++){r(660+i*34,91,26,4,'#8a75a8');r(660+i*34,102,24,17,['#c2ce92','#c7a0ba','#d3b879'][i]);r(660+i*34,123,24,12,'#d0c1b6');}
 r(639,190,135,41,'#332a41');r(642,186,132,8,'#a18086');r(650,201,50,22,'#5c4a62');r(711,201,50,22,'#5c4a62');r(679,208,10,2,'#c9ad8d');r(720,208,10,2,'#c9ad8d');r(659,170,20,16,'#d3c5b8');r(663,161,12,13,'#3a344a');r(717,176,22,9,'#be9d75');
 // People behind the table.
 const npc=[{...players[1],coat:'#d7ac72',hair:'#594251'},{...players[2],coat:'#88b9ad'},{...players[0],coat:'#c3a2d4',hair:'#59394a'}];
 person(c,226,180,npc[0],3);person(c,420,178,npc[1],3);person(c,564,226,npc[2],3);
 // Oversized table with original pixel props.
 r(192,270,399,58,'#30283a');r(201,255,382,58,'#755567');r(193,251,398,17,'#c09288');r(183,246,418,13,'#d1a497');r(205,313,12,28,'#272332');r(567,313,12,28,'#272332');r(218,271,350,3,'#906c78');
 for(const x of [261,442]){r(x,232,40,26,'#252335');r(x+3,235,34,20,'#8fbcaf');r(x+8,241,19,2,'#cfed9b');r(x-6,259,52,4,'#4b435c');}
 r(344,249,37,22,'#eee1c8');r(349,254,22,2,'#9a87a4');r(349,261,15,2,'#9a87a4');r(397,247,12,15,'#e8d9c5');r(400,245,6,2,'#4b3141');r(409,250,5,8,'#e8d9c5');
 // Plants, clock and a very unnecessary confetti cannon.
 for(const x of [144,749]){r(x,297,23,29,'#b08786');r(x-3,293,29,6,'#d1a093');r(x+10,255,4,38,'#6c947c');r(x-3,265,16,12,'#86ae86');r(x+12,252,15,14,'#a1c39b');r(x+1,245,12,15,'#86ae86');}
 r(613,63,19,23,'#191829');r(616,66,13,17,'#e5d6bf');r(622,69,1,8,'#62516e');r(622,76,5,1,'#62516e');
 const elapsed=motion?Math.min(1,(now-start)/1800):1,walk=arrival?elapsed:1;
 const px=arrival?56+walk*76:133,py=arrival?210+walk*90:300;
 person(c,px,py,p,3,arrival&&walk<1?Math.round(Math.sin(now/90)):0);
 text(p.name.toUpperCase(),px+22,py+82,'#d1ee87',8);
 if(focus){const positions={ceo:[247,174],engineer:[441,172],support:[585,220],board:[709,50]};const a=positions[focus];if(a)text('▼',a[0],a[1]-8,'#d1ee87',12);}
 if(title){r(0,0,800,400,'#17142244');}
 if(arrival&&walk<1&&canvas.isConnected)frame=requestAnimationFrame(render);
 };render(start);return ()=>cancelAnimationFrame(frame);
}
