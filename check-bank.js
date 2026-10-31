import assert from 'node:assert/strict';
import {BANK,TIERS} from './bank.js';
const ids=new Set();let total=0;
for(const q of BANK){
 assert.ok(!ids.has(q.id),`Duplicate category ${q.id}`);ids.add(q.id);
 assert.ok(q.prompt&&q.topic&&q.hint&&q.source&&q.anchor);
 assert.ok(q.answers.some(a=>a.points===100&&a.name===q.anchor),`Missing intro-level gem: ${q.id}`);
 for(const a of q.answers){assert.ok(a.name&&a.explanation,`Incomplete entry in ${q.id}`);assert.ok(TIERS.some(t=>t.points===a.points),`Unknown points: ${a.name}`);total++;}
}
console.log(`Validated ${BANK.length} categories and ${total} original scored answers.`);
