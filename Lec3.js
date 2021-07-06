const stringCheck ={
    data:[[/[\r\n\l]/g],[/"/g,"\\\""],[/\t/g, "\\t"]],
    convert(v){
        return this.data.reduce((acc,curr)=>acc.replace(curr[0],curr[1]),v)
    }
};
const el={
    data:{
        boolean:v=>v.toString(),
        number:v=>v.toString(),
        string:v=>`"${stringCheck.convert(v)}"`
    },
    stringify(v){//라우터
        return this.data[typeof v]?.(v) ?? "null";
    }
}

const recursive=(arr,acc,i)=>i<arr.length ?
    recursive(arr,acc+`,${el.stringify(arr[i])}`,i+1) :
    `[${acc.substr(1)}]`;
const stringify=arr=>{
    if(!Array.isArray(arr)) throw "invalid arr";
    return arr.length===0 ? "[]": recursive(arr,"",0);
}
const EMPTY={};
const forStringify=arr=>{
    if(!Array.isArray(arr)) throw "invalid arr";
    let result=EMPTY;
    if(arr.length===0) result="[]";
    else{
        let acc="",i=0;
        while(i<arr.length){
            acc=acc+`,${el.stringify(arr[i])}`;
            i=i+1;
        }
        result=`[${acc.substr(1)}]`;
    }
    if(result===EMPTY) throw "no processed" //shield
    return result;
}

console.log(typeof stringify(["gdg",123,235]));