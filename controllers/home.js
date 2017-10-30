var home =  async (ctx, next)=>{
            ctx.render('index.html')
        };

var hello = async (ctx, next)=>{
    ctx.response.body = ctx.params.name;
}

var post = async (ctx, next)=>{
    ctx.response.body = "post Succed~";
}


module.exports = {
    "GET /": home,
    "GET /hello/:name": hello,
    "POST /post": post
}