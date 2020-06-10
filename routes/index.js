/*
 * @Author: your name
 * @Date: 2020-06-08 09:24:46
 * @LastEditTime: 2020-06-10 10:11:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \express\myTest\routes\index.js
 */ 
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("服务已启动");
});

module.exports = router;
