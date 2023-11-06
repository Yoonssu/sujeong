/*
4장 http 모듈로 서버 만들기

4.1 요청과 응답 이해하기

- 클라이언트에서 서버로 요청을 보내고, 서버에서는 요청의 내용을 읽고 처리한 뒤 클라이언트에 응답을 보낸다.

- 서버 : 요청을 받는 부분과 응답을 보내는 부분이 있다. 

-> 클라이언트로부터 요청이 왔을 때 어떤 작업을 수행할지 이벤트 리스너를 미리 등록해두어야한다.
*/

const http = require('http');

http.createServer((req, res) => {
  // 여기에 어떻게 응답할지 적는다.
});

/*
- http 서버가 있어야 웹 브라우저의 요청을 처리할 수 있으므로 http 모듈을 사용한다.

- http 모듈에는 createServer 메서드가 있다. 

- 메서드의 인수로는 콜백함수를 넣을 수 있고, 요청이 들어올때마다 콜백함수 실행된다.

- 매개변수 : rep과 res 

- rep 객체 : 요청에 관한 정보

- res 객체 : 응답에 관한 정보
*/


const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
  .listen(8080, () => { // 서버 연결
    console.log('8080번 포트에서 서버 대기 중입니다!');
});
/*
- '8080번 포트에서 대기 중입니다.' 라는 문장이 출력됨.

- http://localhost:8080 또는 http://127.0.0.1:8080에 접속된다. 

 

 

※ localhost 와 포트의 의미

- localhost는 현재 컴퓨터의 내부 주소를 가리키고, 외부에서는 접근할 수 없으며 자신의 컴퓨터에서만 접근할 수 있다. 

- localhost 대신 127.0.0.1을 사용해도 되며 서버 개발 시 테스트 용으로 많이 사용됨  -> 숫자 주소 = IP 라고 한다.

 

- 포트는 서버 내에서 프로세스를 구분하는 번호이다. 

- 서버는 프로세스에 포트를 다르게 할당해 들어오는 요청을 구분한다. 

- 유명한 포트 번호로는 80(HTTP), 443(HTTPS) 등이 있다.

- 포트 번호는 IP주소 뒤에 콜론 : 과 함께 붙여 사용한다.

- 80번 포트는 생략할 수 있다. 

-> 일반적으로 컴퓨터에서 80번 포트는 이미 다른 서비스가 사용하고 있을 확률이 크기 때문에

   충돌을 방지하기 위해서 생략한다. 
*/



const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
  .listen(8080, () => { // 서버 연결
    console.log('8080번 포트에서 서버 대기 중입니다!');
  })
/*
- createServer 메서드 뒤에 listen 메서드를 붙이고 클라이언트에 공개할 포트 번호와 포트 연결 완료 후

  실행될 콜백 함수를 넣는다. 

- 이 파일을 실행하면 서버는 8080번 포트에서 요청이 오기를 기다린다.


- res 객체

- res.writeHead와 res.write,  res.end 메서드가 있다. 

 

- res.writeHead :  응답에 대한 정보를 기록하는 메서드이다.

- > 첫 번째 인수로 성공적인 요청임을 의미하는 200을, 두 번째 인수로 응답에 대한 정보를 보낸다.

 -> 위의 코드에는 콘텐츠의 형식이 HTML임을 알리고, 한글 표시를 위해 charset을 utf-8로 지정한 것이다. 

-> 이 정보가 기록되는 부분을 헤더라고 한다. 

 

- res.write 메서드의 첫 번째 인수는 클라이언트로 보낼 데이터이다. 

- > 데이터가 기록되는 부분을 본문이라고 한다. 

 

- res.end:  응답을 종료하는 메서드이다. 

- > 인수가 있다면 그 데이터도 클라이언트로 보내고 응답을 종료한다.

 

-> 브라우저는 응답 내용을 받아서 렌더링한다. 

*/


// listen 메서드에 콜백 함수를 넣는 대신 ,  listening 이벤트 리스너를 붙여도 된다.
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
});
server.listen(8080);

server.on('listening', () => {
  console.log('8080번 포트에서 서버 대기 중입니다!');
});
server.on('error', (error) => {
  console.error(error);
});




const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
  .listen(8080, () => { // 서버 연결
    console.log('8080번 포트에서 서버 대기 중입니다!');
  });

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
  .listen(8081, () => { // 서버 연결
    console.log('8081번 포트에서 서버 대기 중입니다!');
  });
/*
- 위 처럼  createServer를 원하는 만큼 호출해서 한 번에 여러 서버를 실행할 수 도 있다.

-> 주의 !! : 포트번호가 달라야한다.

*/



/*
- res.write와 res.end에 일일이 HTML을 적는 것은 비효율적이라서 미리 html 파일을 만들어두고 

 fs 모듈로 읽어서 전송하는 방법을 사용하면 효율적이다.


<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Node.js 웹 서버</title>
</head>
<body>
    <h1>Node.js 웹 서버</h1>
    <p>만들 준비되셨나요?</p>
</body>
</html>

*/

const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
  try {
    const data = await fs.readFile('./server2.html');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(err.message);
  }
})
  .listen(8081, () => {
    console.log('8081번 포트에서 서버 대기 중입니다!');
  });

/*

 - 요청이 들어오면 먼저 fs 모듈로 html 파일을 읽는다.- data 변수에 저장된 버퍼를 그대로 클라이언트에 보낸다.


※ HTTP 상태 코드

- 상태 코드 : 요청이 성공했는지 실패했는지를 판단한다.

- 2XX : 성공을 알리는 상태 코드이다.

- 3XX : 리다이렉션(다른 페이지로 이동)을 알리는 상태코드이다.

- 4XX : 요청 오류를 나타낸다. 요청 자체에 오류가 있을 때 표시된다.

- 5XX : 서버 오류를 나타낸다. 요청은 제대로 왔지만 서버에 오류가 생겼을 때 발생한다.

 

주의 !!

- 요청 처리 과정 중에 에러가 발생했다고 응답을 보내지 않으면 안 된다. 

무조건 응답을 보내서 요청이 마무리 되었음을 알려야한다. 그렇지 않으면 계속 기다리다가 Timeout 처리한다.

*/



/*
4.2 REST와 라우팅 사용하기

1) REST : REpresentational State Transfer의 줄임말, 서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법이다.

- 주소는 명사로 구성되는데, 명사만으로 무슨 동작을 행하라는 것인지 알기 어려우므로 REST에서는 주소외에

  HTTP 요청  메서드 라는 것을 사용한다. 

 

2) 요청  메서드  

- 폼 데이터 전송할 때 GET, POST 와 같은 메서드를 지정하는데, 이것이 요청메서드이다.

- 요청 메서드의 종류

• GET: 서버 자원을 가져오고자 할 때 사용한다. 요청의 본문에 데이터를 넣지 않고 데이터를 서버로 보내야 한다면 쿼리스트링을 사용한다.

• POST: 서버에 자원을 새로 등록하고자 할 때 사용한다. 요청의 본문에 새로 등록할 데이터를 넣어 보낸다.

• PUT: 서버의 자원을 요청에 들어 있는 자원으로 치환하고자 할 때 사용한다. 요청의 본문에 치환할 데이터를 넣어 보낸다.

• PATCH: 서버 자원의 일부만 수정하고자 할 때 사용한다. 요청의 본문에 일부 수정할 데이터를 넣어 보낸다.

• DELETE: 서버의 자원을 삭제하고자 할 때 사용한다. 요청의 본문에 데이터를 넣지 않는다.

• OPTIONS: 요청을 하기 전에 통신 옵션을 설명하기 위해 사용한다. 

 

 

- 주소 하나가 요청 메서드를 여러 개 가질 수 있다. 

- GET 메서드는 브라우저에서 캐싱(기억)할 수도 있어 같은 주소로 GET요청을 할 때 서버에서 가져오는 것이 아니라 캐시 에서 가져올 수도 있다. -> 이렇게 캐싱되는 경우에 성능이 좋아진다.
*/



const http = require('http');
const fs = require('fs').promises;
const path = require('path');

http.createServer(async (req, res) => {
  try {
    console.log(req.method, req.url);
    if (req.method === 'GET') {
      if (req.url === '/') {
        const data = await fs.readFile(path.join(__dirname, 'restFront.html'));
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      } else if (req.url === '/about') {
        const data = await fs.readFile(path.join(__dirname, 'about.html'));
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        return res.end(data);
      }
      // 주소가 /도 /about도 아니면
      try {
        const data = await fs.readFile(path.join(__dirname, req.url));
        return res.end(data);
      } catch (err) {
        // 주소에 해당하는 라우트를 찾지 못했다는 404 Not Found error 발생
      }
    }
    res.writeHead(404);
    return res.end('NOT FOUND');
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(err.message);
  }
})
  .listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다');
  });


/*
- req.method로 HTTP 요청 메서드를 구분하고 있다.

- 메서드가 GET이면 다시 req.url로 요청 주소를 구분한다. 주소가 /일 때는 restFront.html을 제공하고, 주소가 /about이면      about.html 파일을 제공한다. 이 외의 경우에는 주소에 적힌 파일을 제공한다.

- 만약 존재하지 않는 파일을 요청했거나 GET 메서드 요청이 아닌 경우라면 404 NOT FOUND 에러가 응답으로 전송한다.

 

!!주의

- res.end 앞에 return은 무조건 붙여야한다.

-> 노드가 자바스크립트 문법을 따르기 때문에 return을 붙이지 않는 한 함수가 종료되지 않기 때문이다.
*/




const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const users = {};// 데이터 저장용

http.createServer(async (req, res) => {
  try {
    console.log(req.method, req.url);
    if (req.method === 'GET') {
      if (req.url === '/') {
        const data = await fs.readFile(path.join(__dirname, 'restFront.html'));
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      } else if (req.url === '/about') {
        const data = await fs.readFile(path.join(__dirname, 'about.html'));
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      } else if (req.url === '/users') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end(JSON.stringify(users));
      }
      // /도 /about도 /users도 아니면
      try {
        const data = await fs.readFile(path.join(__dirname, req.url));
        return res.end(data);
      } catch (err) {
        // 주소에 해당하는 라우트를 찾지 못했다는 404 Not Found error 발생
      }
    } else if (req.method === 'POST') {
      if (req.url === '/user') {
        let body = '';
       // 요청의 body를 stream 형식으로 받음
        req.on('data', (data) => {
          body += data;
        });
        // 요청의 body를 다 받은 후 실행됨
        return req.on('end', () => {
          console.log('POST 본문(Body):', body);
          const { name } = JSON.parse(body);
          const id = Date.now();
          users[id] = name;
          res.writeHead(201, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end('등록 성공');
        });
      }
    } else if (req.method === 'PUT') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        let body = '';
        req.on('data', (data) => {
          body += data;
        });
        return req.on('end', () => {
          console.log('PUT 본문(Body):', body);
          users[key] = JSON.parse(body).name;
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          return res.end(JSON.stringify(users));
        });
      }
    } else if (req.method === 'DELETE') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        delete users[key];
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(JSON.stringify(users));
      }
    }
    res.writeHead(404);
    return res.end('NOT FOUND');
  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(err);
  }
})
  .listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다');
  });


/*
 - 데이터베이스 대용으로 users라는 객체를 선언해 사용자 정보를 저장한다.

- POST /user 요청에서는 사용자를 새로 저장하고, PUT /user/아이디 요청에서는 해당 아이디의 사용자 데이터를 수정하      며, DELETE /user/아이디 요청에서는 해당 아이디의 사용자를 제거한다.

- POST와 PUT 요청에 req.on('data')와 req.on('end')는 요청의 본문에 들어 있는 데이터를 꺼내기 위한 작업이다.

- 더불어 받은 데이터는 문자열이므로 JSON으로 만드는 JSON.parse 과정이 필요하다.



※ HTTP 요청/응답

- 요청과 응답은 모두 HTTP 헤더와 HTTP 본문을 갖고 있다.

- HTTP 헤더 : 요청 또는 응답에 대한 정보는 갖고 있는 곳이다.

- HTTP 본문 : 서버와 클라이언트 간에 주고받을 실제 데이터를 담아두는 공간이다. 

 

 

!! 주의 

- REST 서버에서 데이터가 메모리에 저장되므로 서버를 종료하면 데이터가 소실된다. 

- 데이터를 영구적으로 저장하려면 데이터베이스를 사용해야한다.
*/





/*
4.3 쿠키와 세션 이해하기

- 클라이언트에서 보내는 요청에는누가 요청을 보내는지 모른다는 단점이 있다. 

- 여러 컴퓨터가 공통으로 IP 주소를 갖거나 한 컴퓨터를 여러 사람이 사용할 수 도 있기 때문에 로그인 구현이 중요한데, 로그인을 구현하려면 쿠키와 세션을 알고 있어야한다.

 

1) 쿠키

- 쿠키는 유효 기간이 있으며 name=zerocho와 같이 단순한 ‘키-값’의 쌍이다.

- 누구인지 기억하기 위해 서버는 요청에 대한 응답을 할 때 쿠키라는 것을 같이 보낸다. 

- 서버로부터 쿠키가 오면, 웹 브라우저는 쿠키를 저장해뒀다가 다음에 요청할 때마다 쿠키를 동봉해서 보낸다.

- 서버는 요청에 들어 있는 쿠키를 읽어서 사용자가 누구인지 파악한다.

- 쿠키는 요청의 헤더(Cookie)에 담겨 전송되며, 브라우저는 응답의 헤더(Set-Cookie)에 따라 쿠키를 저장한다. 

- 브라우저는 쿠키가 있다면 자동으로 동봉해서 보내주므로 따로 처리할 필요가 없고, 서버에서 브라우저로 쿠키를 보낼      때만 코드를 작성해 처리하면 된다.
*/



const http = require('http');

http.createServer((req, res) => {
  console.log(req.url, req.headers.cookie);
  res.writeHead(200, { 'Set-Cookie': 'mycookie=test' });
  res.end('Hello Cookie');
})
  .listen(8083, () => {
    console.log('8083번 포트에서 서버 대기 중입니다!');
  });

/*
- createServer 메서드의 콜백에서는 req 객체에 담겨 있는 쿠키를 가져온다.

- 쿠키는 req.headers.cookie에 들어 있고, req.headers는 요청의 헤더를 의미한다.

- 응답의 헤더에 쿠키를 기록해야 하므로 res.writeHead 메서드를 사용했다.

- Set-Cookie는 브라우저한테 다음과 같은 값의 쿠키를 저장하라는 의미이며, 실제로 응답을 받은 브라우저는 mycookie=test라는 쿠키를 저장한다.

 
*/


const http = require('http');
const fs = require('fs').promises;
const path = require('path');


const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});
http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie)});



// - 쿠키는 mycookie=test 같은 문자열이다. parseCookies 함수는 쿠키 문자열을 쉽게 사용하기 위해 자바스크립트 객체 형식으로 바꾸는 함수이다.

 
 // 주소가 /login으로 시작하는 경우
//  if (req.url.startsWith('/login')) 
//     const url = new URL(req.url, 'http://localhost:8084');
//     const name = url.searchParams.get('name');
//     const expires = new Date();
//     // 쿠키 유효 시간을 현재 시간 + 5분으로 설정
//     expires.setMinutes(expires.getMinutes() + 5);
//     res.writeHead(302, {
//       Location: '/',
//       'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
//     });
//     res.end();  

/*
 - 로그인 요청(GET /login)을 처리하는 부분이다. 

- form은 GET 요청인 경우 데이터를 쿼리스트링으로 보내기에 URL 객체로 쿼리스트링 부분을 분석하고, 쿠키의 만료 시간을 지금으로부터 5분후로 설정한다.

- 그 후302 응답 코드, 리다이렉트 주소와 함께 쿠키를 헤더에 넣는다. 브라우저는 이 응답 코드를 보고 페이지를 해당 주소로 리다이렉트한다.
*/


  // 주소가 /이면서 name이라는 쿠키가 있는 경우
// } else if (cookies.name) {
//     res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
//     res.end(`${cookies.name}님 안녕하세요`);
//   } else { // 주소가 /이면서 name이라는 쿠키가 없는 경우
//     try {
//       const data = await fs.readFile(path.join(__dirname, 'cookie2.html'));
//       res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//       res.end(data);
//     } catch (err) {
//       res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
//       res.end(err.message);
//     }
//   }

// })
//   .listen(8084, () => {
//     console.log('8084번 포트에서 서버 대기 중입니다!');
// });

/*
- 그 외의 경우, 먼저 쿠키가 있는지 없는지를 확인하고 쿠키가 없다면 로그인할 수 있는 페이지를 보낸다.

 

- Set-Cookie로 쿠키를 설정할 때 만료 시간과 HttpOnly, Path 같은 옵션을 부여한다.

- 쿠키를 설정할 때는 각종 옵션을 넣을 수 있으며, 옵션 사이에 세미콜론(;)을 써서 구분하면 된다.

- 쿠키에는 들어가면 안 되는 글자들이 있는데, 대표적으로 한글과 줄바꿈이 있다.

- 한글은 encodeURIComponent로 감싸서 넣습니다.



• 쿠키명=쿠키값: 기본적인 쿠키의 값이다. mycookie=test 또는 name=zerocho와 같이 설정한다.

• Expires=날짜: 만료 기한이다. 이 기한이 지나면 쿠키가 제거되며 기본값은 클라이언트가 종료될 때까지이다.

• Max-age=초: Expires와 비슷하지만 날짜 대신 초를 입력할 수 있다. 해당 초가 지나면 쿠기가 제거되며 Expires보다 우선한다.

• Domain=도메인명: 쿠키가 전송될 도메인을 특정할 수 있고, 기본값은 현재 도메인이다.

• Path=URL: 쿠키가 전송될 URL을 특정할 수 있다. 기본값은 ‘/’이고, 이 경우 모든 URL에서 쿠키를 전송할 수 있다.

• Secure: HTTPS일 경우에만 쿠키가 전송된다.

• HttpOnly: 설정 시 자바스크립트에서 쿠키에 접근할 수 없다. 쿠키 조작을 방지하기 위해 설정하는 것이 좋다.

 



*/
// 세션

const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const parse_Cookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

const session = {};

http.createServer(async (req, res) => {
  const cookies = parse_Cookies(req.headers.cookie);
  if (req.url.startsWith('/login')) {
    const url = new URL(req.url, 'http://localhost:8085');
    const name = url.searchParams.get('name');
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);
    const uniqueInt = Date.now();
    session[uniqueInt] = {
      name,
      expires,
    };
    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    });
    res.end();
  // 세션 쿠키가 존재하고, 만료 기간이 지나지 않았다면
  } else if (cookies.session && session[cookies.session].expires > new Date()) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${session[cookies.session].name}님 안녕하세요`);
  } else {
    try {
      const data = await fs.readFile(path.join(__dirname, 'cookie2.html'));
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    }
  }
})
  .listen(8085, () => {
    console.log('8085번 포트에서 서버 대기 중입니다!');
  });


/*
- 쿠키에 이름을 담아서 보내는 대신, uniqueInt라는 숫자 값을 보낸다. 사용자의 이름과 만료 시간은 uniqueInt 속성명 아래에 있는 session이라는 객체에 대신 저장한다.

-  cookie.session이 있고 만료 기한을 넘기지 않았다면 session 변수에서 사용자 정보를 가져와 사용한다.

 

- 서버에 사용자 정보를 저장하고 클라이언트와는 세션 아이디로만 소통한다.

- 세션 아이디는 꼭 쿠키를 사용해서 주고받지 않아도 됩니다. 하지만 많은 웹 사이트가 쿠키를 사용하고 이를 세션쿠키라고 한다.

- 서버가 멈추거나 재시작되면 메모리에 저장된 변수가 초기화되고, 서버의 메모리가 부족하면 세션을 저장하지 못하는 문제도 생기기때문에 보통은 세션을 레디스(Redis)나 멤캐시드(Memcached) 같은 데이터베이스에 넣어둔다.
*/






/*
4.4 https와 https2

- https 모듈은 웹 서버에 SSL 암호화를 추가한다. GET이나 POST 요청을 할 때 오가는 데이터를 암호화해서 중간에 다른 사람이 요청을 가로채더라도 내용을 확인할 수 없게 한다.

*/
//https
const https = require('https');
const fs = require('fs');

https.createServer({
  cert: fs.readFileSync('도메인 인증서 경로'),
  key: fs.readFileSync('도메인 비밀 키 경로'),
  ca: [
    fs.readFileSync('상위 인증서 경로'),
    fs.readFileSync('상위 인증서 경로'),
  ],
}, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
  .listen(443, () => {
    console.log('443번 포트에서 서버 대기 중입니다!');
  });

/*
- createServer 메서드가 인수를 두 개 받는다. 두 번째 인수는 http 모듈과 같이 서버 로직이고, 첫 번째 인수는 인증서에 관련된 옵션 객체이다.

- https사용을 위해서는 인증서를 구입해야하며, 인증서를 구입하면 pem이나 crt, 또는 key 확장자를 가진 파일들을 제공한다.

- 파일들을 fs.readFileSync 메서드로 읽어서 cert, key, ca 옵션에 알맞게 넣으면 되고, 실제 서버에서는 80번 포트 대신 443번 포트를 사용한다.
*/





//http2

const http2 = require('http2');
const fs = require('fs');

http2.createSecureServer({
  cert: fs.readFileSync('도메인 인증서 경로'),
  key: fs.readFileSync('도메인 비밀 키 경로'),
  ca: [
    fs.readFileSync('상위 인증서 경로'),
    fs.readFileSync('상위 인증서 경로'),
  ],
}, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
  .listen(443, () => {
    console.log('443번 포트에서 서버 대기 중입니다!');
  });


/*
- https 모듈과 거의 유사하고 https 모듈을 http2로, createServer 메서드를 createSecure Server 메서드로 바꾸면 된다.

- 노드의 http2 모듈은 SSL 암호화와 더불어 최신 HTTP 프로토콜인 http/2를 사용할 수 있게 한다. http/2는 요청 및 응답 방식이 기존 http/1.1보다 개선되어 훨씬 효율적으로 요청을 보내고 http/2를 사용하면 웹의 속도도 많이 개선 된다.

 
*/






/*

4.5 cluster

- cluster 모듈은 기본적으로 싱글 프로세스로 동작하는 노드가 CPU 코어를 모두 사용할 수 있게 해주는 모듈이다. 

- 포트를 공유하는 노드 프로세스를 여러 개 둘 수도 있어, 요청이 많이 들어왔을 때 병렬로 실행된 서버의 개수만큼 요청이 분산되게 할 수 있다.

*/

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디: ${process.pid}`);
  // CPU 개수만큼 워커를 생산
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }
  // 워커가 종료되었을 때
  cluster.on('exit', (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    console.log('code', code, 'signal', signal);
  });
} else {
  // 워커들이 포트에서 대기
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Cluster!</p>');
  }).listen(8086);

  console.log(`${process.pid}번 워커 실행`);
}



/*

-  클러스터에는 마스터 프로세스와 워커 프로세스가 있다.

- 마스터 프로세스는 CPU 개수만큼 워커 프로세스를 만들고, 8086번 포트에서 대기한다. 요청이 들어오면 만들어진 워커 프로세스에 요청을 분배한다.

- 워커 프로세스가 실질적인 일을 하는 프로세스이다.
*/



// else {
//     // 워커들이 포트에서 대기
//     http.createServer((req, res) => {
//       res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//       res.write('<h1>Hello Node!</h1>');
//       res.end('<p>Hello Cluster!</p>');
//       setTimeout(() => { // 워커가 존재하는지 확인하기 위해 1초마다 강제 종료
//         process.exit(1);
//       }, 1000);
//     }).listen(8086);
  
//     console.log(`${process.pid}(번 워커 실행`);
//   }
/*
 요청이 들어올 때마다 1초 후에 서버가 종료되도록 한다.

- 서버를 실행하면, process.pid는 실행할 때마다 달라진다. 
*/





/*
16136번 워커가 종료되었습니다.
code 1 signal null
17272번 워커가 종료되었습니다.
code 1 signal null
16452번 워커가 종료되었습니다.
code 1 signal null
9004번 워커가 종료되었습니다.
code 1 signal null
11040번 워커가 종료되었습니다.
code 1 signal null
7368번 워커가 종료되었습니다.
code 1 signal null




- 서버에  접속하면 1초 후 콘솔에 워커가 종료되었다는 메시지가 뜬다. 여섯 번 새로 고침을 하면 모든 워커가 종료되어 서버가 응답하지 않는다.

- 코드(code)는 process.exit의 인수로 넣어준 코드가 출력되고, 신호(signal)는 존재하는 경우 프로세스를 종료한 신호의 이름이 출력된다.

- 워커 프로세스가 존재하기에 여섯 번까지는 오류가 발생해도 서버가 정상적으로 작동할 수 있다는 뜻이다. 종료된 워커를 다시 켜면 오류가 발생해도 계속 버틸 수 있다.

 
*/


//* 워커 프로세스가 종료되었을 때 새로 하나를 생성


  cluster.on('exit', (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    console.log('code', code, 'signal', signal);
    cluster.fork();
  });


/*
28592번 워커가 종료되었습니다.
code 1 signal null
10520번 워커 실행
10520번 워커가 종료되었습니다.
code 1 signal null
23248번 워커 실행


- 워커 하나가 종료될 때마다 새로운 워커 하나가 생성된다. 하지만 이러한 방식으로 오류를 처리하려는 것은 좋지 않다.

- 그래도 예기치 못한 에러로 인해 서버가 종료되는 현상을 방지할 수 있어 위처럼 클러스터링을 적용해두는 것이 좋다.

 
*/



