const Lec2Review=()=>{
    const stringCheck ={
    data:[[/[\r\n\l]/g],[/"/g,"\\\""],[/\t/g, "\\t"]],
    convert(v){
        return this.data.reduce((acc,curr)=>acc.replace(curr[0],curr[1]),v)
    }
};
const el={
    table:{
        boolean:v=>v.toString(),
        number:v=>v.toString(),
        string:v=>`"${stringCheck.convert(v)}"`,
        symbol:v=>"null",
        "null":v=>"null",
        array:v=>{},
        object:v=>{},
    },
    stringify(v){//라우터
        return (this.table[typeof v]?? this.table[!v ? "null": Array.isArray(v) ? "array":"object"])?.(v) ?? "null";
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

const resultProcess={
    data:{
        "true":(arr)=>"[]",
        "false":(arr)=>{
            let acc="",i=0;
            while(i<arr.length){
                acc=acc+`,${el.stringify(arr[i])}`;
                i=i+1;
            }
            return `[${acc.substr(1)}]`;
        }
    },
    process(arr){
        return this.data[arr.length===0](arr);
    }
}

const forStringify=arr=>{
    if(!Array.isArray(arr)) throw "invalid arr";
    return resultProcess.process(arr);
}

console.log(forStringify(["gdg",123,235]));
};

// 과제
const arrStringfy=[1,2,["a",[1,2],false],3,["b","c",[1,2]]] // stringify
//const arr=[1,2,[3,4]];
const recursive1=(arr,idx=0,acc="")=>{
    return idx<arr.length ?
        recursive1(arr,idx+1,Array.isArray(arr[idx]) ? acc+`,${recursive1(arr[idx],0,"")}`: acc+`,${arr[idx]}`) :
    `[${acc.substr(1)}]`;
}

const stackPop=(stack,newAcc)=>{
    const {arr,idx,acc}=stack.pop();
    return recursive2(arr,idx+1,acc+`,[${newAcc.substr(1)}]`,stack);
}
const el={
    table:{
        boolean:v=>v.toString(),
        number:v=>v.toString(),
        string:v=>`"${v}"`,
        symbol:v=>"null",
        "null":v=>"null",
        array:v=>{},
        object:v=>{},
    },
    stringify(v){//라우터
        return (this.table[typeof v]?? this.table[!v ? "null": Array.isArray(v) ? "array":"object"])?.(v) ?? "null";
    }
}

const recursive2=(arr,idx=0,acc="",stack=[])=>{
    return idx<arr.length ?
    (Array.isArray(arr[idx]) ? recursive2(arr[idx],0,"",[...stack,{arr,idx,acc}]): recursive2(arr,idx+1,acc+`,${el.stringify(arr[idx])}`,stack)) 
    : stack.length==0 ?  `[${acc.substr(1)}]` :stackPop(stack,acc);
}
const stringfy=arr=>{
    if(!Array.isArray(arr)) throw "invalid arr";
    return arr.length===0 ? "[]": recursive2(arr,0,"");
}
console.log(stringfy(arrStringfy));

let idx=0,acc="",stack=[],arr=arrStringfy.map(v=>v);
while(idx<arr.length){
    if(Array.isArray(arr[idx])){
        arr=arr[idx];
        idx=0;
        acc="";
        stack=[...stack,{sotreArr,storeIdx,sotreAcc}];
    }else{
        idx=idx+1;
        acc=acc+`,${el.stringify(arr[idx])}`;
    }
    if(stack.length==0) return `[${acc.substr(1)}]`;
    else {
        const {storeArr,storeIdx,storeAcc}=stack.pop();
        arr=storeArr;
        idx=storeIdx;
        acc=storeAcc+`,[${newAcc.substr(1)}]`;
    }
}
console.log(acc);