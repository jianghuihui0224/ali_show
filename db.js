//数据库操作模块

//1. 加载 mysql 模块
const mysql = require('mysql');

//2. 创建mysql链接对象
const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'ali-show'
})

//3. 链接mysql服务器
conn.connect();

//4. 导出conn对象
module.exports = conn;