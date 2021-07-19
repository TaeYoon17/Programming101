if(1){
    const arrToString=arr=>{
        let arrStr="";
        for(const v of acc) accStr+=","+v;
        return "{"+accStr.substr(1)+"}";
    }
    const table={
        array:(currEl,arr,acc,i,stack)=>{ // 전략 객체1
            stack.push([arr,acc,i+1]);
            return [arr,[],0];
        },
        number:(currEl,arr,acc,i,stack)=>{ // 전략 객체2
            acc.push(""+currEl);
            return [arr,acc,i+1];
        }
    }
    const elementProcess=(currEl,arr,acc,i,stack)=>{
        for(const v of table)v(currEl,arr,acc,i,stack)
    };
    
    const elementToString=e=>""+e;
    const recursive=(arr,acc,i,stack)=>{
        if(i<arr.length){
            const currEl=arr[i];
            const [resultArr,resultAcc,resultIndex]=elementProcess(currEl,arr,acc,i,stack);
            return recursive(resultArr,resultAcc,resultIndex,stack);
        }else{
            const accStr=arrToString(acc);
            const prev=stack.pop();
            if(prev){
                const [prevArr,prevAcc,prevIndex]=prev;
                prevAcc.push(accStr);
                return recursive(prevArr,prevAcc,prevIndex,stack);
            }else{
                return accStr;
            }
        }
    }
    const arrToString2=finalNode=>{
        let arrStr="", curr=finalNode;
        const arr=[];
        do{
            arr.unshift(curr.value);
        }while(curr=curr.prev);
        for(const v of arr) arrStr+=','+v;
        return "{"+arrStr.substr(1)+"}";
    }
    const recursive2=(arr,acc,i,prev)=>{
        if(i<arr.length){
            const currEl=arr[i];
            if(Array.isArray(currEl)){
                return recursive2(arr,null,0,[arr,acc,i+1,prev]);
            }else{
                return recursive2(arr,{prev:acc,value:elementToString(currEl)},i+1,prev);
            }
        }else{
            const accStr=arrToString2(acc);
            if(prev){
                const [prevArr,prevAcc,prevIndex,prevPrev]=prev;
                return recursive2(prevArr,{prev:prevAcc,value:accStr},prevIndex,prevPrev);
            }else{
                return accStr;
            }
        }
    }
    //const stringify=arr=>recursive2(arr,null,0,null);
    
    //console.log(stringify([1,2,3,4]));
}


const obj={a:1,b:2,c:"abcd",d:{a:1,b:2,c:false}};
const a=JSON.stringify(obj);

const el={
    table:{
        number:(v)=>v.toString(),
        array:(v)=>arrRecur(v),
        object:v=>stringify(v),
        string:v=>v,
        boolean:v=>v.toString(),
        symbol:v=>"null",
        "null":v=>"null"
    },
    process(v){
        const a=this.table[Array.isArray(v) ? "array":typeof v]?.(v) ?? "null";
        console.log(a);
        return a;
    }
}
const makeObj=currEl=>{
    return currEl[0]+":"+el.process(currEl[1]);
}
const arrToString=acc=>{
    let str="";
    let nowAcc=acc;
    const arr=[];
    do{
        arr.unshift(nowAcc.value);
    }while(nowAcc=nowAcc.prev);
    for(const v of arr) str=`${str},${makeObj(v)}`;
    return `{${str.substr(1)}}`;
}

const elementToString=e=>""+e;
const recursive=(arr,acc,idx)=>{
    if(idx<arr.length){
        const currEl=arr[idx];
        return recursive(arr,{prev:acc,value:currEl},idx+1);
    }else{
        const accStr=arrToString(acc);
        return accStr;
    }
}
const arrToString2=finalNode=>{
    let arrStr="", curr=finalNode;
    const arr=[];
    do{
        arr.unshift(curr.value);
    }while(curr=curr.prev);
    for(const v of arr) arrStr+=','+v;
    return "["+arrStr.substr(1)+"]";
}
const recursive2=(arr,acc,i,prev)=>{
    if(i<arr.length){
        const currEl=arr[i];
        if(Array.isArray(currEl)){
            return recursive2(arr,null,0,[arr,acc,i+1,prev]);
        }else{
            return recursive2(arr,{prev:acc,value:elementToString(currEl)},i+1,prev);
        }
    }else{
        const accStr=arrToString2(acc);
        if(prev){
            const [prevArr,prevAcc,prevIndex,prevPrev]=prev;
            return recursive2(prevArr,{prev:prevAcc,value:accStr},prevIndex,prevPrev);
        }else{
            return accStr;
        }
    }
}

const arrRecur=arr=>recursive2(arr,acc,i,prev);
const stringify=obj=>recursive(Object.entries(obj),null,0);

const s=stringify(obj);
console.log(s);
