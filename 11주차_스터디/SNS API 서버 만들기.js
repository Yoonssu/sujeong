
//나머지 API 라우터 만들기

nodebird-api
const { Domain, User, Post, Hashtag } = require('../models');


router.get('/posts/my', verifyToken, (req, res) => {
  Post.findAll({ where: { userId: req.decoded.id } })
    .then((posts) => {
      console.log(posts);
      res.json({
        code: 200,
        payload: posts,
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        code: 500,
        message: '서버 에러',
      });
    });
});

//해시태그 가져오기
router.get('/posts/hashtag/:title', verifyToken, async (req, res) => {
  try {
    const hashtag = await Hashtag.findOne({ where: { title: req.params.title } });
    if (!hashtag) {
      return res.status(404).json({
        code: 404,
        message: '검색 결과가 없습니다',
      });
    }
    const posts = await hashtag.getPosts();
    return res.json({
      code: 200,
      payload: posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: '서버 에러',
    });
  }
});

nodecat
// ./routes/index.js

const express = require('express');
const axios = require('axios');

const router = express.Router();
const URL = 'http://localhost:8002/v1';

axios.defaults.headers.origin = 'http://localhost:4000'; 


const request = async (req, api) => {
  try {
    if (!req.session.jwt) { 
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      req.session.jwt = tokenResult.data.token;
    }
    return await axios.get(`${URL}${api}`, {
      headers: { authorization: req.session.jwt },
    }); 
  } catch (error) {
    if (error.response.status === 419) { 
      delete req.session.jwt;
      return request(req, api);
    } 
    return error.response;
  }
};

router.get('/mypost', async (req, res, next) => {
  try {
    const result = await request(req, '/posts/my');
    res.json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/search/:hashtag', async (req, res, next) => {
  try {
    const result = await request(
      req, `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`,
    );
    res.json(result.data);
  } catch (error) {
    if (error.code) {
      console.error(error);
      next(error);
    }
  }
});

module.exports = router;