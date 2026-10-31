// Geometry reconstructed from the browser-delivered Krillion scene with REA.
// The camera fits the reef's authored water ellipse, then fits seats above the controls.
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const art={m:{iw:1024,ih:1536,ax:512,ay:945,rx:430,ry:440,zoom:1.08},d:{iw:1536,ih:1024,ax:768,ay:650,rx:620,ry:270,zoom:1.05}};
function camera(w,h,ring){const key=w<1100?'m':'d',a=art[key],scale=Math.max(w/a.iw,h/a.ih)*a.zoom,ox=clamp(ring.cx-a.ax*scale,w-a.iw*scale,0),oy=clamp(ring.cy-a.ay*scale,Math.min(0,h-90-a.ih*scale),0),rx=a.rx*scale,ry=a.ry*scale,fit=Math.max(0,1-Math.hypot((ring.perch||0)/2/rx,8/ry));return {cx:ox+a.ax*scale,cy:oy+a.ay*scale,rx:Math.min(ring.rx,rx*fit),ry:Math.min(ring.ry,ry*fit),pane:{key,x:ox,y:oy,width:a.iw*scale,height:a.ih*scale}};}
export function sceneLayout(w,h,{mode='door',seats=6,cardBottom=208,floor=h}={}){
 const mobile=w<1100;
 if(mode==='door'){const scale=mobile?clamp(h/844,.75,1):clamp(h/800,.8,1.1),cx=w/2,cy=mobile?Math.round(214*scale+14):Math.round(h*.5);return {cx,cy,puffer:Math.round((mobile?104:150)*scale)*.9,pane:camera(w,h,{cx,cy,rx:mobile?120:220,ry:mobile?70:120}).pane};}
 const lobby=mode==='lobby',crowded=seats>8,top=Math.max(cardBottom,mobile?148:190)+(mobile?62:78);let bottom=h-(lobby?(mobile?(w<700?220:230):170):(mobile?150:144));bottom=Math.max(top+120,Math.min(bottom,floor-52));
 const z=clamp((bottom-top)/(mobile?330:350),.72,1),crowd=Math.max(.78,Math.min(1,Math.sqrt(8/Math.max(1,seats)))),sprite=Math.round((mobile?clamp(w*.15,70,104):92)*z*crowd),perch=Math.round((mobile?clamp(w*.155,72,108):96)*z*crowd),puffer=Math.round((mobile?clamp(w*.3,124,170):150)*z),edge=w<700?48:64,side=mobile?8:276;
 const ring=camera(w,h,{cx:w/2,cy:(top+bottom)/2,rx:Math.max(60,Math.min(crowded?(mobile?400:560):320,w/2-side-edge-perch/2-6)),ry:Math.max(50,Math.min(crowded?380:230,(bottom-top)/2)),perch});
 const width=Math.min(ring.cx-side,w-side-ring.cx);return {...ring,rx:Math.min(ring.rx,Math.max(40,width-edge-perch/2-6)),ry:Math.min(ring.ry,Math.max(40,Math.min(ring.cy-top,bottom-ring.cy))),sprite,perch,puffer};
}
export function seatPosition(layout,index,total){
 let phase=index/total*Math.PI*2;
 // Equal arc length distributes crowded tables evenly around the ellipse.
 if(total>8){const distances=[0];for(let i=1;i<=128;i++){const a=Math.PI/2+(i-.5)/128*Math.PI*2;distances.push(distances.at(-1)+Math.hypot(layout.rx*Math.sin(a),layout.ry*Math.cos(a)));}const target=distances[128]*index/total,j=Math.max(1,distances.findIndex(d=>d>=target));phase=(j-1+(target-distances[j-1])/(distances[j]-distances[j-1]))/128*Math.PI*2;}
 const angle=Math.PI/2+phase;return {x:layout.cx+Math.cos(angle)*layout.rx,y:layout.cy+Math.sin(angle)*layout.ry,depth:.8+.2*(Math.sin(angle)+1)/2,angle};
}
