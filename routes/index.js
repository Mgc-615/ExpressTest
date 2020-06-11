/*
 * @Author: your name
 * @Date: 2020-06-08 09:24:46
 * @LastEditTime: 2020-06-11 18:28:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \express\myTest\routes\index.js
 */ 
var express = require('express');
var router = express.Router();

var user =  require("./users")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("服务已启动");
});
 router.use("/user",user)
module.exports = router;
