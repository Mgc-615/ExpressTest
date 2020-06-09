var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //引入对象
var URL = require('url'); //引入URL中间件，获取req中的参数需要
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("服务已启动");
});

router.post('/create', function (req, res) {
  var TodoModel = mongoose.model('userList');//引入模型
  console.log('req.body', req.body);
  TodoModel.findOne({ 'content': req.body.content }, 'content', function (err, obj) {
    if (err) return err;
    // Prints "Space Ghost is a talk show host".
    console.log('%s %s is a %s.', err, "---", obj);
    if (obj) {
      res.send({ status: "error", msg: "内容已存在！" })
    } else {
      new TodoModel({ //实例化对象，新建数据
        content: req.body.content,
        updated_at: Date.now()
      }).save(function (err, todo, count) { //保存数据
        console.log('内容', todo, '数量', count); //打印保存的数据
        res.send({ "status": "ok" }); //返回首页
      });
    }
  });

});

router.post('/search', function (req, res, next) {
  var TodoModel = mongoose.model('userList');//引入模型
  TodoModel.
    find().
    sort('updated_at').
    exec(function (err, aa, count) {
      if (!err) {
        res.send({ "status": "ok", "data": aa, "count": count });
      } else {
        res.send(err)
      }
    });
});
router.post('/deleteOne', function (req, res, next) {
  req.body.id
  var TodoModel = mongoose.model('userList');//引入模型
  TodoModel.
    findById(req.body.id ,function (err, content) {
      if (err) {
        console.error(err);
      } else {
        content.remove(function (err, content1) {
          if(err){
              console.error(err);
          }else{
              console.log(content1);//content1是内存中的数据，如果误删了数据库中的数据，可以用这个找回来
              res.send({status:"删除成功！"})
          }
        });
      }
    });
});
router.post('/updateOne', function (req, res, next) {
  var TodoModel = mongoose.model('userList');//引入模型
  TodoModel.
    findById(req.body.id ,function (err, obj) {
      if (err) {
        console.error(err);
      } else {
        obj.content=req.body.content
        obj.save(function (err, obj1) {
          if(err){
              console.error(err);
          }else{
              console.log(obj1);//content1是内存中的数据，如果误删了数据库中的数据，可以用这个找回来
              res.send({status:"修改成功！"})
          }
        });
      }
    });
});

module.exports = router;
