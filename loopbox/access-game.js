// Only Undo the Nudge loads this enhancement; all other game engines stay unchanged.
import '../game.js?v=20261018-arcade1';
import {mountLoopbox} from './app.js';

const app=document.getElementById('app');
function enhanceLoopbox() {
  const results=app.querySelector('.results');
  if(results&&!results.querySelector('#loopbox-shop')) {
    const practice=results.querySelector('.practice');
    if(practice) {
      const intro=document.createElement('p');intro.className='lead';
      intro.textContent='Now try the subscription you redesigned. Review the total, make an optional choice and cancel through your practice account.';
      const host=document.createElement('div');host.id='loopbox-shop';
      practice.before(intro,host);
      results.querySelector('.result-stat').textContent='5 redesigns completed · Ready to try the subscription journey';
      mountLoopbox(host);
    }
  }
  const hero=app.querySelector('.hero-copy');
  if(hero&&!hero.querySelector('a[href="./loopbox.html"]')) {
    const paragraph=document.createElement('p');paragraph.className='instruction';
    const link=document.createElement('a');link.href='./loopbox.html';link.textContent='Try the repaired Loopbox shop';
    paragraph.append(link);hero.querySelector('#start').after(paragraph);
  }
}
if(app&&document.body.dataset.game==='undo-the-nudge') {
  new MutationObserver(enhanceLoopbox).observe(app,{childList:true});
  enhanceLoopbox();
}
