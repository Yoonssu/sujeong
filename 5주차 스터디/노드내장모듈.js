//1. os 모듈
const os =  require('os');

console.log('운영체제 정보---------------------------------'); 
console.log('os.arch():', os.arch());  //process.arch와 동일
console.log('os.platform():', os.platform()); //process.platform과 동일
console.log('os.type():', os.type()); //운영체제의 종류를 보여줌
console.log('os.uptime():', os.uptime()); //운영체제 부팅 이후 흐른 시간(초)을 보여줌
//process.uptime()은 노드의 실행 시간
console.log('os.hostname():', os.hostname()); //컴퓨터의 이름을 보여줌
console.log('os.release():', os.release());  //운영체제의 버전을 보여

console.log('경로------------------------------------------'); 
console.log('os.homedir():', os.homedir()); //홈디렉터리 경로 보여줌
console.log('os.tmpdir():', os.tmpdir());  //임시파일 저장경로 보여줌

console.log('cpu 정보--------------------------------------'); 
console.log('os.cpus():', os.cpus()); //컴퓨터 코어 정보를 보여줌
console.log('os.cpus().length:', os.cpus().length);  

console.log('메모리 정보-----------------------------------');
console.log('os.freemem():', os.freemem()); //사용 가능한 메모리를 보여줌
console.log('os.totalmem():', os.totalmem());//전체 메모리 용량을 보여줌

//+ os.cups().length를 하면 코어의 개수가 숫자로 나옴
//+ os.constants : 각종 에러와 신호에 대한 정보


//2. path : 폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈
// -> 운영체제별로 경로 구분자가 다르기 때문에 필요 

//윈도 : C:\Users\ 처럼 \로 구분
//리눅스 : /home/ 처럼 /로 구분

const path = require('path');
const string =__filename;


console.log('path.sep:', path.sep);  // 경로의 구분자  , 윈도 :\  POSIX : /
console.log('path.delimiter:', path.delimiter); //환경변수의 구분자 , 윈도는 ; POSIX는 :
console.log('------------------------------'); 

console.log('path.dirname():', path.dirname(string)); //파일이 위치한 폴더 경로보여줌
console.log('path.extname():', path.extname(string)); //파일의 확장자 보여줌
console.log('path.basename():', path.basename(string)); //파일의 이름을 표시 
console.log('path.basename - extname:', path.basename(string, path.extname(string))); 
//
console.log('------------------------------'); 

console.log('path.parse()', path.parse(string)); //파일의 경로를 root, dir, base,ext,name 으로 분리
console.log('path.format():', path.format({   dir: 'C:\\users\\zerocho',   name: 'path',   ext: '.js', })); 
//path.parse() 한 객체를 파일 경로로 합침
console.log('path.normalize():', path.normalize('C://users\\\\zerocho\\\path.js')); 
// /나\를 실수로 여러번 사용했거나 혼용시 정상적인 경로로 변환
console.log('------------------------------'); 

console.log('path.isAbsolute(C:\\):', path.isAbsolute('C:\\')); 
//파일의 경로 절대경로인지 상대경로인지 true나 false 로 알림
console.log('path.isAbsolute(./home):', path.isAbsolute('./home')); 
console.log('------------------------------'); 

console.log('path.relative():', path.relative('C:\\users\\zerocho\\path.js', 'C:\\'));
//경로를 두 개 넣으면 첫 번째 경로에서 두 번째 경로로 가는 방법을 알림
console.log('path.join():', path.join(__dirname, '..', '..', '/users', '.', '/zerocho'));   
//여러 인수를 넣으면 하나의 경로로 합침  
console.log('path.resolve():', path.resolve(__dirname, '..', 'users', '.', '/zerocho'));

//join과 resolve의 차이
//-> /를 만나면 resolve는 절대경로로 인식해 앞의 경로를 무시하고, join은 상대 경로로 처리

path.join('/a', '/b', 'c');  /*  결과 : /a/b/c/ */ 
path.resolve('/a', '/b', 'c');  /*  결과 : /b/c */


//3. url 
//-> 인터넷 주소를 쉽게 조작하도록 도와주는 모듈 / 처리방식 2가지
//1) WHATWG방식, 2) 기존 URL 방식


//1) WHATWG방식
const url = require('url');
const { URL } = url;     
const my_URL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');     
console.log('new URL():', myURL); 
console.log('url.format():', url.format(myURL)); 
console.log('------------------------------'); 
const parsedUrl = url.parse('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor'); 
console.log('url.parse():', parsedUrl); 
console.log('url.format():', url.format(parsedUrl));

//URL 모듈 안에 URL 생성자가 있음. 이 생성자에 주소를 넣어 객체로 만들면 주소가 부분별로 정리됨

//WHATWG에만 있는 username, password, origin, searchParams 속성이 존재
//search 부분을 searchParams 라는 특수한 객체로 반환하므로 유용함
//search 부분은 보통 주소를 통해 데이터 전달시 사용, ?로 시작하고 그 뒤에 키= 값 형식으로 데이터 전달 , 
//여러 키가 있을 경우 &로 구분
//http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript와 같은 주소에서는 ?page=3&limit=10&category=nodejs&category=javascript 부분이 search.


//2) 기존 URL 방식
//url.parse(주소): 주소를 분해 , WHATWG 방식과 비교하면 username과 password 대신 auth 속성이 있고, searchParams 대신 query가 있음.
//url.format(객체): WHATWG 방식 url과 기존 노드의 url을 모두 사용할 수 있음. 분해되었던 url 객체를 다시 원래 상태로 조립합


// 취향따라 사용 O , url 형식을 꼭 사용해야하는 경우
//1) host 부분 없이 pastname부분만 오는 주소인 경우 WHATWG 방식 사용 xx



//WHATWG에만 있는 username, password, origin, searchParams 속성이 존재
//search 부분을 searchParams 라는 특수한 객체로 반환하므로 유용함
//search 부분은 보통 주소를 통해 데이터 전달시 사용, ?로 시작하고 그 뒤에 키= 값 형식으로 데이터 전달 , 
//여러 키가 있을 경우 &로 구분
//http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript와 같은 주소에서는 ?page=3&limit=10&category=nodejs&category=javascript 부분이 search.

const { URL } = require('url');  
const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');    
console.log('searchParams:', myURL.searchParams); 
console.log('searchParams.getAll():', myURL.searchParams.getAll('category')); 
console.log('searchParams.get():', myURL.searchParams.get('limit')); 
console.log('searchParams.has():', myURL.searchParams.has('page'));  
console.log('searchParams.keys():', myURL.searchParams.keys()); 
console.log('searchParams.values():', myURL.searchParams.values());  
myURL.searchParams.append('filter', 'es3'); myURL.searchParams.append('filter', 'es5'); 
console.log(myURL.searchParams.getAll('filter'));  
myURL.searchParams.set('filter', 'es6'); 
console.log(myURL.searchParams.getAll('filter'));  
myURL.searchParams.delete('filter'); 
console.log(myURL.searchParams.getAll('filter'));  
console.log('searchParams.toString():', myURL.searchParams.toString()); 
myURL.search = myURL.searchParams.toString();

//URL 생성자를 통해 myURL 이라는 주소 객체를 만듦. 
//myURL안에는 searchParams 객체가 있음. -> search 부분을 조작하는 다양한 메서드를 지원함

/*
getAll(키): 키에 해당하는 모든 값들을 가져옴
category 키에는 nodejs와 javascript라는 두 가지 값이 들어 있음
get(키): 키에 해당하는 첫 번째 값만 가져옴     
has(키): 해당 키가 있는지 없는지를 검사
keys(): searchParams의 모든 키를 반복기(iterator)(ES2015 문법) 객체로 가져옴
values(): searchParams의 모든 값을 반복기 객체로 가져옴
append(키, 값): 해당 키를 추가, 같은 키의 값이 있다면 유지하고 하나 더 추가      
set(키, 값): append와 비슷하지만, 같은 키의 값들을 모두 지우고 새로 추가
delete(키): 해당 키를 제거
toString(): 조작한 searchParams 객체를 다시 문자열로 만듦,이 문자열을 search에 대입하면 주소 객체에 반영됨.
*/




//4. querystring
//WHATWG방식의 url 대신 기존노드의 url 사용할 때 search 부분을 사용하기 쉽게 객체로 만드는 모듈


const url = require('url');  
const querystring = require('querystring');   
const parsed_Url = url.parse('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');  
const query = querystring.parse(parsed_Url.query); 
console.log('querystring.parse():', query); 
console.log('querystring.stringify():', querystring.stringify(query));

//querystring.parse(쿼리): url의 query 부분을 자바스크립트 객체로 분해
//querystring.stringify(객체): 분해된 query 객체를 문자열로 다시 조립함




//5. crypto
//다양한 방식의 암호화를 도와주는 모듈

//1) 단방향 암호화
/*-> 복호화할 수 없는 암호화 방식, 복호화: 암호화된 문자열을 원래 문자열로 되돌려 놓는것.
-> 한 번 암호화하면 원래 문자열을 찾을 수 없음. 복호화할 수 없으므로 해시함수라고 함


* 해시기법
: 어떠한 문자열을 고정된 길이의 다른 문자열로 바꾸는 방식, 입력문자열의 길이는 다르지만 
출력 문자열의 길이는 네자리로 고정
*/


const crypto = require('crypto');  
console.log('base64:', crypto.createHash('sha512').update('비밀번호').digest('base64')); 
console.log('hex:', crypto.createHash('sha512').update('비밀번호').digest('hex')); 
console.log('base64:', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));

/*
createHash(알고리즘): 사용할 해시 알고리즘을 넣음. md5, sha1, sha256, sha512 등이 가능하지만, md5와 sha1은 이미 취약점이 발견됨.
현재는 sha512 정도로 충분하지만, 나중에 sha512마저도 취약해지면 더 강화된 알고리즘으로 바꿔야 함.
update(문자열): 변환할 문자열을 삽입
digest(인코딩): 인코딩할 알고리즘을 넣음. base64, hex, latin1이 주로 사용되는데, 
그중 base64가 결과 문자열이 가장 짧아 애용됨. 결과물로 변환된 문자열을 반환.


가끔 다른 입력 문자열이 같은 출력 문자열로 바뀔때가 있음 = 충돌
노드에서 지원하는 pbkdf2 : 기존 문자열에 salt라고 불리는 문자열을 붙인 후 해시 알고리즘을 반복해서 적용하는 것
*/


const crypto = require('crypto');   
crypto.randomBytes(64, (err, buf) => {   
    const salt = buf.toString('base64');    
console.log('salt:', salt);    
crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {      
    console.log('password:', key.toString('base64'));    });  });      
   

//randomBytes 메서드로 64바이트 길이의 문자열을 만듦 = salt 
//pbkdf2 메서드에는 순서대로 진행 후 10만법 반복해서 적용함.
//-> 즉, sha512로 변환된 결괏값을 다시 sha512로 변환하는 과정을 10만 번 반복


//2) 양방향 암호화
/* 암호화된 문자열을 복호화할 수 있으며 키(열쇠)라는 것이 사용됨 
암호화할 때 사용한 키와 복호화할 때 사용한 키가 같아야함
*/

const crypto = require('crypto');   
const algorithm = 'aes-256-cbc';  
const key = 'abcdefghijklmnopqrstuvwxyz123456';  
const iv = '1234567890123456';  
const cipher = crypto.createCipheriv(algorithm, key, iv);  
let result = cipher.update('암호화할 문장', 'utf8', 'base64');  
result += cipher.final('base64');  
console.log('암호화:', result);   
const decipher = crypto.createDecipheriv(algorithm, key, iv);  
let result2 = decipher.update(result, 'base64', 'utf8');  result2 += decipher.final('utf8');  
console.log('복호화:', result2); 

/*
• crypto.createCipheriv(알고리즘, 키, iv): 암호화 알고리즘과 키, iv를 넣음.
 암호화 알고리즘은 aes-256-cbc를 사용, aes-256-cbc 알고리즘의 경우 키는 32바이트여야 하고, iv는 16바이트여야 함.
  iv는 암호화할 때 사용하는 초기화 벡터를 의미함.

• cipher.update(문자열, 인코딩, 출력 인코딩): 암호화할 대상과 대상의 인코딩, 출력 결과물의 인코딩을 넣음. 보통 문자열은 utf8 인코딩을, 암호는 base64를 많이 사용     
• cipher.final(출력 인코딩): 출력 결과물의 인코딩을 넣으면 암호화가 완료됨      
• crypto.createDecipheriv(알고리즘, 키, iv): 복호화할 때 사용. 암호화할 때 사용했던 알고리즘과 키, iv를 그대로 넣어야 함.      
• decipher.update(문자열, 인코딩, 출력 인코딩): 암호화된 문장, 그 문장의 인코딩, 복호화할 인코딩을 넣음,
   createCipheriv의 update()에서 utf8, base64순으로 넣었다면 createDecipheriv의 update()에서는 base64, utf8순으로 넣으면 됨     
• decipher.final(출력 인코딩): 복호화 결과물의 인코딩을 넣음.
*/




/* 6. util
: 각종 편의 기능을 모아둔 모듈 , 계속 API가 추가되고 있으며, 가끔 deprecated되어 사라지는 경우 o
deprecated : 중요도가 떨어져 더 이상 사용되지 않고 앞으로는 사라지게 될 것


1) util.deprecate : 함수가 deprecate 처리 됨을 알림. 
-> 첫 인수로 넣은 함수 사용시 경고 메세지 출력,
두 번째 인수로 경고 메시지 내용을 넣으면 됨.

2) util.promisify : 콜백 패턴을 프로미스 패턴으로 바꿈 .바꿀 함수를 인수로 제공하면 됨.

*/



/*7. worker_thread
: 노드에서 멀티 스레딩 방식으로 작업하는 방법
*/

const {    Worker, isMainThread, parentPort, } = require('worker_threads');  
 if (isMainThread) { // 부모일 때    
    const    worker = new Worker(__filename);    
    worker.on('message', message => console.log('from worker', message));    
    worker.on('exit', () => console.log('worker exit'));    
    worker.postMessage('ping');  } 
else { // 워커일 때    
    parentPort.on('message', (value) => {      console.log('from parent', value);      
    parentPort.postMessage('pong');      parentPort.close();    });  } 

//isMainThread 를 통해  현재 코드가 메인 스레드에서 실행되는지 아니면 생성한 워커 스레드에서 
//실행되는지 구분됨. 
//부모에서는 워커 생성 후  worker.postMessage로 워커에 데이터를 보낼 수 있음.



//8.child_process
// 다른 프로그램 실행하고 싶거나 명령어를 수행하고 싶을 때 사용하는 모듈
// -> 다른 언어의 코드를 실행하고 결과값을 받을 수 있음


//9.기타 모듈
/*
1)assert: 값을 비교하여 프로그램이 제대로 동작하는지 테스트하는 데 사용
2)dns: 도메인 이름에 대한 IP 주소를 얻어내는 데 사용
3)net: HTTP보다 로우 레벨인 TCP나 IPC 통신을 할 때 사용
4)string_decoder: 버퍼 데이터를 문자열로 바꾸는 데 사용
5)tls: TLS와 SSL에 관련된 작업을 할 때 사용
6)tty: 터미널과 관련된 작업을 할 때 사용
7)dgram: UDP와 관련된 작업을 할 때 사용
8)v8: V8 엔진에 직접 접근할 때 사용
9)vm: 가상 머신에 직접 접근할 때 사용
*/