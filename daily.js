import {BANK} from './bank.js';
import {shuffle} from './engine.js';
import {resolveGuess} from './guesses.js';
export const ANSWER_MS=25000,PREVIEW_MS=2500;
const dateFormat=new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'});
export const dailyDate=(now=Date.now())=>dateFormat.format(now);
export function nextDailyReset(now=Date.now()){const date=dailyDate(now);let low=now,high=now+36*3600000;while(high-low>1){const middle=Math.floor((low+high)/2);if(dailyDate(middle)===date)low=middle;else high=middle;}return high;}
function seeded(seed){let h=2166136261;for(const c of seed)h=Math.imul(h^c.charCodeAt(0),16777619);return ()=>{h+=0x6D2B79F5;let t=h;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}
export class DailyDive{
 constructor(date=dailyDate(),saved=null){this.date=date;this.questionIds=shuffle(BANK,seeded('neuro-dive-v3:'+date)).slice(0,7).map(q=>q.id);this.index=0;this.phase='intro';this.results=[];this.draft='';this.correction=null;this.suggestions=[];this.deadline=null;this.previewAt=null;this.pausedAt=null;if(saved?.date===date&&saved.version===3){Object.assign(this,saved);if(!this.questionIds.every(id=>BANK.some(q=>q.id===id)))throw new Error('This saved dive belongs to an older bank.');}}
 get question(){return BANK.find(q=>q.id===this.questionIds[this.index]);}
 get score(){return this.results.reduce((n,r)=>n+(r.points||0),0);}
 get depth(){return this.score*10;}
 get done(){return this.phase==='done';}
 get dayNumber(){return Math.floor((Date.parse(this.date+'T12:00:00Z')-Date.parse('2026-10-31T12:00:00Z'))/86400000)+1;}
 begin(now=Date.now()){if(this.phase!=='intro')return false;this.phase='preview';this.previewAt=now+PREVIEW_MS;return true;}
 tick(now=Date.now()){if(this.pausedAt!==null)return false;if(this.phase==='preview'&&now>=this.previewAt){this.phase='answering';this.deadline=this.previewAt+ANSWER_MS;if(now>=this.deadline)this.finish(null,'timeout');return true;}if(this.phase==='answering'&&now>=this.deadline){const last=this.draft.trim()&&!this.correction&&!this.suggestions.length?resolveGuess(this.question,this.draft):null;this.finish(last?.ok?last.answer:null,'timeout');return true;}return false;}
 submit(input,now=Date.now()){if(this.pausedAt!==null||this.phase!=='answering')return {ok:false,message:'Wait for the descent.'};if(now>=this.deadline){this.tick(now);return {ok:false,message:'Time is up.'};}this.draft=input;const result=resolveGuess(this.question,input);if(result.ok)this.finish(result.answer);else{this.correction=result.correction;this.suggestions=result.suggestions||[];if(result.correction)this.draft=result.correction;}return result;}
 finish(answer,reason='answer'){if(this.phase!=='answering')return;this.results.push({questionId:this.question.id,raw:this.draft,answer:answer?.name||null,points:answer?.points||0,explanation:answer?.explanation||null,reason});this.phase='feedback';this.deadline=null;this.correction=null;this.suggestions=[];}
 next(now=Date.now()){if(this.phase!=='feedback')return false;if(this.index===6){this.phase='done';return true;}this.index++;this.draft='';this.correction=null;this.suggestions=[];this.phase='preview';this.previewAt=now+PREVIEW_MS;return true;}
 pause(now=Date.now()){if(['preview','answering'].includes(this.phase)&&this.pausedAt===null)this.pausedAt=now;}
 resume(now=Date.now()){if(this.pausedAt===null)return;const shift=Math.max(0,now-this.pausedAt);if(this.deadline!==null)this.deadline+=shift;if(this.previewAt!==null)this.previewAt+=shift;this.pausedAt=null;}
 snapshot(){return {...this,version:3};}
}
