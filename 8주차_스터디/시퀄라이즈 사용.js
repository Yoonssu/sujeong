/*
시퀄라이즈(Sequelize)
:  MySQL 작업을 쉽게 할 수 있도록 도와주는 라이브러리

- 시퀄라이즈는 ORM(Object-relational Mapping)으로 분류
- ORM은 자바스크립트 객체와 데이터베이스의 릴레이션을 매핑해주는 도구

- 시퀄라이즈를 쓰는 이유
: 자바스크립트 구문을 알아서 SQL로 바꿔준다.



1. 
*package.json

{
  "name": "learn-sequelize",
  "version": "0.0.1",
  "description": "시퀄라이즈를 배우자",
  "main": "app.js",
  "scripts": {
    "start": "nodemon app"
  },
  "author": "ZeroCho",
  "license": "MIT"
}


2. sequelize와 sequelize-cli, mysql2 패키지를 설치
$ npm i express morgan nunjucks sequelize sequelize-cli mysql2
$ npm i -D nodemon

-> sequelize-cli는 시퀄라이즈 명령어를 실행하기 위한 패키지이고, 
   mysql2는 MySQL과 시퀄라이즈를 이어주는 드라이버



3. 설치 완료 후 sequelize init 명령어를 호출

$ npx sequelize init 
(전역 설치 없이 명령어로 사용하려면 앞에 npx)




4. MySQL 연결하기
- 시퀄라이즈를 통해 익스프레스 앱과 MySQL을 연결
(app.js를 생성하고 익스프레스와 시퀄라이즈 연결 코드를 작성)


*app.js

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const { sequelize } = require('./models');

const app = express();
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});



-> force: false 옵션이 있는데, 이 옵션을 true로 설정하면 서버를 실행할 때마다 테이블을 재생성
-> 테이블을 잘못 만든 경우에 true로 설정


- MySQL과 연동할 때는 config 폴더 안의 config.json 정보가 사용된다.





5. 모델 정의하기
- MySQL에서 정의한 테이블을 시퀄라이즈에서도 정의해야함
- MySQL의 테이블은 시퀄라이즈의 모델과 대응
- 시퀄라이즈는 모델과 MySQL의 테이블을 연결해주는 역할
- 시퀄라이즈는 기본적으로 모델 이름은 단수형으로, 테이블 이름은 복수형으로 사용



! User와 Comment 모델을 만들어 users 테이블과 comments 테이블에 연결
const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init({
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      married: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {}
};

module.exports = User;


-> User 모델을 만들고 모듈로 exports
-> User 모델은 Sequelize.Model을 확장한 클래스로 선언

- 모델은 크게 static initiate 메서드와 static associate 메서드로 나뉘어짐.
-> static initiate 메서드에는 테이블에 대한 설정을 하고, static associate 메서드에는 다른 모델과의 관계를 적는다.


- 모델.init 메서드의 첫 번째 인수가 테이블 컬럼에 대한 설정이고, 
  두 번째 인수가 테이블 자체에 대한 설정


*  MySQL의 자료형과의 차이점
- VARCHAR는 STRING으로, INT는 INTEGER로, TINYINT는 BOOLEAN으로, DATETIME은 DATE로 적는다.
- allowNull은 NOT NULL 옵션과 동일
- unique는 UNIQUE 옵션 
- defaultValue는 기본값(DEFAULT)을 의미



- 모델.init 메서드의 두 번째 인수는 테이블 옵션

• sequelize: static initiate 메서드의 매개변수와 연결되는 옵션으로 db.sequelize 객체를 넣음. 나중에 model/index.js에서 연결

• timestamps: 현재 값이 false로 되어 있다. timestamps 속성이 true이면 시퀄라이즈는 createdAt과 updatedAt 컬럼을 추가한다. 각각 로우가 생성될 때와 수정될 때의 시간이 자동으로 입력된다. 

• underscored: 시퀄라이즈는 기본적으로 테이블명과 컬럼명을 캐멀 케이스(camel case)(예시: createdAt)로 만든다. 
  이를 스네이크 케이스(snake case)(예시: created_at)로 바꾸는 옵션이다.

• modelName: 모델 이름을 설정할 수 있다. 노드 프로젝트에서 사용한다.

• tableName: 실제 데이터베이스의 테이블 이름이 된다. 기본적으로는 모델 이름을 소문자 및 복수형으로 만든다. 
  모델 이름이 User라면 테이블 이름은 users가 된다.

• paranoid: true로 설정하면 deletedAt이라는 컬럼이 생긴다. 로우를 삭제할 때 완전히 지워지지 않고 deletedAt에 지운 시각이 기록된다. 
  로우를 조회하는 명령을 내렸을 때는 deletedAt의 값이 null인 로우(삭제되지 않았다는 뜻)를 조회한다. 이렇게 하는 이유는 나중에 로우를 복원하기 위해서이다. 
  로우를 복원해야 하는 상황이 생길 것 같다면 미리 true로 설정해두자.

• charset과 collate: 각각 utf8과 utf8_general_ci로 설정해야 한글이 입력된다. 이모티콘까지 입력할 수 있게 하고 싶다면 utf8mb4와 utf8mb4_general_ci를 입력한다.




* Comment 모델 만들기

const Sequelize = require('sequelize');

class Comment extends Sequelize.Model {
  static initiate(sequelize) {
    Comment.init({
      comment: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Comment',
      tableName: 'comments',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
  }
};

module.exports = Comment;




-> 모델을 생성후 models/index.js와 연결


const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');
...
db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

User.initiate(sequelize);
Comment.initiate(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;





6. 관계 정의하기
- 위의 코드에서 이어서  users 테이블과 comments 테이블 간의 관계를 정의
- MySQL에서는 JOIN이라는 기능으로 여러 테이블 간의 관계를 파악해 결과를 도출



6.1 1:N
- 시퀄라이즈에서는 1:N 관계를 hasMany라는 메서드로 표현
- users 테이블의 로우 하나를 불러올 때 연결된 comments 테이블의 로우들도 같이 불러올 수 있다.

- 반대로 belongsTo 메서드
: comments 테이블의 로우를 불러올 때 연결된 users 테이블의 로우를 가져온다.
- 다른 모델의 정보가 들어가는 테이블에는 belongsTo를 사용


6.2 1:1
- 1:1 관계에서는 hasMany 메서드 대신 hasOne 메서드를 사용
- 1:1 관계라고 해도 belongsTo와 hasOne이 반대이면 안 된다.
- > belongsTo를 사용하는 Info 모델에 UserId 컬럼이 추가되기 때문


6.3 N:M
- 시퀄라이즈에는 N:M 관계를 표현하기 위한 belongsToMany 메서드
- 게시글 정보를 담고 있는 가상의 Post 모델과 해시태그 정보를 담고 있는 가상의 Hashtag 모델이 있다고 하면 다음과 같이 표현할 수 있다.
-> 
db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
*/



/*
7. 쿼리 알아보기
- 시퀄라이즈로 CRUD 작업을 하려면 먼저 시퀄라이즈 쿼리를 알아야함.
- 쿼리는 프로미스를 반환하므로 then을 붙여 결괏값을 받을 수 있다.


INSERT INTO nodejs.users (name, age, married, comment) VALUES ('zero', 24, 0, '자기소개1');
const { User } = require('../models');
User.create({
  name: 'zero',
  age: 24,
  married: false,
  comment: '자기소개1',
});

-> models 모듈에서 User 모델을 불러와 create 메서드를 사용

- !!! 데이터를 넣을 때 MySQL의 자료형이 아니라 시퀄라이즈 모델에 정의한 자료형대로 넣어야 한다.
- 자료형이나 옵션에 부합하지 않는 데이터를 넣었을 때는 시퀄라이즈가 에러를 발생



* 로우 조회 쿼리

- users 테이블의 모든 데이터를 조회하는 SQL문
SELECT * FROM nodejs.users;
User.findAll({});

-> findAll 메서드를 사용


- Users 테이블의 데이터 하나만 가져오는 SQL문
SELECT * FROM nodejs.users LIMIT 1;
User.findOne({});

->findOne 메서드를 사용



-attributes 옵션을 사용해서 원하는 컬럼만 가져올 수도 있다.
SELECT name, married FROM nodejs.users;
User.findAll({
  attributes: ['name', 'married'],
});


where 옵션이 조건들을 나열하는 옵션

SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 30;
const { Op } = require('sequelize');
const { User } = require('../models');
User.findAll({
  attributes: ['name', 'age'],
  where: {
    married: true,
    age: { [Op.gt]: 30 },
  },
});




- 시퀄라이즈는 자바스크립트 객체를 사용해서 쿼리를 생성해야 하므로 Op.gt 같은 특수한 연산자들이 사용된다.

-> Sequelize 객체 내부의 Op 객체를 불러와 사용
-> 자주 쓰이는 연산자로는 Op.gt(초과), Op.gte(이상), Op.lt(미만), Op.lte(이하), Op.ne(같지 않음), Op.or(또는), Op.in(배열 요소 중 하나), Op.notIn(배열 요소와 모두 다름) 





* 조회할 로우 개수를 설정하는 방법

- limit 옵션
SELECT id, name FROM users ORDER BY age DESC LIMIT1;
User.findAll({
  attributes: ['id', 'name'],
  order: [['age', 'DESC']],
  limit: 1,
});


- OFFSET도 offset 속성으로 구현 가능
SELECT id, name FROM users ORDER BY age DESC LIMIT 1 OFFSET 1;
User.findAll({
  attributes: ['id', 'name'],
  order: ['age', 'DESC'],
  limit: 1,
  offset: 1,
});



* 로우 수정하는 쿼리

- update 메서드
UPDATE nodejs.users SET comment = '바꿀 내용' WHERE id = 2;
User.update({
  comment: '바꿀 내용',
}, {
  where: { id: 2 },
});


* 로우 삭제하는 쿼리

-destroy 메서드
DELETE FROM nodejs.users WHERE id = 2;
User.destory({
  where: { id: 2 },
});

*/





/*
8. 관계 쿼리


- findOne이나 findAll 메서드를 호출할 때 프로미스의 결과로 모델을 반환
const user = await User.findOne({});
console.log(user.nick); // 사용자 닉네임

- User 모델의 정보에도 바로 접근할 수 있지만, 더 편리한 점은 관계 쿼리를 지원한다는 것

- 특정 사용자를 가져오면서 그 사람의 댓글까지 모두 가져오고 싶다면 include 속성을 사용한다.

- 어떤 모델과 관계가 있는지를 include 배열에 넣어주면 된다. 
-> 댓글은 여러 개일 수 있으므로(hasMany) user.Comments로 접근 가능
->
const user = await User.findOne({});
const comments = await user.getComments();
console.log(comments); // 사용자 댓글



- 관계를 설정했다면 getComments(조회) 외에도 setComments(수정), addComment(하나 생성), addComments(여러 개 생성), removeComments(삭제) 메서드를 지원한다.
-> 동사 뒤에 모델의 이름이 붙는 형식
-> 동사 뒤의 모델 이름을 바꾸고 싶다면 관계를 설정할 때 as 옵션을 사용


*/
/*
*/
/*
*/
/*
*/
/*
*/
/*
*/
/*
*/
/*
*/
/*
*/
/*
*/
/*
*/
/*
*/
/*
*/
/*
*/
