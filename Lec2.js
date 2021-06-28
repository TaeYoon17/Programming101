const elValidator=(list,el)=>typeof el=="number";
const listValidator=(list,el)=>Array.isArray(list);
const validator={
    data: (list,el)=>[
        (list,el)=>Array.isArray(list),
        (list,el)=>typeof el=="number"
    ],
    validate(list,index){
        return this.data.every(vali=>list,list[index]);
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