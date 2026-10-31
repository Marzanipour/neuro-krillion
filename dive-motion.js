export const diveDuration = points => 900 + Math.max(0,points)*10;
export function sampleDive(fromDepth,toDepth,elapsed,duration){
 const progress=Math.max(0,Math.min(1,elapsed/Math.max(1,duration))),ease=progress*progress*(3-2*progress),distance=Math.max(0,toDepth-fromDepth),arc=Math.sin(progress*Math.PI);
 return {progress,depth:fromDepth+distance*ease,drop:.20*Math.min(1,distance/1000)*arc,rotation:70*arc,diving:progress<1&&distance>0};
}
