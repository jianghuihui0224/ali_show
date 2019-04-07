const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');
const db = require('../db.js');
const moment = require('moment');


//监听路由
//显示栏目列表页 --- admin/cate/cate.html
router.get('/admin/cate/cate', (req, res) => {
    res.render(path.join(currentPath, 'view', 'admin/cate/cate.html'));
});

//获取栏目列表数据
router.get('/admin/cate/getCate', (req, res) => {
    //1. 编写SQL语句
    const sql = 'select * from ali_cate';

    //2. 执行SQL语句
    //result是一个对象组成的数组
    db.query(sql, (err, result) => {
        //3. 处理SQL执行结果 --- 将执行结果返回给前端(cate.html)
        if (err) {
            console.log(err);
            return res.send({code:201, message:"查询栏目列表信息失败"});
        }
        res.send({code:200, message:"查询栏目列表信息成功", list: result});
    })
});

//显示添加新栏目页面 --- admin/cate/addcate.html
router.get('/admin/cate/addcate', (req, res) => {
    res.render(path.join(currentPath, 'view', 'admin/cate/addcate.html'));
});

//添加新栏目处理
router.post('/admin/cate/addCateDeal', (req, res) => {
    //1. 接收数据 -- 表单提交的栏目名和栏目图标
    const data = {
        cate_name: req.body.name,
        cate_icon: req.body.icon,
        cate_addtime: moment().format('YYYY-MM-DD')
    }

    //2. 编写SQL语句
    const sql = 'insert into ali_cate set ?';

    //3. 执行SQL语句
    db.query(sql, data, (err, result) => {
        //4. 处理SQL执行结果 --- 结果返回给前端
        if (err) {
            console.log(err);
            return res.send({code:201, message:"添加新栏目失败"});
        }

        res.send({code:200, message:"添加新栏目成功"});
    })
});

//删除栏目
router.post('/admin/cate/delcate', (req, res) => {
    //1. 接收数据 --- cate_id
    const id = req.body.id;

    //2. 编写SQL语句
    const sql = 'delete from ali_cate where cate_id=?';

    //3. 执行SQl语句
    db.query(sql, id, (err, result) => {
        //4. 处理SQL执行结果 --- 将成功/失败返回给前端
        if (err || result.affectedRows != 1) {
            console.log(err);
            return res.send({code:201, message:"删除栏目失败"});
        }

        res.send({code:200, message:"删除栏目成功"});
    })
});

//显示栏目编辑页
router.get('/admin/cate/editcate', (req, res) => {
    //1. 接收数据 --- cate_id
    //get方式的传参（?id=1&name=zs）,使用 req.query.id、req.query.name
    const id = req.query.id;

    //2. 编写SQL语句
    const sql = 'select * from ali_cate where cate_id=?';

    //3. 执行SQL语句
    // result = [{cate_id:, cate_name:"", cate_icon:"", cate_addtime:""}];
    db.query(sql, id, (err, result) => {
        //4. 将查询结果显示到编辑页面上 (admin/cate/editcate.html)
        //参数1: 模板文件路径
        //参数2: 要渲染到模板页上的数据 --- js/json
        res.render(path.join(currentPath, 'view', 'admin/cate/editcate.html'), result[0]);
    })
});

//修改栏目信息
router.post('/admin/cate/modifycate', (req, res) => {
    //1. 接收数据
    const data = {
        cate_name: req.body.name,
        cate_icon: req.body.icon
    }
    const id = req.body.id;
    //2. 编写SQL
    const sql = 'update ali_cate set ? where cate_id=?';
    //3. 执行SQl语句
    db.query(sql, [data, id], (err, result) => {
        //4. 处理SQL执行结果
        if (err || result.affectedRows != 1) {
            console.log(err);
            return res.send({code:201, message:"修改栏目失败"});
        }
        res.send({code:200, message:"修改栏目成功"});
    })
});

//用户登录界面
router.post('/admin/checkLogin', (req, res) => {
    const admin_email = req.body.email
    const admin_pwd = req.body.password
    //console.log(admin_email, admin_pwd)
    const sql = 'select * from ali_admin where admin_email=? and admin_pwd=?'
    db.query(sql, [admin_email, admin_pwd], (err, result) => {
        // console.log(err,result);
        if (err || result == false) {//因为是查询语句,座椅不能用affectedRows判断,需要用length属性或者结果为空的时候
            return res.send({code: 201, message: "登录用户信息不正确"})
        }
        res.send({code: 200, message: "登录用户信息正确"})
    })

});

//退出界面
router.post('/admin/layouts/layout', (req, res) => {
    console.log(req.body)
});


//导出路由模块
module.exports = router;