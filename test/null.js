const User = require("../models/User");


User.sync();
// User.createUser({
//     username: 'tatel',
//     password: '123456',
//     gender: true,
//     avatar: '/static/doge.png'
// });

/** 
var us = User.getUser('tate');
us.then((res)=>{
    console.log(res);
}).catch(err=>{
    console.log("error~", err);
})
*/
/**
 * 

var a = async ()=>{
    var us = await User.createUser({
        username: 'tao',
        password:'123456',
        gender: true,
        avatar: '/static/doge.png'
    });
    console.log(us);
}
a();
*/

// (async ()=>{
//     var res = await User.validateUser('tatel', '123s456');
//     console.log(res);
// })()