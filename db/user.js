/*
 * @Author: your name
 * @Date: 2020-06-10 10:24:43
 * @LastEditTime: 2020-06-10 13:29:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \express\myTest\db\user.js
 */
var mongoose = require("mongoose"); //引入mongoose
mongoose.connect('mongodb://localhost/testdb'); //连接到mongoDB的todo数据库
//该地址格式：mongodb://[username:password@]host:port/database[?options]
//默认port为27017 

var db = mongoose.connection;
db.on('error', function callback() { //监听是否有异常
    console.log("Connection error");
});
db.once('open', function callback() { //监听一次打开
    //在这里创建你的模式和模型
    console.log('connected!');
});

var ListSchema = new mongoose.Schema({
    user_id: String, //定义一个属性user_id，类型为String
    user_name: String,
    user_password: String,
    created: Date, //定义一个属性updated_at，类型为Date
});

var LoginLogSchema = new mongoose.Schema({
    user_id: String, //定义一个属性user_id，类型为String
    user_name: String,
    login_date: Date, //定义一个属性updated_at，类型为Date
});

// mongoose.model('user', ListSchema); //将该Schema发布为Model,user就是集合名称

module.exports = { User: mongoose.model('user', ListSchema), LoginLog:mongoose.model('loginLog', LoginLogSchema)};