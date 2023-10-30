//1. fs 모듈 : 파일 시스템에 접근하는 모듈 
//-> 파일을 생성하거나 삭제하고 읽거나 쓸수 o


const fs = require('fs');  
fs.readFile('./readme.txt', (err, data) => {   if (err) {     throw err;   }   console.log(data);   
console.log(data.toString()); });


/*
fs 모듈을 불로오고 읽을 파일을 경로를 지정함. 
파일의 경로가 현재 파일 기준이 아니라 node명령어를 실행하는 콘솔 기준임
파일을 읽은 후 실행될 콜백함수도 readFile의 메서드의 인구로 같이 넣음
콜백함수의 매개변수로 에러 또는 데이터를 받음 
*/



//2. 동기 메서드와 비동기 메서드
/*노드는 대부분의 메서드를 비동기 방식으로 처리함. 


비동기 메서드들은 백그라운드에 해당 파일을 읽으라고만 요청하고 다음작업으로 넘어감
-> 수백개의 i/o 요청이 와도 메인 스레드는 백그라운드에 요청 처리를 위임함.
 그 후로 얼마든지 요청을 더 받을 수 o 


 1) 동기와 비동기 : 백그라운드 작업 완료 확인 여부
 2) 블로킹과 논 블로킹 : 함수가 바로 return 되는지 여부
*/



/*3. 버퍼와 스트림 
: 파일을 읽거나 쓰는 방식

1) 버퍼링 : 영상을 재생할 수 있을 때까지 데이터를 모으는 동작
2) 스트리밍: 방송인의 컴퓨터에서 시청자의 컴퓨터로 영상 데이터를 조금씩 전송하는 동작

-> 스트리밍하는 과정에서 버퍼링을 할 수도 있음.

*/

//버퍼를 직접 다루는 Buffer
const buffer = Buffer.from('저를 버퍼로 바꿔보세요'); 
console.log('from():', buffer); 
console.log('length:', buffer.length); 
console.log('toString():', buffer.toString());  
const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')]; 
const buffer2 = Buffer.concat(array); 
console.log('concat():', buffer2.toString());  
const buffer3 = Buffer.alloc(5); 
console.log('alloc():', buffer3)


//버퍼 메서드
/*
1)from(문자열): 문자열을 버퍼로 바꿀 수 있음. length 속성은 버퍼의 크기
2)toString(버퍼): 버퍼를 다시 문자열로 바꿀 수 있음. 이때 base64나 hex를 인수로 넣으면 해당 인코딩으로도 변환 가능함
3) concat(배열): 배열 안에 든 버퍼들을 하나로 합침
4)alloc(바이트): 빈 버퍼를 생성. 바이트를 인수로 넣으면 해당 크기의 버퍼가 생성됨.

*/



/* 4. 기타 fs 메서드
fs.access(경로, 옵션, 콜백): 폴더나 파일에 접근할 수 있는지를 체크
fs.mkdir(경로, 콜백): 폴더를 만드는 메서드
fs.open(경로, 옵션, 콜백): 파일의 아이디(fd 변수)를 가져오는 메서드
fs.rename(기존 경로, 새 경로, 콜백): 파일의 이름을 바꾸는 메서드
fs.readdir(경로, 콜백): 폴더 안의 내용물을 확인가능
fs.unlink(경로, 콜백): 파일을 지울 수 있음.
fs.rmdir(경로, 콜백): 폴더를 지울 수 있음.
*/


/*5.스레드풀 알아보기
- > 스레드 풀이 작업을 동시에 처리하므로 여덟 개의 작업 중에서 어느것이
먼저 처리될 지 모름 , 직접 컨트롤 할 수 는 없지만 개수를 조절할 수 있음

*/

const crypto = require('crypto');  
const pass = 'pass'; const salt = 'salt'; const start = Date.now();  
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {   console.log('1:', Date.now() - start); });  
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {   console.log('2:', Date.now() - start); });  
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {   console.log('3:', Date.now() - start); });  
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {   console.log('4:', Date.now() - start); });  
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {   console.log('5:', Date.now() - start); });  
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {   console.log('6:', Date.now() - start); });  
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {   console.log('7:', Date.now() - start); });  
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {   console.log('8:', Date.now() - start); });






/*
6. 예외 처리하기
-> 멀티 스레드 프로그램에서는 스레드 하나가 멈추면 그 일을 다른 스레드가 대신하는데
노드의 메인 스레드는 하나뿐이므로 그 하나를 소중히 보호해야함


메인스레드가 에러로 멈춘다는 것은 스레드를 갖고 있는 프로세스가 멈춘다는 뜻,
= > 결국 전체 서버가 멈춘다는 뜻

*/

