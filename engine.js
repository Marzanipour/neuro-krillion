import {BANK} from './bank.js';
import {resolveGuess} from './guesses.js';

export const normalize = value => String(value).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
export function distance(a,b) {
  let row = Array.from({length:b.length+1},(_,i)=>i);
  for(let i=1;i<=a.length;i++) {
    const next=[i];
    for(let j=1;j<=b.length;j++) next[j]=Math.min(next[j-1]+1,row[j]+1,row[j-1]+(a[i-1]===b[j-1]?0:1));
    row=next;
  }
  return row[b.length];
}
export function matchAnswer(question,input) {
  const text=normalize(input);
  if(!text) return null;
  const exact=question.answers.find(a=>[a.name,...a.aliases].some(s=>normalize(s)===text));
  if(exact) return exact;
  // Only accept an unambiguous typo; short abbreviations must match exactly.
  if(text.length<5) return null;
  const candidates=question.answers.map(answer=>({answer,d:Math.min(...[answer.name,...answer.aliases].filter(s=>normalize(s).length>=5).map(s=>distance(text,normalize(s))))}));
  const best=Math.min(...candidates.map(c=>c.d));
  const winners=candidates.filter(c=>c.d===best);
  return best<=(text.length>=10?2:1)&&winners.length===1?winners[0].answer:null;
}
export function shuffle(items,random=Math.random) {
  const copy=[...items];
  for(let i=copy.length-1;i>0;i--) {const j=Math.floor(random()*(i+1)); [copy[i],copy[j]]=[copy[j],copy[i]];}
  return copy;
}
export class Party {
  constructor(players,settings={},random=Math.random) {
    this.random=random;
    this.settings={lives:2,minTurn:8,heartCap:5,pointsPerHeart:600,...settings};
    this.players=players.map(p=>({...p,hearts:this.settings.lives,meter:0,score:0,answers:0}));
    this.order=shuffle(BANK.map(q=>q.id),random); this.cursor=-1;
    this.phase='lobby'; this.turn=0; this.used=[]; this.log=[]; this.round=0; this.notice='';
  }
  get question(){return BANK.find(q=>q.id===this.questionId);}
  nextQuestion(){
    this.cursor++;
    if(this.cursor>=this.order.length){this.order=shuffle(this.order,this.random);this.cursor=0;}
    this.questionId=this.order[this.cursor];this.used=[];this.round++;
  }
  newFuse(now){this.holderSince=now;this.deadline=now+Math.max(this.settings.minTurn*1000,12000+Math.floor(this.random()*18000));this.fuseStart=now;this.danger=0;}
  start(now=Date.now()){
    if(this.players.filter(p=>!p.spectator&&!p.disconnected).length<2)return false;
    this.players.forEach(p=>{p.hearts=p.spectator||p.disconnected?0:this.settings.lives;p.meter=0;p.score=0;p.answers=0;});
    this.phase='playing';this.turn=this.players.findIndex(p=>p.hearts>0);this.log=[];this.round=0;this.cursor=-1;this.nextQuestion();this.newFuse(now);return true;
  }
  nextTurn(now){
    let next=this.turn;
    do{next=(next+1)%this.players.length;}while(this.players[next].hearts<=0&&next!==this.turn);
    this.turn=next;this.holderSince=now;
    this.deadline=Math.max(this.deadline,now+this.settings.minTurn*1000);
  }
  submit(playerId,input,now=Date.now()){
    if(this.phase!=='playing'||this.players[this.turn]?.id!==playerId)return {ok:false,message:'Wait for your turn.'};
    if(now>=this.deadline){this.tick(now);return {ok:false,message:'The puffer popped!'};}
    const resolution=resolveGuess(this.question,input,this.used);
    if(!resolution.ok)return resolution;
    const answer=resolution.answer;
    const player=this.players[this.turn];
    this.used.push(answer.name); player.score+=answer.points;player.meter+=answer.points;player.answers++;
    let heart=false;
    while(player.meter>=this.settings.pointsPerHeart){player.meter-=this.settings.pointsPerHeart;if(player.hearts<this.settings.heartCap){player.hearts++;heart=true;}}
    this.log.unshift({player:player.name,answer:answer.name,points:answer.points,explanation:answer.explanation,questionId:this.questionId});
    this.log=this.log.slice(0,100);
    this.notice=heart?`${player.name} earned an extra heart!`:`${player.name}: ${answer.name} · +${answer.points}`;
    this.nextTurn(now);
    if(this.used.length===this.question.answers.length){this.nextQuestion();this.notice='All answers found! A fresh category surfaces.';}
    return {ok:true,answer,heart};
  }
  tick(now=Date.now()){
    if(this.phase==='intermission'&&now>=this.resumeAt){this.phase='playing';this.nextQuestion();this.newFuse(now);return true;}
    if(this.phase!=='playing')return false;
    if(now<this.deadline){const danger=Math.min(3,Math.floor(4*(now-this.fuseStart)/(this.deadline-this.fuseStart)));if(danger!==this.danger){this.danger=danger;return true;}return false;}
    const player=this.players[this.turn];player.hearts--;
    this.notice=`POP! ${player.name} lost a heart${player.hearts===0?' and is out':''}.`;
    const alive=this.players.filter(p=>p.hearts>0);
    if(alive.length<=1){this.phase='finished';this.winner=alive[0]?.id;}
    else{this.nextTurn(now);this.phase='intermission';this.resumeAt=now+2800;}
    return true;
  }
  remove(id,now=Date.now()){
    const index=this.players.findIndex(p=>p.id===id);if(index<0)return;
    if(this.phase==='lobby'){this.players.splice(index,1);return;}
    if(this.players[index].spectator){this.players[index].disconnected=true;return;}
    this.players[index].hearts=0;this.players[index].disconnected=true;
    const alive=this.players.filter(p=>p.hearts>0);
    if(alive.length<=1){this.phase='finished';this.winner=alive[0]?.id;}
    else if(index===this.turn){this.nextTurn(now);}
  }
  snapshot(){
    return {settings:this.settings,players:this.players,phase:this.phase,turn:this.turn,questionId:this.questionId,used:this.used,log:this.log,round:this.round,notice:this.notice,winner:this.winner,holderSince:this.holderSince??null,danger:this.danger||0};
  }
}
