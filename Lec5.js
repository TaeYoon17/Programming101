if(1){
    const objEntries=function*(obj){
            for(const k in obj) if(obj.hasOwnProperty(k)) yield [k,obj[k]];
        };
        const obj={a:1,b:2,c:3,d:"absdf"};
    const toString=v=>""+v;
    const join=acc=>{
        if(!acc) return "{}";
        else{
            let target=acc,result="";
            do{
                result=`,"${target.k}":${toString(target.v)}`+result;
            }while(target=target.pre);
            return "{"+result.substr(1)+"}";
        }
    };
    const recursive=(iter,acc)=>{
        const {done,value:[k,v]=[]}=iter.next();
        return done ? join(acc) : recursive(iter,{pre:acc,k,v});
    };
    const stringify=obj=>recursive(objEntries(obj),null);
    console.log(stringify(obj));
}
const objEntries=function*(obj){
    for(const k in obj) if(obj.hasOwnProperty(k)) yield [k,obj[k]];
};


const obj={a:1,b:2,c:3,d:"absdf"};
const convert=v=>""+v;
const arrToString=acc=>{
    let START,END;
    if(acc.isObject) {
        START="{";END="}";
    }else{
        START="[";END="]";
    }
    let result="";
    if(acc.prev){
        let curr=acc;
    do{
        result=","+(curr.isObject ? `"${curr.value[0]}":${convert(curr.value[1])}` : convert(curr.value)) + result;
    }while(curr=curr.prev);
    result=result.substr(1);
    }
    return START+result+END;
}
const _recursion=(iter,isObject,acc,prev)=>{
    const {done,value}=iter.next();
    if(!done){
        const v=isObject? value[1]:value; //내가 지금 무엇인지
        switch(true){//내 자식이 무엇인지
            case Array.isArray(v):
                return _recursion(v[Symbol.iterator](),false,null,{target:iter,isObject,accumulation:acc,prev:prev});
            case v && typeof v=="object":
                return _recursion(objEntries(v),true,null,{target:iter,accumulation:acc,prev:prev});
            default:
                return _recursion(iter,isObject,{prev:acc,value},prev);
        }
    }
    else{
        let accStr=accToString(acc);
        if(prev){
            return _recursion(prev.target,{prev:prev.accumulation,value:accStr},prev.prev);
        }else{
            return accStr;
        }
    }
}

const stringify=obj=>_recursion(Array.isArray(v)? v[Symbol.iterator]():objEntries(v),!Array.isArray(v),null);
//console.log([1,2,3,4,5][Symbol.iterator]());
console.log(stringify([1,2,3,4,5][Symbol.iterator]()));


//과제1
[1,2,3,4,5,6,7].filter(v=>v%2).map(v=>v*2);