// Reproducible keyboard-and-descent audit using https://github.com/morluto/rea.
import {mkdir,writeFile,mkdtemp} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve,join} from 'node:path';
import {spawn} from 'node:child_process';
import {DailyDive} from './daily.js';
const out=resolve('.artifacts/rea-daily-audit');await mkdir(out,{recursive:true});
const trusted=await mkdtemp(join(tmpdir(),'neuro-dive-rea-'));
const cli=process.env.PNPM_BIN||'pnpm',chrome=process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const locator=selector=>({kind:'css',selector}),dive=new DailyDive();
const scenario={browser:{mode:'launch',executable_path:chrome},start_url:{url:process.env.NEURO_URL||'http://127.0.0.1:4173/',query:[{name:'daily',value:{source:'literal',value:'practice'}}]},environment:{reduced_motion:'no-preference',timezone:'America/New_York',viewport:{width:1280,height:900,device_scale_factor:1}},actions:[
 {step_id:'intro',action:'wait_for',locator:locator('[data-action="daily-begin"]'),state:'visible',timeout_ms:15000},
 {step_id:'enter-begins',action:'press',locator:locator('body'),key:'Enter'},
 {step_id:'answer-ready',action:'wait_for',locator:locator('#daily-answer'),state:'visible',timeout_ms:10000},
 {step_id:'intro-answer',action:'fill',locator:locator('#daily-answer'),value:{source:'literal',value:dive.question.anchor}},
 {step_id:'enter-submits',action:'press',locator:locator('#daily-answer'),key:'Enter'},
 {step_id:'moving-shrimp',action:'wait_for_timeout',duration_ms:600},
 {step_id:'reveal-after-dive',action:'wait_for',locator:locator('.daily-reveal'),state:'visible',timeout_ms:10000},
 {step_id:'enter-descends',action:'press',locator:locator('body'),key:'Enter'},
 {step_id:'second-prompt',action:'wait_for',locator:locator('#daily-answer'),state:'visible',timeout_ms:10000}
],capture:{after_each_step:['dom','accessibility','screenshot'],at_end:['url'],events:['page-errors']}};
const input=join(out,'scenario.json');await writeFile(input,JSON.stringify(scenario,null,2));
const raw=await new Promise((yes,no)=>{const child=spawn(cli,['dlx','rea-agents@6.8.0','capture-browser-scenario',input,'--json'],{cwd:trusted,stdio:['ignore','pipe','pipe']});let output='',error='';child.stdout.on('data',d=>output+=d);child.stderr.on('data',d=>error+=d);child.on('error',no);child.on('close',code=>code?no(new Error(error||output)):yes(output));});
await writeFile(join(out,'capture.json'),raw);const evidence=JSON.parse(raw),steps=evidence.normalized_result.steps;
for(const step of steps){const shot=step.artifacts?.screenshot;if(shot?.state==='captured')await writeFile(join(out,step.step_id+'.png'),Buffer.from(shot.value.data_base64,'base64'));}
console.log(JSON.stringify({evidenceId:evidence.evidence_id,steps:steps.map(s=>({id:s.step_id,status:s.status})),cleanup:evidence.normalized_result.browser?.cleanup,output:out}));
if(steps.some(s=>s.status!=='completed'))process.exitCode=1;
