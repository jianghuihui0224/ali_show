const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');
const db = require('../db.js');
const moment = require('moment');


//显示管理员列表页 --- admin/user/users.html
router.get('/admin/center/profile', (req, res) => {
    res.render(path.join(currentPath, 'view', 'admin/center/profile.html'),req.session.userInfo);
});


//导出路由模块
module.exports = router;