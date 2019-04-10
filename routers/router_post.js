const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');
const db = require('../db.js');
const moment = require('moment');

//显示写文章页面  --- admin/post/addpost.html
router.get('/admin/post/addpost', (req, res) => {
    res.render(path.join(currentPath, 'view', 'admin/post/addpost.html'));
})

//显示文章列表页
router.get('/admin/post/posts', (req, res) => {
    res.render(path.join(currentPath, 'view', 'admin/post/posts.html'));
})


//导出路由模块
module.exports = router;