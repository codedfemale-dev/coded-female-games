// Original low-resolution office scenery and hand-authored character sprites.
export function drawScene(canvas,boss=0,intro=false){
 const ctx=canvas.getContext('2d');canvas.width=480;canvas.height=180;ctx.imageSmoothingEnabled=false;
 const rect=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
 rect(0,0,480,180,'#30273f');rect(0,110,480,70,'#44364e');
 for(let y=116;y<180;y+=16){rect(0,y,480,1,'#54415a');for(let x=(y%32?0:18);x<480;x+=42)rect(x,y,1,16,'#54415a');}
 rect(0,106,480,6,'#211e31');
 for(const x of [26,354]){rect(x-4,13,100,80,'#1d1b30');rect(x,17,92,70,'#645579');rect(x,48,92,39,'#82668d');
  for(let k=0;k<6;k++){const height=12+(k*17%32);rect(x+k*16,87-height,13,height,'#363249');for(let q=0;q<height-4;q+=9)rect(x+k*16+4,89-height+q,3,3,'#d0a57e');}
  rect(x+44,17,4,70,'#211e31');rect(x,50,92,4,'#211e31');}
 rect(177,13,126,50,'#1c1a2c');rect(181,17,118,42,'#3b324d');
 ctx.fillStyle='#d1ee87';ctx.font='bold 12px monospace';ctx.textAlign='center';ctx.fillText('MEGACORP',240,35);ctx.fillStyle='#ac99bc';ctx.font='6px monospace';ctx.fillText('INNOVATION PENDING SINCE 1985',240,48);
 // Conference table and desktop computer.
 rect(164,112,163,10,'#a77978');rect(171,122,149,17,'#765565');rect(180,139,8,28,'#2a2338');rect(305,139,8,28,'#2a2338');
 rect(275,90,29,22,'#28263c');rect(278,93,23,15,'#8fc3b0');rect(287,112,4,3,'#cec2d2');rect(282,115,15,2,'#cec2d2');rect(209,108,28,3,'#ede1c7');rect(213,105,28,3,'#d6c8b8');
 // Potted plant.
 rect(35,136,20,18,'#bf8791');rect(32,132,26,5,'#e7adac');rect(43,97,4,36,'#698c72');rect(32,108,12,10,'#87ae83');rect(47,98,12,10,'#a5c092');rect(34,93,10,10,'#87ae83');
 const colors=['#b99be8','#e7bb77','#90cac5','#e6a2bb','#a6b8ed','#bed68b','#ca9ce9'];
 const sprite=(x,y,hair,coat,skin,flip=false)=>{
  const pixels=['...HHHHH....','..HHHHHHH...','..HSSSSSH...','..HSXSSXS...','...SSSSS....','....SSS.....','..CCWWCCC...','.CCCWWCCCC..','.CSCWCCCSC..','..SCWCCCS...','...CCCCC....','...PPPPP....','...PP.PP....','...PP.PP....','..DDD.DDD...'];
  const palette={H:hair,S:skin,X:'#2c2336',C:coat,W:'#eee4d3',P:'#302b46',D:'#171725'};
  pixels.forEach((row,yy)=>[...row].forEach((p,xx)=>{if(p!=='.')rect(x+(flip?11-xx:xx)*3,y+yy*3,3,3,palette[p]);}));
 };
 rect(106,162,52,7,'#30283c');rect(242,106,40,5,'#211e31');
 sprite(113,121,'#412b4a','#b49cdb','#d49c84');
 sprite(242,66,boss%2?'#d6c4b6':'#432e42',colors[boss],'#e5af90',true);
 if(boss===6&&!intro){sprite(195,70,'#a69aa3','#829caa','#b57a68');sprite(310,72,'#594342','#b1a078','#edc5a0');}
 // Player briefcase; the spoon prototype above the table.
 rect(147,148,15,12,'#c69a6a');rect(151,145,7,3,'#8d6a50');
 rect(247,99,3,10,'#ddd7e6');rect(245,94,7,6,'#ddd7e6');rect(247,95,3,3,'#aaa2bd');
 ctx.fillStyle='#cbb5dc';ctx.font='6px monospace';ctx.textAlign='left';ctx.fillText('YOU / PRODUCT MANAGER',79,176);
}
