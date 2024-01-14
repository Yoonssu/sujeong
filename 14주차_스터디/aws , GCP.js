//git --version으로 버전확인

//1. 서버 실행하기 전에 Lightsail에서는 기본적으로 비트나미 아파치 서버가 켜져있으므로 아파차 서버 종료

// cd /opt/bitnami
// sudo ./ctlscript.sh stop apache


//2. env 파일 생성 후  vi .env
// npx sequelize db:create --env production

// sudo nppm start



//GCP
//sudo su : 루트 계정으로 변경

//아래 순서대로 진행
// cd node-deploy

// sudo npm i

// npx sequelize db:create --env production

// sudo npm start