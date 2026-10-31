import {Party} from './engine.js';
import {BANK} from './bank.js';

// Public, server-authoritative HTTPS transport. No peer-to-peer connectivity needed.
const ROOM_TTL=30*60*1000, RECONNECT_GRACE=90000;
const allowedOrigins=new Set(['https://marzanipour.github.io','http://127.0.0.1:4173','http://localhost:4173','https://neuro-krillion-rooms.amsa-nyu2026.chatgpt.site']);
const cleanName=value=>String(value||'Curious neuron').trim().slice(0,18)||'Curious neuron';
const validBuddy=value=>Number.isInteger(value)&&value>=0&&value<5?value:0;
const token=()=>crypto.randomUUID()+crypto.randomUUID();
const hash=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),b=>b.toString(16).padStart(2,'0')).join('');
export class RoomError extends Error{constructor(message,status=400){super(message);this.status=status;}}
export function hydrateGame(value){return Object.assign(Object.create(Party.prototype),value,{random:Math.random});}
function settings(input={},previous={}){
 const ranges={lives:[1,5],minTurn:[4,15],seats:[2,16],heartCap:[1,10],pointsPerHeart:[100,1500]};
 const output={lives:2,minTurn:8,seats:6,heartCap:5,pointsPerHeart:600,...previous};
 for(const [key,[min,max]] of Object.entries(ranges))if(input[key]!==undefined){const value=Number(input[key]);if(!Number.isInteger(value)||value<min||value>max)throw new RoomError('Invalid '+key+' setting.');output[key]=value;}
 output.heartCap=Math.max(output.heartCap,output.lives);return output;
}
function code(){const chars='ABCDEFGHJKLMNPQRSTUVWXYZ';return Array.from(crypto.getRandomValues(new Uint8Array(4)),b=>chars[b%chars.length]).join('');}
function systemMessage(room,text,now){room.messages.push({id:crypto.randomUUID(),system:true,text,at:now});room.messages=room.messages.slice(-60);}
function onlinePlayers(room){return room.game.players.filter(p=>!p.disconnected);}
function startGame(room,now){
 if(room.game.phase!=='lobby')throw new RoomError('The game has already started.');
 const participants=room.game.players.filter(p=>!p.disconnected&&!p.spectator);
 if(participants.length<2)throw new RoomError('At least two players need to take a seat.');
 room.matchId=crypto.randomUUID();room.game=new Party(room.game.players.filter(p=>!p.disconnected),room.game.settings);room.game.phase='countdown';room.readyAt=now+3000;room.startedAt=now;
 systemMessage(room,'The puffer is waking up…',now);
}
function rematch(room,now,actorId){
 const players=room.game.players.filter(p=>!p.disconnected).map(p=>({...p,spectator:p.id!==actorId&&!p.autoJoin,hearts:p.id===actorId||p.autoJoin?room.game.settings.lives:0,score:0,meter:0,answers:0}));
 room.game=new Party(players,room.game.settings);room.startedAt=null;room.settled=false;room.matchId=crypto.randomUUID();
 systemMessage(room,'A fresh table. Ready for another round?',now);
}
function advance(room,now){
 let changed=false;room.game=hydrateGame(room.game);
 for(const player of [...room.game.players]){
  if(!player.disconnected&&now-(room.seen[player.id]||room.createdAt)>RECONNECT_GRACE){
   player.disconnected=true;
   if(!player.spectator)room.game.remove(player.id,now);
   systemMessage(room,player.name+' disconnected.',now);changed=true;
  }
 }
 if(room.hostId&&!room.game.players.some(p=>p.id===room.hostId&&!p.disconnected)){
  room.hostId=onlinePlayers(room)[0]?.id||null;changed=true;
 }
 if(room.game.phase==='countdown'&&now>=room.readyAt){if(!room.game.start(room.readyAt))room.game.phase='lobby';room.readyAt=null;changed=true;}
 if(room.game.tick(now))changed=true;
 if(room.game.phase==='finished'&&!room.settled){
  room.settled=true;const winner=room.game.players.find(p=>p.id===room.game.winner);
  if(room.rated){const active=room.game.players.filter(p=>!p.spectator);for(const p of active){const change=p.id===winner?.id?24:-Math.max(6,Math.round(24/Math.max(1,active.length-1)));p.ratingChange=change;p.rating=Math.max(100,(p.rating||1200)+change);}}
  systemMessage(room,(winner?.name||'Nobody')+' wins!',now);changed=true;
 }
 if(room.autoStartAt&&room.game.phase==='lobby'&&now>=room.autoStartAt&&onlinePlayers(room).length>=2){startGame(room,now);room.autoStartAt=null;changed=true;}
 return changed;
}
export function publicState(room,playerId,now=Date.now()){
 const game=hydrateGame(room.game);
 const players=game.players.map(({id,name,buddy,hearts,meter,score,answers,disconnected,spectator,rating,ratingChange,autoJoin})=>({id,name,buddy,hearts,meter,score,answers,disconnected:!!disconnected,spectator:!!spectator,rating:rating||1200,ratingChange:ratingChange||0,autoJoin:!!autoJoin}));
 return {...game.snapshot(),players,code:room.code,hostId:room.hostId,myId:playerId,visibility:room.visibility,rated:room.rated,matchId:room.matchId,revision:room.revision,messages:room.chatEnabled?room.messages:[],chatEnabled:room.chatEnabled,typing:room.typing&&now-room.typing.at<10000&&game.players[game.turn]?.id===room.typing.playerId?room.typing:null,serverTime:now,readyAt:room.readyAt||null,autoStartAt:room.autoStartAt||null,question:game.question?{id:game.question.id,prompt:game.question.prompt,topic:game.question.topic,count:game.question.answers.length}:null};
}
export class RoomService{
 constructor(db,clock=()=>Date.now()){this.db=db;this.clock=clock;}
 async health(){await this.db.prepare('SELECT code FROM nk_rooms LIMIT 1').first();return {ok:true,transport:'https',version:2,categories:BANK.length,answers:BANK.reduce((n,q)=>n+q.answers.length,0)};}
 async list(){const now=this.clock();const {results}=await this.db.prepare('SELECT code, data FROM nk_rooms WHERE public = 1 AND updated_at > ? ORDER BY updated_at DESC LIMIT 80').bind(now-120000).all();return {rooms:results.map(r=>JSON.parse(r.data)).filter(r=>onlinePlayers(r).length>0).map(r=>({code:r.code,host:r.game.players.find(p=>p.id===r.hostId)?.name||'Neural party',count:onlinePlayers(r).length,seats:r.game.settings.seats,phase:r.game.phase,rated:r.rated,full:onlinePlayers(r).length>=r.game.settings.seats}))};}
 async create(input={}){
  const now=this.clock(),playerId=crypto.randomUUID(),secret=token();
  const player={id:playerId,name:cleanName(input.name),buddy:validBuddy(input.buddy),rating:Math.max(100,Math.min(3000,Number(input.rating)||1200)),autoJoin:!!input.autoJoin};
  const selected=settings(input.settings);const room={code:code(),hostId:playerId,visibility:input.visibility==='public'?'public':'private',rated:!!input.rated,game:new Party([player],selected),tokens:{[playerId]:await hash(secret)},seen:{[playerId]:now},messages:[],chatEnabled:true,createdAt:now,lastActive:now,revision:1,matchId:crypto.randomUUID(),settled:false,requests:[]};
  systemMessage(room,player.name+' joined.',now);
  for(let i=0;i<5;i++){
   const result=await this.db.prepare('INSERT OR IGNORE INTO nk_rooms (code,data,version,public,updated_at) VALUES (?,?,1,?,?)').bind(room.code,JSON.stringify(room),room.visibility==='public'?1:0,now).run();
   if(result.meta.changes)return {token:secret,playerId,code:room.code,state:publicState(room,playerId,now)};
   room.code=code();
  }
  throw new RoomError('The reef is busy. Please try again.',503);
 }
 async update(roomCode,mutator){
  for(let attempt=0;attempt<12;attempt++){
   const record=await this.db.prepare('SELECT data,version FROM nk_rooms WHERE code = ?').bind(roomCode).first();
   if(!record)throw new RoomError('No room with that code. Ask your host for a fresh invite.',404);
   const room=JSON.parse(record.data),now=this.clock();
   if(now-room.lastActive>ROOM_TTL)throw new RoomError('This room expired. Host a new room to play again.',410);
   const changed=advance(room,now);const result=await mutator(room,now,changed);
   if(!changed&&!result.changed)return typeof result.value==='function'?result.value():result.value;
   room.lastActive=now;
   if(changed||result.visible)room.revision++;
   const saved=await this.db.prepare('UPDATE nk_rooms SET data = ?,version = version+1,public = ?,updated_at = ? WHERE code = ? AND version = ?').bind(JSON.stringify(room),room.visibility==='public'?1:0,now,roomCode,record.version).run();
   if(saved.meta.changes){if(typeof result.value==='function')return result.value();return result.value;}
  }
  throw new RoomError('Another player just updated the room. Please try that action again.',409);
 }
 async join(roomCode,input={}){
  const playerId=crypto.randomUUID(),secret=token(),secretHash=await hash(secret);
  return this.update(roomCode,(room,now)=>{
   if(onlinePlayers(room).length>=room.game.settings.seats)throw new RoomError('This table is full. Try another room.',409);
   const spectator=room.game.phase!=='lobby';
   room.game.players.push({id:playerId,name:cleanName(input.name),buddy:validBuddy(input.buddy),hearts:spectator?0:room.game.settings.lives,meter:0,score:0,answers:0,rating:Math.max(100,Math.min(3000,Number(input.rating)||1200)),spectator,autoJoin:!!input.autoJoin});
   room.tokens[playerId]=secretHash;room.seen[playerId]=now;
   systemMessage(room,cleanName(input.name)+(spectator?' joined to watch.':' joined.'),now);
   if(room.matchmade&&room.game.phase==='lobby'&&onlinePlayers(room).length>=2&&!room.autoStartAt)room.autoStartAt=now+6000;
   return {changed:true,visible:true,value:()=>({token:secret,playerId,code:room.code,state:publicState(room,playerId,now)})};
  });
 }
 async authenticated(roomCode,playerId,secret,action='sync',input={}){
  if(typeof secret!=='string'||secret.length<40||typeof playerId!=='string')throw new RoomError('Your seat could not be verified. Join the room again.',401);
  const supplied=await hash(secret);
  return this.update(roomCode,(room,now,advanced)=>{
   if(room.tokens[playerId]!==supplied)throw new RoomError('Your seat could not be verified. Join the room again.',401);
   let player=room.game.players.find(p=>p.id===playerId);
   if(!player)throw new RoomError('That seat has been released. Join the room again.',410);
   let changed=now-(room.seen[playerId]||0)>10000,visible=false,feedback;
   if(player.disconnected&&action!=='leave'){
    player.disconnected=false;if(room.game.phase==='lobby')player.hearts=room.game.settings.lives;
    else if(player.hearts<=0)player.spectator=true;
    room.hostId??=playerId;changed=true;visible=true;systemMessage(room,player.name+' reconnected.',now);
   }
   if(changed||advanced)room.seen[playerId]=now;
   const requestId=typeof input.requestId==='string'?input.requestId.slice(0,80):null;
   if(action!=='sync'&&requestId&&room.requests.includes(playerId+':'+requestId))return {changed,visible,value:()=>({state:publicState(room,playerId,now),duplicate:true})};
   const host=()=>{if(room.hostId!==playerId)throw new RoomError('Only the host can change this.',403);};
   if(action==='answer'){
    if(typeof input.answer!=='string'||input.answer.length>100)throw new RoomError('Type an answer of 100 characters or fewer.');
    room.typing=null;feedback=room.game.submit(playerId,input.answer,now);if(!feedback.ok&&!feedback.suggestions)throw new RoomError(feedback.message,422);
    changed=feedback.ok;visible=feedback.ok;
   }else if(action==='typing'){if(room.game.phase==='playing'&&room.game.players[room.game.turn]?.id===playerId){room.typing={playerId,text:String(input.text||'').slice(0,100),at:now};changed=true;visible=true;}}else if(action==='start'){host();startGame(room,now);changed=true;visible=true;}
   else if(action==='rematch'){if(room.game.phase!=='finished')throw new RoomError('Finish this game before a rematch.');rematch(room,now,playerId);changed=true;visible=true;}
   else if(action==='ready'){if(room.game.phase!=='lobby')throw new RoomError('Join the next game after this round.');player.spectator=false;player.hearts=room.game.settings.lives;changed=true;visible=true;}
   else if(action==='settings'){
    host();if(room.game.phase!=='lobby')throw new RoomError('Rules can be changed between games.');
    const next=settings(input.settings,room.game.settings);if(next.seats<onlinePlayers(room).length)throw new RoomError('There are already more players than that seat limit.');
    room.game.settings=next;room.game.players.forEach(p=>{if(!p.spectator)p.hearts=next.lives;});changed=true;visible=true;
   }else if(action==='visibility'){host();room.visibility=input.visibility==='public'?'public':'private';changed=true;visible=true;}
   else if(action==='chat'){
    if(!room.chatEnabled)throw new RoomError('Chat is turned off by the host.');
    const text=String(input.text||'').trim().slice(0,200);if(!text)throw new RoomError('Type a message first.');
    const latest=room.messages.filter(m=>m.playerId===playerId).at(-1);if(latest&&now-latest.at<800)throw new RoomError('One message at a time.',429);
    room.messages.push({id:crypto.randomUUID(),playerId,name:player.name,text,at:now});room.messages=room.messages.slice(-60);changed=true;visible=true;
   }else if(action==='chat-toggle'){host();room.chatEnabled=!!input.enabled;changed=true;visible=true;}
   else if(action==='auto-join'){player.autoJoin=!!input.enabled;changed=true;visible=true;}
   else if(action==='kick'){
    host();if(input.playerId===playerId)throw new RoomError('Use Leave room to leave your own table.');
    const target=room.game.players.find(p=>p.id===input.playerId);if(!target)throw new RoomError('That player already left.');
    delete room.tokens[target.id];room.game.remove(target.id,now);systemMessage(room,target.name+' was removed by the host.',now);changed=true;visible=true;
   }else if(action==='leave'){
    if(room.game.phase==='lobby')room.game.remove(playerId,now);else{room.game.remove(playerId,now);player.disconnected=true;}
    delete room.tokens[playerId];delete room.seen[playerId];if(room.hostId===playerId)room.hostId=onlinePlayers(room)[0]?.id||null;
    systemMessage(room,player.name+' left.',now);changed=true;visible=true;
   }else if(action!=='sync')throw new RoomError('Unknown room action.');
   if(requestId&&action!=='sync'){room.requests.push(playerId+':'+requestId);room.requests=room.requests.slice(-100);}
   advance(room,now);
   return {changed,visible,value:()=>({state:publicState(room,playerId,now),feedback})};
  });
 }
 async matchmaking(input={}){
  const rooms=await this.list();const desired=Number(input.seats)||6;
  const candidate=rooms.rooms.find(r=>!r.full&&r.phase==='lobby'&&r.rated===!!input.rated&&r.seats===desired);
  if(candidate){try{return await this.join(candidate.code,input);}catch(error){if(error.status!==409)throw error;}}
  const created=await this.create({...input,visibility:'public',settings:{seats:desired}});
  await this.update(created.code,(room)=>{room.matchmade=true;return {changed:true,value:true};});
  return created;
 }
}
function response(value,status,origin){return Response.json(value,{status,headers:{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type,Authorization,X-Player-Id','Access-Control-Max-Age':'86400','Cache-Control':'no-store','Vary':'Origin','X-Content-Type-Options':'nosniff'}});}
export async function handleRequest(request,env){
 const url=new URL(request.url),origin=request.headers.get('Origin')||url.origin;
 if(!allowedOrigins.has(origin)&&origin!==url.origin)return response({error:'This origin is not allowed.'},403,'null');
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type,Authorization,X-Player-Id','Access-Control-Max-Age':'86400','Vary':'Origin'}});
 if(!env.DB)return response({error:'Room storage is not ready.'},503,origin);
 const service=new RoomService(env.DB);
 try{
  if(request.method==='GET'&&url.pathname==='/api/health')return response(await service.health(),200,origin);
  if(request.method==='GET'&&url.pathname==='/api/rooms')return response(await service.list(),200,origin);
  if(url.pathname==='/'&&request.method==='GET')return new Response('<!doctype html><title>Neuro Krillion Rooms</title><h1>Neuro Krillion room service</h1><p>Server-authoritative neuroscience party rooms.</p><a href="https://marzanipour.github.io/neuro-krillion/">Play Neuro Krillion</a>',{headers:{'Content-Type':'text/html; charset=utf-8'}});
  if(request.method!=='POST')throw new RoomError('Endpoint not found.',404);
  const bodyText=await request.text();if(bodyText.length>6000)throw new RoomError('Request too large.',413);
  let input;try{input=JSON.parse(bodyText||'{}');}catch{throw new RoomError('Invalid request JSON.');}
  if(!input||typeof input!=='object'||Array.isArray(input))throw new RoomError('Invalid request.');
  if(url.pathname==='/api/rooms')return response(await service.create(input),201,origin);
  if(url.pathname==='/api/matchmake')return response(await service.matchmaking(input),200,origin);
  const match=url.pathname.match(/^\/api\/rooms\/([A-Z]{4})\/(join|sync|answer|typing|start|rematch|settings|visibility|chat|chat-toggle|auto-join|ready|kick|leave)$/);
  if(!match)throw new RoomError('Endpoint not found.',404);
  const [,roomCode,action]=match;
  if(action==='join')return response(await service.join(roomCode,input),200,origin);
  const secret=request.headers.get('Authorization')?.replace(/^Bearer /,'')||'';
  const playerId=request.headers.get('X-Player-Id')||'';
  return response(await service.authenticated(roomCode,playerId,secret,action,input),200,origin);
 }catch(error){const status=error instanceof RoomError?error.status:503;return response({error:error instanceof RoomError?error.message:'The room service is temporarily unavailable. Your seat is saved; please retry.'},status,origin);}
}
export default {fetch:handleRequest};
