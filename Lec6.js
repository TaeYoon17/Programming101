// iterator =
if(1){
    const iterable={
        [Symbol.iterator](){
            const arr=[1,2,3,4];
            let cursor=0;
            return{
                next(){
                    return {done: cursor<arr.length, value:cursor<arr.length ? arr[cursor++]:undefined};
                }
            }
        }
    }
    const iter1= iterable[Symbol.iterator]();
    //console.log(iter1.next());
    const [a,b,...arr]=iterable;
    //console.log(a,b,arr);
    const filter=(iter,block)=>({
        next(){
            let {done,value}=iter.next();
            while(!done){
                if(block(value)) return {done:false,value};
                ({done,value}=iter.next());
            }
            return {done};
        }
    });
    const map=(iter,block)=>({
        next(){
            const {done,value}=iter.next();
            if(!done) return {done, value:block(value)};
            else return {done};
        }
    })
    const iter=iter=>({[Symbol.iter](){return iter}});
}
// 객체지향 데코레이터 패턴

// Parser 입문
const str="[1,2,[3,4,[5,[6,7]]]]";
// 1. 대괄호 열기가 온다 => 새 배열을 만든다. 지금 배열은 스택으로 넣는다.
// 2. 대괄호 닫기가 온다 => 지금 배열을 종료하고, 스택을 이전으로 돌린다.
// 3. 적합한 원소가 온다 => 원소는 컴마를 포함하거나 하지 않는다 => 현재 배열에 값을 추가한다.

// 정규식 작성
const rNum= /^\s*([0-9]+)\s*,?/;

const parse=(str,acc=[],stack=[])=>{
    const v=str.trim();
    if(!v) return acc;
    switch(v[0]){
        case '[':
            stack.push(acc);
            return parse(v.substr(1),[],stack);
        case ']':
            const prev=stack.pop();
            prev.push(acc);
            return parse(v.substr(1),prev,stack);
        default:
            const value=rNum.exec(v);
            if(!value) throw "invalid value: " + v;
            acc.push(parseFloat(value[1]));
            return parse(v.substr(value[0].length),acc,stack);
    }
}
// 열린 목록 => 해결한 문제 / 닫힌 목록 => 해결된 문제
console.log(parse(str));

// 정규식 기초 => 결합, 선택, 그룹 
// 정규식 === 문자에 대한 식 (문자열 X), 단일 문자1개 그룹진 문자를 하나의 문자로 본다. / 문자의 위치도 문자다.
// ^ 줄의 시작이라는 문자
// $ 줄의 끝이라는 문자
// abc a + b + c => 결합연산자는 생략한다.
// | 선택연산자 ab|bb
// 그룹 () 하나의 문자로 인식됨 a +(a|b|c|e) + b =. a+[abce]b
// "asdfbcv\"sdsdsd" => "sdsdsd"
// /"([^"]|\\")*?"/ => ?는 최소 일치

//과제 1 - 모든 값 타입을 인식하여 파싱하는 중첩된 배열문자열 파서
const str="[1,2,'123',[3]]"
//과제 2 - 나만의 클래스 타입을 인식하여 해당 클래스의 인스턴스를 만들어 넣어주는 기능 추가
//과제 3 - 기존 작성한 stringify가 Object인 경우 toJSON을 구현하고 있으면 그걸 이용해 stringify가 되도록 보수
/*
class Test{
    a;b;
    constructor(a,b){this.a=a,this.b=b}
    toJSON(){return "Test@"+this.a+":"+this.b;}
}
"[Test@3:7,3,5]" => [new Test(3,7),3,5];
*/