var koa = require('koa');

var app = new koa();


app.use(async (ctx, next)=>{
    ctx.cookies.set("usern")
})