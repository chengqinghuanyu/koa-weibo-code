/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-15 21:03:11
 * @LastEditTime: 2021-07-29 22:12:33
 * @LastEditors: Please set LastEditors
 * @Description: 用户API
 * @FilePath: /koa2-weibo-code/src/routes/users.js
 */
const router = require('koa-router')();
const {
  isExist
} = require('../../controller/user.js');
router.prefix('/api/users');
router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!';
});
router.post('/registry', async (ctx, next) => {

});

router.post('/isExist', async (ctx, next) => {
  const {
    userName
  } = ctx.request.body;
  ctx.body = await isExist(userName);
  console.log('输出接口最后结果：', ctx.body);
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