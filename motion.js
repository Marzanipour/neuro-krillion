const wrap=a=>Math.atan2(Math.sin(a),Math.cos(a));
export function pufferTarget(layout,holder,mobile=false){
 // The original puffer floats in the centre and faces the holder; it doesn't sit on a perch.
 let x=layout.cx,y=layout.cy+6;if(holder){const dx=holder.x-x,dy=holder.y-y,length=Math.hypot(dx,dy)||1,bias=mobile?12:18;x+=dx/length*bias;y+=dy/length*4;}
 const dx=holder?holder.x-x:0,dy=holder?holder.y-y:0,face=holder&&Math.abs(dx)>30?(dx>0?-1:1):1,rotation=holder?Math.atan2(-face*dy,-face*dx):-.1;
 return {x,y,face,rotation};
}
export function advancePuffer(current,target,seconds){const dt=Math.max(0,Math.min(.05,seconds)),blend=1-Math.pow(.02,dt),rotation=current.face===target.face?current.rotation:wrap(current.rotation+Math.PI);return {x:current.x+(target.x-current.x)*blend,y:current.y+(target.y-current.y)*blend,face:target.face,rotation:wrap(rotation+wrap(target.rotation-rotation)*(1-Math.pow(.05,dt)))};}

// Keep the entire rotating sprite, its bob and its turn bias out of occupied seats.
export function fitPufferSize(layout,blockers,mobile=false){
 const x=layout.cx,y=layout.cy+6,padding=(mobile?12:18)+12;
 const clearance=blockers.reduce((nearest,rect)=>Math.min(nearest,Math.hypot(Math.max(rect.left-x,0,x-rect.right),Math.max(rect.top-y,0,y-rect.bottom))),Infinity);
 return Math.max(0,Math.floor(Math.min(layout.puffer,mobile?96:124,Math.max(0,clearance-padding)*Math.SQRT2)));
}
