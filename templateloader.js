const nunjucks = require('nunjucks');
const config = require('./common.conf');
const path = require('path');

function createEnv(dir, opts){
    var 
        autoescape = opts.autoescape === undefined ? true: opts.autoescape
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(dir,{   // dir 为模板文件所在位置
                noCache: noCache,
                watch: watch,
            }),{
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });

        if(opts.filters){
            for(var f in opts.filters){
                env.addFilter(f, opts.filters[f]);
            }
        }
    return env;
}



// var env = createEnv(__dirname + "/views",{
//     watch: true,
//     noCache: true,
//     filters: function(n){
//         return '0x' + n.toString(16);
//     }
// })


// var s = env.render('hello.html', {hello: 'whwahhdwhawd'});
// console.log(s);

function templating(dir, opts){
    var absolutePath = path.join(config.path, dir); // 转换成绝对路径;
    var env = createEnv(absolutePath, Object.assign({watch:true, noCache:false, filters: function(n){return '0x' + n.toString(16);}},opts||{}));

    return async (ctx, next)=>{
        ctx.render = function(tpl, models){
            ctx.response.body = env.render(tpl, Object.assign({},ctx.state || {}, models||{}));
            ctx.response.type = 'text/html';
        };
        await next();
    };
}


module.exports = templating;