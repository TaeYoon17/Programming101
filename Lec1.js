//과제
const isValiArr=(arr)=> typeof(arr)==='number' ? true : (arr instanceof Array && arr.length > 0)  ? true :false;
const isValiEl=(el)=>typeof(el)==='number' ? true: false;
const validate=(arr,el)=>isValiArr(arr)&&isValiEl(el);
const _sum=(arr,acc=0,idx=0)=>{
    if(!validate(arr,arr[idx])) throw "invalidValidate";
    return arr.length-1==idx ? acc+arr[idx]:_sum(arr,acc+arr[idx],++idx)
}
const sum=(arr)=>_sum(arr);
try{
    console.log(sum([1,2,3,4,5]));
}catch(e){
    console.error(e);
}
console.log(isValiEl(3));
console.log(isValiArr([1]));

const arr=[3,1,2,3,4];
let acc=0,idx=0;
for(idx=0; idx!=arr.length-1; idx++){
    if(!validate(arr,arr[idx])) throw "invalidValidate";
    acc+=arr[idx];
}
acc+=arr[idx];
try{
    console.log(acc);
}catch(e){
    console.error(e);
}

