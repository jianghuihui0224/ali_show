//1. 加载 express 模块
const express = require('express');

//2. 创建服务器
const app = express();

//3. 启动服务器
app.listen(3000, () => {
    console.log('Alishow-Server running at http://127.0.0.1:3000');
})

global.currentPath = __dirname;

//托管静态资源
app.use('/assets', express.static('./view/assets'));
app.use('/uploads', express.static('./view/uploads'));
app.use('/upload', express.static('./upload'));//管理员头像路径的修改

//配置模板引擎
app.engine('html', require('express-art-template'));

//加载body-parser模块，再注册为中间件
const bp = require('body-parser');
app.use(bp.urlencoded({extended:false}));

//因为首页不需要进行用户是否登录判断,所以需要放在session中间件前面
const router_font = require('./routers/router_font.js');
app.use(router_font);

//加载express-session模块,注册为中间件
//注册该中间件之后， req对象才有了 session子对象
const session = require('express-session');
app.use(session({
    secret: 'daACACAdcscdscS',
    resave: false,
    saveUninitialized: false
}));
//将检测session的中间件函数进行注册
app.use(checkSession);

const fs = require('fs');
const path = require('path');
fs.readdir(path.join(__dirname, 'routers'), (err, result) => {
    if (err) {
        return console.log(err);
    }

    //读取成功，循环将这些模块加载，再注册成中间件,只能用let声明i,否则会覆盖
    for (let i = 0; i < result.length; i++) {
        let router = require(path.join(__dirname, 'routers', result[i]));
        app.use(router);
    }
})
// //加载路由模块(栏目列表路由)，在注册为中间件
//改良版为上部分代码
// const router_cate = require('./routers/router_cate.js');
// app.use(router_cate);

// const router_login = require('./routers/router_login.js');
// app.use(router_login);

// const router_center = require('./routers/router_center.js');
// app.use(router_center);

// const router_user = require('./routers/router_user.js');
// app.use(router_user);

// const router_post = require('./routers/router_post.js')
// app.use(router_post);

// const router_pic= require('./routers/router_pic.js')
// app.use(router_pic);

//将 api.js 注册为中间件
const api = require('./routers/api.js');
app.use(api);

function checkSession (req, res, next) {
    // /admin/login
    // /admin/checkLogin
    // /admin/cate/cate

    //当路由既不是 /admin/login 又不是 /admin/checkLogin 时，检测session
    //如果是 /admin/login 或者 /admin/checkLogin，直接next
    if (req.url != '/admin/login' && req.url != '/admin/checkLogin') {
        //判断isLogin是否为true
        if (req.session.isLogin != true) {
            //不等于true时说明没有登录，跳转回登录页 （/admin/login）
            return res.redirect('/admin/login');
        }
    }
    
    next();
}