import parse from 'https://deno.land/x/date_fns/parse/index.js';
import { el, enUS } from "https://deno.land/x/date_fns/locale/index.js";
import { writeTXT, readTXT } from 'https://deno.land/x/flat/mod.ts';
import { parseOilPage, writeDataFiles } from './postprocess.ts';

const site = 'http://oil.gge.gov.gr/?p=';
let start:number=11505;
let end:number=15154;

for (var i:number=start; i<=end; i++) {
  /*
  let resp = await fetch(site + i);
  if (!(resp.status == 200)) {
    continue;
  }
  let txt = await resp.text();
  await writeTXT('old_data/html_' + i, txt );
  */
  let txt = null;
  try {
    txt = await readTXT('old_data/html_' + i);
  } catch(error) {
    //console.log('File html_' + i + ' does not exist');
    continue;
  }
  let pagedata:[object] = parseOilPage(txt);
  if (!pagedata) {
    console.log('Not parsed' + txt);
  } else if (pagedata.length > 0) {
    writeDataFiles(pagedata);
    continue
  } else {
    console.log('Empty page, not parsed? html_' + i);
  }
}
