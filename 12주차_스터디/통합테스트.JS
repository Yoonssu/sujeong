// 11.4 통합 테스트

 

// - 하나의 라우터에는 여러 개의 미들웨어가 붙어 있고 다양한 라이브러리가 사용되는데 이런 것들이 유기적으로 잘 작동하는지 테스트하는 것이 통합 테스트이다.

 

// $npm i -D supertest


// - supertest를 사용하기 위해서는 app객체를 모듈로 만들어 분리해야 한다.
// - app.js파일에서 app객체를 모듈로 만든 후, server.js에서 불러와 listen 한다.

// - server.js는 app의 포트 리스닝만 담당한다.

// - package.json을 상황에 맞게 수정한다.

 

 

//   "scripts": {
//     "start":"nodemon server",
//     "test": "jest",
//     "coverage":"jest --coverage"
//   },
 

// 통합 테스트에서는 데이터베이스 코드를 모킹하지 않는다. 따라서 테스트용 데이터베이스를 따로 만드는 것이 좋다.

 

 

// //routes/auth.test.js
// const request = require('supertest');
// const { sequelize } = require('../models');
// const app = require('../app');

// beforeAll(async ()=>{
// 	await sequilize.sync();
// });

// describe('POST /login',()=>{
// 	test('로그인 수행', (done)=>{
//     	request(app)
//         .post('/auth/login')
//         .send({
//         	email: 'jinmin645@gmail.com',
//             password: '12345678',
//         })
//         .expect('Location','/')
//         .expect(302, done);
//     });
// });
 

// 1) beforeAll 함수

 
// - 현재 테스트를 실행하기 전에 실행하는 함수이다.
// - afterAll(모든 테스트가 끝난 후) , beforeEach(각각의 테스트 수행 전) , afterEach(각각의 테스트 수행 후)등이 있다.

 

 

 

 