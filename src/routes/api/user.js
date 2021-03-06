/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-15 21:03:11
 * @LastEditTime: 2021-08-11 21:23:20
 * @LastEditors: Please set LastEditors
 * @Description: 用户API
 * @FilePath: /koa2-weibo-code/src/routes/users.js
 */
const router = require('koa-router')();

const {
  isExist,
  register,
  login,
  deleteCurrentUser,
  changeInfo,
  changePassword,
  logout
} = require('../../controller/user.js');

const userValidate = require('../../validator/user.js');

const {
  genValidator
} = require('../../middleWares/validator.js');
const {
  isTest
} = require('../../utils/env.js');
const {
  loginCheck
} = require('../../middleWares/loginChecks.js');
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
  //console.log('registry', ctx.request.body);
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
  //console.log('输出接口最后结果------：', ctx.request.body);
  ctx.body = await isExist(userName);

  //console.log('输出接口最后结果：', ctx.body);
});

router.post('/login', async function (ctx, next) {
  //ctx.body被占用只能用ctx.request.body
  const {
    userName,
    password
  } = ctx.request.body;
  //校验controller
  //console.log('登陆输入信息', ctx.request.body);
  console.log(ctx.session);
  ctx.body = await login(ctx, userName, password);
});
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    //测试删除自己
    const {
      userName
    } = ctx.session.userInfo;

    //调用
    ctx.body = await deleteCurrentUser(userName);
  }
});
//修改个人信息
router.patch('/changeInfo', genValidator(userValidate), async (ctx, next) => {
  const {
    nickName,
    city,
    picture
  } = ctx.request.body;
  //controller
  // console.log('nickName', nickName);
  // console.log('city', city);
  // console.log('picture', picture);
  ctx.body = await changeInfo(ctx, {
    nickName,
    city,
    picture
  });
});
/**
 * 修改密码
 * 
 */
router.patch('/changePassword', genValidator(userValidate), async (ctx, next) => {
  const {
    newPassword,
    password
  } = ctx.request.body;
  const
    userName = ctx.session.userInfo ? ctx.session.userInfo.userName : "";
  //controller;
  const result = await changePassword({
    userName,
    password,
    newPassword,
  });
  ctx.body = result;

});

router.post('/logout', loginCheck, async (ctx, next) => {
  //controller;
  ctx.body = await logout(ctx);
});
module.exports = router;