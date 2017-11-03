// 引入koa
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
// 创建koa实例
const app = new Koa();
// 引入路由
var router = require('./controller.js');
// 处理静态文件
var readStaticFiles = require('./static-file');
// 处理模板文件
var templating = require('./templateloader');

var some = require ('./test/testFile.js');


app.use(bodyParser());
app.use(logger());

app.use(templating('/dist/', {noCache: true}));

app.use(readStaticFiles()); // 处理静态文件请求中间件



// app.use(some('/views/index.html'));


app.use(router());

// app.use(async (ctx, next)=>{
//     // console.log(ctx.request);
//     ctx.response.status = 404;
//     ctx.response.body = "不存在的";
// });



console.log("server start at http://localhost:10086");
app.listen(10086);