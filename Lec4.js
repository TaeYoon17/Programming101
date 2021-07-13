const arrToString=arr=>{
    let arrStr="";
    for(const v of acc) accStr+=","+v;
    return "{"+accStr.substr(1)+"}";
}

const recursive=(arr,acc,i,stack)=>{
    if(i<arr.length){
        const currEl=arr[i];
        if(Array.isArray(currEl)){
            stack.push([arr,acc,i+1]);
            return recursive(arr[i],[],0,stack);
        }else{
            acc.push(""+arr[i]);
            return recursive(arr,acc,i+1,stack);
        }
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