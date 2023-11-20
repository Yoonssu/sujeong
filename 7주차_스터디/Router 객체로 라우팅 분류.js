/*
app.js에서 app.get 같은 메서드가 라우터 부분
 -라우터를 많이 연결하면 app.js 코드가 매우 길어지므로 
  routes 폴더를 만들고 그 안에 index.js와 user.js를 작성

* index.js
const express = require('express');
const router = express.Router();
// GET / 라우터
router.get('/', (req, res) => {
  res.send('Hello, Express');
});
module.exports = router;

* user.js
const express = require('express');
const router = express.Router();
// GET /user 라우터
router.get('/', (req, res) => {
  res.send('Hello, User');
});
module.exports = router;


-> index.js와 user.js를 app.use를 통해 app.js에 연결
   + 에러 처리 미들웨어 위에 404 상태 코드를 응답하는 미들웨어를 하나 추가



   const path = require('path');

    dotenv.config();
    const indexRouter = require('./routes');
    const userRouter = require('./routes/user');
    ...
    name: 'session-cookie',
    }));

    app.use('/', indexRouter);
    app.use('/user', userRouter);

    app.use((req, res, next) => {
    res.status(404).send('Not Found');
    });

    app.use((err, req, res, next) => {



-> indexRouter를 ./routes로 require할 수 있는 이유는 index.js는 생략할 수 있기 때문이다.
   require('./routes/index.js') = require('./routes')

*/


/*
next 함수에 다음 라우터로 넘어가는 기능

-> next('route')
 :  이 기능은 라우터에 연결된 나머지 미들웨어들을 건너뛰고 싶을 때 사용

 router.get('/', (req, res, next) => {
  next('route');
}, (req, res, next) => {
  console.log('실행되지 않습니다');
  next();
}, (req, res, next) => {
  console.log('실행되지 않습니다');
  next();
});
router.get('/', (req, res) => {
  console.log('실행됩니다');
  res.send('Hello, Express');
});

-> 라우터가 몇 개든 간에 next()를 호출하면 다음 미들웨어가 실행

*/


/*
특수한 패턴
-> 라우트 매개변수


router.get('/user/:id', (req, res) => {
  console.log(req.params, req.query);
});

-> :id에 해당하는 1이나 123을 조회할 수 있다는 점이며, req.params 객체 안에 들어 있다.
 :id이면 req.params.id로, :type이면 req.params.type으로 조회할 수 있다.



 !!!주의
 - 일반 라우터보다 뒤에 위치해야 한다는 것
 

*/
/*
*/
/*
*/
/*
*/
/*
*/
/*
*/
/*
*/
/*
*/
/*
*/
/*
*/
/*
*/
/*
*/
/*
*/
/*
*/
/*
*/
