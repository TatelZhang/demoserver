var sql = require('../common.conf').sql;
const Sequelize = require('sequelize');

var sequelize = new Sequelize(sql.datbase,sql.username,sql.password, {
    host: sql.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: '0',
        idle: 30000
    }
});

// console.log(sequelize);
// 定义模型，告诉Sequelize 如何映射数据库表
var Pet = sequelize.define('pet',{ // 传入名称 'pet',默认表名为pets,
    id: {                               //第二个参数指列名和数据类型
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT,
    hobby: Sequelize.STRING(100)
},{
    timestamps: false               // 第三个参数为额外配置
});

Pet.sync({force: true});
/** 
var now = Date.now();
 Pet.create({
     id: 'g-'+ now,
     name: 'hello',
     gender: true,
     birth: '2017-11-08',
     createdAt: now,
     updatedAt: now,
     version: 1.0
    }).then((res)=>{
        console.log('created..' + JSON.stringify(res));
    }).catch((err)=>{
        console.log("fail" + err);
})

// console.log(now);
(async ()=>{
    // var now = Date.now();
    var dog = await Pet.create({
        id: 'g-' + now,
        name: 'doge1s',
        gender: true,
        birth: '2017-11-08',
        createdAt: now,
        updatedAt: now,
        version: 1.0
    });
    // console.log("created: " + JSON.stringify(dog));
    console.log('<------------------------------------------------------>')
    // console.log(dog);
});
var sss = (async ()=>{
    var pets = await Pet.findAll({
        where: {
            name: 'doge1'
        }
    });
    console.log(`find ${pets.length} pets`);
    console.log('<------------------------------------------------------>')
    // console.log(pets);
    // console.log(pets[0].gender);
    pets[0].hobby = 'play Game~'
    var res = await pets[0].save()
    console.log("res", res);
    return 'hello'
})();

sss.then((res)=>{
    console.log(res);
})
*/