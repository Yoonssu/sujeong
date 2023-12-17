
/*9.2 데이터베이스 세팅하기
MySQL과 시퀄라이즈로 데이터베이스 설정*/

//1) 시퀄라이즈 설정하기
// ./models/index.js

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const User = require('./user');
const Hashtag = require('./hashtag');
const Post = require('./post');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Hashtag = Hashtag;
db.Post = Post;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);

module.exports = db;






// ./models/user.js

const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            provider: { 
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'local',
            },
            snsId: { 
                type: Sequelize.STRING(30),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true, 
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true, 
            charset: 'uft8',
            collate: 'utf8_general_ci',
        });
    }

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
    }
}



/*2) 데이터베이스 만들기
config 설정 후 DB 생성하기

// ./config/config.json

{
  "development": {
    "username": "root",
    "password": null,
    "database": "nodebird",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
*/
/*
$ npx sequelize db:create
모델과 서버 연결하기: 콘솔에 아래 로그 찍히면 성공
*/

// ./app.js


const { sequelize } = require('./models');
sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });
