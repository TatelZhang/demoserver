const config = require('../common.conf')
const fs = require('fs');

// var data = fs.readFileSync(config.path+'/test/testFile.js', 'utf8');
// console.log(data);

module.exports = function(dir){
    var data = fs.readFileSync(config.path + dir, 'utf8');
    return async (ctx, next)=>{

        ctx.response.body = data;
        console.log(ctx.request.path);
    }
}