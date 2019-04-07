const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');
const db = require('../db.js');
const moment = require('moment');


//显示管理员列表页 --- admin/user/users.html
router.get('/admin/user/users', (req, res) => {
    res.render(path.join(currentPath, 'view', 'admin/user/users.html'));
})
// 获取管理员列表数据
router.get('/admin/user/getUsers', (req, res) => {
    //1. 编写SQL语句
    const sql = 'select * from ali_admin';
    //2. 执行SQL语句
    //result是一个对象组成的数组
    db.query(sql, (err, result) => {
        //3. 处理SQL执行结果 --- 将执行结果返回给前端(users.html)
        if (err) {
            console.log(err);
            return res.send({ code: 201, message: "查询管理员信息失败" });
        }
        res.send({ code: 200, message: "查询管理员信息成功", data: result });
    })
});


// 获取添加管理员列表数据
router.get('/admin/user/adduser', (req, res) => {
    res.render(path.join(currentPath, 'view', 'admin/user/adduser.html'));
});
//添加新管理员
router.post('/admin/user/adduserDel', (req, res) => {
    let data = {
        admin_email: req.body.email,
        admin_nickname: req.body.nickname,
        admin_pwd: req.body.password,
        admin_state: req.body.state,
        admin_addtime: moment().format('YYYY-MM-DD')
    };
    const sql = 'insert into ali_admin set ?'
    db.query(sql, data, (err, result) => {
        if (err || result.affectedRows != 1) {
            return res.send({ code: 201, message: '添加管理员失败' })
        }
        res.send({ code: 200, message: '添加管理员成功' })
    });

});


//删除单个管理员
router.get('/admin/user/delUser', (req, res) => {
    const id = req.query.id;
    const sql = 'delete from ali_admin where admin_id=?';
    db.query(sql, id, (err, result) => {
        if (err || result.affectedRows != 1) {
            return res.send({code: 201, message: '删除管理员失败'})
        }
        res.send({code: 200, message: '删除管理员成功'})
    });
});


//批量删除管理员
router.post('/admin/user/delusers', (req, res) => {
    // console.log(123)
    const ids = req.body.ids;  // 1,2,3,5
    //该sql语句不能使用占位符,使用占位符无法完成多个删除操作,需要使用模板引擎来代替占位符
    //in(多个值,用逗号隔开)
    const sql = `delete from ali_admin where admin_id in (${ids})`;
    db.query(sql, (err, result) => {
        if (err) {
            return res.send({ code: 201, message: "批量删除管理员失败" });
        }
        return res.send({ code: 200, message: "批量删除管理员成功" });
    });
});

//获取编辑管理员信息数据,并返回编号对应管理员的其他信息
router.get('/admin/user/edituser', (req, res) => {
    const admin_id = req.query.id;
    let sql = 'select * from ali_admin where admin_id=?'
    //result = [{admin_id:5, admin_email:"lb@ali.com", admin_nickname:"鲁班", ...}];
    db.query(sql, admin_id, (err, result) => {
        // console.log(result[0]);
        res.render(path.join(currentPath, 'view', 'admin/user/edituser.html'), result[0]);
    })
})
//编辑管理员
router.post('/admin/user/updateUser', (req, res) => {
    const data = {
        admin_email: req.body.email,
        admin_nickname: req.body.nickname,
        admin_state: req.body.state
    };
    const admin_id = req.body.id;
    const sql = 'update ali_admin set ? where admin_id=?';
    db.query(sql, [data, admin_id], (err, result) => {
        if (err || result.affectedRows != 1 ) {
            return res.send({code: 201, message: "修改管理员信息失败"})
        }
        res.send({code: 200, message: "修改管理员信息成功"})
    })
})


//导出路由模块
module.exports = router;