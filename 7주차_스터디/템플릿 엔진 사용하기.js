/*
1.퍼그

-> 퍼그 설치 
- npm i pug

-> 익스프레스와 연결하려면 app.js에 다음 부분이 들어 있어야 한다.
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));


- views는 템플릿 파일들이 위치한 폴더를 지정
- res.render 메서드가 이 폴더 기준으로 템플릿 엔진을 찾아서 렌더링
 -> res.render('index')라면 views/index.pug를 렌더링

- view engine은 어떠한 종류의 템플릿 엔진을 사용할지


* html과의 차이점
- 화살괄호(< >)와 닫는 태그가 없다.
- 탭 또는 스페이스로만 태그의 부모 자식 관계를 규명
- 모든 파일에 동일한 종류의 들여쓰기를 적용
- div 태그인 경우 div 문자는 생략할 수 있다.

- HTML 텍스트는 다음과 같이 태그 또는 속성 뒤에 한 칸을 띄고 입력
 -> p Welcome to Express
    button(type='submit') 전송




- 텍스트를 여러 줄 입력하고 싶다면 다음과 같이 파이프(|)
p
  | 안녕하세요.
  | 여러 줄을 입력합니다.
  br
  | 태그도 중간에 넣을 수 있습니다




- style이나 script 태그로 CSS 또는 자바스크립트 코드를 작성하고 싶다면 다음과 같이 태그 뒤에 점(.)
style.
  h1 {
    font-size: 30px;
  }
script.
  const message = 'Pug';
  alert(message);





*변수
- 자바스크립트 변수를 템플릿에 렌더링할 수 있다.
- res.render를 호출할 때 보내는 변수를 퍼그가 처리 
  

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});


- res.render(템플릿, 변수 객체)
: 익스프레스가 res 객체에 추가한 템플릿 렌더링을 위한 메서드

-  index.pug를 HTML로 렌더링하면서 { title: 'Express' }라는 객체를 변수로 집어넣는다.
->  layout.pug와 index.pug의 title 부분이 모두 Express로 치환 
=  HTML에도 변수를 사용할 수 있게 됨.




!! 퍼그에서 변수를 사용하는 방법

- 변수를 텍스트로 사용하고 싶다면 태그 뒤에 =을 붙인 후 변수를 입력
- 텍스트 중간에 변수를 넣으려면 #{변수}를 사용
- #{}의 내부와 = 기호 뒷부분은 자바스크립트로 해석하므로 input 태그의 경우처럼 자바스크립트 구문을 써도 된다.
- 서버에서 데이터를 클라이언트로 내려보낼 때 #{}와 =을 매우 빈번하게 사용


내부에 직접 변수를 선언
- 빼기(-)를 먼저 입력하면 뒤에 자바스크립트 구문을 작성
- const node = 'Node.js'
- const js = 'Javascript'
p #{node}와 #{js}


퍼그는 기본적으로 변수의 특수 문자를 HTML 엔티티(entity)로 이스케이프(escape)한다.
-  이스케이프를 원하지 않는다면 = 대신 !=을 사용

p= '<strong>이스케이프</strong>'
p!= '<strong>이스케이프하지 않음</strong>'





* 반복문
each로 반복문을 돌릴 수 있다. 
ul
  each fruit in ['사과', '배', '오렌지', '바나나', '복숭아']
    li= fruit


반복문 사용 시 인덱스도 가져올 수 있다.
ul
  each fruit, index in ['사과', '배', '오렌지', '바나나', '복숭아']
    li= (index + 1) + '번째 '  + fruit



*조건문
- 조건문으로 편리하게 분기 처리할 수 있으며 if, else if, else를 사용
if isLoggedIn
  div 로그인 되었습니다.
else
  div 로그인이 필요합니다.


case문
case fruit
  when 'apple'
    p 사과입니다.
  when 'banana'
    p 바나나입니다.
  when 'orange'
    p 오렌지입니다.
  default
    p 사과도 바나나도 오렌지도 아닙니다.




* extends와 block
- 레이아웃을 정할 수 있으며, 공통되는 레이아웃 부분을 따로 관리할 수 있어 좋다.


*/






/*
넌적스
 : 퍼그의 HTML 문법 변화에 적응하기 힘든 분에게 유용한 템플릿 엔진이다.
 -> HTML 문법을 그대로 사용하되 추가로 자바스크립트 문법을 사용할 수 있으며, 파이썬의 템플릿 엔진인 Twig와 문법이 상당히 유사하다.



1. 넌적스 설치 
$ npm i nunjucks

2. view engine을 퍼그 대신 넌적스로 교체

const path = require('path');
const nunjucks = require('nunjucks');

dotenv.config();
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');

nunjucks.configure('views', { 
  express: app,
  watch: true,
});

app.use(morgan('dev'));




* 변수 
- 넌적스에서 변수는 {{ }}로 감싼다.
- 내부에 변수를 사용할 수도 있다. 변수를 선언할 때는 {% set 변수 = '값' %}를 사용한다.
- HTML을 이스케이프하고 싶지 않다면 {{ 변수 | safe }}를 사용


* 반복문
- 넌적스에서는 특수한 문을 {% %} 안에 씀
- 반복문에서 인덱스를 사용하고 싶다면 loop.index라는 특수한 변수를 사용


* 조건문
- 조건문은 {% if 변수 %} {% elif %} {% else %} {% endif %}
- case문은 없지만 elif(else if 역할)를 통해 분기 처리할 수 있다.


*/
