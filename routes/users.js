/*
 * @Author: your name
 * @Date: 2020-06-08 09:24:46
 * @LastEditTime: 2020-06-11 09:42:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \express\myTest\routes\users.js
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //引入对象
var URL = require('url'); //引入URL中间件，获取req中的参数需要

// jwt生成token
var { PRIVATE_KEY, EXPIRESD } = require("../public/javascripts/store")
const jwt = require("jsonwebtoken");

//接口

//创建用户
router.post('/create', function (req, res) {
  var UserModel = mongoose.model('user');//引入模型
  console.log('req.body', req.body);
  UserModel.findOne({ 'user_name': req.body.userName }, 'user_name', function (err, obj) {
    if (err) return err;
    // Prints "Space Ghost is a talk show host".
    if (obj) {
      res.send({ status: "error", msg: "内容已存在！" })
    } else {
      new UserModel({ //实例化对象，新建数据
        user_name: req.body.userName,
        user_password: req.body.userPassword,
        created: Date.now()
      }).save(function (err, todo, count) { //保存数据
        res.send({ "status": "ok" }); //返回首页
      });
    }
  });

});
//登录
router.post('/login', function (req, res) {
  var UserModel = mongoose.model('user');//引入模型
  console.log('req.body', req.body);
  UserModel.findOne({ 'user_name': req.body.userName, 'user_password': req.body.userPassword }, 'user_name user_password', function (err, obj) {
    if (err) return err;
    // Prints "Space Ghost is a talk show host".
    if (obj) {
      let userName = obj.user_name
      let token = jwt.sign({ userName }, PRIVATE_KEY, { expiresIn: EXPIRESD})
      var LoginLogModel = mongoose.model('loginLog');//引入模型
      new LoginLogModel({ //实例化对象，新建数据
        user_name: userName,
        user_id: obj._id,
        login_date: Date.now()
      }).save(function (err, todo, count) { //保存数据
        if (err) return err
        res.send({ "status": "ok", "msg": "登录成功","token":token }); //返回首页
      });
    } else {
      res.send({ "status": "error", "msg": "用户不存在或密码错误！" })
    }
  });
});
router.post('/search', function (req, res, next) {
  console.log("req.user",req.user)
  // let flag =(new Date().getTime() -req.user.iat)<EXPIRESD;
  // console.log("flag",flag,Number(new Date().getTime()) -req.user.iat,EXPIRESD)
  // flag?"":res.send({status:"error",msg:"token已过期!"})
  var UserModel = mongoose.model('user');//引入模型
  UserModel.
    find().
    sort('created').
    exec(function (err, aa, count) {
      if (!err) {
        res.send({ "status": "ok", "data": aa, "count": count });
      } else {
        res.send(err)
      }
    });
});
router.post('/deleteOne', function (req, res, next) {
  var UserModel = mongoose.model('user');//引入模型
  UserModel.
    findById(req.body.id, function (err, content) {
      if (err) {
        console.error(err);
      } else {
        content.remove(function (err, content1) {
          if (err) {
            console.error(err);
          } else {
            console.log(content1);//content1是内存中的数据，如果误删了数据库中的数据，可以用这个找回来
            res.send({ status: "删除成功！" })
          }
        });
      }
    });
});
router.post('/updateOne', function (req, res, next) {
  var UserModel = mongoose.model('user');//引入模型
  UserModel.
    findById(req.body.id, function (err, obj) {
      if (err) {
        console.error(err);
      } else {
        obj.content = req.body.content
        obj.save(function (err, obj1) {
          if (err) {
            console.error(err);
          } else {
            console.log(obj1);//content1是内存中的数据，如果误删了数据库中的数据，可以用这个找回来
            res.send({ status: "修改成功！" })
          }
        });
      }
    });
});
module.exports = router;
