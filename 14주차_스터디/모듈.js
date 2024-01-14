
//1. winston

//실제 서버를 운영할 때 console.log와 console.error를 대체하기 위한 모듈
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new transports.File({ filename: 'combined.log' }),
    new transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({ format: format.simple() }));
}

module.exports = logger;




// 2. helmet, hpp

// 서버의 각종 취약점을 보완해주는 패키지, 익스프레스 미들웨어로 사용. 배포 환경에만 적용

// npm i helmet hpp



//3. connect-redis

// 멀티 프로세스 간 세션 공유를 위해 레디스와 익스프레스를 연결해주는 패키지. 



//4. nvm, n

//노드 버전을 업데이트하기 위한 패키지. 