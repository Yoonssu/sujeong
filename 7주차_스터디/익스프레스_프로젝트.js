/*
 익스프레스 프로젝트를 시작
  1. learn-express 폴더를 만든다. 
  항상 package.json을 제일 먼저 생성해야 함.

{
  "name": "learn-express",
  "version": "0.0.1",
  "description": "익스프레스를 배우자",
  "main": "app.js",
  "scripts": {
    "start": "nodemon app"
  },
  "author": "ZeroCho",
  "license": "MIT"
}


  콘솔

$ npm i express 
$ npm i -D nodemon

-> 입력해서 package.json 생성
 */



//서버 역할을 할 app.js

const express = require('express');

const app = express();
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Hello, Express');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

//Express 모듈을 실행해 app 변수에 할당
//app.set('port', 포트)로 서버가 실행될 포트를 설정함.
//app.set(키, 값)을 사용해서 데이터를 저장할 수 있으며, 나중에 데이터를 app.get(키)로 가져올 수 있다.
//app.get(주소, 라우터)는 주소에 대한 GET 요청이 올 때 어떤 동작을 할지 적는 부분

//npm start로 http://localhost:3000으로 접속.





//단순한 문자열 대신 HTML로 응답하고 싶다면 res.sendFile 메서드를 사용


<html>
<head>
  <meta charset="UTF-8" />
  <title>익스프레스 서버</title>
</head>
<body>
  <h1>익스프레스</h1>
  <p>배워봅시다.</p>
</body>
</html>

const express = require('express');
const path = require('path');

const app_ = express();
app.set('port', process.env.PORT || 3000);
app.get('/', (req, res) => {
  // res.send('Hello, Express');
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(app_.get('port'), () => {
  console.log(app_.get('port'), '번 포트에서 대기 중');
});




//6.2 자주 사용하는 미들웨어

//익스프레스의 핵심이다. 
//요청과 응답의 중간(middle)에 위치하기 때문에 미들웨어(middleware)라고 부르는 것
//미들웨어는 app.use와 함께 사용



//1. app.use

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
  console.log('모든 요청에 다 실행됩니다.');
  next();
});
app.get('/', (req, res, next) => {
  console.log('GET / 요청에서만 실행됩니다.');
  next();
}, (req, res) => {
  throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {

})


//app.use에 매개변수가 req, res, next인 함수를 넣음.


/*
app.use(미들웨어) : 모든 요청에서 미들웨어 실행

app.use('/abc', 미들웨어) : abc로 시작하는 요청에서 미들웨어 실행

app.post('/abc', 미들웨어) : abc로 시작하는 POST 요청에서 미들웨어 실행
 */





//2. app.get('/')
//위의 코드에서 app.get('/')의 두 번째 미들웨어에서 에러가 발생하고, 
//이 에러는 그 아래에 있는 에러 처리 미들웨어에 전달됨.
//에러 처리 미들웨어는 매개변수가 err, req, res, next로 네 개
// 모든 매개변수를 사용하지 않더라도 매개변수가 반드시 네 개여야함.



//3. 실무에 자주 사용하는 패키지 

/*
npm i morgan cookie-parser express-session dotenv

-> dotenv를 제외한 다른 패키지는 미들웨어
-> dotenv는 process.env를 관리하기 위해 설치
 */



const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const _app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

app.use((req, res, next) => {
  console.log('모든 요청에 다 실행됩니다.');
  next();
});


/*
설치했던 패키지들을 불러온 뒤 app.use에 연결
->dotenv 패키지는 .env 파일을 읽어서 process.env로 만든다.
 dotenv 패키지의 이름이 dot(점)+env인 이유.. 

 -> process.env를 별도의 파일로 관리하는 이유는 보안과 설정의 편의성 때문

 */



//미들웨어

/*
1. morgan

=> app.use(morgan('dev')); 사용

3000 번 포트에서 대기 중
모든 요청에 다 실행됩니다.
GET / 요청에서만 실행됩니다.
Error: 에러는 에러 처리 미들웨어로 갑니다.
// 에러 스택 트레이스 생략
GET / 500 7.409 ms - 50


-> GET / 500 7.409ms - 50 로그는 morgan 미들웨어에서 나오는 것.
  요청과 응답에 대한 정보를 콘솔에 기록함.

 */




/*
2. static
=> app.use('요청 경로', express.static('실제 경로'));

   app.use('/', express.static(path.join(__dirname, 'public')));

-> 기본적으로 제공되기에 따로 설치할 필요 없이 express 객체 안에서 꺼내 장착하면된다.

->static 미들웨어는 정적인 파일들을 제공하는 라우터 역할을 함.
 */




/*
3. body-parser

=> app.use(express.json());
   app.use(express.urlencoded({ extended: false }));


=> 요청의 본문에 있는 데이터를 해석해서 req.body 객체로 만들어주는 미들웨어
-> 폼 데이터나 AJAX 요청의 데이터를 처리. 
   but, 멀티파트(이미지, 동영상, 파일) 데이터는 처리하지 못한다.

 */



/*
4. cookie-parser

=> app.use(cookieParser(비밀 키));

-> cookie-parser는 요청에 동봉된 쿠키를 해석해 req.cookies 객체로 만든다.


-> 해석된 쿠키들은 req.cookies 객체에 들어간다. name=zerocho 쿠키를 보냈다면 req.cookies는 { name: 'zerocho' }가 됨.
    유효 기간이 지난 쿠키는 알아서 걸러낸다.
 */




/*
5. express-session

 : 세션 관리용 미들웨어
 - 로그인 등의 이유로 세션을 구현하거나 특정 사용자를 위한 데이터를 임시적으로 저장해둘 때 매우 유용
 - 세션은 사용자별로 req.session 객체 안에 유지

 */

 app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

/*
- express-session은 인수로 세션에 대한 설정을 받는다.
- resave는 요청이 올 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지 설정하는 것
- saveUninitialized는 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정하는 것
- express-session은 세션 관리 시 클라이언트에 쿠키를 보낸다.
- 안전하게 쿠키를 전송하려면 쿠키에 서명을 추가해야 하고, 쿠키를 서명하는 데 secret의 값이 필요하다.
- cookie-parser의 secret과 같게 설정하는 것이 좋다.

- cookie 옵션은 세션 쿠키에 대한 설정이다.

req.session.name = 'zerocho'; // 세션 등록
req.sessionID; // 세션 아이디 확인
req.session.destroy(); // 세션 모두 제거



- express-session에서 서명한 쿠키 앞에는 s:이 붙는다.
- 실제로는 encodeURIComponent 함수가 실행되어 s%3A가 된다.
- s%3A의 뒷부분이 실제 암호화된 쿠키 내용


 */






//6. 미들웨어의 특성 활용하기

app.use((req, res, next) => {
  console.log('모든 요청에 다 실행됩니다.');
  next();
});

/*
- 미들웨어는 req, res, next를 매개변수로 갖는 함수(에러 처리 미들웨어만 예외적으로 err, req, res, next를 가집니다)로서 app.use나 app.get, app.post 등으로 장착한다.
- 특정한 주소의 요청에만 미들웨어가 실행되게 하려면 첫 번째 인수로 주소를 넣으면 된다.

*/

app.use(
  morgan('dev'),
  express.static('/', path.join(__dirname, 'public')),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(process.env.COOKIE_SECRET),
);

/*
- 여러 개의 미들웨어를 장착할 수도 있으며, 다음 미들웨어로 넘어가려면 next 함수를 호출해야한다.
-  next를 호출하지 않는 미들웨어는 res.send나 res.sendFile 등의 메서드로 응답을 보내야한다.
- 정적 파일을 제공하는 경우 express.json, express.urlencoded, cookieParser 미들웨어는 실행되지 않는다.


- next 함수에 인수를 넣을 수도 있다.
- route라는 문자열을 넣으면 다음 라우터의 미들웨어로 바로 이동하고, 그 외의 인수를 넣는다면 바로 에러 처리 미들웨어로 이동한다.
- 인수는 에러 처리 미들웨어의 err 매개변수가 된다. 
- 라우터에서 에러가 발생할 때 에러를 next(err)를 통해 에러 처리 미들웨어로 넘긴다.


- 미들웨어 간에 데이터를 전달하는 방법
- 세션을 사용한다면 req.session 객체에 데이터를 넣어도 되지만, 세션이 유지되는 동안에 데이터도 계속 유지된다는 단점이 있다.
- 요청이 끝날 때까지만 데이터를 유지하고 싶다면 res.locals 객체에 데이터를 넣어두면 된다.


 */
app.use((req, res, next) => {
  res.locals.data = '데이터 넣기';
  next();
}, (req, res, next) => {
  console.log(res.locals.data); // 데이터 받기
  next();
});

//현재 요청이 처리되는 동안 res.locals 객체를 통해 미들웨어 간에 데이터를 공유할 수 있고, 새로운 요청이 오면 res.locals는 초기화된다.





/*
7. multer
- 이미지, 동영상 등을 비롯한 여러 가지 파일을 멀티파트 형식으로 업로드할 때 사용하는 미들웨어
- 멀티파트 형식이란 다음과 같이 enctype이 multipart/form-data인 폼을 통해 업로드하는 데이터의 형식을 의미

 */
<form action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="image" />
  <input type="text" name="title" />
  <button type="submit">업로드</button>
</form>

//폼을 통해 업로드하는 파일은 body-parser로는 처리할 수 없고 직접 파싱(해석)하기도 어려우므로 multer라는 미들웨어를 따로 사용하면 편리하다.

const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});


/*
- multer 함수의 인수로 설정
- storage 속성에는 어디에(destination) 어떤 이름으로(filename) 저장할지
- destination과 filename 함수의 req 매개변수에는 요청에 대한 정보
- file 객체에는 업로드한 파일에 대한 정보
- limits 속성에는 업로드에 대한 제한 사항을 설정

- 현재 설정으로는 uploads라는 폴더에 [파일명+현재시간.확장자] 파일명으로 업로드
-> 현재 시간을 넣어주는 이유는 업로드하는 파일명이 겹치는 것을 막기 위함
 */

const fs = require('fs');

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

/*
!!!! 위 설정을 실제로 활용하려면 서버에 uploads 폴더가 꼭 존재해야한다.
-> 직접 만들어주거나 다음과 같이 fs 모듈을 사용해서 서버를 시작할 때 생성
->  upload 변수가 생김.

-> 파일을 하나만 업로드하는 경우에는 single 미들웨어를 사용
 */
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file, req.body);
  res.send('ok');
});

//여러 파일을 업로드하는 경우 HTML의 input 태그에는 multiple을 쓰면 된다.

<form id="form" action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="many" multiple />
  <input type="text" name="title" />
  <button type="submit">업로드</button>
</form>


/*
- 미들웨어는 single 대신 array로 교체한다.

app.post('/upload', upload.array('many'), (req, res) => {
  console.log(req.files, req.body);
  res.send('ok');
});



- 파일을 여러 개 업로드하지만 input 태그나 폼 데이터의 키가 다른 경우에는 fields 미들웨어를 사용합니다.

<form id="form" action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="image1" />
  <input type="file" name="image2" />
  <input type="text" name="title" />
  <button type="submit">업로드</button>
</form>
 */
/*
 */
/*
 */
/*
 */
