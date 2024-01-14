/*
웹 소켓

- 웹 소켓은 HTML5에 새로 추가된 스펙으로, 실시간 양방향 데이터 전송을 위한 기술이다.
- WS프로토콜을 사용
- 웹 소켓 이전에는 polling 사용.

polling : 
=> 주기적으로 서버에 업데이트가 있는지 요청을 보낸 후, 있다면 새로운 내용을 가져오는 방식.

*/


//1. ws모듈로 웹 소켓 사용하기
//app.js
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();
const webSocket = require('./socket');
const indexRouter = require('./routes');

const app = express();
app.set('port',process.env.PORT||8005);
app.set('view engine','html');

nunjucks.configure('views',{
    express:app,
    watch:true,
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    },
}));

app.use('/',indexRouter);

app.use((req,res,next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err,req,res,next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production'? err : {};
    res.status(err.status||500);
    res.render('error');
})

const server = app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기 중');
});

webSocket(server);




//socket.js
//server에 웹 소켓을 연결
const WebSocket = require('ws');

module.exports = (server)=>{
    const wss = new WebSocket.Server({server});

    wss.on('connection',(ws,req)=>{
        const ip = req.headers['x-forwarded-for']||req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속',ip);
        ws.on('message',(message)=>{
            console.log(message.toString());
        });
        ws.on('error',(error)=>{
            console.error(error);
        });
        ws.on('close',()=>{
            console.log('클라이언트 접속 해제',ip);
            clearInterval(ws.interval);
        });

        ws.interval = setInterval(()=>{
            if(ws.readyState===ws.OPEN){
                ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
            }
        },3000);
    });
};


// routes/index.js
const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    res.render('index');
})

module.exports = router;



//2. Socket.IO 사용하기
//서비스가 복잡해지면 Socket.IO를 사용하는 것 추천.

//웹 소켓 설치
//$npm i socket.io@2

//socket.js
const SocketIO = require('socket.io');

module.exports = (server)=>{
    const io = SocketIO(server,{path:'/socket.io'});

    io.on('connection',(socket)=>{
        const req = socket.request;
        const ip = req.headers['x-forwarded-for']||req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속!',ip,socket.id, req.ip);
        socket.on('disconnect',()=>{
            console.log('클라이언트 접속 해제',id,socket.id);
            clearInterval(socket.interval);
        });
        socket.on('error',(error)=>{
            console.error(error);
        });
        socket.on('reply',(data)=>{
            console.log(data);
        });
        socket.interval = setInterval(()=>{
            socket.emit('news','Hello Socket.IO');
        },3000);
    });
};


//index.html
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <title>GIF 채팅방</title>
// </head>
// <body>
//     <div>F12를 눌러 console탭과 network 탭을 확인하세요.</div>
//     <script src="/socket.io/socket.io.js"></script>
//     <script>
//         const socket = io.connect('http://localhost:8005',{
//             path:'/socket.io',
//         });
//         socket.on('news',function(data){
//                 console.log(data);
//                 socket.emit('reply','Hello Node.JS');
//         });
//     </script>
// </body>
// </html>


