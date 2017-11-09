const db = require("./db");

var User = db.defineModel('users', {
    username: db.STRING(100),
    password: db.STRING(100),
    gender: db.BOOLEAN,
    avatar: db.STRING(100),
    phoneNum: db.STRING(11),
})

// 查询用户
var getUser = async (name) => {
    var res = await User.findAll({
        where: {
            username: name
        }
    });
    // if(res){
    //     var {username, avatar, gender} = res[0];
    //     return { username, avatar, gender }
    // }else{
    //     // console.log(res);
    //     return false
    // }
    try {
        var { username, avatar, gender } = res[0];
        return { username, avatar, gender }
    } catch (error) {
        // console.log("eeeeeeee");
        // console.log(error);
        return false
    }
}

// 创建用户
var createUser = async (options) => {
    if (!await getUser(options.username)) {
        try {
            await User.create(options);
            return true;
        } catch (error) {
            // console.log('something error');
            // console.log(error);
            return false;
        }

    } else {
        return false;
    }
}

var validateUser = async (name, password)=>{
    var res = await User.findAll({
        where: {
            username: name,
            password: password
        }
    });
    if (res[0]){  // (res[0].username === name)&&(res[0].password ===password)
        // console.log(res);
        return true;
    }else{
        return false;
    }
}


module.exports = {

    sync() {
        User.sync({ force: true });
    },
    createUser, // 返回 true or false
    getUser,    // 返回 false 或 account
    validateUser,   // 返回 true or false
}