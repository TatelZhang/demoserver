const conf = require('./common.conf');
const fs = require('fs')
const path = require('path')


function getJsFileList(filePath){
    var absoluteDirName = path.join(conf.path, filePath);
    var fileList = fs.readdirSync(absoluteDirName); // 获取目录下文件名
    fileList = fileList.filter((el)=> el.endsWith('.js'));  // 获取js文件名
    fileList = fileList.map((el)=>path.join(absoluteDirName, el));  // 放回绝对路径
    return fileList;
    
}


function addRouter(router, fileName){
    var jsFileList = getJsFileList(fileName);
    jsFileList.forEach((el)=>{
        var x = require(el);
        for(var req in x){
            if(req.startsWith("GET")){
                router.get(req.slice(4), x[req]);
            }else if(req.startsWith('POST')){
                router.post(req.slice(5), x[req]);
            }else{
                console.log(`invalid URL ${req}`);
            }
        }
    })
}


module.exports = function(dir){
    let fileName = dir || '/controllers/';
    var router = require('koa-router')()

    addRouter(router, fileName);
    return router.routes();
}
    