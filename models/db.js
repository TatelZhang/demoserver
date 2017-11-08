const Sequelize = require('sequelize');
const uuid = require('node-uuid');
const sql = require('../common.conf').sql;
console.log('init sequelize..')

var sequelize = new Sequelize(sql.datbase, sql.username, sql.password,{
    host: sql.host,
    dialect: sql.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

function generateId() {
    return uuid.v4();
}
const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes){
    // 配置属性
    var attrs = {};
    // 将attrs[key] 封装成对象{type:'', allowNull: Boolean}
    for(let key in attributes){
        let value = attributes[key];
        if(typeof value === 'object' && value['type']){
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        }else{
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    // 定义默认字段
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true
    };
    attrs.createdAT = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    return sequelize.define(name, attrs,{
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function(obj){
                let now = Date.now();
                if(obj.isNewRecord){
                    if(!obj.id){
                        obj.id = generateId();
                    }
                    obj.createdAT = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                }else{
                    obj.updatedAt = Date.now();
                    obj.version ++;
                }
            }
        }
    });
}

const TYPES = ["STRING", "INTEGER", "BIGINT", "TEXT", "DOUBLE", "DATEONLY", "BOOLEAN", "BLOB"];
var exp = {
    defineModel: defineModel,
    sync: ()=>{
        sequelize.sync({force: true});
    }
}
for(let type of TYPES){
    exp[type] = Sequelize[type];
}
exp.ID = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;