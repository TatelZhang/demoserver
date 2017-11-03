const fs = require('mz/fs');
const config = require('../common.conf')

var home = async (ctx, next)=>{
    ctx.response.status = 200;
    console.log(ctx.req)
    ctx.response.body = '<h1> hello</h1>';
    // ctx.cookies.set("username", "tatel",{
    // })
    // var us = ctx.cookies.get('username');
    // console.log(us);
    // console.log(ctx.cookies);
    // console.log(typeof ctx.cookies);
    // ctx.render('index.html');
};

var hello = async (ctx, next)=>{
    ctx.response.body = ctx.params.name;
}

var post = async (ctx, next)=>{
    ctx.response.body = "post succed~";
}

var fav = async (ctx, next)=>{
    ctx.body = '';
}

module.exports = {
    "GET /": home,
    "GET /hello/:name": hello,
    "POST /post": post,
    "GET /favicon.ico" : fav
}