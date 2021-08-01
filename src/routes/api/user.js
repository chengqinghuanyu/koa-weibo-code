/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-15 21:03:11
 * @LastEditTime: 2021-08-01 12:35:04
 * @LastEditors: Please set LastEditors
 * @Description: 用户API
 * @FilePath: /koa2-weibo-code/src/routes/users.js
 */
const router = require('koa-router')();
const {
  isExist,
  register,
  login
} = require('../../controller/user.js');

const userValidate = require('../../validator/user.js');

const {
  genValidator
} = require('../../middleWares/validator.js');
router.prefix('/api/users');
router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!';
});
router.post('/registry', genValidator(userValidate), async (ctx, next) => {
  const {
    userName,
    password,
    gender
  } = ctx.request.body;
  console.log('registry', ctx.request.body);
  ctx.body = await register({
    userName,
    password,
    gender
  });

  //调用register控制器

});

router.post('/isExist', async (ctx, next) => {
  const {
    userName
  } = ctx.request.body;
  console.log('输出接口最后结果------：', ctx.request.body);
  ctx.body = await isExist(userName);

  console.log('输出接口最后结果：', ctx.body);
});

router.post('/login', async function (ctx, next) {
  //ctx.body被占用只能用ctx.request.body
  const {
    userName,
    password
  } = ctx.request.body;
  //校验controller
  console.log('登陆输入信息', ctx.request.body);
  ctx.body = await login(ctx, userName, password);
});
module.exports = router;