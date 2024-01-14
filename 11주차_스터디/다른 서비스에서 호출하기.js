// 1. 기본 설정
// package.json
// {
//   "name": "nodecat",
//   "version": "0.0.1",
//   "description": "노드버드 2차 서비스",
//   "main": "app.js",
//   "scripts": {
//     "start": "nodemon app",
//     "test": "echo \"Error: no test specified\" && exit 1"
//   },
//   "author": "jiy",
//   "license": "MIT",
//   "dependencies": {
//     "axios": "^0.19.2",
//     "cookie-parser": "^1.4.5",
//     "dotenv": "^8.2.0",
//     "express": "^4.17.1",
//     "express-session": "^1.17.1",
//     "morgan": "^1.10.0",
//     "nunjucks": "^3.2.1"
//   },
//   "devDependencies": {
//     "nodemon": "^2.0.3"
//   }
// }



//2. 토큰 테스트 라우터 만들기

// ./routes/index.js

const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/test', async (req, res, next) => {
  try {
    if (!req.session.jwt) { 
      const tokenResult = await axios.post('http://localhost:8002/v1/token', {
        clientSecret: process.env.CLIENT_SECRET,
      });
      if (tokenResult.data && tokenResult.data.code === 200) { 
        req.session.jwt = tokenResult.data.token; 
      } else { 
        return res.json(tokenResult.data); 
      }
    }
    
    const result = await axios.get('http://localhost:8002/v1/test', {
      headers: { authorization: req.session.jwt },
    });
    return res.json(result.data);
  } catch (error) {
    console.error(error);
    if (error.response.status === 419) { 
      return res.json(error.response.data);
    }
    return next(error);
  }
});

module.exports = router;