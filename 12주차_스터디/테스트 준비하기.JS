// 11.1  테스트 준비하기

 

// - 테스트에 사용할 패키지 jest

// - 9장의 NodeBird 프로젝트에 jest 패키지 설치 

 

 

// * jest
// $npm i -D jset
 

 

 

// package.json에 test라는 명령어를 등록하고 명령어 실행 시 jest 실행

//package.json
// {
// 	"name":...
//     "version":...
//     ...
//     "scrpits":{
//     	"start":...
//         "test":"jest"
//     },
//     ...
// }
 

 /*

routes 폴더 안에 middlewares.test.js를 만든다.
테스트용 파일은 파일명과 확장자 사이에 test나 spec을 넣으면 된다.
*/

//middlewares.test.js
test('1+1은 2 입니다.',()=>{
    expect(1+1).toEqual(2);
})
 
/*

함수의 첫 번째 인수로는 테스트에 대한 설명을 적고, 두 번째 인수인 함수에는 테스트 내용을 적는다.

expect 함수의 인수에는 실제 코드, toEqual 함수의 인수로는 예상되는 결괏값을 넣는다.

 
*/
/*
//결과
> nodejs@1.0.0 test
> jest

 PASS  testing/middlewares.test.js
  √ 1+1은 2 입니다. (3 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.822 s
Ran all test suites.
 

테스트를 아무것도 작성하지 않으면 에러가 발생하고 이를 테스트가 실패했다고 표현한다.

expect에 넣은 값과 toEqual에 넣은 값이 일치하면 테스트를 통과한다.

 */

 

 

 
 

 
 

