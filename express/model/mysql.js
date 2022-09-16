const mysql = require('mysql');
module.exports = {
    config: {
        host: 'localhost',
        port: '3306',
        user: 'express',
        password: '123456',
        database: 'express'
    },
    // 连接数据库，使用mysql的连接池连接方式
    sqlConnect: function (sql, sqlArr, callBack) {
        var pool = mysql.createPool(this.config);
        pool.getConnection((err, conn) => {
            if (err) {
                console.log('连接失败');
                return;
            }
            conn.query(sql, sqlArr, callBack);
            conn.release();
        })
    }
}