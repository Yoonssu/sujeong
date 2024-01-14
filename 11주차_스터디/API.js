
/*
API: Application Programming Interface의 두문자어로 다른 애플리케이션에서 현재 프로그램의 기능을 사용할 수 있게 허용하는 접점.

웹 API: 다른 웹 서비스의 기능을 사용하거나 자원을 가져올 수 있는 창구.

웹 API 서버: 서버에 API를 올려서 URL을 통해 접근할 수 있게 만든 것.

*/

/*.2 프로젝트 구조 갖추기
1) 패키지 설정*/
// package.json


/*
{
  "name": "nodebird-api",
  "version": "0.0.1",
  "description": "NodeBird API 서버",
  "main": "app.js",
  "scripts": {
    "start": "nodemon app",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "jiy",
  "license": "MIT",
  "dependencies": {
    "bcrypt": "^5.0.0",
    "cookie-parser": "^1.4.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-session": "^1.17.1",
    "morgan": "^1.10.0",
    "mysql2": "^2.1.0",
    "nunjucks": "^3.2.1",
    "passport": "^0.4.1",
    "passport-kakao": "1.0.0",
    "passport-local": "^1.0.0",
    "sequelize": "^5.21.7",
    "uuid": "^7.0.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.3"
  }
}
*/

//2) 도메인 모델 추가
// ./models/domain.js

const Sequelize = require('sequelize');

module.exports = class Domain extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      host: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('free', 'premium'),
       
        allowNull: false,
      },
      clientSecret: { 
        type: Sequelize.UUID, 
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: 'Domain',
      tableName: 'domains',
    });
  }

  static associate(db) {
    db.Domain.belongsTo(db.User);
  }
};


//3) 새로 생성한 도메인 모델을 시퀄라이즈와 연결
// ./models/index.js

const Domain = require('./domain');
db.Domain = Domain;
Domain.init(sequelize);
Domain.associate(db);

// ./models/user.js

/*
static associate(db) {
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.User, {
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow',
        });
        db.User.belongsToMany(db.User, {
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow',
        });
        db.User.hasMany(db.Domain);
    }
}
*/





