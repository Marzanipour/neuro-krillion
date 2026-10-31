import test from 'node:test';
import assert from 'node:assert/strict';
import {BANK} from './bank.js';
import {Party,matchAnswer,normalize} from './engine.js';

const players=[{id:'a',name:'Ada'},{id:'b',name:'Ben'},{id:'c',name:'Cam'}];
function party(settings={}){const game=new Party(players,settings,()=>.2);game.start(1000);game.questionId='transmitters';game.used=[];return game;}

test('every category has a 100-point answer accessible from an intro course',()=>{
 assert.ok(BANK.length>=111);
 for(const q of BANK){assert.ok(q.answers.some(a=>a.name===q.anchor&&a.points===100),q.id);assert.ok(q.answers.length>=7);}
});
test('aliases and abbreviations resolve without changing scientific identity',()=>{
 const q=BANK.find(q=>q.id==='transmitters');
 assert.equal(matchAnswer(q,'ACh').name,'Acetylcholine');
 assert.equal(matchAnswer(q,'5-HT').name,'Serotonin');
 assert.equal(matchAnswer(q,'noradrenaline').name,'Norepinephrine');
 assert.equal(matchAnswer(BANK.find(q=>q.id==='glia'),'Muller cell').name,'Müller glia');
});
test('unambiguous typos are accepted, random words and short near-misses are rejected',()=>{
 const q=BANK.find(q=>q.id==='transmitters');
 assert.equal(matchAnswer(q,'acetlycholine').name,'Acetylcholine');
 assert.equal(matchAnswer(q,'dopamime').name,'Dopamine');
 assert.equal(matchAnswer(q,'coffee'),null);
 assert.equal(matchAnswer(q,'GAAB'),null);
 assert.equal(matchAnswer(q,''),null);
});
test('an ambiguous spelling correction does not silently choose an answer',()=>{
 const q={answers:[{name:'abcde',aliases:[]},{name:'abcdf',aliases:[]}]};
 assert.equal(matchAnswer(q,'abcdg'),null);
});
test('canonical names and aliases never collide within a category',()=>{
 for(const q of BANK){const seen=new Map();for(const a of q.answers)for(const alias of [a.name,...a.aliases]){const key=normalize(alias);assert.ok(!seen.has(key)||seen.get(key)===a.name,`${q.id}: ${alias} collides with ${seen.get(key)}`);seen.set(key,a.name);}}
});
test('a valid answer passes the puffer and awards its exact rarity points',()=>{
 const game=party();const result=game.submit('a','ACh',2000);
 assert.equal(result.ok,true);assert.equal(game.players[0].score,100);assert.equal(game.turn,1);assert.deepEqual(game.used,['Acetylcholine']);
});
test('wrong answers preserve the holder, fuse and score',()=>{
 const game=party();const deadline=game.deadline;
 assert.equal(game.submit('a','banana',2000).ok,false);
 assert.equal(game.turn,0);assert.equal(game.deadline,deadline);assert.equal(game.players[0].score,0);
});
test('out-of-turn submissions are rejected',()=>{
 const game=party();assert.equal(game.submit('b','dopamine',2000).ok,false);assert.equal(game.used.length,0);
});
test('an alias cannot bypass the no-repeats rule',()=>{
 const game=party();game.submit('a','ACh',2000);
 assert.equal(game.submit('b','acetylcholine',2500).ok,false);assert.equal(game.turn,1);
});
test('a late pass guarantees the recipient the configured minimum turn',()=>{
 const game=party({minTurn:8});const passTime=game.deadline-500;
 game.submit('a','dopamine',passTime);
 assert.equal(game.deadline,passTime+8000);
});
test('an early pass does not restart the hidden fuse',()=>{
 const game=party();const deadline=game.deadline;game.submit('a','dopamine',2000);assert.equal(game.deadline,deadline);
});
test('rarity points earn a heart and retain overflow',()=>{
 const game=party({pointsPerHeart:100});game.players[0].meter=30;
 const result=game.submit('a','ACh',2000);
 assert.equal(result.heart,true);assert.equal(game.players[0].hearts,3);assert.equal(game.players[0].meter,30);
});
test('bonus hearts cannot exceed the room cap',()=>{
 const game=party({pointsPerHeart:100,heartCap:2});game.submit('a','ACh',2000);assert.equal(game.players[0].hearts,2);
});
test('the puffer pops once and a new category appears after the intermission',()=>{
 const game=party();const deadline=game.deadline;
 assert.equal(game.tick(deadline),true);assert.equal(game.players[0].hearts,1);assert.equal(game.phase,'intermission');
 game.tick(deadline+1000);assert.equal(game.players[0].hearts,1);
 game.tick(deadline+2800);assert.equal(game.phase,'playing');assert.equal(game.round,2);assert.equal(game.used.length,0);
});
test('an answer at the exact deadline loses a heart and scores nothing',()=>{
 const game=party();assert.equal(game.submit('a','ACh',game.deadline).ok,false);assert.equal(game.players[0].score,0);assert.equal(game.players[0].hearts,1);
});
test('eliminated players are skipped and the last surviving player wins',()=>{
 const game=party({lives:1});game.tick(game.deadline);assert.equal(game.players[0].hearts,0);assert.equal(game.turn,1);
 game.tick(game.resumeAt);game.tick(game.deadline);assert.equal(game.phase,'finished');assert.equal(game.winner,'c');
});
test('exhausting a bank gives a fresh category without costing a heart',()=>{
 const game=party();const q=game.question;game.used=q.answers.slice(0,-1).map(a=>a.name);
 game.submit('a',q.answers.at(-1).name,2000);assert.notEqual(game.questionId,'transmitters');assert.equal(game.round,2);assert.equal(game.players[0].hearts,2);
});
test('question order visits each category before repeating',()=>{
 const game=party();game.cursor=-1;const found=new Set();for(let i=0;i<BANK.length;i++){game.nextQuestion();found.add(game.questionId);}assert.equal(found.size,BANK.length);
});
test('disconnecting the current player passes to the next survivor',()=>{
 const game=party();game.remove('a',2000);assert.equal(game.turn,1);assert.equal(game.players[0].hearts,0);assert.equal(game.players[0].disconnected,true);
});
test('public snapshots do not disclose the exact hidden fuse',()=>{
 const game=party();assert.equal(game.snapshot().deadline,undefined);assert.equal(game.snapshot().fuseStart,undefined);
});
