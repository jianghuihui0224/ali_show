const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');
const db = require('../db.js');
const moment = require('moment');

//显示后台登录页 --- admin/login.html
router.get('/admin/login', (req, res) => {
    res.render(path.join(currentPath, 'view', 'admin/login.html'));
})

//显示后台首页  --- admin/index.html
router.get('/admin/index', (req, res) => {
    res.render(path.join(currentPath, 'view', 'admin/index.html'));
})

module.exports= router;