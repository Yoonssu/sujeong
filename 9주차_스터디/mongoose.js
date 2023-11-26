/*
5. 몽구스 사용하기

 

- MySQL에 시퀄라이즈가 있다면 몽고디비에는 몽구스(Mongoose)가 있다.

- 몽구스는 시퀄라이즈와 달리 ODM(Object Document Mapping)이라고 불린다.

- 몽고디비는 릴레이션이 아니라 다큐먼트를 사용하므로 ORM이 아니라 ODM이다.

 

 

*몽고디비 자체가 이미 자바스크립트인데도 굳이 자바스크립트 객체와 매핑하는 이유는?

- 몽고디비에 없어서 불편한 기능들을 몽구스가 보완해주기 때문이다. 

 

+) 보완기능

- 몽고디비는 테이블이 없어서 자유롭게 데이터를 넣을 수 있지만, 때로는 자유로움이 불편함을 초래한다.

-> 몽구스는 몽고디비에 데이터를 넣기 전에 노드 서버 단에서 데이터를 한 번 필터링하는 역할을 한다. 

 

- MySQL에 있는 JOIN 기능을 populate라는 메서드로 어느 정도 보완한다.

-> 관계가 있는 데이터를 쉽게 가져올 수 있다.

 

 

1) 몽고디비 연결하기

 

- 노드와 몽고디비를 몽구스를 통해 연결하기 

- 몽고디비는 주소를 사용해 연결한다.

-> 주소 형식은 mongodb://[username:password@]host[:port][/[database][?options]]와 같다.

( [ ] 부분은 있어도 되고 없어도 됨을 의미)

 

 

const mongoose = require('mongoose');

const connect = () => {

 

➊
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }
 

➋
  mongoose.connect('mongodb://root:nodejsbook@localhost:27017/admin', {
    dbName: 'nodejs',
    useNewUrlParser: true,
  }, (error) => {
    if (error) {
      console.log('몽고디비 연결 에러', error);
    } else {
      console.log('몽고디비 연결 성공');
    }
  });
};
 

➌
mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect();
});
 

module.exports = connect;
 

- 먼저 schemas 폴더를 루트 디렉터리에 생성한다.

 

- ➊ 개발 환경일 때만 콘솔을 통해 몽구스가 생성하는 쿼리 내용을 확인할 수 있게 하는 코드이다. 

- ➋ 몽구스와 몽고디비를 연결하는 부분이다. 몽고디비 주소로 접속을 시도하고 마한다지막 인수로 주어진 콜백 함수를 통해 연결 여부를 확인한다.

- ➌ 몽구스 커넥션에 이벤트 리스너를 달아두어 에러 발생 시 에러 내용을 기록하고, 연결 종료 시 재연결을 시도한다.

 

 

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const connect = require('./schemas');

const app = express();
app.set('port', process.env.PORT || 3002);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});
connect();

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
 

- app.js를 만들고 schemas/index.js와 연결한다.

- 그후 몽고디비 서버를 먼저 실행(mongod --ipv6 --auth)하고, 콘솔을 하나 더 열어몽구스를 설치한 폴더로 이동한 후 npm start로 웹 서버를 실행한다.

 

3002 번 포트에서 대기 중
몽고디비 연결 성공
 

- 마지막 두 로그가 뜨면 연결이 성공한 것이다.

 

 

 

2) 스키마 정의하기

- 시퀄라이즈에서 테이블을 만들었던 것처럼 몽구스 스키마(schema)를 만들어보기

 

 

* user.js

const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  married: {
    type: Boolean,
    required: true,
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
 

- schemas 폴더에 user.js와 comment.js 생성한다.

- 몽구스 모듈에서 Schema 생성자를 사용해 스키마를 만들고 필드를 각각 정의한다.

- 몽구스는 알아서 _id를 기본 키로 생성하므로 _id 필드는 적어줄 필요가 없다.

 

- 몽구스 스키마에서 특이한 점은 String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array를 값으로 가질 수 있다는 점이다.

-> name 필드의 자료형은 String이고 필수이며 고유한 값이어야한다.

-> age 필드는 Number 자료형이고 필수이며, married 필드는 불 값 자료형이고 필수이다.

-> comment 필드는 String 자료형이다.

-> createdAt 필드는 Date 자료형이고 기본값은 Date.now(데이터 생성 당시의 시간)이다.

 

 

 

* 댓글 스키마 만들기

- 몽구스의 model 메서드 스키마와 몽고디비 컬렉션을 연결하는 모델을 만들 수 있다.

 

*comment.js

const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const commentSchema = new Schema({
  commenter: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', commentSchema);
 

 

- commenter 속성을 보면 자료형이 ObjectId이고, 옵션으로 ref 속성의 값이 User로 주어져 있다. 

->  commenter 필드에 User 스키마의 사용자 ObjectId가 들어간다는 뜻이다.

-> 몽구스가 JOIN과 비슷한 기능을 할 때 사용된다.

 

 

3)  쿼리 수행하기

 

- views 폴더 안에 mongoose.html과 error.html 파일을 만들고 , public 폴더 안에 mongoose.js 파일을 만든다.

 

 

* mongoose.js

// 사용자 이름을 눌렀을 때 댓글 로딩
document.querySelectorAll('#user-list tr').forEach((el) => {
  el.addEventListener('click', function () {
    const id = el.querySelector('td').textContent;
    getComment(id);
  });
});
// 사용자 로딩
async function getUser() {
  try {
    const res = await axios.get('/users');
    const users = res.data;
    console.log(users);
    const tbody = document.querySelector('#user-list tbody');
    tbody.innerHTML = '';
    users.map(function (user) {
      const row = document.createElement('tr');
      row.addEventListener('click', () => {
        getComment(user._id);
      });
      // 로우 셀 추가
      let td = document.createElement('td');
      td.textContent = user._id;
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = user.name;
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = user.age;
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = user.married ? '기혼' : '미혼';
      row.appendChild(td);
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
  }
}
// 댓글 로딩
async function getComment(id) {
  try {
    const res = await axios.get(`/users/${id}/comments`);
    const comments = res.data;
    const tbody = document.querySelector('#comment-list tbody');
    tbody.innerHTML = '';
    comments.map(function (comment) {
      // 로우 셀 추가
      const row = document.createElement('tr');
      let td = document.createElement('td');
      td.textContent = comment._id;
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = comment.commenter.name;
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = comment.comment;
      row.appendChild(td);
      const edit = document.createElement('button');
      edit.textContent = '수정';
      edit.addEventListener('click', async () => { // 수정 클릭 시
        const newComment = prompt('바꿀 내용을 입력하세요');
        if (!newComment) {
          return alert('내용을 반드시 입력하셔야 합니다');
        }
        try {
          await axios.patch(`/comments/${comment._id}`, { comment: newComment });
          getComment(id);
        } catch (err) {
          console.error(err);
        }
      });
      const remove = document.createElement('button');
      remove.textContent = '삭제';
      remove.addEventListener('click', async () => { // 삭제 클릭 시
        try {
          await axios.delete(`/comments/${comment._id}`);
          getComment(id);
        } catch (err) {
          console.error(err);
        }
      });
      // 버튼 추가
      td = document.createElement('td');
      td.appendChild(edit);
      row.appendChild(td);
      td = document.createElement('td');
      td.appendChild(remove);
      row.appendChild(td);
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
  }
}
// 사용자 등록 시
document.getElementById('user-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.username.value;
  const age = e.target.age.value;
  const married = e.target.married.checked;
  if (!name) {
    return alert('이름을 입력하세요');
  }
  if (!age) {
    return alert('나이를 입력하세요');
  }
  try {
    await axios.post('/users', { name, age, married });
    getUser();
  } catch (err) {
    console.error(err);
  }
  e.target.username.value = '';
  e.target.age.value = '';
  e.target.married.checked = false;
});
// 댓글 등록 시
document.getElementById('comment-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = e.target.userid.value;
  const comment = e.target.comment.value;
  if (!id) {
    return alert('아이디를 입력하세요');
  }
  if (!comment) {
    return alert('댓글을 입력하세요');
  }
  try {
    await axios.post('/comments', { id, comment });
    getComment(id);
  } catch (err) {
    console.error(err);
  }
  e.target.userid.value = '';
  e.target.comment.value = '';
});
 

 

* 나중에 만들  라우터들을 미리 app.js에 연결

...
const connect = require('./schemas');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');

const app = express();
...
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
...
 

 

* 라우터 작성

const express = require('express');
const User = require('../schemas/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    res.render('mongoose', { users });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
 

- GET /로 접속했을 때 User.find({}) 메서드로 모든 사용자를 찾은 뒤, mongoose.html을 렌더링할 때 users 변수로 넣는다.

- find 메서드는 User 스키마를 require한 뒤 사용할 수 있다. 

-> 몽고디비의 db.users.find({}) 쿼리와 같다.

 

- 몽구스도 기본적으로 프로미스를 지원하므로 async/await과 try/catch문을 사용해서 각각 조회 성공 시와 실패 시의 정보를 얻을 수 있다.

 

 

* users.js

const express = require('express');
const User = require('../schemas/user');
const Comment = require('../schemas/comment');

const router = express.Router();

router.route('/')
  .get(async (req, res, next) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.get('/:id/comments', async (req, res, next) => {
  try {
    const comments = await Comment.find({ commenter: req.params.id })
      .populate('commenter');
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
 

- GET /users와 POST /users 주소로 요청이 들어올 때의 라우터이다.

- 각각 사용자를 조회하는 요청과 사용자를 등록하는 요청을 처리한다.

 

 

* comments.js

const express = require('express');
const Comment = require('../schemas/comment');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const comment = await Comment.create({
      commenter: req.body.id,
      comment: req.body.comment,
    });
    console.log(comment);
    const result = await Comment.populate(comment, { path: 'commenter' });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.route('/:id')
  .patch(async (req, res, next) => {
    try {
      const result = await Comment.update({
        _id: req.params.id,
      }, {
        comment: req.body.comment,
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Comment.remove({ _id: req.params.id });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
 

- 댓글에 관련된 CRUD 작업을 하는 라우터이다.

- POST /comments 라우터는 다큐먼트를 등록하는 라우터이다.

- Comment.create 메서드로 댓글을 저장 후 populate 메서드로 프로미스의 결과로 반환된 comment 객체에 다른 컬렉션 다큐먼트를 불러온다. path 옵션으로 어떤 필드를 합칠지 설정하고 합쳐진 결과를 클라이언트로 응답한다.

 

- PATCH /comments/:id 라우터는 다큐먼트를 수정하는 라우터이다.

- 수정에는 update 메서드를 사용한다.

 

- DELETE /comments/:id 라우터는 다큐먼트를 삭제하는 라우터이다.

- remove 메서드를 사용해 삭제한다.

*/