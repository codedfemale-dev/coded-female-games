// Game rules are independent of the page so boundary cases can be checked.
export function contrast(hex, background = '#FFFFFF') {
  const luminance = colour => {
    const rgb = colour.replace('#','').match(/../g).map(part => parseInt(part,16)/255);
    const linear = rgb.map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4);
    return .2126*linear[0]+.7152*linear[1]+.0722*linear[2];
  };
  const a=luminance(hex), b=luminance(background);
  return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
}

export const implementations = {
  booking: [date=>date.length>0, (date,today)=>date>=today, (date,today)=>date>today],
  tickets: [count=>count*(8-4), count=>count*8-4, count=>count*8-(count>=3?4:0)],
  unread: [messages=>messages.filter(m=>!m.read), messages=>messages.filter(m=>m.read), messages=>messages],
  prices: [prices=>prices.sort((a,b)=>a-b), prices=>[...prices].sort((a,b)=>a-b), prices=>[...prices].sort()],
  active: [member=>Boolean(member), member=>member?.active===true, member=>member.active]
};
export const originalChoice = {booking:0,tickets:1,unread:1,prices:2,active:1};
export function runCodeTests(round, choice) {
  const implementation=implementations[round.task]?.[choice];
  if (!implementation) throw new Error('Unknown code choice');
  return round.tests.map(([label,input,expected])=>{
    const sample=structuredClone(input), before=JSON.stringify(sample);
    try {
      const actual=implementation(sample,'2026-10-12');
      const unchanged=round.task!=='prices' || before===JSON.stringify(sample);
      return {label,actual,expected,unchanged,passed:JSON.stringify(actual)===JSON.stringify(expected)&&unchanged};
    } catch(error) { return {label,expected,error:error.message,passed:false,unchanged:true}; }
  });
}
export const clamp = n => Math.max(0,Math.min(100,n));
export function initialAgent(permissions) {
  return {progress:0,trust:70,budget:200,venuePaid:false,permissions:{...permissions},log:[]};
}
export function applyAgentDecision(state, round, choice, index) {
  const next=structuredClone(state), option=round.options[choice];
  if (!option) throw new Error('Unknown agent decision');
  let [progress,trust,spend]=option.effect, result=option.result, good=option.good;
  // The venue deposit is resolved once at the purchase checkpoint.
  if (index===3 && !next.venuePaid) {next.budget-=120;next.venuePaid=true;}
  const unsafeTool = index===0&&choice===2?'spend':index===1&&choice===0?'send':index===2&&choice===0?'share':index===3&&choice===2?'spend':index===4&&choice!==1?'calendar':null;
  const requiredTool = index===0&&choice===0?'draft':unsafeTool;
  if (requiredTool && !next.permissions[requiredTool]) {
    progress=0;spend=0;trust=unsafeTool?-5:0;
    result=`The ${requiredTool} tool is unavailable. Orbit cannot perform that action. ${unsafeTool?'The boundary prevented the proposed action; the reasoning still needs review.':'A human will need to make the draft or explicitly enable the tool.'}`;
  } else if (index===3 && choice===0 && next.budget<90) {
    progress=10;trust=10;spend=0;
    result=`Only £${next.budget} remains after the venue deposit. You hold the £90 order and ask for a cheaper option.`;
  } else if (index===3 && choice===0 && !next.permissions.spend) {
    result='Orbit records the reviewed order as a draft. A human makes the £90 purchase and records it in the mission log.';
  }
  if (index===0&&choice===2&&spend<0) next.venuePaid=true;
  next.progress=clamp(next.progress+progress);next.trust=clamp(next.trust+trust);next.budget+=spend;
  if (next.budget<0) {result+=` The cap has been exceeded by £${-next.budget}.`;good=false;}
  next.log.push({title:round.title,choice:option.text,result,takeaway:round.takeaway,good});
  return next;
}
export function initialPeople() {return {trust:50,clarity:50,capacity:60,promises:[],log:[]};}
export function applyPeopleDecision(state,round,question,choice) {
  const next=structuredClone(state), response=round.responses[choice], asked=round.questions[question];
  if (!response || !asked) throw new Error('Unknown conversation choice');
  const [trust,clarity,capacity]=response.effect;
  const useful=['need','risk','outcome','truth','impact','agreement'].includes(asked.key);
  next.trust=clamp(next.trust+trust+(useful?5:-5));
  next.clarity=clamp(next.clarity+clarity+(useful?5:0));
  next.capacity=clamp(next.capacity+capacity);
  next.promises.push({key:response.promise,title:round.title,text:response.text});
  const opening=useful?'The useful question makes the need clearer.':'The question leaves the underlying need less clear.';
  next.log.push({title:round.title,question:asked.text,answer:asked.answer,choice:response.text,result:`${opening} ${response.result}`,takeaway:response.takeaway});
  return next;
}
export function makeNotes(game, log, summary) {
  return `${game.title} | Coded Female\n${summary}\n\nFictional learning exercise\n\n${log.map((item,i)=>`${i+1}. ${item.title}\n${item.question?`Question: ${item.question}\n`:''}Decision: ${item.choice}\n${item.result}\nTakeaway: ${item.takeaway}`).join('\n\n')}\n\n${game.lesson}\n\nFurther reading\n${game.sources.map(([title,url])=>`${title}: ${url}`).join('\n')}\n`;
}
