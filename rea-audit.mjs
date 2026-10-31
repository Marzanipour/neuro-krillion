import {mkdir,writeFile,readFile,mkdtemp} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve,join} from 'node:path';
import {spawn} from 'node:child_process';
const out=resolve('.artifacts/rea-audit');await mkdir(out,{recursive:true});
const trusted=await mkdtemp(join(tmpdir(),'neuro-rea-'));
const chrome=process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
function rea(args){return new Promise((yes,no)=>{const child=spawn(process.env.PNPM_BIN||'pnpm',['dlx','rea-agents@6.8.0',...args],{cwd:trusted,stdio:['ignore','pipe','pipe']});let stdout='',stderr='';child.stdout.on('data',d=>stdout+=d);child.stderr.on('data',d=>stderr+=d);child.on('error',no);child.on('close',code=>code?no(new Error(stderr||stdout||'REA failed')):yes(stdout));});}
for(const [size,width,height] of [['desktop',1280,900],['mobile',390,844]]){
 const captures={};
 for(const [target,url] of [['reference','https://krillion.io/party'],['rebuild',process.env.NEURO_URL||'http://127.0.0.1:4173/']]){
  const scenario={browser:{mode:'launch',executable_path:chrome},start_url:{url},environment:{viewport:{width,height,device_scale_factor:1}},actions:[{step_id:'lobby-ready',action:'wait_for',locator:{kind:'css',selector:'.pf-door'},state:'visible',timeout_ms:20000},{step_id:'art-ready',action:'wait_for_timeout',duration_ms:1500}],capture:{at_end:['dom','accessibility','screenshot','url'],events:['page-errors']}};
  const path=join(out,`${target}-${size}-scenario.json`);await writeFile(path,JSON.stringify(scenario,null,2));
  console.log(`Capturing ${target} at ${width}×${height}…`);const raw=await rea(['capture-browser-scenario',path,'--json']);await writeFile(join(out,`${target}-${size}.json`),raw);
  const data=JSON.parse(raw),step=data.normalized_result.steps.at(-1),shot=step.artifacts.screenshot;
  if(step.status!=='completed'||shot.state!=='captured')throw new Error(`${target} capture incomplete; inspect evidence.`);
  const screenshot=join(out,`${target}-${size}-screenshot.json`);await writeFile(screenshot,JSON.stringify(shot.value));await writeFile(join(out,`${target}-${size}.png`),Buffer.from(shot.value.data_base64,'base64'));captures[target]=screenshot;
 }
 const comparison=await rea(['compare-web-screenshots',captures.reference,captures.rebuild,'--json']);await writeFile(join(out,`${size}-comparison.json`),comparison);
}
console.log(`Evidence saved in ${out}. Read PARITY.md before interpreting differences.`);
