const path = require('path')

var configs = {
    path: __dirname,    // 配置项目绝对路径
    views: path.join(__dirname, 'views'),
    static: path.join(__dirname, '/dist'),
    sql: {
        datbase: 'koaserver',
        username: 'root',
        password: '1234',
        host: 'localhost',
        port: 3306,
        dialect: 'mysql'
    },
}





module.exports = configs