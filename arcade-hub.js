// Local catalogue filters. Every game remains reachable without JavaScript.
const buttons=[...document.querySelectorAll('[data-filter]')],cards=[...document.querySelectorAll('[data-discipline]')];
for(const button of buttons)button.addEventListener('click',()=>{
 const category=button.dataset.filter;
 for(const item of buttons)item.setAttribute('aria-pressed',String(item===button));
 let count=0;for(const card of cards){card.hidden=category!=='all'&&card.dataset.discipline!==category;if(!card.hidden)count++;}
 document.querySelector('#game-count').textContent=`${count} ${count===1?'game':'games'} ready to play${category==='all'?'':` / ${button.textContent}`}`;
});
