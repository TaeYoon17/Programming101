const rNewLine =/[\r\n\l]/g;
const rQuat = /"/g;
const el={
    boolean:v=>v.toString(),
    number:v=>v.toString(),
    string:v=>`"${v}"`,
    stringify(v){
        return this[typeof v]?.(v) ?? "null";
    }
}

const recursive=(arr,acc,i)=>i<arr.length ?
    recursive(arr,acc+`,${el.stringify(arr[i])}`,i+1) :
    `[${acc.substr(1)}]`;
const EMPTY={};
const stringify=arr=>{
    if(!Array.isArray(arr)) throw "invalid arr";
    return arr.length===0 ? "[]": recursive(arr,"",0);
}