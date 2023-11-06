
/*

5장

패키지 매니저 


5.1 npm 알아보기

 

- npm은 Node Package Manager의 약어로, 이름 그대로 노드 패키지 매니저를 의미 한다.

- 노드가 자바스크립트 프로그램을 컴퓨터에서도 실행할 수 있게 해준다. 대부분의 자바스크립트 프로그램은 패키지라는 이름으로 npm에 등록되어 있으므로 특정 기능을 하는 패키지가 필요하다면 npm에서 찾아 설치하면 된다.

 

- npm에 업로드된 노드 모듈을 패키지라고 부른다. 모듈이 다른 모듈을 사용할 수 있는 것처럼, 패키지가 다른 패키지를 사용할 수도 있는데, 이런 관계를 의존 관계라고 한다.

 

 

5.2 package.json으로 패키지 관리하기

- 설치한 패키지의 버전을 관리하는 파일이 바로 package.json이다.

- 노드 프로젝트를 시작하기 전에는 폴더 내부에 무조건 package.json부터 만들고 시작해야 한다.

( npm은 package.json을 만드는 명령어를 제공 )
*/



// * package.json 만드는 과정


/*
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (폴더명) [프로젝트 이름 입력]
version: (1.0.0) [프로젝트 버전 입력]
description: [프로젝트 설명 입력]
entry point: index.js
test command: [엔터 키 클릭]
git repository: [엔터 키 클릭]
keywords: [엔터 키 클릭]
author: [여러분의 이름 입력]
license: (ISC) [엔터 키 클릭]
About to write to C:\Users\zerocho
pmtest\package.json:

{
  "name": "npmtest",
  "version": "0.0.1",
  "description": "hello package.json",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "ZeroCho",
  "license": "ISC"
}

Is this ok? (yes) yes
*/


/*

• package name: 패키지의 이름이다. package.json의 name 속성에 저장된다.

• version: 패키지의 버전이다. npm의 버전은 다소 엄격하게 관리된다.

• entry point: 자바스크립트 실행 파일 진입점이다. 보통 마지막으로 module.exports를 하는 파일을 지정하며, package.json의 main 속성에 저장됩니다.

• test command: 코드를 테스트할 때 입력할 명령어를 의미한다. package.json scripts 속성 안의 test 속성에 저장된다.

• git repository: 코드를 저장해둔 깃(Git) 저장소 주소를 의미한다. 나중에 소스에 문제가 생겼을 때 사용자들이 이 저장소에 방문해 문제를 제기할 수도 있고, 코드 수정본을 올릴 수도 있다. package.json의 repository 속성에 저장된다.

• keywords: 키워드는 npm 공식 홈페이지에서 패키지를 쉽게 찾을 수 있게 한다. package.json의 keywords 속성에 저장된다.

• license: 해당 패키지의 라이선스를 넣으면 된다.



!!! 주의

- 라이선스

: 오픈 소스라고 해서 모든 패키지를 아무런 제약 없이 사용할 수 있는 것은 아니다. 라이선스별로 제한 사항이 있으므로 설치 전에 반드시 라이선스를 확인해야한다.

 
*/




/*

{
  "name": "npmtest",
  "version": "0.0.1",
  "description": "hello package.json",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "ZeroCho",
  "license": "ISC"
}

- npm init 실행이 완료되면 폴더에 다음과 같은 파일이 생성된다.

- scripts 부분은 npm 명령어를 저장해두는 부분이다. 콘솔에서 npm run [스크립트 명령어]를 입력하면 해당 스크립트가 실행 된다.

 
*/



/*
* 패키지 설치 

$ npm install express
added 50 packages, and audited 51 packages in 1s

2 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities


- npm install [패키지 이름]을 package.json이 있는 폴더의 콘솔에서 입력하면 된다.

- 설치한 패키지가 package.json에 기록된다. 
*/





/*
{
  "name": "npmtest",
  ...
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.3",
  }
}
 

- dependencies라는 속성이 새로 생겼고, express라는 이름과 함께 설치된 버전이 저장된다.

 

 

!!! 주의 

- 프로젝트 이름과 설치하는 패키지 이름은 달라야한다. 

- express를 설치했으면 프로젝트 이름은 express이면 안된다. 

 

 

- node_modules라는 폴더도 생성되는데, 그 안에 설치한 패키지들이 들어 있다.

- Express 하나만 설치했는데 패키지가 여러 개 들어 있는것은 Express가 의존하는 패키지들이다.

- 패키지 하나가 다른 여러 패키지에 의존하고, 그 패키지들은 또 다른 패키지들에 의존한다. 이렇게 의존 관계가 복잡하게 얽혀 있어 package.json이 필요한 것이다.

 

 

- package-lock.json이라는 파일도 생성되는데, 직접 설치한 express 외에도 node_modules에 들어 있는 패키지들의 정확한 버전과 의존 관계가 담겨 있다.

- npm으로 패키지를 설치, 수정, 삭제할 때마다 패키지들 간의 정확한 내부 의존 관계를 이 파일에 저장한다.

- 즉, package.json은 직접 설치한 패키지를 기록하는 파일이고, package-lock.json은 패키지 간의 의존 관계를 명시한 파일이다.

*/




/*

$ npm install morgan cookie-parser express-session
added 12 packages, and audited 63 packages in 2s

2 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
 

- npm install [패키지1] [패키지2] [...]와 같이 패키지들을 나열해서 묘듈 여러 개를 동시에 설치한다.

- 설치한 패키지들이 dependencies 속성에 기록된다.

 
*/




/*

$ npm install --global rimraf
changed 12 packages, and audited 13 packages in 2s

2 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
 

- npm에는 전역(global) 설치라는 옵션도 있다. 패키지를 현재 폴더의 node_modules에 설치하는 것이 아니라 npm이 설치되어 있는 폴더에 설치한다.

- 이 폴더의 경로는 보통 시스템 환경 변수에 등록되어 있으므로 전역 설치한 패키지는 콘솔의 명령어로 사용할 수 있다.

- 전역 설치를 했다고 해서 패키지를 모든 곳에서 사용한다는 뜻이 아니며, 대부분 명령어로 사용하기 위해 전역 설치한다.

 
*/


/*

$ npm install --save-dev rimraf
$ npx rimraf node_modules
 

- 단, 전역 설치한 패키지는 package.json에 기록되지 않아 다시 설치할 때 어려움이 있다.

- 위의 코드와 같이 npx 명령어를 붙여 실행하면 패키지를 전역 설치한 것과 같은 효과를 얻을 수 있고, 패키지가 package.json에 기록되었으므로 버전 관리도 용이하다. 

 
*/



/*

5.3 패키지 버전 이해하기 

- 노드 패키지들의 버전은 항상 세 자리로 이뤄져 있다.

- 버전이 세 자리인 이유는 SemVer 방식의 버전 넘버링을 따르기 때문이다. 

- 버전 번호를 어떻게 정하고 올려야 하는지를 명시하는 규칙이 SemVer이다.

 

 

* SemVer

- 버전의 첫 번째 자리는 메이저(major) 버전이다.

- 메이저 버전 0:  초기 개발 중이다.

- 메이저 버전 1 ~ : 정식 버전이다.

- 메이저 버전은 하위 호환이 안 될 정도로 패키지의 내용이 수정되었을 때 올린다. 

-  1.5.0에서 2.0.0으로 올렸다는 것은, 1.5.0 버전 패키지를 사용하고 있던 사람들이 2.0.0으로 업데이트했을 때 에러가 발생할 확률이 크다는 것이다.

 

- 두 번째 자리는 마이너(minor) 버전이다.

- 마이너 버전은 하위 호환이 되는 기능 업데이트를 할 때 올린다.

- 버전을 1.5.0에서 1.6.0으로 올렸다면, 1.5.0 사용자가 1.6.0으로 업데이트했을 때 아무 문제가 없어야 한다.

 

- 세 번째 자리는 패치(patch) 버전이다.

- 새로운 기능이 추가되었다기보다는 기존 기능에 문제가 있어 수정한 것을 내놓았을 때 패치 버전을 올린다.

-1.5.0에서 1.5.1처럼 업데이트 후 아무 문제가 없어야 한다.

 

- 새 버전을 배포한 후에는 그 버전의 내용을 절대 수정하면 안 된다. 만약 수정 사항이 생기면 메이저 버전, 마이너 버전, 패치 버전 중 하나를 의미에 맞게 올려서 새로운 버전으로 배포해야 한다.

 

 

 

* 다양한 문자

-  ^ : 마이너 버전까지만 설치하거나 업데이트한다.

- npm i express@^ 1.1.1이라면 1.1.1 이상부터 2.0.0 미만 버전까지 설치된다.

 

- ~ : 패치 버전까지만 설치하거나 업데이트한다.

-  npm i express@~1.1.1이라면 1.1.1 이상부터 1.2.0 미만 버전까지 설치된다.

 

- >, <, > =, < =, =은 알기 쉽게 초과, 미만, 이상, 이하, 동일을 뜻한다.

 

- @latest도 사용하는데, 안정된 최신 버전의 패키지를 설치한다.

 

- @next를 사용하면 가장 최근 배포판을 사용할 수 있다.

-> @latest와 다른 점은 안정되지 않은 알파나 베타 버전의 패키지를 설치할 수 있다는 것이다. 
*/











/*
 

5.4 기타 npm 명령어

 

1.  npm update [패키지 이름] : 업데이트한다.

- Current와 Wanted가 다른 경우 사용한다.

 

2. npm uninstall [패키지 이름] : 해당 패키지를 제거하는 명령어이다.

- 패키지가 node_modules 폴더와 package.json에서 사라진다.

 

3. npm search [검색어] : npm의 패키지를 검색한다. 

 

4. npm info [패키지 이름] : 패키지의 세부 정보를 파악하고자 할 때 사용하는 명령어이다.

- package.json의 내용과 의존 관계, 설치 가능한 버전 정보 등이 표시된다.

 

5. npm login : npm 로그인을 위한 명령어이다.
*/





/*



5.5 패키지 배포하기

 

1. npm 웹 사이트(https://www.npmjs.com) 우측 상단의 Sign Up을 눌러 회원 가입을 한다.

2. 회원 가입 confirm 메일을 확인한다.

3. 콘솔에서 npm login 명령어를 입력해 생성한 계정으로 로그인한다. 보안이 강화돼서 가입 시 입력했던 이메일로 OTP 코드가 발송된다. OTP 코드도 입력해야 로그인된다.

 

4. 패키지로 만들 코드 작성한다.

- package.json의 main 부분의 파일명과 일치해야한다. ( npm에서 이 파일이 패키지의 진입점임을 알 수 있기 때문이다.)

module.exports = () => {
  return 'hello package';
};
 

- 에러 발생 시에는 npm의 패키지 이름이 겹치는 것이므로 패키지 이름을 바꿔서 배포해야한다. 

 

$ npm publish
// notice 생략
+ npmtest-1234@0.0.1
$ npm info npmtest-1234
npmtest-1234@0.0.1 | ISC | deps: none | versions: 1
hello package.json
// 중략
maintainers:
- zerocho <zerohch0@gmail.com>

dist-tags:
latest: 0.0.1

published 51 seconds ago by zerocho <zerohch0@gmail.com>
 

- 배포 명령어를 입력하고,  배포한 패키지가 npm에 제대로 등록되었는지 확인한다.

 

$ npm publish
// notice 생략
npm ERR! code E403
npm ERR! 403 403 Forbidden - PUT https://registry.npmjs.org/npmtest-1234 - You cannot publish over the previously published versions: 0.0.1.
 

- 이 에러 메시지가 보인다면 이미 출시한 버전이라는 뜻이다. 

 

$ npm version patch
v0.0.2
$ npm publish
// notice 생략
+ npmtest-1234@0.0.2
 

- 버전을 올리기 위해 npm version 명령어를 사용한다.

 

 

* 배포한 패키지 삭제

- 삭제 명령어는 npm unpublish [패키지 이름] --force

 

$ npm unpublish npmtest-1234 --force
npm WARN using --force Recommended protections disabled.
- npmtest-1234
$ npm info npmtest-1234
npm ERR! code E404
npm ERR! 404 Unpublished on 2022-04-17T08:51:10.506Z
...
 

- 확인 후  404 에러가 발생한다면 지워진 것이다.

*/

