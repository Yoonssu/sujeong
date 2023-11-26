/*
1. 몽고디비  : 자바스크립트 문법을 사용

- MySQL은 SQL을 사용하는 대표적인 데이터베이스
- 몽고디비는 SQL을 사용하지 않는, NoSQL(Not only SQL)
*/

/*
 

1. NoSQL(Not only SQL)

- SQL을 사용하지 않는 데이터베이스이다.

- NoSQL에는 고정된 테이블이 없다.

- NoSQL에는 대표적으로 몽고디비가 있다.

 

 

1)  몽고디비의 특징

 

- 자유로운 데이터 입력이 가능하다.

- 컬렉션 간 JOIN을 미지원한다.

- 확장성, 가용성이 뛰어나다

 

 

 

 

2. 데이터베이스 및 컬렉션 생성하기

 

- nodejs라는 이름의 데이터베이스와 MySQL 테이블에 상응하는 컬렉션을 만들기

 

1) 데이터베이스 생성

 

 - 데이터베이스를 만드는 명령어는 use [데이터베이스명]이다. 

use nodejs
 

 

   - 컬렉션은 따로 생성할 필요가 없다. 다큐먼트를 넣는 순간 컬렉션도 자동으로 생성된다.

    - 직접 컬렉션을 생성하는 명령어




> db.createCollection('users')
{ "ok" : 1 }
> db.createCollection('comments')
{ "ok" : 1 }
 

 

2. CRUD 작업하기

 

1) Create(생성)

 

- 컬렉션에 컬럼을 정의하지 않아도 되므로 컬렉션에는 아무 데이터나 넣을 수 있다.

- but, 무엇이 들어올지 모른다는 단점이 있다. -> 장점이자 단점이다.

 

 

+) 몽고디비의 자료형

 

- 몽고디비는 자바스크립트 문법을 사용하므로 자바스크립트의 자료형을 따른다.

- Date나 정규표현식 같은 자바스크립트 객체를 자료형으로 사용할 수 있다.

- Binary Data, ObjectId, Int, Long, Decimal, Timestamp, JavaScript 등의 추가적인 자료형이 있다.

 

 

1.1 ) 실행

$ mongosh
test> use nodejs;
switched to db nodejs
nodejs> db.users.insertOne({ name: 'zero', age: 24, married: false, comment: '안녕하세요. 간단히 몽고디비 사용 방법에 대해 알아봅시다.', createdAt: new Date() });
{
  acknowledged: true,
  insertedId: ObjectId("5a1687007af03c3700826f70")
}
nodejs> db.users.insertOne({ name: 'nero', age: 32, married: true, comment: '안녕하세요. zero 친구 nero입니다.', createdAt: new Date() });
{
  acknowledged: true,
  insertedId: ObjectId("62fba0deb068d84d69d7c740")
}
 

- 몽고디비 프롬프트를 실행해 mongosh 명령어 입력 후,  nodejs 데이터베이스를 사용한다는 것을 알린다.

- db.컬렉션명.insertOne(다큐먼트)로 다큐먼트를 생성할 수 있다.

- 명령이 성공적으로 수행되었다면 acknowledged: true와 insertedId: ObjectId("5a1687007af03c3700826f70")이라는 응답이 나온다.

 

 

nodejs> db.users.find({ name: 'zero' }, { _id: 1 })
[ { "_id" : ObjectId("5a1687007af03c3700826f70") } ]
 

- comments 컬렉션에 데이터를 넣으면 zero의 아이디가 ObjectId("5a1687007af03c3700826f70")이라고 나온다.

 

 

 

2) Read(조회)

 

nodejs> db.users.find({});
[
  { "_id" : ObjectId("5a1687007af03c3700826f70"), "name" : "zero", "age" : 24, "married" : false, "comment" : "안녕하세요. 간단히 몽고디비 사용 방법을 알아봅시다.", "createdAt" : ISODate("2022-04-30T05:00:00Z") },
  { "_id" : ObjectId("5a16877b7af03c3700826f71"), "name" : "nero", "age" : 32, "married" : true, "comment" : "안녕하세요. zero 친구 nero입니다.", "createdAt" : ISODate("2017-11-23T01:00:00Z") }
]
nodejs> db.comments.find({})
[ { "_id" : ObjectId("5a1687e67af03c3700826f73"), "commenter" : ObjectId("5a1687007af03c3700826f70"), "comment" : "안녕하세요. zero의 댓글입니다.", "createdAt" : ISODate("2022-04-30T05:30:00Z") } ]
 

- 위에서 생성한 다큐먼트들을 조회

- find({})는 컬렉션 내의 모든 다큐먼트를 조회하라는 뜻이다.

 

nodejs> db.users.find({}, { _id: 0, name: 1, married: 1 });
[
  { "name" : "zero", "married" : false },
  { "name" : "nero", "married" : true }
]
 

- 특정 필드만 조회하고 싶다면 find 메서드의 두 번째 인수로 조회할 필드를 넣는다.

 

 

nodejs> db.users.find({ age: { $gt: 0 }, married: true }, { _id: 0, name: 1, age: 1 });
[ { "name" : "nero", "age" : 32 } ]
 

- 조회 시 조건을 주려면 첫 번째 인수 객체에 기입하면 된다.

( age가 30 초과, married가 true인 다큐먼트의 이름과 나이를 조회 )

 

- $gt라는 특수한 속성을 사용한다.

- 몽고디비는 자바스크립트 객체를 사용해서 명령어 쿼리를 생성해야 하므로 $gt 같은 특수한 연산자가 사용된다.

- 자주 쓰이는 연산자로는 $gt(초과), $gte(이상), $lt(미만), $lte(이하), $ne(같지 않음), $or(또는), $in(배열 요소 중 하나) 등이 있다.

 

 

nodejs> db.users.find({ $or: [{ age: { $gt: 30 } }, { married: false }] }, { _id: 0, name: 1, age: 1 });
[
  { "name" : "zero", "age" : 24 },
  { "name" : "nero", "age" : 32 }
]
 

( age가 30 초과이거나 married가 false인 다큐먼트를 조회 )

- 몽고디비에서 OR 연산은 $or를 사용한다.

- $or에 주어진 배열 안의 조건들을 하나라도 만족하는 다큐먼트를 모두 찾는다.

 

 

*정렬

nodejs> db.users.find({}, { _id: 0, name:f, age: 1}).sort({ age: -1 })
[
  { "name" : "nero", "age" : 32 },
  { "name" : "zero", "age" : 24 }
]
 

- sort 메서드를 사용한다,

-  -1 은 내림차순, 1은 오름차순이다.

 

 

nodejs> db.users.find({}, { _id: 0, name: 1, age: 1 }).sort({ age: -1 }).limit(1)
[ { "name" : "nero", "age" : 32 } ]
 

- 조회할 다큐먼트 개수를 설정할 수도 있다.

- limit 메서드를 사용한다.

 

 

 

nodejs> db.users.find({}, { _id: 0, name: 1, age: 1 }).sort({ age: -1 }).limit(1).skip(1)
[ { "name" : "zero", "age" : 24 } ]
- 다큐먼트 개수를 설정하면서 몇 개를 건너뛸지 설정할 수도 있다.

- skip 메서드를 사용한다.

 

 

 

 

3) Update(수정)

 

nodejs> db.users.updateOne({ name: 'nero' }, { $set: { comment: '안녕하세요 이 필드를 바꿔보겠습니다!' } });
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 0,
  upsertedCount: 0
}
 

- 첫 번째 객체는 수정할 다큐먼트를 지정하는 객체이고, 두 번째 객체는 수정할 내용을 입력하는 객체이다.

- $set이라는 연산자 : 어떤 필드를 수정할지 정하는 연산자이다.

-> 연산자 사용하지 않으면 다큐먼트가 통째로 두 번쨰 인수로 주어진 객체로 수정되므로

일부 필드만 수정하고 싶을 때는 반드시 $set 연산자를 지정해야한다.

 

- 수정에 성공하면, 첫 번째 객체에 해당하는 다큐먼트 수(matchedCount)와 수정된 다큐먼트 수(modifiedCount)가 나온다.

 

 

 

4) Delete(삭제)

 

nodejs> db.users.deleteOne({ name: 'nero' })
{ acknowledged: true, deletedCount: 1 }
 

- 삭제할 다큐먼트에 대한 정보가 담긴 객체를 첫 번째 인수로 제공한다.

- 성공 시 삭제된 개수(deletedCount)가 반환된다.



 
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
