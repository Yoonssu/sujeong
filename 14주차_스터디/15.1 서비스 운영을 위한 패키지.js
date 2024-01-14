//15.1.1 morgan과 express-session

//app.js
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}
app.use(express.static(path.join(__dirname, 'public')));

//process.env.NODE_ENV는 배포 환경인지 개발 환경인지를 판단할 수 있는 환경 변수
//배포 환경일 때는 morgan을 combined 모드로 사용하고, 개발 환경일 때는 dev 모드로 사용



//2. express-session을 배포용으로 설정
//app.js

app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
};
if (process.env.NODE_ENV === 'production') {
  sessionOption.proxy = true;
  // sessionOption.cookie.secure = true;
}
app.use(session(sessionOption));
app.use(passport.initialize());

//배포 환경일 때는 proxy와 cookie.secure를 true로 바꿈.


//2. 시퀄라이즈

//데이터베이스도 배포 환경으로 설정
//시퀄라이즈에서 가장 큰 문제는 비밀번호가 하드 코딩되어 있다는 것이며, JSON 파일이므로 변수를 사용할 수 없다.

//config 폴더에서 config.json을 지우고 config.js를 생성

require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'nodebird',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "nodebird_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: 'root',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'nodebird',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },
};


//3. corss-env

// corss-env 패키지를 사용하면 동적으로 process.env(환경 변수)를 변경할 수 있다. 또한, 모든 운영체제에서 동일한 방법으로 환경 변수를 변경할 수 있게 된다.

// package.json

//   "scripts": {
//     "start": "NODE_ENV=production PORT=80 node server",
//     "dev": "nodemon server",




//4.sanitize-html csurf

//각각 XSS(Cross Site Scripting), CSRF(Cross Site Request Forgery) 공격을 막기 위한 패키지

//npm i sanitize-html    npm i csurf



// 5. pm2

// npm i pm2

// "scripts": {
//     "start": "cross-env NODE_ENV=production PORT=80 pm2 start server.js",
 

// + 
// 노드의 cluster 모듈처럼 클러스터링을 가능하게 하는 pm2의 클러스터링 모드를 사용

//   "scripts": {
//     "start": "cross-env NODE_ENV=production PORT=80 pm2 start server.js -i 0"





