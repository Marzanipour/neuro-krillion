// Suggestions never award points. The player must explicitly resubmit a canonical answer.
const clean=value=>String(value).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
function edits(a,b){const rows=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0));for(let i=0;i<=a.length;i++)rows[i][0]=i;for(let j=0;j<=b.length;j++)rows[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++){rows[i][j]=Math.min(rows[i-1][j]+1,rows[i][j-1]+1,rows[i-1][j-1]+(a[i-1]!==b[j-1]));if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])rows[i][j]=Math.min(rows[i][j],rows[i-2][j-2]+1);}return rows[a.length][b.length];}
function dice(a,b){const pairs=new Map();for(let i=1;i<a.length;i++){const p=a.slice(i-1,i+1);pairs.set(p,(pairs.get(p)||0)+1);}let shared=0;for(let i=1;i<b.length;i++){const p=b.slice(i-1,i+1);if(pairs.get(p)>0){shared++;pairs.set(p,pairs.get(p)-1);}}return 2*shared/Math.max(1,a.length+b.length-2);}
const sound=s=>s.replace(/ph/g,'f').replace(/th/g,'t').replace(/ch/g,'k').replace(/[cy]/g,c=>c==='c'?'k':'i').replace(/[aeiou]/g,'').replace(/(.)\1+/g,'$1');
export function rankSuggestions(question,input,used=[]){
 const text=clean(input);if(text.length<4||text.length>100)return [];
 const found=question.answers.filter(a=>!used.includes(a.name)).map(answer=>{
  let score=0;
  for(const alias of [answer.name,...answer.aliases]){const candidate=clean(alias),size=Math.max(text.length,candidate.length),d=edits(text,candidate);if(candidate.length<4||Math.min(text.length,candidate.length)/size<.48)continue;if(size<=4&&d>1)continue;if(d>Math.max(1,Math.floor(size*.46)))continue;const similarity=1-d/size,grams=dice(text,candidate),phonetic=sound(text).length>=3&&sound(text)===sound(candidate)?1:0;const value=.68*similarity+.25*grams+.07*phonetic;if(similarity>=.54&&(grams>=.3||phonetic||similarity>=.75))score=Math.max(score,value);}
  return {answer,score};
 }).filter(c=>c.score>=.53).sort((a,b)=>b.score-a.score||a.answer.name.localeCompare(b.answer.name));
 return found.slice(0,3);
}
export function resolveGuess(question,input,used=[]){
 const text=clean(input),exact=question.answers.find(a=>[a.name,...a.aliases].some(s=>clean(s)===text));
 if(exact)return used.includes(exact.name)?{ok:false,message:'Already said! Find a different answer.'}:{ok:true,answer:exact};
 const ranked=rankSuggestions(question,input,used);if(!ranked.length)return {ok:false,message:'Not in this category’s bank. Try another answer!'};
 const clear=ranked.length===1||ranked[0].score-ranked[1].score>=.075;
 return {ok:false,correction:clear?ranked[0].answer.name:null,suggestions:ranked.map(c=>c.answer.name),message:clear?`Corrected to ${ranked[0].answer.name}. Press SEND again to submit.`:'A few answers sound close. Choose one, then press SEND again.'};
}
