
// 11.5 부하 테스트

 

// - 서버가 얼마만큼의 요청을 견딜 수 있는지 테스트하는 방법이다.

// - 서버는 접속자들의 정보를 저장하기 위해 각가의 접속자마다 일정한 메모리를 할당한다. 사용하는 메모리의 야잉 증가하다가 서버의 메모리 용량을 넘어서게 되면 문제가 발생하는데 이를 OOM(out of memeory)라고 한다.

// $npm i -D artillery
// $npm start

// $npx artillery quick --count 100 -n 50 http://localhost:8001
 

// localhost:8001에 빠르게 부하 테스트를 하는 방법이다.
// --count는 가상 사용자 수를 의미하고, -n옵션은 요청 횟수를 의미한다.

// request latency (응답 지연속도) 가 중요한데, 보통 median(중간값)과 p95(하위 95%)값의 차이가 크지 않으면 좋다.

 

 

 

// * 시나리오 테스트

// //loadtest.json
// {
//     "config":{
//         "target":"http://localhost:8001",
//         "phases":[
//             {
//                 "duration":60,
//                 "arrivalRate":30
//             }
//         ]
//     },
//     "scenarios":[{
//         "flow":[
//             {
//                 "get":{
//                     "url":"/"
//                 }
//             },{
//                 "post":{
//                     "url":"/auth/login",
//                     "json":{
//                         "email":"jinmin645@gmail.com",
//                         "password":"12345678"
//                     }
//                 }
//             },{"get":{
//                 "url":"/"
//                 }
//             }
//         ]
//     }]
// }
// target: 목표 서버
// phases.duration: 60초 동안
// phases.arrivalRate: 매 초 30명의 사용자
// scenarios대로 동작한다.

 

 

