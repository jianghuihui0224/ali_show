const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');
const db = require('../db.js');
const moment = require('moment');

//显示轮播图管理页 --- admin/other/slides.html
router.get('/admin/other/slides', (req, res) => {
    res.render(path.join(currentPath, 'view', '/admin/other/slides.html'));
});

//显示导航页
router.get('/admin/other/nav-menus', (req, res) => {
    res.render(path.join(currentPath, 'view', '/admin/other/nav-menus.html'));
});

//显示网站设置页
router.get('/admin/other/settings', (req, res) => {
    res.render(path.join(currentPath, 'view', '/admin/other/settings.html'));
});


//导出路由模块
module.exports = router;