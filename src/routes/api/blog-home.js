/*
import { session } from 'express-session';
 * @Author: 尹鹏孝
 * @Date: 2021-08-08 20:13:55
 * @LastEditTime: 2021-08-11 21:59:12
 * @LastEditors: Please set LastEditors
 * @Description: 微博首页路由
 * @FilePath: /nodejs/koa2-weibo-code/src/routes/api/blog-home.js
 */
const router = require('koa-router')();
const {
    loginCheck
} = require('../../middleWares/loginChecks.js');
const {
    create
} = require('../../controller/blog-home.js');
router.prefix('/api/blogs');
//创建路由
router.post('/create', loginCheck, async (ctx, next) => {
    const {
        content,
        image
    } = ctx.request.body;
    //console.log('输出请求blog', ctx.request.body);
    //id别名userId
    const {
        id: userId
    } = ctx.session.userInfo;
    //controller；
    console.log('输出ctx:', ctx.session);
    console.log('输出ctx:', ctx.request.body);
    ctx.body = await create({
        userId,
        content,
        image
    });

});
module.exports = router;