import {readFile,writeFile} from 'node:fs/promises';

export const navigationVersion='20261026-return1';
const bar='<nav class="arcade-return-bar" aria-label="Arcade navigation"><a data-arcade-return href="../">← Return to arcade</a></nav>';

export function withArcadeReturn(html){
  if(!html.includes('data-arcade-return')){
    const body=html.match(/<body\b[^>]*>/i);
    if(!body)throw new Error('Game page is missing a body');
    let insertion=body.index+body[0].length;
    // Keep the existing skip link first in the keyboard order.
    const skip=html.slice(insertion).match(/^\s*<a\b(?=[^>]*class=["'][^"']*\bskip\b)[^>]*>[\s\S]*?<\/a>/i);
    if(skip)insertion+=skip[0].length;
    html=html.slice(0,insertion)+bar+html.slice(insertion);
  }
  if(!html.includes('arcade-navigation.css'))html=html.replace(/<\/head>/i,`<link rel="stylesheet" href="../arcade-navigation.css?v=${navigationVersion}"></head>`);
  if(!html.includes('arcade-navigation.js'))html=html.replace(/<\/head>/i,`<script defer src="../arcade-navigation.js?v=${navigationVersion}"></script></head>`);
  return html;
}

export async function ensureArcadeNavigation(slugs){
  for(const slug of new Set(slugs)){
    const file=new URL(`${slug}/index.html`,import.meta.url);
    const before=await readFile(file,'utf8'),after=withArcadeReturn(before);
    if(after!==before)await writeFile(file,after);
  }
}
