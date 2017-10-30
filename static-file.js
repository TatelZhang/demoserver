const config = require('./common.conf');
const path = require('path');
const mime = require ('mime');
const fs = require('mz/fs');

function readStaticFile(req_static){
    let staticFile = req_static || '/static';

    return async (ctx, next)=>{
        let req_path = ctx.request.path;
        if(req_path.startsWith(staticFile)){
            let realFilePath = path.join(config.static, req_path);
            if(await fs.exists(realFilePath)){
                ctx.response.type = mime.getType(realFilePath);
                ctx.response.body = await fs.readFile(realFilePath);
            }else{
                ctx.response.status = 404;
                console.log(`请求文件不存在的~: ${realFilePath}`);
            }
        }else{
            await next();
        }
    }
}

module.exports = readStaticFile;