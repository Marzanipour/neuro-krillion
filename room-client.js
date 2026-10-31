import {ROOM_API} from './room-config.js';

export class RoomClient{
 constructor({onState,onStatus,onClosed}){this.onState=onState;this.onStatus=onStatus;this.onClosed=onClosed;this.session=null;this.stopped=false;this.lastRevision=-1;this.failures=0;this.timer=null;}
 async request(path,input={},auth=false){
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),12000);
  try{
   const headers={'Content-Type':'application/json'};
   if(auth&&this.session){headers.Authorization='Bearer '+this.session.token;headers['X-Player-Id']=this.session.playerId;}
   const result=await fetch(ROOM_API+path,{method:'POST',headers,body:JSON.stringify(input),cache:'no-store',signal:controller.signal});
   let data;try{data=await result.json();}catch{throw new Error('The room service returned an unexpected response. Please retry.');}
   if(!result.ok){const error=new Error(data.error||'Could not update this room.');error.status=result.status;throw error;}
   return data;
  }catch(error){if(error.name==='AbortError')throw new Error('The connection took too long. Your seat is saved; retrying…');throw error;}finally{clearTimeout(timeout);}
 }
 save(){if(this.session)try{sessionStorage.setItem('neuro-room-'+this.session.code,JSON.stringify(this.session));}catch{}}
 accept(result){if(this.stopped||result.state.revision<this.lastRevision)return;this.session={code:result.code||result.state.code,playerId:result.playerId||this.session?.playerId,token:result.token||this.session?.token};this.save();this.lastRevision=result.state.revision;this.onState(result.state);this.onStatus?.('connected');this.failures=0;}
 async create(input){this.accept(await this.request('/api/rooms',input));this.poll();return this.session;}
 async join(code,input){this.accept(await this.request('/api/rooms/'+code+'/join',input));this.poll();return this.session;}
 async matchmake(input){this.accept(await this.request('/api/matchmake',input));this.poll();return this.session;}
 async resume(code){let saved;try{saved=JSON.parse(sessionStorage.getItem('neuro-room-'+code));}catch{}if(!saved?.token)return false;this.session=saved;try{this.accept(await this.request('/api/rooms/'+code+'/sync',{},true));this.poll();return true;}catch(error){if([401,404,410].includes(error.status)){sessionStorage.removeItem('neuro-room-'+code);this.session=null;return false;}throw error;}}
 async action(action,input={}){if(!this.session)throw new Error('Join a room first.');const result=await this.request('/api/rooms/'+this.session.code+'/'+action,{...input,requestId:crypto.randomUUID()},true);if(!this.stopped&&result.state)this.accept(result);return result;}
 async poll(){
  clearTimeout(this.timer);if(this.stopped||!this.session)return;
  try{
   const result=await this.request('/api/rooms/'+this.session.code+'/sync',{},true);
   if(this.stopped)return;
   if(result.state.revision!==this.lastRevision)this.accept(result);
   else{this.failures=0;this.onStatus?.('connected');}
  }catch(error){
   if(this.stopped)return;
   if([401,404,410].includes(error.status)){this.stopped=true;this.onClosed?.(error.message);return;}
   this.failures++;this.onStatus?.('reconnecting',error.message);
  }
  if(!this.stopped)this.timer=setTimeout(()=>this.poll(),Math.min(5000,650+this.failures*700));
 }
 async leave(){if(this.session){const session=this.session;try{await this.action('leave');}catch{}try{sessionStorage.removeItem('neuro-room-'+session.code);}catch{}}this.stop();}
 stop(){this.stopped=true;clearTimeout(this.timer);}
}
export async function listRooms(){const response=await fetch(ROOM_API+'/api/rooms',{cache:'no-store',signal:AbortSignal.timeout(10000)});if(!response.ok)throw new Error('Room directory is temporarily unavailable.');return response.json();}
