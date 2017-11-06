var api = async (ctx, next)=>{
    ctx.response.body = {"hello":"json"};
}

var login = async(ctx, next)=>{
    var 
        username = ctx.request.body.username,
        passwd = ctx.request.body.passwd,
        usernameByCookie = ctx.cookies.get('username');
        if(usernameByCookie==="tatel"){ // cookie登录
            ctx.status = 200;
            ctx.body = { account: { username: usernameByCookie, avatar: '/static/doge.png', isLogin: true},};
        }else if (username === "tatel" && passwd === '123456'){ // 用户名密码登录
            ctx.status = 200;
            var expiresdate = new Date();
            expiresdate.setDate(new Date().getDate() + 1);
            ctx.cookies.set("username", username, {
                expires: expiresdate
            });
            ctx.body = { account: { username: username, avatar: '/static/doge.png', isLogin: true}};
        }else{
            ctx.status = 404;
            ctx.response.body = { account: {isLogin:false}, errorText: `用户名${username}不存在, 或密码错误`};
        }
}

var loginOut = async(ctx, next)=>{
    var usernameByCookie = ctx.cookies.get("username");
    ctx.cookies.set('username', '', {expires: new Date(0)});
    ctx.status = 200;
    ctx.response.body = { account: { isLogin: false }};
}

module.exports = {
    "GET /api": api,
    "POST /api/login": login,
    "GET /api/login": loginOut
}