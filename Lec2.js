const elValidator=(list,el)=>typeof el=="number";
const listValidator=(list,el)=>Array.isArray(list);
const validator=(list,el)=>[
    (list,el)=>Array.isArray(list),
    (list,el)=>typeof el=="number"
]
const recursive=(list, index=0,acc=0)=>{
    if(!validator.every(vali=>vali(list,list[index]))) throw `invalid element`
    return recursive(list,index,acc+list[index]*2);
}