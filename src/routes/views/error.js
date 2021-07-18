/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-18 08:23:04
 * @LastEditTime: 2021-07-18 09:14:58
 * @LastEditors: Please set LastEditors
 * @Description: error 404路由
 * @FilePath: /nodejs/koa2-weibo-code/src/routes/views/error.js
 */
const router = require('koa-router')();
//error
router.get('/error', async (ctx, next) => {
    await ctx.render('error');
});
//404
router.get('*', async (ctx, next) => {
    await ctx.render('404');
});
module.exports = router;