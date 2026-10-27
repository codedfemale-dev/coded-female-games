// Only Common Ground opts into the repaired website. The published shared
// engine and every other game's entry point remain unchanged.
import '../game.js?v=20261018-arcade1';
import {mountBooking} from './booking.js';

const app=document.getElementById('app');
function enhanceCommonGround() {
  const results=app.querySelector('.results');
  if(results&&!results.querySelector('#common-ground-booking')) {
    const illustration=results.querySelector('.result-status');
    if(illustration) {
      const intro=document.createElement('p');
      intro.className='lead';
      intro.textContent='Now try the website you repaired. Choose a fictional workshop, correct an error and complete a practice booking.';
      const booking=document.createElement('div');
      booking.id='common-ground-booking';
      illustration.replaceWith(intro,booking);
      results.querySelector('.result-stat').textContent='5 repairs completed · Ready to try the booking journey';
      mountBooking(booking);
    }
  }
  const hero=app.querySelector('.hero-copy');
  if(hero&&!hero.querySelector('a[href="./booking.html"]')) {
    const paragraph=document.createElement('p');
    paragraph.className='instruction';
    const link=document.createElement('a');
    link.href='./booking.html';
    link.textContent='Try the repaired booking website';
    paragraph.append(link);
    hero.querySelector('#start').after(paragraph);
  }
}

if(app&&document.body.dataset.game==='open-for-everyone') {
  // Whole-screen changes include completion and replay. Child interactions in
  // the booking or reflection cannot remount and reset the booking journey.
  new MutationObserver(enhanceCommonGround).observe(app,{childList:true});
  enhanceCommonGround();
}
