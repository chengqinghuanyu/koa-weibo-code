/*
 * @Author: your name
 * @Date: 2021-07-15 21:03:11
 * @LastEditTime: 2021-07-18 09:22:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo-code/src/routes/users.js
 */
const router = require('koa-router')();
router.prefix('/users');
router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!';
});
router.get('/bar', function (ctx, next) {
  //debugger
  ctx.body = 'this is a users/bar response';
});

router.post('/login', function (ctx, next) {
  //ctx.body被占用只能用ctx.request.body
  const {
    userName,
    passWord
  } = ctx.request.body;
  ctx.body = {
    tag: 200,
    userName,
    passWord
  };
});

module.exports = router;