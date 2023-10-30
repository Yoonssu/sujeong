/*
setTimeout(콜백 함수, 밀리초): 주어진 밀리초(1,000분의 1초) 이후에 콜백 함수를 실행
setInterval(콜백 함수, 밀리초): 주어진 밀리초마다 콜백 함수를 반복 실행     
setImmediate(콜백 함수): 콜백 함수를 즉시 실행            



//이 타이머 함수들은 모두 아이디를 반환, 아이디를 사용하여 타이머를 취소할 수 있음 

clearTimeout(아이디): setTimeout을 취소      
clearInterval(아이디): setInterval을 취소   
clearImmediate(아이디): setImmediate를 취소

*/



const timeout = setTimeout(() => {   console.log('1.5초 후 실행'); }, 1500);  
const interval = setInterval(() => {   console.log('1초마다 실행'); }, 1000);  
const timeout2 = setTimeout(() => {   console.log('실행되지 않습니다'); }, 3000);  
setTimeout(() => {   clearTimeout(timeout2);   clearInterval(interval); }, 2500);  


const immediate = setImmediate(() => {   console.log('즉시 실행'); });  
const immediate2 = setImmediate(() => { console.log('실행되지 않음');});

clearImmediate(immediate2);