/*
6. 이벤트 이해하기
createReadStream 같은 경우는 내부적으로 알아서 data와 end 이벤트를 호출함.
-> 우리가 만들 수도 있음
*/

const EventEmitter = require('events');  
const myEvent = new EventEmitter(); 
myEvent.addListener('event1', () => {   console.log('이벤트 1'); }); 
myEvent.on('event2', () => {   console.log('이벤트 2'); }); 
myEvent.on('event2', () => {   console.log('이벤트 2 추가'); }); 
myEvent.once('event3', () => {   console.log('이벤트 3'); }); // 한 번만 실행됨  
myEvent.emit('event1'); // 이벤트 호출 
myEvent.emit('event2'); // 이벤트 호출  
myEvent.emit('event3'); // 이벤트 호출 
myEvent.emit('event3'); // 실행 안 됨  
myEvent.on('event4', () => {   console.log('이벤트 4'); }); 
myEvent.removeAllListeners('event4'); 
myEvent.emit('event4'); // 실행 안 됨  
const listener = () => {   console.log('이벤트 5'); }; 
myEvent.on('event5', listener); 
myEvent.removeListener('event5', listener); 
myEvent.emit('event5'); // 실행 안 됨  
console.log(myEvent.listenerCount('event2')); 


/*
on(이벤트명, 콜백): 이벤트 이름과 이벤트 발생 시의 콜백을 연결 = 리스닝
addListener(이벤트명, 콜백): on과 기능이 같음
emit(이벤트명): 이벤트를 호출하는 메서드
once(이벤트명, 콜백): 한 번만 실행되는 이벤트
removeAllListeners(이벤트명): 이벤트에 연결된 모든 이벤트 리스너를 제거
removeListener(이벤트명, 리스너): 이벤트에 연결된 리스너를 하나씩 제거
off(이벤트명, 콜백): 노드 10 버전에서 추가된 메서드로, removeListener와 기능이 같음
listenerCount(이벤트명): 현재 리스너가 몇 개 연결되어 있는지 확인
*/
