import {BANK,TIERS,tierFor} from './bank.js';
import {Party,matchAnswer,shuffle} from './engine.js';

const $=selector=>document.querySelector(selector);
const app=$('#app');
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const store={get(key,fallback){try{return JSON.parse(localStorage.getItem('neuro-'+key))??fallback;}catch{return fallback;}},set(key,value){try{localStorage.setItem('neuro-'+key,JSON.stringify(value));}catch{}}};
let name=store.get('name',''),buddy=store.get('buddy',0),tableSize=4,sound=false,audio,toastTimer;
let room=null,game=null,view='home',peer=null,hostConnection=null,connections=new Map(),networkTimer,roomSerial=0,botTimer,botKey='',recorded=false,daily=null;
const id=crypto.randomUUID();
const ownId=()=>room?.myId||id;
const buddies=[['KRILL','first neuron','#ed8c9d'],['SCHOOLER','quick thinker','#83c9e5'],['SQUID','deep thinker','#b79ce4'],['ANGLER','bright idea','#f0d086'],['NEURON','well connected','#91cdb9']];
function sprite(index=0,cls=''){
 const color=buddies[index]?.[2]||buddies[0][2];
 const shapes=[
 '<path d="M11 8h15v5h5v9h-5v5H13v-5h-6V11h4zM10 26h17v6H14v5h-7v-6h3zM24 3h8v4h-8z"/><path d="M5 13H1v9h5zM31 17h8v5h-8z"/>',
 '<path d="M9 10h20v5h5v11h-5v5H9v-5H4V15h5zM34 16h5v12h-5zM17 5h8v5h-8z"/>',
 '<path d="M13 3h14v5h5v16H8V8h5zM8 23h5v13H8zM17 23h5v16h-5zM26 23h5v13h-5zM3 22h5v10H3zM31 22h5v10h-5z"/>',
 '<path d="M8 15h22v5h5v13H8v-5H3V20h5zM28 17h7v-7h-9V5H15v5h11v7zM35 8h5v7h-5z"/>',
 '<path d="M13 12h14v15H13zM17 5h6v9h-6zM17 26h6v12h-6zM3 17h12v6H3zM25 17h12v6H25zM7 6h5v8H7zM28 6h5v8h-5zM6 28h6v8H6zM28 28h6v8h-6z"/>'
 ];
 return `<svg class="${cls}" viewBox="0 0 42 42" shape-rendering="crispEdges" aria-hidden="true"><g fill="${color}">${shapes[index]||shapes[0]}</g><path fill="#f0eee1" d="M14 15h6v7h-6zM25 15h6v7h-6z"/><path fill="#142036" d="M17 17h3v5h-3zM28 17h3v5h-3z"/></svg>`;
}
function hero(){return `<section class="hero"><div class="brand-small">NEURO</div><h1 class="brand">KRILLION</h1><div class="subtitle">PUFFER PARTY</div><p>A little neuroscience. A little nerve.<br>Name an answer and pass the puffer before it pops.<br><strong>Last brain floating wins.</strong></p><div class="sleeping-puffer"><img src="puffer.svg" alt="A sleepy pixel-art pufferfish"></div></section>`;}
function showHome(){
 view='home';daily=null;
 app.innerHTML=`${hero()}<div class="lobby">
 <section class="panel"><div class="panel-heading"><h3>WHO’S PLAYING</h3><button data-action="rules">HOW TO PLAY</button></div><label class="label" for="player-name">YOUR NAME</label><input id="player-name" autocomplete="nickname" maxlength="18" placeholder="What the reef calls you" value="${escape(name)}"><div class="buddy-list" role="group" aria-label="Choose your buddy">${buddies.map((b,i)=>`<button class="buddy ${buddy===i?'selected':''}" data-buddy="${i}" aria-pressed="${buddy===i}">${sprite(i)}<span>${b[0]}</span><span class="buddy-sub">${b[1]}</span></button>`).join('')}</div></section>
 <section class="panel play-panel"><div class="panel-heading"><h3>PLAY NOW</h3><span class="chip">NEURO EDITION</span></div><div class="segmented" role="group" aria-label="Table size">${[[2,'1V1'],[3,'3S'],[4,'4–6'],[8,'8–10']].map(([n,label])=>`<button data-size="${n}" aria-pressed="${tableSize===n}" class="${tableSize===n?'selected':''}">${label}</button>`).join('')}</div><p class="table-caption">${tableSize===2?'you and one other brain':tableSize===3?'three brains, one puffer':tableSize===4?'four to six players':'eight to ten players'}</p><div class="button-row"><div><button class="big-button primary" data-action="practice">▶ QUICK PLAY ◀</button><p class="button-caption">you + practice bots</p></div><div><button class="big-button" data-action="couch">LOCAL PARTY</button><p class="button-caption">friends · one screen</p></div></div><p class="section-note">No account. No paywall. Just your neurons.</p></section>
 <section class="panel"><div class="panel-heading"><h3>PLAY WITH FRIENDS</h3></div><button class="big-button" data-action="host">▼ HOST AN ONLINE ROOM ▼</button><p class="section-note">A private table. A code for your friends. 2–10 players.</p></section>
 <section class="panel"><div class="panel-heading"><h3>JOIN BY CODE</h3></div><form class="join-form" id="join-form"><label class="sr-only" for="join-code" hidden>Room code</label><input id="join-code" aria-label="Room code" placeholder="NEURON" maxlength="6" pattern="[A-Za-z]{6}" autocomplete="off" value="${escape(new URLSearchParams(location.search).get('room')||'')}"><button type="submit">JOIN ▸</button></form></section>
 <button class="study-link" data-action="bank">STUDY THE ANSWER BANK <span>↗</span></button><div class="lobby-bottom"><span>${BANK.length} CATEGORIES</span><span>${BANK.reduce((s,q)=>s+q.answers.length,0)} ANSWERS</span><button data-action="daily">DAILY DIVE ↗</button></div></div>`;
}
function toast(message){$('#toast').textContent=message;$('#toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').hidden=true,4500);}
function beep(kind='pass'){
 if(!sound)return;try{audio??=new (window.AudioContext||window.webkitAudioContext)();audio.resume();const oscillator=audio.createOscillator(),gain=audio.createGain();oscillator.type='triangle';oscillator.frequency.setValueAtTime(kind==='pop'?95:kind==='rare'?700:440,audio.currentTime);oscillator.frequency.exponentialRampToValueAtTime(kind==='pop'?40:880,audio.currentTime+.13);gain.gain.setValueAtTime(.06,audio.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.23);oscillator.connect(gain).connect(audio.destination);oscillator.start();oscillator.stop(audio.currentTime+.25);}catch{}
}
function modal(title,content,eyebrow='NEURO KRILLION'){$('#modal-eyebrow').textContent=eyebrow;$('#modal-content').innerHTML=`<h2>${title}</h2>${content}`;if(!$('#modal').open)$('#modal').showModal();}
function rules(){modal('HOW TO PLAY',`<ol class="rules-list"><li>Answer. Pass. Don’t pop.<p>Name anything in the neuroscience category. A valid answer passes the puffer to the next player. The hidden, random fuse keeps burning. Every new holder gets at least the room’s minimum turn.</p></li><li>A rarer answer buys you breathing room.<p>Earn 10–100 points per answer. Every 600 points earns a heart, up to five by default. Your host can adjust these rules.</p></li><li>No repeats in the same category.<p>Once an answer is said, it’s off the table until the category changes. Wrong answers cost time. A pop costs a heart. Last player with a heart wins.</p></li></ol><div class="tier-list">${tierRows()}</div><p class="modal-note">Scores are hand-curated difficulty tiers, not measured answer frequencies. Each category includes a 100-point gem drawn from introductory neuroscience. Standard abbreviations and unambiguous small typos are accepted.</p><button class="big-button" data-action="close-modal">GOT IT</button>`);}
function tierRows(){return TIERS.map(t=>`<div class="tier-row" style="color:${t.color}"><span>${t.name}</span><span>${t.points} pts</span></div>`).join('');}
function bank(){modal('DEEPER KNOWLEDGE',`<p class="modal-note">Learn a little, dive a little deeper. Every category has a textbook-level 100-point gem, plus specialized answers worth 85. Your knowledge can win the highest score.</p><input class="bank-search" id="bank-search" aria-label="Search questions and answers" placeholder="Search a topic or an answer…"><p class="bank-total">${BANK.length} original categories · ${BANK.reduce((s,q)=>s+q.answers.length,0)} scored answers</p><div id="bank-list"></div><p class="modal-note">Scoring is editorial, not a survey of players. Question sets are deliberately bounded; a scientifically valid response can be absent. Definitions follow introductory neuroscience; see the reference linked in each category.</p>`,'THE ANSWER BANK');renderBank('');}
function renderBank(query){const text=query.toLowerCase();$('#bank-list').innerHTML=BANK.filter(q=>`${q.prompt} ${q.topic} ${q.answers.map(a=>a.name+' '+a.aliases.join(' ')).join(' ')}`.toLowerCase().includes(text)).map(q=>`<details class="bank-category" ${text?'open':''}><summary><span class="topic">${q.topic}</span>${q.prompt}</summary><div class="anchor-note">✧ Intro-course gem: ${q.anchor} · 100 points</div>${[...q.answers].sort((a,b)=>b.points-a.points).map(a=>`<div class="bank-entry"><div class="bank-entry-top"><span>${a.name}</span><span class="tier-badge" style="color:${tierFor(a.points).color}">${tierFor(a.points).name.toUpperCase()} · ${a.points}</span></div><p>${a.explanation}</p></div>`).join('')}<p class="modal-note"><a href="${q.source}" target="_blank" rel="noopener">Read the background ↗</a></p></details>`).join('')||'<p class="modal-note">No matches. Try “memory”, “GABA” or “optic”.</p>';}
function readName(){name=$('#player-name')?.value.trim()||name||'Curious neuron';name=name.slice(0,18);store.set('name',name);}
function createLocal(mode){
 readName();cleanupRoom();view='room';room={code:mode==='practice'?'PRACTICE':'LOCAL',mode,isHost:true};
 const players=[{id,name,buddy}];
 if(mode==='practice'){const names=['Axon Rose','Glia Girl','Dopa Mean','Brain Wave','Myelin Cyrus','Soma One','Dr. Dendrite'];for(let i=1;i<tableSize;i++)players.push({id:'bot-'+i,name:names[i-1],buddy:i%5,bot:true});}
 game=new Party(players);recorded=false;renderRoom();
 if(mode==='practice'){game.start();renderRoom();}
}
function cleanupRoom(){roomSerial++;clearTimeout(networkTimer);clearTimeout(botTimer);botKey='';for(const c of connections.values())c.close();connections.clear();hostConnection?.close();hostConnection=null;peer?.destroy();peer=null;room=null;game=null;recorded=false;}
function leave(){if(room?.mode==='online'&&room.isHost){for(const c of connections.values())if(c.open)c.send({type:'closed'});}cleanupRoom();history.replaceState({},'',location.pathname);showHome();}
function updateRoom(){renderRoom();if(room?.mode==='online'&&room.isHost){const state=game.snapshot();for(const c of connections.values())if(c.open)c.send({type:'state',state});}}
function question(){return BANK.find(q=>q.id===game?.questionId);}
function playerSeat(player,index,total){const angle=(Math.PI*2*index/total)+Math.PI/2;const x=50+Math.cos(angle)*37,y=48+Math.sin(angle)*36;return `<div class="seat ${game.turn===index&&game.phase==='playing'?'active':''} ${player.hearts<=0?'out':''}" style="left:${x}%;top:${y}%">${sprite(player.buddy,'seat-buddy')}<div class="seat-name">${escape(player.name)}${player.id===ownId()?' (you)':''}</div><div class="seat-hearts">${'♥'.repeat(Math.max(0,player.hearts))}${'♡'.repeat(Math.max(0,game.settings.lives-player.hearts))}</div><div class="seat-score">${player.score} pts${player.bot?' · BOT':''}${player.disconnected?' · LEFT':''}</div><div class="meter" aria-label="${player.meter} of ${game.settings.pointsPerHeart} toward another heart"><i style="width:${100*player.meter/game.settings.pointsPerHeart}%"></i></div></div>`;}
function renderRoom(){
 if(!game||!room)return;
 view='room';const oldInput=$('#answer')?.value||'',oldFocus=document.activeElement?.id;
 if(game.phase==='finished'){renderResults();return;}
 const isLobby=game.phase==='lobby',q=question(),myTurn=room.mode==='couch'||game.players[game.turn]?.id===ownId();
 app.innerHTML=`<div class="room-head"><div><span class="chip">${room.mode==='online'?'PRIVATE ROOM':room.mode==='practice'?'PRACTICE BOTS':'PASS & PLAY'}</span> <span class="room-code">${room.code}</span></div><span class="room-status">${isLobby?'LOBBY':`ROUND ${game.round}`} · ${game.players.filter(p=>p.hearts>0).length} FLOATING</span></div><div class="room-brand"><div class="brand-small">NEURO</div><h1 class="brand">KRILLION</h1><div class="subtitle">PUFFER PARTY</div></div>
 <div class="arena ${game.phase==='intermission'?'pop':''} danger-${game.danger||0}"><div class="arena-puffer"><img src="puffer.svg" alt="The pufferfish"><span>${isLobby?'SLEEPING…':game.phase==='intermission'?'POP!':game.danger===3?'GET IT OFF YOU!':'TICK… TICK…'}</span></div>${game.players.map((p,i)=>playerSeat(p,i,Math.max(2,game.players.length))).join('')}</div>
 ${isLobby?renderSettings():game.phase==='intermission'?`<div class="round-notice">${escape(game.notice)}<small>A new category is surfacing…</small></div>`:`<section class="panel question-card"><div class="question-topic">${q.topic.toUpperCase()} · ${q.answers.length} POSSIBLE ANSWERS</div><h2>${q.prompt}</h2><label class="turn-label" for="answer">${myTurn?(room.mode==='couch'?escape(game.players[game.turn].name).toUpperCase()+', YOUR TURN':'YOUR TURN · PASS THE PUFFER'):'WAITING FOR '+escape(game.players[game.turn].name).toUpperCase()}</label><form class="answer-form" id="answer-form"><input id="answer" aria-label="Your neuroscience answer" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="100" placeholder="Type an answer…" ${myTurn?'':'disabled'}><button type="submit" ${myTurn?'':'disabled'}>PASS ▸</button></form><div class="feedback" id="feedback" role="status" aria-live="polite">${escape(game.notice||'Think fast. Go niche.')}</div><div class="used-answers" aria-label="Answers already used">${game.used.map(a=>`<span class="used-answer">${escape(a)}</span>`).join('')}</div></section>`}
 <div class="settings"><div class="room-actions"><button class="text-button" data-action="leave">↩ LEAVE ROOM</button><button class="text-button" data-action="rules">HOW TO PLAY</button>${room.mode==='online'?'<button class="text-button" data-action="invite">COPY INVITE ↗</button>':'<span class="muted">'+(room.mode==='practice'?'Bots are practice opponents.':'One screen. All your friends.')+'</span>'}</div></div>
 ${game.log.length?`<section class="panel room-log"><div class="panel-heading"><h3>THE DIVE LOG</h3></div>${game.log.slice(0,5).map(l=>`<div class="log-line"><span class="player">${escape(l.player)}</span><span>${escape(l.answer)}</span><span class="points" style="color:${tierFor(l.points).color}">+${l.points}</span></div>`).join('')}</section>`:''}`;
 if(!isLobby&&game.phase==='playing'&&myTurn){if(oldFocus==='answer'){$('#answer').value=oldInput;$('#answer').focus({preventScroll:true});}else $('#answer').focus({preventScroll:true});}
 scheduleBot();
}
function renderSettings(){const canEdit=room.isHost;return `<section class="settings"><div class="setting-grid">${setting('lives','LIVES',[1,2,3,4,5],game.settings.lives,canEdit)}${setting('minTurn','MIN. TURN',[4,6,8,10,12,15],game.settings.minTurn,canEdit,'s')}${setting('heartCap','HEART CAP',[2,3,4,5],game.settings.heartCap,canEdit)}${setting('pointsPerHeart','POINTS / ♥',[100,200,300,600,900],game.settings.pointsPerHeart,canEdit)}</div>${room.mode==='couch'?'<form id="add-player-form" class="join-form"><input id="friend-name" aria-label="Friend’s name" placeholder="Add a friend’s name" maxlength="18"><button type="submit">+ ADD</button></form>':''}${room.isHost?`<button class="big-button primary" data-action="start" style="margin-top:15px" ${game.players.length<2?'disabled':''}>▼ WAKE THE PUFFER ▼</button>`:'<p class="room-info">Waiting for the host to wake the puffer…</p>'}<p class="room-info">${game.players.length} READY · ${10-game.players.length} OPEN${game.players.length<2?' · Invite a friend to start.':''}</p>${room.mode==='online'?'<p class="room-info small">Keep the host’s tab open. Invite rooms use a direct connection; some restricted networks may block it.</p>':''}</section>`;}
function setting(key,label,values,value,editable,suffix=''){return `<div class="setting"><label for="setting-${key}">${label}</label><select id="setting-${key}" data-setting="${key}" ${editable?'':'disabled'}>${values.map(v=>`<option value="${v}" ${value===v?'selected':''}>${v}${suffix}</option>`).join('')}</select></div>`;}
function submitAnswer(input){
 if(!game||game.phase!=='playing')return;
 if(room.mode==='online'&&!room.isHost){if(hostConnection?.open)hostConnection.send({type:'answer',answer:input});return;}
 const playerId=room.mode==='couch'?game.players[game.turn].id:id;
 const result=game.submit(playerId,input);
 if(result.ok){$('#answer').value='';beep(result.answer.points>=85?'rare':'pass');updateRoom();}
 else{const feedback=$('#feedback');if(feedback){feedback.textContent=result.message;feedback.classList.remove('good');}}
}
function scheduleBot(){
 if(!room?.isHost||game?.phase!=='playing')return;
 const player=game.players[game.turn];const key=`${game.round}:${game.turn}:${game.log.length}`;
 if(!player.bot||botKey===key)return;
 clearTimeout(botTimer);botKey=key;
 if(Math.random()<.24)return;
 botTimer=setTimeout(()=>{
  if(!room?.isHost||game?.phase!=='playing'||game.players[game.turn].id!==player.id)return;
  const available=question().answers.filter(a=>!game.used.includes(a.name));
  const common=available.filter(a=>a.points<=60);const options=common.length&&Math.random()<.8?common:available;
  if(options.length){game.submit(player.id,options[Math.floor(Math.random()*options.length)].name);beep();updateRoom();}
 },2000+Math.random()*4500);
}
function renderResults(){
 clearTimeout(botTimer);const winner=game.players.find(p=>p.id===game.winner);
 if(!recorded){recorded=true;const mine=game.players.find(p=>p.id===ownId()),stats=store.get('stats',{games:0,wins:0,points:0});stats.games++;if(winner?.id===ownId())stats.wins++;stats.points+=mine?.score||0;store.set('stats',stats);}
 const learned=[...new Map(game.log.map(l=>[l.questionId+':'+l.answer,l])).values()];
 app.innerHTML=`<section class="results panel"><div class="winner"><div class="question-topic">THE LAST BRAIN FLOATING</div>${sprite(winner?.buddy,'seat-buddy')}<h2>${escape(winner?.name||'A sea of brains')} WINS!</h2><p class="muted">${room.mode==='practice'?'Practice party complete.':'That was a neural workout.'}</p></div><table class="score-table"><thead><tr><th>PLAYER</th><th>ANSWERS</th><th>POINTS</th></tr></thead><tbody>${[...game.players].sort((a,b)=>(b.id===game.winner)-(a.id===game.winner)||b.score-a.score).map(p=>`<tr><td>${escape(p.name)}${p.id===game.winner?' ✧':''}</td><td>${p.answers}</td><td>${p.score}</td></tr>`).join('')}</tbody></table><div class="button-row">${room.isHost?'<button class="big-button" data-action="rematch">PLAY AGAIN</button>':'<span class="muted">Waiting for host to play again…</span>'}<button class="big-button" data-action="leave">BACK TO REEF</button></div><div class="panel-heading" style="margin-top:30px"><h3>WHAT SURFACED</h3></div>${learned.map(l=>`<details class="learn-row"><summary style="color:${tierFor(l.points).color}">${escape(l.answer)} · ${l.points} pts</summary><p>${escape(l.explanation)}</p></details>`).join('')||'<p class="muted">No answers this time. Explore the bank before your next dive.</p>'}<button class="study-link" style="margin-top:20px" data-action="bank">STUDY THE BANK <span>↗</span></button></section>`;
}
function stats(){const s=store.get('stats',{games:0,wins:0,points:0});modal('MY DIVE LOG',`<div class="stat-grid"><div><b>${s.games}</b><span>PARTIES</span></div><div><b>${s.wins}</b><span>WINS</span></div><div><b>${s.points}</b><span>POINTS</span></div></div><p class="modal-note">Your party results are saved on this browser. Local pass-and-play credits the first player. Practice bot games count too.</p>`);}

function randomCode(){const letters='ABCDEFGHJKLMNPQRSTUVWXYZ';return Array.from(crypto.getRandomValues(new Uint8Array(6)),n=>letters[n%letters.length]).join('');}
function connectionScreen(message){view='connecting';app.innerHTML=`<section class="connecting"><img src="puffer.svg" alt="Pufferfish"><h2>${message}</h2><p class="muted" id="connection-status">Connecting to the reef…</p><button class="text-button" data-action="leave" style="margin-top:25px">↩ BACK TO REEF</button></section>`;}
function networkError(message){clearTimeout(networkTimer);if(view==='connecting'){cleanupRoom();showHome();}toast(message);}
function peerOptions(){return {debug:0,config:{iceServers:[{urls:'stun:stun.l.google.com:19302'},{urls:'stun:stun1.l.google.com:19302'}]}};}
function hostOnline(){
 readName();cleanupRoom();const serial=roomSerial;const code=randomCode();connectionScreen('OPENING YOUR TABLE');
 if(!window.Peer){networkError('Online rooms could not load. Local party and practice are still available.');return;}
 room={mode:'online',isHost:true,code};game=new Party([{id,name,buddy}]);
 peer=new Peer('neuro-krillion-v1-'+code,peerOptions());
 networkTimer=setTimeout(()=>{if(serial===roomSerial)networkError('Could not reach the room service. Try again, or play a local party.');},16000);
 peer.on('open',()=>{if(serial!==roomSerial)return;clearTimeout(networkTimer);history.replaceState({},'',location.pathname+'?room='+code);renderRoom();});
 peer.on('connection',connection=>{
  if(connections.size>=9){connection.on('open',()=>{connection.send({type:'error',message:'This table is full.'});setTimeout(()=>connection.close(),500);});return;}
  connection.on('data',data=>handleGuest(connection,data));
  connection.on('close',()=>{if(connections.has(connection.peer)){connections.delete(connection.peer);game?.remove(connection.peer);if(game)updateRoom();}});
  connection.on('error',()=>{});
 });
 peer.on('error',error=>{if(serial!==roomSerial)return;if(view==='connecting')networkError('Could not open this room. Please try again.');else toast('Room signaling interrupted. Existing connections may still work.');});
 peer.on('disconnected',()=>{if(peer&&!peer.destroyed)peer.reconnect();});
}
function handleGuest(connection,data){
 if(!data||typeof data!=='object'||!game||!room?.isHost)return;
 if(data.type==='join'){
  if(connections.has(connection.peer))return;
  if(game.phase!=='lobby'||game.players.length>=10){connection.send({type:'error',message:game.phase!=='lobby'?'This game has started. Join after the next game.':'This table is full.'});setTimeout(()=>connection.close(),500);return;}
  const guestName=typeof data.name==='string'?data.name.trim().slice(0,18):'';
  connections.set(connection.peer,connection);game.players.push({id:connection.peer,name:guestName||'Curious neuron',buddy:Number.isInteger(data.buddy)&&data.buddy>=0&&data.buddy<5?data.buddy:0,hearts:game.settings.lives,score:0,meter:0,answers:0});
  connection.send({type:'welcome',id:connection.peer});updateRoom();return;
 }
 if(!connections.has(connection.peer))return;
 if(data.type==='answer'&&typeof data.answer==='string'&&data.answer.length<=100){
  const result=game.submit(connection.peer,data.answer);
  if(result.ok){connection.send({type:'accepted',points:result.answer.points});beep(result.answer.points>=85?'rare':'pass');updateRoom();}
  else connection.send({type:'feedback',message:result.message});
 }
}
function joinOnline(code){
 readName();code=code.trim().toUpperCase();if(!/^[A-Z]{6}$/.test(code)){toast('Enter the six-letter room code from your friend.');return;}
 cleanupRoom();const serial=roomSerial;connectionScreen('FINDING YOUR FRIENDS');
 if(!window.Peer){networkError('Online rooms could not load. Try local party or practice.');return;}
 room={mode:'online',isHost:false,code};peer=new Peer(peerOptions());
 networkTimer=setTimeout(()=>{if(serial===roomSerial)networkError('Room not reachable. Check the code and keep the host’s tab open. A restricted network may block the connection.');},20000);
 peer.on('open',()=>{
  if(serial!==roomSerial)return;hostConnection=peer.connect('neuro-krillion-v1-'+code,{reliable:true});
  hostConnection.on('open',()=>hostConnection.send({type:'join',name,buddy}));
  hostConnection.on('data',data=>{
   if(serial!==roomSerial||!data||typeof data!=='object')return;
   if(data.type==='state'){clearTimeout(networkTimer);game=data.state;recorded=game.phase==='finished'?recorded:false;renderRoom();}
   if(data.type==='welcome'){room.myId=data.id;}
   if(data.type==='feedback'){if($('#feedback'))$('#feedback').textContent=data.message;}
   if(data.type==='accepted'){if($('#answer'))$('#answer').value='';beep(data.points>=85?'rare':'pass');}
   if(data.type==='error')networkError(data.message);
   if(data.type==='closed'){cleanupRoom();showHome();toast('The host closed the table. Start a new room to play again.');}
  });
  hostConnection.on('close',()=>{if(serial===roomSerial){cleanupRoom();showHome();toast('Connection to the host closed. Rejoin a new room to continue.');}});
  hostConnection.on('error',()=>{if(serial===roomSerial)networkError('Could not connect to that room. Check the code and try again.');});
 });
 peer.on('error',()=>{if(serial===roomSerial)networkError('Could not reach that room. Check the code and the host’s connection.');});
}

function dateKey(){return new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
function seeded(seed){let h=2166136261;for(const c of seed)h=Math.imul(h^c.charCodeAt(0),16777619);return ()=>{h+=0x6D2B79F5;let t=h;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}
function startDaily(){if(room)leave();daily={questions:shuffle(BANK,seeded(dateKey())).slice(0,7),index:0,results:[],deadline:Date.now()+25000,done:false};view='daily';renderDaily();}
function renderDaily(){
 if(daily.index>=7){daily.done=true;const score=daily.results.reduce((s,r)=>s+(r.answer?.points||0),0);store.set('daily-'+dateKey(),score);app.innerHTML=`<section class="results panel"><div class="winner"><div class="question-topic">DAILY NEURAL DIVE · ${dateKey()}</div><h2>${score} / 700</h2><p class="muted">${score===700?'One in a billion neurons. A perfect dive.':'Every dive makes a few more connections.'}</p></div>${daily.results.map(r=>`<div class="learn-row"><div class="small muted">${r.question.prompt}</div><span style="color:${r.answer?tierFor(r.answer.points).color:'var(--pink)'}">${r.answer?escape(r.answer.name)+' · '+r.answer.points+' pts':'No answer · 0 pts'}</span><p>${r.answer?escape(r.answer.explanation):'A 100-point gem: '+r.question.anchor}</p></div>`).join('')}<p class="modal-note">Daily categories reset at midnight in New York. Replays are welcome; scores are saved on this device.</p><div class="button-row"><button class="big-button" data-action="daily">DIVE AGAIN</button><button class="big-button" data-action="home">BACK TO REEF</button></div><button class="study-link" data-action="share-daily" style="margin-top:15px">COPY MY DIVE <span>↗</span></button></section>`;return;}
 const q=daily.questions[daily.index];app.innerHTML=`${hero()}<div class="daily-head"><span>DAILY NEURAL DIVE</span><span>${daily.index+1} / 7 · <b id="daily-time">25s</b></span></div><div class="daily-timer"><i id="daily-progress" style="width:100%"></i></div><section class="panel question-card daily-question"><div class="question-topic">${q.topic.toUpperCase()}</div><h2>${q.prompt}</h2><form id="daily-form" class="answer-form"><input id="daily-answer" aria-label="Your neuroscience answer" placeholder="Go deeper than the obvious…" autocomplete="off" maxlength="100"><button>LOCK IN ▸</button></form><div id="daily-feedback" class="feedback" role="status">Rarer answers score higher.</div><button class="text-button" data-action="daily-hint">A LITTLE NUDGE?</button><p id="daily-hint" class="hint" hidden>${q.hint}</p><div class="tier-list">${tierRows()}</div></section>`;$('#daily-answer').focus({preventScroll:true});
}
function dailySubmit(skip=false){if(!daily||daily.done)return;const q=daily.questions[daily.index];const answer=skip?null:matchAnswer(q,$('#daily-answer').value);if(!skip&&!answer){$('#daily-feedback').textContent='Not in this bank. Try another answer before time runs out.';return;}daily.results.push({question:q,answer});daily.index++;daily.deadline=Date.now()+25000;beep(answer?.points>=85?'rare':'pass');renderDaily();}

document.addEventListener('click',async event=>{
 const button=event.target.closest('[data-action],[data-buddy],[data-size]');if(!button)return;
 if(button.dataset.buddy!==undefined){readName();buddy=Number(button.dataset.buddy);store.set('buddy',buddy);showHome();return;}
 if(button.dataset.size){readName();tableSize=Number(button.dataset.size);showHome();return;}
 const action=button.dataset.action;$('#menu').hidden=true;
 if(action==='rules')rules();if(action==='bank')bank();if(action==='stats')stats();if(action==='close-modal')$('#modal').close();
 if(action==='home'){if(room)leave();else showHome();}
 if(action==='practice')createLocal('practice');if(action==='couch')createLocal('couch');if(action==='host')hostOnline();
 if(action==='leave')leave();
 if(action==='start'&&room?.isHost){game.start();updateRoom();}
 if(action==='rematch'&&room?.isHost){recorded=false;game.phase='lobby';game.players=game.players.filter(p=>!p.disconnected);game.players.forEach(p=>{p.hearts=game.settings.lives;p.score=0;p.meter=0;p.answers=0;});game.log=[];game.notice='';updateRoom();}
 if(action==='invite'){const url=location.origin+location.pathname+'?room='+room.code;try{await navigator.clipboard.writeText(url);toast('Invite link copied. Send it to your friends.');}catch{modal('YOUR INVITE',`<p class="modal-note">Share this link with your friends:</p><input aria-label="Invite link" value="${escape(url)}" readonly><p class="modal-note">Or share the code: ${room.code}</p>`);}}
 if(action==='daily')startDaily();
 if(action==='daily-hint')$('#daily-hint').hidden=!$('#daily-hint').hidden;
 if(action==='share-daily'){const score=daily.results.reduce((s,r)=>s+(r.answer?.points||0),0);const text=`Neuro Krillion · ${dateKey()}\n${daily.results.map(r=>r.answer?.points===100?'🟨':r.answer?.points>=60?'🟪':r.answer?'🟦':'⬛').join('')}\n${score}/700 · ${location.origin+location.pathname}`;try{await navigator.clipboard.writeText(text);toast('Dive copied!');}catch{toast(text);}}
});
document.addEventListener('submit',event=>{if(!['answer-form','join-form','add-player-form','daily-form'].includes(event.target.id))return;event.preventDefault();if(event.target.id==='answer-form')submitAnswer($('#answer').value);if(event.target.id==='join-form')joinOnline($('#join-code').value);if(event.target.id==='add-player-form'){const field=$('#friend-name');const friend=field.value.trim();if(!friend){field.focus();return;}if(game.players.length>=10){toast('Ten players is the table limit.');return;}game.players.push({id:crypto.randomUUID(),name:friend.slice(0,18),buddy:game.players.length%5,hearts:game.settings.lives,score:0,meter:0,answers:0});updateRoom();}if(event.target.id==='daily-form')dailySubmit();});
document.addEventListener('input',event=>{if(event.target.id==='bank-search')renderBank(event.target.value);if(event.target.id==='player-name'){name=event.target.value;store.set('name',name);}});
document.addEventListener('change',event=>{const key=event.target.dataset.setting;if(!key||!room?.isHost||game.phase!=='lobby')return;game.settings[key]=Number(event.target.value);if(game.settings.heartCap<game.settings.lives)game.settings.heartCap=game.settings.lives;game.players.forEach(p=>p.hearts=game.settings.lives);updateRoom();});
$('#menu-button').addEventListener('click',()=>$('#menu').hidden=!$('#menu').hidden);
$('#modal-close').addEventListener('click',()=>$('#modal').close());
$('#modal').addEventListener('click',event=>{if(event.target===$('#modal')){const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)event.target.close();}});
$('#sound-button').addEventListener('click',()=>{sound=!sound;$('#sound-button').setAttribute('aria-pressed',String(sound));$('#sound-button').setAttribute('aria-label',`Turn sound ${sound?'off':'on'}`);$('.sound-slash').hidden=sound;beep();});
setInterval(()=>{if(room?.isHost&&game instanceof Party&&game.tick()){if(game.phase==='intermission'||game.phase==='finished')beep('pop');updateRoom();}if(view==='daily'&&daily&&!daily.done){const left=Math.max(0,daily.deadline-Date.now());if($('#daily-time'))$('#daily-time').textContent=Math.ceil(left/1000)+'s';if($('#daily-progress'))$('#daily-progress').style.width=left/250+'%';if(left===0)dailySubmit(true);}},150);
// Guests are known by their established data connection ID, never a user-supplied ID.
window.addEventListener('beforeunload',event=>{if(room?.mode==='online'&&room.isHost&&game?.players.length>1){event.preventDefault();event.returnValue='';}});
showHome();
