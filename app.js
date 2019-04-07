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

//加载路由模块(栏目列表路由)，在注册为中间件
const router_font = require('./routers/router_font.js');
app.use(router_font);
const router_cate = require('./routers/router_cate.js');
app.use(router_cate);
const router_login = require('./routers/router_login.js');
app.use(router_login);
const router_center = require('./routers/router_center.js');
app.use(router_center);

//加载路由模块(用户列表路由)，在注册为中间件
const router_user = require('./routers/router_user.js');
app.use(router_user);