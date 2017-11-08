const db = require("./db");

module.exports = db.defineModel('users', {
    username: db.STRING(100),
    password: db.STRING(100),
    gender: db.BOOLEAN,
    avatar: db.STRING(100),
})
// db.sync();