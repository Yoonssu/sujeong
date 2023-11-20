
/*
CRUD는 Create, Read, Update, Delete의 첫 글자를 모은 두문자어로, 데이터베이스에서 많이 수행하는 네 가지 작업을 일컫는다.


1. Create 
: Create(생성)는 데이터를 생성해서 데이터베이스에 넣는 작업

mysql> INSERT INTO nodejs.users (name, age, married, comment) VALUES ('zero', 24, 0, '자기소개1');
Query OK, 1 row affected (0.01 sec)
mysql> INSERT INTO nodejs.users (name, age, married, comment) VALUES ('nero', 32,1, '자기소개2');
Query OK, 1 row affected (0.02 sec)

-> 데이터를 넣는 명령어는 INSERT INTO [테이블명] ([컬럼1], [컬럼2], .. .) VALUES ([값1], [값 2], ...)
-> name에 zero, age에 24, married에 0, comment에 자기소개1이 들어가는 것
-> id는 AUTO_INCREMENT에 의해, created_at은 DEFAULT 값에 의해 자동으로 들어감


- comments 테이블에 데이터 넣기
mysql> INSERT INTO nodejs.comments (commenter, comment) VALUES (1, '안녕하세요. zero의 댓글입니다');
Query OK, 1 row affected (0.02 sec)






2. Read
: Read(조회)는 데이터베이스에 있는 데이터를 조회하는 작업


mysql> SELECT * FROM nodejs.users;
(mysql> SELECT * FROM nodejs.comments;)

-> users 테이블의 모든 데이터를 조회하는 SQL문이며 SELECT * FROM [테이블명] 형식

mysql> SELECT name, married FROM nodejs.users;
-> 특정 컬럼만 조회가능

mysql> SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 30;
->AND로 여러 조건을 묶어줄 수도 있다.


mysql> SELECT id, name FROM nodejs.users ORDER BY age DESC;
->ORDER BY [컬럼명] [ASC|DESC] 키워드를 사용하면 정렬도 가능
->DESC는 내림차순, ASC는 오름차순


조회할 로우 개수를 설정할 수도 있다.
-> LIMIT [숫자] 키워드를 사용
mysql> SELECT id, name FROM nodejs.users ORDER BY age DESC LIMIT 1;



로우 개수를 설정하면서 몇 개를 건너뛸지 설정할 수도 있다.
- 이는 게시판 등의 페이지네이션 기능을 구현할 때 유용
- OFFSET [건너뛸 숫자] 키워드를 사용
-> mysql> SELECT id, name FROM nodejs.users ORDER BY age DESC LIMIT 1 OFFSET 1;






3. Udate(수정)
- Update(수정)는 데이터베이스에 있는 데이터를 수정하는 작업

mysql> UPDATE nodejs.users SET comment = '바꿀 내용' WHERE id = 2;
Query OK, 1 row affected (0.01 sec)
Rows matched: 1 Changed: 1 Warnings: 0

-> 수정 명령어는 UPDATE [테이블명] SET [컬럼명=바꿀 값] WHERE [조건]




4.  Delete(삭제)
- Delete(삭제)는 데이터베이스에 있는 데이터를 삭제하는 작업


mysql> DELETE FROM nodejs.users WHERE id = 2;
Query OK, 1 row affected (0.00 sec)

-> DELETE FROM [테이블명] WHERE [조건]

*/
