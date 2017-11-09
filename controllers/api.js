// 引入用户模型
const User = require('../models/User');

var api = async (ctx, next)=>{
    ctx.response.body = {"hello":"json"};
}

var login = async(ctx, next)=>{
    var 
        username = ctx.request.body.username,
        passwd = ctx.request.body.passwd,
        usernameByCookie = ctx.cookies.get('username'),
        account = {};
        if(usernameByCookie){
            account = await User.getUser(usernameByCookie);
            if(account){
                ctx.status = 200;
                account.isLogin = true;
                ctx.body = {account};
            }else{
                ctx.status = 404;
                ctx.body = {account: {isLogin: false}, errorText: `用户名${usernameByCookie}异常`};
            }
        }else if(await User.validateUser(username, passwd)){
            ctx.status = 200;
            // 设置cookie
            var expiresdate = new Date()
            expiresdate.setDate(new Date().getDate() + 1);
            ctx.cookies.set('username', username,{
                expires: expiresdate
            });
            // 返回用户信息
            account = await User.getUser(username);
            account.isLogin = true;
            ctx.body = {account};
        }else{
            ctx.status = 404;
            ctx.response.body = { account: { isLogin: false }, errorText: `用户名${username}不存在, 或密码错误` };
        }

        // if(usernameByCookie==="tatel"){ // cookie登录
        //     ctx.status = 200;
        //     var account = await User.getUser()
        //     ctx.body = { account: { username: usernameByCookie, avatar: '/static/doge.png', isLogin: true},};
        // }else if (await User.validateUser(username, passwd)){ // 用户名密码登录
        //     ctx.status = 200;
        //     var expiresdate = new Date();
        //     expiresdate.setDate(new Date().getDate() + 1);
        //     ctx.cookies.set("username", username, {
        //         expires: expiresdate
        //     });
        //     ctx.body = { account: { username: username, avatar: '/static/doge.png', isLogin: true}};
        // }else{
        //     ctx.status = 404;
        //     ctx.response.body = { account: {isLogin:false}, errorText: `用户名${username}不存在, 或密码错误`};
        // }
}

var loginOut = async(ctx, next)=>{
    var usernameByCookie = ctx.cookies.get("username");
    ctx.cookies.set('username', '', {expires: new Date(0)});
    ctx.status = 200;
    ctx.response.body = { account: { isLogin: false }};
}

var getUser = async (ctx, next)=>{
    var username = ctx.params.username;
    console.log(username);
    ctx.body = await User.getUser(username);
}

var regist = async (ctx, next)=>{
    var username = ctx.request.body.username,
    passwd = ctx.request.body.passwd,
    phoneNum = ctx.request.body.phoneNum;
    
    var res = await User.createUser({
        username,
        password: passwd,
        phoneNum,
        avatar: '/static/doge.png',
        gender: true,
    });
    console.log(res);
    if(res){
        var account = await User.getUser(username);
        account.isLogin = true;
        ctx.body = account;
        ctx.cookies.set('username', username);
    }else{
        ctx.status = 404;
    }
    // avatar = '/static/doge.png',
}
module.exports = {
    "GET /api": api,
    "POST /api/login": login,
    "GET /api/login": loginOut,
    "GET /api/user/:username": getUser,
    "POST /api/regist": regist
}