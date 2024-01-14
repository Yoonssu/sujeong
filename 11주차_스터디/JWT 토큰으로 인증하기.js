//10.3 JWT 토큰으로 인증하기

// 1. JWT 설치
// $ npm i jsonwebtoken

// 2. API 만들기
// .env
//JWT_SECRET=jwtSecret
// ./routes/middlewares.js

const jwt = require('jsonwebtoken');

exports.verifytoken = (req, res, next) => {
    try {
    
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') { 
            return res.status(419).json({
                code: 419, 
                message: '토큰이 만료되었습니다.',
            });
        }
        return res.status(401).json({
            code: 401,
            message: '유효하지 않은 토큰입니다.',
        });
    }
}


// ./routes/v1.js

const express = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken } = require('./middlewares');
const { Domain, User } = require('../models');

const router = express.Router();

router.post('/token', async (req, res) => {
  const { clientSecret } = req.body;
  try {
       
    const domain = await Domain.findOne({
      where: { clientSecret },
      include: {
        model: User,
        attribute: ['nick', 'id'],
      },
    });
    if (!domain) {
      return res.status(401).json({
        code: 401,
        message: '등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요',
      });
        }
        
    const token = jwt.sign({
      id: domain.User.id,
      nick: domain.User.nick,
    }, process.env.JWT_SECRET, {
      expiresIn: '1m', 
      issuer: 'nodebird', 
    });
    return res.json({
      code: 200,
      message: '토큰이 발급되었습니다',
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: '서버 에러',
    });
  }
});


router.get('/test', verifyToken, (req, res) => {
  res.json(req.decoded);
});

module.exports = router;


// ./app.js

const v1 = require('./routes/v1');

app.use('/v1', v1);