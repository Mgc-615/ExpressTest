/*
 * @Author: your name
 * @Date: 2020-06-08 09:24:46
 * @LastEditTime: 2020-06-11 18:27:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \express\myTest\app.js
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var ejs = require('ejs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//token校验
const expressJWT = require('express-jwt')
let { PRIVATE_KEY } = require('./public/javascripts/store')

require('./db/db');
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.engine('html',ejs.__express);
// app.set('view engine', 'html');

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//TOkEN 校验
app.use(expressJWT({
  　　secret: PRIVATE_KEY
  }).unless({
  　　path: ['/user/create','/user/login'] //⽩白名单,除了了这⾥里里写的地址，其他的URL都需要验证
  }));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  if(err.name==="UnauthorizedError"){
    console.log("err.name",err.message )
    const errorMsg = {
      "jwt expired":"token已过期!",
      "invalid signature":"token验证失败！",
      "No authorization token was found":"请携带token！"
    }
    res.status(401).send({status:"error",msg:errorMsg[err.message]})
  }
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
