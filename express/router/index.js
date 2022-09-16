const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const mysql = require('../model/mysql');
router.get('/getTable', (req, res) => {
    let sql = 'select * from users';
    let sqlArr = [];
    let callBack = (err, data) => {
        if (err) {
            // console.log('查看失败');
            res.send({
                'code': 0,
                'data': data,
                'msg': 'error',
            })
        } else {
            res.send({
                'code': 200,
                'data': data,
                'msg': 'success',
            })
        }
    }
    mysql.sqlConnect(sql, sqlArr, callBack);
})
router.post('/addTable', jsonParser, (req, res) => {
    let sql = 'insert into users (name,age,email,mobile) values (?,?,?,?)';
    let sqlArr = [req.body.name, req.body.age, req.body.email, req.body.mobile];
    let callBack = (err, data) => {
        if (err) {
            console.log('添加失败');
            res.send({
                'code': 0,
                'msg': '添加失败',
            })
        } else {
            res.send({
                'code': 200,
                'msg': '添加成功',
            })
        }
    }
    mysql.sqlConnect(sql, sqlArr, callBack);
})
router.delete('/delete',(req, res) => {
    let sql = 'delete from users where id=?';
    let sqlArr = [req.query.id];
    let callBack = (err, data) => {
        if (err) {
            console.log('删除失败');
        } else {
            res.send({
                'code': 200,
                'msg': '删除成功',
            })
        }
    }
    mysql.sqlConnect(sql, sqlArr, callBack);
})
// 模糊查询数据
router.get('/search', (req, res) => {
    let sql = 'select * from users where name like ?';
    let sqlArr = ['%' + req.query.name + '%'];
    let callBack = (err, data) => {
        if (err) {
            console.log('查看失败');
            res.send({
                'code': 0,
                'data': data,
                'msg': 'error',
            })
        } else {
            res.send({
                'code': 200,
                'data': data,
                'msg': 'success',
            })
        }
    }
    mysql.sqlConnect(sql, sqlArr, callBack);
})
// 编辑用户信息
router.put('/compile', jsonParser, (req, res) => {
    let sql = 'update users set name=?,age=?,email=?,mobile=? where id=?';
    let sqlArr = [req.body.name, req.body.age, req.body.email, req.body.mobile, req.body.id];
    let callBack = (err, data) => {
        if (err) {
            console.log('编辑失败');
        } else {
            res.send({
                'code': 200,
                'msg': '编辑成功',
            })
        }
    }
    mysql.sqlConnect(sql, sqlArr, callBack);
})
module.exports = router;