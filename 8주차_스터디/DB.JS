/*
데이터베이스는 관련성을 가지며 중복이 없는 데이터들의 집합
- 데이터베이스를 관리하는 시스템을 DBMS(DataBase Management System)(데이터베이스 관리 시스템)
- 서버의 하드 디스크나 SSD 등의 저장 매체에 데이터를 저장
- 저장 매체가 고장 나거나 사용자가 직접 데이터를 지우지 않는 이상 계속 데이터가 보존되므로 서버 종료 여부와 상관없이 데이터를 계속 사용가능


-데이터베이스를 관리하는 DBMS 중에는 RDBMS(Relational DBMS)라고 부르는 관계형 DBMS가 많이 사용

MySQL 설치했으면 , 데이터 베이스 생성할 수 있다.

*/



/*
1. 데이터베이스 생성하기

- CREATE SCHEMA [데이터베이스명]이 데이터베이스를 생성하는 명령어
- SCHEMA(스키마)라고 되어 있는데, MySQL에서 데이터베이스와 스키마는 같은 개념


mysql> CREATE SCHEMA `nodejs` DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_general_ci;
Query OK, 1 row affected (0.01sec)
mysql> use nodejs;
Database changed

nodejs라는 이름의 데이터베이스를 생성한 다음, 
use nodejs; 명령어를 추가로 입력해 앞으로 nodejs 데이터베이스를 사용하겠다는 것을 MySQL에 알린다.


- SQL 구문을 입력할 때는 마지막에 세미콜론(;)을 붙여야 해당 구문이 실행된다.
- MySQL이 기본적으로 알고 있는 구문은 예약어라고 한다.

*/




/*
2. 테이블 생성하기
- 테이블이란 데이터가 들어갈 수 있는 틀을 의미하며, 테이블에 맞는 데이터만 들어갈 수 있다.


mysql> CREATE TABLE nodejs.users (
    -> id INT NOT NULL AUTO_INCREMENT,
    -> name VARCHAR(20) NOT NULL,
    -> age INT UNSIGNED NOT NULL,
    -> married TINYINT NOT NULL,
    -> comment TEXT NULL,
    -> created_at DATETIME NOT NULL DEFAULT now(),
    -> PRIMARY KEY(id),
    -> UNIQUE INDEX name_UNIQUE (name ASC))
    -> COMMENT = '사용자 정보'
    -> ENGINE = InnoDB;
Query OK, 0 row affected (0.09 sec)



- CREATE TABLE [데이터베이스명.테이블명]은 테이블을 생성하는 명령어
- 한 줄에 하나씩 콤마(,)로 구분해 컬럼들을 만든다.
- 컬럼을 정의해두면 앞으로 데이터를 넣을 때 컬럼 규칙에 맞는 정보들만 넣을 수 있다.



- 컬럼 이름 옆에는 INT, VARCHAR, TINYINT, TEXT, DATETIME 등이 적혀 있다. 이는 컬럼의 자료형을 뜻한다.

• INT는 정수를 의미, 소수까지 저장하고 싶다면 FLOAT이나 DOUBLE 자료형을 사용하면 된다.

• VARCHAR(자릿수) 외에도 CHAR(자릿수)라는 자료형도 있다. CHAR는 고정 길이이고, VARCHAR는 가변 길이이다. 
예를 들어 CHAR(10)이면 반드시 길이가 10인 문자열만 넣어야 하고, VARCHAR(10)일 경우에는 길이가 0~10인 문자열을 넣을 수 있다. 
CHAR에 주어진 길이보다 짧은 문자열을 넣는다면 부족한 자릿수만큼 스페이스가 채워진다.

• TEXT는 긴 글을 저장할 때 사용하며, VARCHAR와 헷갈릴 수 있다. 수백 자 이내의 문자열은 보통 VARCHAR로 많이 처리하고, 그보다 길면 TEXT로 처리한다.

• TINYINT는 -128부터 127까지의 정수를 저장할 때 사용한다. 1 또는 0만 저장한다면 불 값(Boolean)과 같은 역할을 할 수 있다.

• DATETIME은 날짜와 시간에 대한 정보를 담고 있다. 
날짜 정보만 담는 DATE와 시간 정보만 담는 TIME 자료형도 있다. 이외에도 많은 자료형이 있으나 이 정도가 자주 쓰인다.





- 자료형 뒤에도 NOT NULL, NULL, UNSIGNED, AUTO_INCREMENT, DEFAULT 등의 옵션이 붙어 있다.

• NULL과 NOT NULL은 빈칸을 허용할지 여부를 묻는 옵션이다. 
comment 컬럼만 NULL이고, 나머지는 모두 NOT NULL이다. 
자기소개를 제외한 나머지 컬럼은 반드시 로우를 생성할 때 데이터를 입력해야 한다.

• id 컬럼에는 추가로 AUTO_INCREMENT가 붙어 있다. 숫자를 저절로 올리겠다는 뜻이다. 
예를 들어 처음에 Zero라는 사람의 데이터를 넣으면 MySQL은 알아서 id로 1번을 부여한다. 
다음에 Nero라는 사람의 데이터를 넣으면 자동으로 id 2번을 부여한다. 이를 가능하게 하는 옵션이 AUTO_INCREMENT이다.

• UNSIGNED는 숫자 자료형에 적용되는 옵션이다. 숫자 자료형은 기본적으로 음수 범위를 지원한다. 
예를 들어 INT는 -2147483648~2147483647까지의 숫자를 저장할 수 있다. 만약 UNSIGNED가 적용되어 있다면 음수는 무시되고 0~4294967295까지 저장할 수 있다. 
FLOAT과 DOUBLE에는 UNSIGNED 적용이 불가능하다. 나이처럼 음수가 나올 수 없는 컬럼은 체크해두는 것이 좋다.

• ZEROFILL은 숫자의 자릿수가 고정되어 있을 때 사용할 수 있다. 가끔 자료형으로 INT 대신 INT(자릿수)처럼 표현하는 경우가 있다. 
이때 ZEROFILL을 설정해둔다면 비어 있는 자리에 모두 0을 넣는다. 예를 들어 INT(4)인데 숫자 1을 넣었다면 0001이 되는 식입니다. 





- COMMENT, ENGINE은 테이블 자체에 대한 설정

• COMMENT는 테이블에 대한 보충 설명을 의미한다. 이 테이블이 무슨 역할을 하는지 적어두면 된다. 필수는 아님.
• ENGINE은 여러 가지가 있지만, MyISAM과 InnoDB가 제일 많이 사용된다. 




- 사용자의 댓글을 저장하는 테이블 만들기
mysql> CREATE TABLE nodejs.comments (
    -> id INT NOT NULL AUTO_INCREMENT,
    -> commenter INT NOT NULL,
    -> comment VARCHAR(100) NOT NULL,
    -> created_at DATETIME NOT NULL DEFAULT now(),
    -> PRIMARY KEY(id),
    -> INDEX commenter_idx (commenter ASC),
    -> CONSTRAINT commenter
    -> FOREIGN KEY (commenter)
    -> REFERENCES nodejs.users (id)
    -> ON DELETE CASCADE
    -> ON UPDATE CASCADE)
    -> COMMENT = '댓글'
    -> ENGINE=InnoDB;
Query OK, 0 row affected (0.09 sec)


-> comments 테이블에는 id, commenter(댓글을 쓴 사용자 아이디), comment(댓글 내용), created_at(로우 생성일) 컬럼이 있다.
- commenter 컬럼에는 댓글을 작성한 사용자의 id를 저장
- 다른 테이블의 기본 키를 저장하는 컬럼을 외래 키(foreign key)라고 함.
- CONSTRAINT [제약조건명] FOREIGN KEY [컬럼명] REFERENCES [참고하는 컬럼명]으로 외래 키를 지정할 수 있다.

!!!!! ON UPDATE와 ON DELETE는 모두 CASCADE로 설정
-> 사용자 정보가 수정되거나 삭제되면 그것과 연결된 댓글 정보도 같이 수정하거나 삭제한다는 뜻
-> 그래야 데이터가 불일치하는 현상이 나타나지 않는다.

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
