const string = 'abc';
const number = 1; 
const boolean = true; 
const obj = {   
    outside: {     
        inside: {       
            key: 'value',     
        },   
    }, 
}; 
console.time(레이블);   //같은 레이블을 가진 time과 timeEnd 사이의 시간 측정
console.log('평범한 로그입니다 쉼표로 구분해 여러 값을 찍을 수 있습니다'); 
console.log(string, number, boolean); console.error('에러 메시지는 console.error에 담아주세요');  
console.table([{ name: '제로', birth: 1994 }, { name: 'hero', birth: 1988}]);  // 객체의 속성들이 테이블 형식으로 표현
console.dir(obj, { colors: false, depth: 2 });

console.dir(obj, { colors: true, depth: 1 });   //(객체, 옵션)
console.time('시간 측정'); 
for (let i = 0; i < 100000; i++) {} 
console.timeEnd('시간 측정');  

function b() {   console.trace('에러 위치 추적'); } 

function a() {   b(); } a(); 
console.timeEnd('전체 시간');


//console.trace(레이블) -> 에러가 어디서 발생했는지 추적할 수 있게 함