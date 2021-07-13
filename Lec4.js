const arrToString=arr=>{
    let arrStr="";
    for(const v of acc) accStr+=","+v;
    return "{"+accStr.substr(1)+"}";
}
const table={
    array:(currEl,arr,acc,i,stack)=>{ // 전략 객체1
        stack.push([arr,acc,i+1]);
        return [arr[i],[],0];
    },
    number:(currEl,arr,acc,i,stack)=>{ // 전략 객체2
        acc.push(""+v);
        return [arr,acc,i+1];
    }
}
const elementProcess=(currEl,arr,acc,i,stack)=>{
    for(const v of table)v(currEl,arr,acc,i,stack)
};
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