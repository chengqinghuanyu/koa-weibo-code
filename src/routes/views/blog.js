/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-08 09:51:46
 * @LastEditTime: 2021-08-08 10:01:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nodejs/koa2-weibo-code/src/routes/views/blog.js
 */
const router = require('koa-router')();
const {
    loginRedirect
} = require('../../middleWares/loginChecks.js');
//首页
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {});
});
module.exports = router;