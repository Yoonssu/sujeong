

//11.2  유닛 테스트

//middlewares.test.js
const { isLoggedIn,isNotLoggedIn} = require("./middlewares");

describe('isLoggedIn',()=>{
    const res={
        status:jest.fn(()=>res),
        send:jest.fn(),
    };
    const next = jest.fn();

    test('로그인되어 있으면 isLoggedIn이 next를 호출해야 함',()=>{
        const req={
            isAuthenticated:jest.fn(()=>true),
        };
        isLoggedIn(req,res,next);
        expect(next).toBeCalledTimes(1);
    });
    
    test('로그인되어 있지 않으면 isLoggedIn이 에러를 응답해야 함',()=>{
        const req={
            isAuthenticated:jest.fn(()=>false),
        };
        isLoggedIn(req,res,next);
        expect(res.status).toBeCalledWith(403);
        expect(res.send).toBeCalledWith('로그인 필요');
    });
});
 
/*
작은 단위의 함수나 모듈이 의도된 대로 정확히 작동하는지 테스트하는 것을 유닛 테스트라고 한다.

 

describe 함수는 테스트를 그룹화해주는 역할을 한다.

-> 첫 번째 인수는 그룹에 대한 설명, 두 번째 인수인 함수는 그룹에 대한 내용이다.

 
*/
 

 
/*
모킹

 

테스트의 역할은 코드나 함수가 제대로 실행되는지를 검사하고 값이 일치하는지를 검사하는 것이므로, 테스트 코드의 객체가 실제 익스프레스 객체가 아니어도 된다. 

-> 가짜 객체, 가짜 함수를 넣는 행위를 모킹이라고 한다. 

 

- 함수를 모킹 할 때는 jest.fn 메서드를 사용한다. 

- 반환값을 지정하고 싶다면 jest.fn(() => 반환값)을 사용하면 된다.

 */

const { isLoggedIn, isNotLoggedIn } = require('./');

describe('isLoggedIn', () => {
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };
  const next = jest.fn();

  test('로그인 되어있으면 isLoggedIn이 next를 호출해야 함', () => {
    const req = {
      isAuthenticated: jest.fn(() => true),
    };
    isLoggedIn(req, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test('로그인 되어있지 않으면 isLoggedIn이 에러를 응답해야 함', () => {
    const req = {
      isAuthenticated: jest.fn(() => false),
    };
    isLoggedIn(req, res, next);
    expect(res.status).toBeCalledWith(403);
    expect(res.send).toBeCalledWith('로그인 필요');
  });
});
 

/*
 - isAuthenticated : 로그인 여부를 알려주는 함수 -> true 나 false 반환

- res.status : 메서드 체이닝이 가능해야 하므로 res 반환

- test 함수 내부에서는 모킹된 객체와 함수를 사용해 isLoggedIn 미들웨어를 호출한 후 expect로 원하는 내용대로 실행되었는지 체크한다.

- toBeCalledTimes(숫자)는 정확히 몇 번 호출되었는지 체크하는 메서드이고, toBeCalledWith(인수)는 특정 인수와 함께 호출되었는지를 체크하는 메서드이다.

*/

 

 
/*
 

1) 미들웨어 테스트 

 

- 유닛 테스트를 위해 미들웨어를 분리해야 한다.

const express = require('express');

const { isLoggedIn } = require(./middlewares');
const User = require('../models/user');
const router = express.Router();

router.post('/:id/follow',isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) { // req.user.id가 followerId, req.params.id가 followingId
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send('success');
    } else {
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = router;
 

POST /:id/follow 라우터의 asyn 함수 부분을 따로 분리하여 controllers 폴더를 만들고 그 안에 user.js를 만든다. 

-> 라우터에서 응답을 보내는 미들웨어를 컨트롤러라고 부른다.

 
*/
 

// controllers/user.js

// router.post('/:id/follow',isLoggedIn, async (req, res, next) => {
//   try {
//     const user = await User.findOne({ where: { id: req.user.id } });
//     if (user) { // req.user.id가 followerId, req.params.id가 followingId
//       await user.addFollowing(parseInt(req.params.id, 10));
//       res.send('success');
//     } else {
//       res.status(404).send('no user');
//     }
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };
 

 

 
/*
routes/user.js

const express = require('express');

const { isLoggedIn } = require(./middlewares');
const { addFollowing } = require(../controllers/user');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, addFollowing);

module.exports = router;
 

 
*/
 

//addFollowing 컨트롤러 테스트

 

controllers/user.test.js 

jest.mock('../models/user');
const User = require('../models/user');
const { follow } = require('./user');

describe('follow', () => {
  const req = {
    user: { id: 1 },
    params: { id: 2 },
  };
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };
  const next = jest.fn();

  test('사용자를 찾아 팔로잉을 추가하고 success를 응답해야 함', async () => {
    User.findOne.mockReturnValue({
      addFollowing(id) {
        return Promise.resolve(true);
      }
    });
    await follow(req, res, next);
    expect(res.send).toBeCalledWith('success');
  });

  test('사용자를 못 찾으면 res.status(404).send(no user)를 호출함', async () => {
    User.findOne.mockReturnValue(null);
    await follow(req, res, next);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledWith('no user');
  });

  test('DB에서 에러가 발생하면 next(error) 호출함', async () => {
    const message = 'DB에러';
    User.findOne.mockReturnValue(Promise.reject(message));
    await follow(req, res, next);
    expect(next).toBeCalledWith(message);
  });
});
 

 

/*addFollowing 컨트롤러가 async 함수이므로 await를 붙여야 컨트롤러가 실행 완료된 후 expect 함수가 실행된다.

-> 위의 코드는 실패 

-> User 모델 때문이다.

-> jest에서는 jest.mock 메서드를 사용해서 모킹할 수 있다. 

 */

jest.mock('../models/user');
const User = require('../models/user');
 
/*

- jest.mock 메서드에 모킹할 모듈의 경로를 인수로 넣고 그 모듈을 불러온다.

- 모킹할 메서드에 mockReturnValue라는 메서드를 넣고, 이 메서드로 가짜 반환값을 지정할 수 있다.

 
 */

 
