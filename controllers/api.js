var api = async (ctx, next)=>{
    ctx.response.body = {"hello":"json"};
}

var login = async(ctx, next)=>{
    var 
        username = ctx.request.body.username,
        passwd = ctx.request.body.passwd,
        usernameByCookie = ctx.cookies.get('username');
    if((username==="tatel"&&passwd === '123456')|| (usernameByCookie===username&&username==='tatel')){
        ctx.response.status = 200;
        ctx.response.body = { text: `hello, ${username}`, username: usernameByCookie};
        if(usernameByCookie)ctx.cookies.set('username', 'tatel');
    }else{
        ctx.response.status = 404;
        ctx.response.body = `用户名 ${username} 不存在，或密码错误`;
    }
}


module.exports = {
    "GET /api": api,
    "POST /api/login": login
}