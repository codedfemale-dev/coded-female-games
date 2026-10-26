// Keep game shortcuts from intercepting keyboard use of the normal return link.
// Native link navigation is deliberately left intact, including without JavaScript.
document.querySelector('[data-arcade-return]')?.addEventListener('keydown',event=>{
  event.stopPropagation();
});
