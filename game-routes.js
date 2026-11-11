// Keep game/save identifiers stable while allowing public addresses to change.
export const gamePath=slug=>slug==='undo-the-nudge'?'choice-matters':slug;

export function choiceRedirect(shop=false){
  const target=`../choice-matters/${shop?'loopbox.html':''}`;
  const canonical=`https://codedfemale-dev.github.io/coded-female-games/choice-matters/${shop?'loopbox.html':''}`;
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Choice Matters has moved | Coded Female</title><link rel="canonical" href="${canonical}"><script>location.replace(${JSON.stringify(target)}+location.search+location.hash);</script><meta http-equiv="refresh" content="0; url=${target}"></head><body><main><h1>Choice Matters has moved</h1><p><a href="${target}">Continue to ${shop?'the Loopbox practice shop':'Choice Matters'}</a>.</p></main></body></html>`;
}
