/*
 * @Author: your name
 * @Date: 2021-07-18 18:02:42
 * @LastEditTime: 2021-07-18 19:33:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nodejs/koa2-weibo-code/src/routes/views/user.js
 */
const router = require('koa-router')();
router.get('/register', async (ctx, next) => {
    await ctx.render('register', {
        title: '用户注册'
    });
});
router.get('/login', async (ctx, next) => {
    await ctx.render('login', {
        title: '用户登陆'
    });
});
module.exports = router;