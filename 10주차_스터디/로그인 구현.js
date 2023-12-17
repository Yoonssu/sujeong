
/*9.3. Passport 모듈로 로그인 구현하기
-> 검증된 모듈 사용하자
: passport

*/

/*1) passport 설치 후 app.js와 연결
$ npm i passport passport-local passport-kakao bcrypt
*/

// ./app.js

const passport = require('passport');
const passportConfig = require('./passport');

passportConfig();

app.use(passport.initialize()); 
app.use(passport.session()); 



// ./passport/index.js

const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    
    passport.serializeUser((user, done) => {
        done(null, user.id); 
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id } })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local();
    kakao();
};


/*
9.3.1 로컬 로그인 구현하기
회원가입 후 로그인

passport-local 모듈 사용.
*/

//1) 로그인 라우터 추가 후 접근 권한 미들웨어 추가
// ./routes/middlewares.js

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};




// ./routes/page.js


const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
router.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followerIdList = [];
    next();
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { title: '내 정보 - NodeBird' });
});

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', { title: '회원가입 - NodeBird' });
});




//2) 회원가입, 로그인, 로그아웃 라우터
// ./routes/auth.js

const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12); 
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

//로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?loginError=${info.message}`)
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next); 
});

// 로그아웃
router.get('/logout', isLoggedIn, (req, res) => {
    req.logout(); 
    req.session.destroy(); 
    res.redirect('/');
});

module.exports = router;



//3) passport 추가
// ./passport/localStrategy.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
   
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
    
        try {
            const exUser = await User.findOne({ where: { email } });
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                }
            } else {
                done(null, false, { message: '가입되지 않은 회원입니다.' });
            }
        } catch (error) {
            console.error(error);
            done(error);
        } 
    }));
};


//9.3.2 카카오 로그인 구현

//1) kakao passport 전략 추가
// ./passport/kakaoStrategy.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID, 
        callbackURL: '/auth/kakao/callback', 
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        try {
            const exUser = await User.findOne({ where: { snsId: profile.id, provider: 'kakao' } });
            if (exUser) {
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    email: profile._json && profile._json.kakao_account_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};



//2) kakao 로그인 라우터 추가
// ./routes/auth.js

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', { failureRedirect: '/', }), (req, res) => {
        res.redirect('/');
});


//3) kakao clientID 발급
//https://developers.kakao.com/

