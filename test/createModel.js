const mysql = require('mysql2');
const sql = require('../common.conf').sql;
const connection = mysql.createConnection({
    host: sql.host,
    user: sql.username,
    password: sql.password,
    database: sql.datbase
});
connection.execute(`create table pets (
    id varchar(50) not null,
    name varchar(100) not null,
    gender bool not null,
    birth varchar(10) not null,
    createdAt bigint not null,
    updatedAt bigint not null,
    version bigint not null,
    primary key (id)
)`,['Page', 45], (err, res)=>{
    if(err)console.log(err)
    console.log(res);
    // console.log(fields);
})
