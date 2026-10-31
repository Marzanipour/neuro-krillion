// Verified against Krillion's browser-delivered tier and character definitions.
export const TIER_EMOJIS=Object.freeze({0:'⬛',10:'🫧',15:'🤡',30:'🐟',60:'🦑',85:'🏮',100:'🌟'});
export const tierEmoji=points=>TIER_EMOJIS[points]||TIER_EMOJIS[0];
export const TIERS=Object.freeze([[10,'Plankton','#8fa3c4'],[15,'Too Clever','#ff9f43'],[30,'Schooler','#4de3ff'],[60,'Rare','#ff5252'],[85,'Deep Cut','#9d7bff'],[100,'One in a Krillion','#ffd166']].map(([points,name,color])=>({points,name,color,emoji:tierEmoji(points)})));
export const tierFor=points=>TIERS.find(tier=>tier.points===points)||TIERS[0];
export const MASCOTS=Object.freeze([
 {id:'krill',name:'The Krill',key:'krill',alt:'krill',unlockStreak:0},
 {id:'schooler',name:'Schooler',key:'schooler',alt:'schooler fish',unlockStreak:5},
 {id:'rare',name:'Rare Squid',key:'squid',alt:'rare squid',unlockStreak:14},
 {id:'deepcut',name:'Deep Cut Angler',key:'angler',alt:'deep cut angler',unlockStreak:30},
 {id:'evil-krill',name:'Evil Krill',key:'evil',alt:'evil krill with a white body and a red eye',unlockStreak:45}
]);
export function mascotSprite(index=0,{gold=false,now=Date.now()}={}){
 const mascot=MASCOTS[index]||MASCOTS[0],halloween=mascot.id==='krill'&&now>=Date.parse('2026-10-16T00:00:00-04:00')&&now<Date.parse('2026-11-01T00:00:00-04:00');
 return `krillion-${mascot.key}${halloween?'-halloween':''}${gold?'-gold':''}.png`;
}
export const dailyShareUrl=base=>new URL('daily.html',base).href;
export function buildDailyShareText(dive,practice,base){return `Neuro Krillion #${dive.dayNumber} 🦐${practice?' (practice)':''}\n${dive.score}\n\n${dive.results.map(result=>tierEmoji(result.points)).join('')}\n\n${dailyShareUrl(base)}`;}
