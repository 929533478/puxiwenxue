const express = require('express')
const pool = require('../pool.js');
var router = express.Router();
router.post('/login',(req,res)=>{
  var obj = req.body;
  //验证用户名和密码是否为空
  var $uname = obj.uname;
  if(!$uname){
    res.send({code: 401, msg: 'uname required'});
	return;
  }
  var $upwd = obj.upwd;
  if(!$upwd){
    res.send({code: 402, msg: 'upwd required'});
	return;
  }
  //查询数据库中是否含有这条记录
  //同时满足用户名为$uname和密码$upwd
  var sql='SELECT * FROM px_user WHERE uname=? AND upwd=?';
  pool.query(sql,[$uname,$upwd],(err,result)=>{
    if(err) throw err;
	//result 返回结果是数组
	//如果数组的长度大于0，说明找到满足条件的记录
    //否则数组的长度等于0，说明没有找到满足条件的记录
  
    if(result.length>0){
	  res.send({code: 200, msg: result[0].uname});
	}else{
      res.send({code: 301, msg: 'uname or upwd error'});
      
	}
  });
});
module.exports = router;