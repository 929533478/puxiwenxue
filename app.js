//引入项目所需的包
const express = require('express');
const bodyParser = require('body-parser');

//引入路由
const user = require('./routes/user.js');
const cors = require('cors');//加载跨域模块

//1.使用express构建web服务器
var app = express();
app.listen(3000,()=>{
  console.log("创建成功")
});

app.use(cors({
  origin:["http://127.0.0.1:3000","*","http://127.0.0.1:3000"],
  //设置可以跨域的地址
  credentials:true//标准的跨域请求是不会发送cookie等用户认证凭据的。所以，当你再次访问远程api的时候，cookie是不会被带上的，于是乎，服务器理所当然地认为你还没有登录。MDN上的简单介绍 credentials 。用XMLHttpRequest请求的时候，我们需要设置属性credentials:true
}))

//2.托管静态资源
app.use(express.static('./pubilc'));

//3.配置body-parser
app.use(bodyParser.urlencoded({
  extended: false
}));

//4.使用路由器管理所有用户模块下的路由
// use路由挂载
app.use('/user',user);
//商品路由挂载到 /product下
