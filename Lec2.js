const elValidator=(list,el)=>typeof el=="number";
const listValidator=(list,el)=>Array.isArray(list);
const validator={
    data: [
        (list,el)=>Array.isArray(list),
        (list,el)=>typeof el=="number"
    ],
    validate(list,index){
        return this.data.every(vali=>vali(list,list[index]));
    }
};
const recursive=(list, index=0,acc=0)=>{
    if(!validator.validate(list,index)) throw `invalid element`
    return recursive(list,index,acc+list[index]*2);
};
/*
const arraySum=(()=>{
    const elementSum=(arr,acc,i)=>{
        if(arr.length===i) return acc;
        return elementSum(arr,acc+arr[i],i+1);
    }
    const arraySum=arr=>elementSum(arr,0,0);
    return arraySum;
})();
*/

const arraySum=arr=>{
    const elementSum=(arr,acc,i)=>{
        if(arr.length===i) return acc;
        return elementSum(arr,acc+arr[i],i+1);
    }
    return elementSum(arr,0,0);
};
arraySum([1,2,3,4,5]);
const err=msg=>{throw msg};
const _recur=(array,i,acc)=>(array[0] ?? err("invalid element index0")) && (i>-1) ? _recur(array,i-1,array[i]+acc):acc;
const recur=array=>_recur(array,array.length-1,0);

//과제 예시
const a=[1,'ab\"c\n',true,null,undefined,()=>3,Symbol()];
const b=JSON.stringify(a);
console.log(b);
/*
const validator={
    data:[
        (list,el)=>Array.isArray(list),
        (list,el)=>
    ],
    validate(list,index){
        return this.data.every(vali=>vali(list,list[index]));
    }
};*/
const check={
    escape:["\'","\"","\\","\n","\r","\t","\b","\f"],
    CorrectTypes:["number","string","boolean"],
    Type(value){
        return this.CorrectTypes.some(v=>typeof(value)===v);
    },
    Escape(value){
        return this.escape.some(v=>v===value);
    },
    isString(value){
        return typeof(value)==="string";
    }
}
const getData={
    Value(v){
        return check.Type(v) ? check.isString(v) ? this.String(v) : v :"null";
    },
    String(v){
        return [...v].map(v=>check.Escape(v)?"\\"+v:v).join("");
    }
}
const _arrStringify=(arr=[],idx=0)=>{
    if(Array.isArray(arr)&&arr.length===0) throw "error"; // 분리 필요
    let acc="";
    if(arr.length-1===idx) acc=checkType(arr[idx]);
    else acc+=checkType(arr[idx])+','+_arrStringify(arr,idx+1);
    return acc;
}
const _arrStringify2=(arr=[],idx=0,acc="")=>{
    //if(!Array.isArray(arr)&&arr.length===0) throw "error"; // 분리 필요
    return (arr.length===idx) ? "["+acc+getData.Value(arr[idx])+"]" :
    _arrStringify2(arr,idx+1,acc+getData.Value(arr[idx])+',');
}
const arrStringify=(arr=[])=>_arrStringify2(arr);
try{
    console.log(arrStringify(a));
}catch(e){
    console.log(e);
}
let acc="";
let idx=0;
for(idx=0; a.length!==idx; idx=idx+1){
    acc=acc+getData.Value(a[idx])+',';
}
acc="["+acc+getData.Value(a[idx])+"]";
console.log(acc);