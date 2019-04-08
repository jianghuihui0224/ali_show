const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');
const db = require('../db.js');
const moment = require('moment');

//显示前台首页 --- index.html
router.get('/index', (req, res) => {
    res.render(path.join(currentPath, 'view', 'index.html'));
});

//显示前台列表页
router.get('/list', (req, res) => {
    res.render(path.join(currentPath, 'view', 'list.html'));
});

//显示前台文章详情页
router.get('/detail', (req, res) => {
    res.render(path.join(currentPath, 'view', 'detail.html'));
});

module.exports= router;