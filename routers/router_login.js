const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');
const db = require('../db.js');
const moment = require('moment');


//监听路由
//显示后台登录页 --- admin/login.html
router.get('/admin/login', (req, res) => {
    res.render(path.join(currentPath, 'view', 'admin/login.html'));
});

//用户登录界面
router.post('/admin/checkLogin', (req, res) => {
    const admin_email = req.body.email
    const admin_pwd = req.body.password
    //console.log(admin_email, admin_pwd)
    const sql = 'select * from ali_admin where admin_email=? and admin_pwd=?'
    db.query(sql, [admin_email, admin_pwd], (err, result) => {
        // console.log(err,result);
        if (err || result == false) {//因为是查询语句,所以不能用affectedRows判断,需要用length属性或者结果为空的时候
            return res.send({code: 201, message: "登录用户信息不正确"})
        }
        //登录成功,将用户信息保存到session中
        req.session.isLogin = true;
        req.session.userInfo = result[0];

        res.send({code: 200, message: "登录用户信息正确"})
    })

});

//退出登录
router.post('/admin/logout', (req, res) => {
    //回调函数中的参数是错误对象
    //如果清除session失败，则err是一个错误对象
    //如果清除session成功，则err是null
    req.session.destroy(function (err) {
        if (err) {
            //退出失败
            return res.send({code:201, message:"退出失败"});
        }

        res.send({code:200, message:"退出成功"});
    })
})

//显示后台首页  --- admin/index.html
router.get('/admin/index', (req, res) => {
    res.render(path.join(currentPath, 'view', 'admin/index.html'));
});


//导出路由模块
module.exports = router;