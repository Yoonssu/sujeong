/*
익스프레스의 req, res 객체는 http 모듈의 req, res 객체를 확장
-> 기존 http 모듈의 메서드도 사용할 수 있고, 익스프레스가 추가한 메서드나 속성을 사용할 수도 있다.



req 객체

• req.app: req 객체를 통해 app 객체에 접근할 수 있다. req.app.get('port')와 같은 식으로 사용할 수 있다.

• req.body: body-parser 미들웨어가 만드는 요청의 본문을 해석한 객체이다.

• req.cookies: cookie-parser 미들웨어가 만드는 요청의 쿠키를 해석한 객체이다.

• req.ip: 요청의 ip 주소가 담겨 있다.

• req.params: 라우트 매개변수에 대한 정보가 담긴 객체이다.

• req.query: 쿼리스트링에 대한 정보가 담긴 객체이다.

• req.signedCookies: 서명된 쿠키들은 req.cookies 대신 여기에 담겨 있다.

• req.get(헤더 이름): 헤더의 값을 가져오고 싶을 때 사용하는 메서드이다.





res 객체

• res.app: req.app처럼 res 객체를 통해 app 객체에 접근할 수 있다.

• res.cookie(키, 값, 옵션): 쿠키를 설정하는 메서드이다.

• res.clearCookie(키, 값, 옵션): 쿠키를 제거하는 메서드이다.

• res.end(): 데이터 없이 응답을 보낸다.

• res.json(JSON): JSON 형식의 응답을 보낸다.

• res.locals: 하나의 요청 안에서 미들웨어 간에 데이터를 전달하고 싶을 때 사용하는 객체이다.

• res.redirect(주소): 리다이렉트할 주소와 함께 응답을 보낸다.

• res.render(뷰, 데이터): 다음 절에서 다룰 템플릿 엔진을 렌더링해서 응답할 때 사용하는 메서드이다.

• res.send(데이터): 데이터와 함께 응답을 보낸다. 데이터는 문자열일 수도, HTML일 수도, 버퍼일 수도, 객체나 배열일 수도 있다.

• res.sendFile(경로): 경로에 위치한 파일을 응답한다.

• res.set(헤더, 값): 응답의 헤더를 설정한다.

• res.status(코드): 응답 시의 HTTP 상태 코드를 지정한다.





req나 res 객체의 메서드는 다음과 같이 메서드 체이닝(method chaining)을 지원하는 경우가 많다.
- 메서드 체이닝을 활용하면 코드양을 줄일 수 있다.

res
  .status(201)
  .cookie('test', 'test')
  .redirect('/admin');

*/

