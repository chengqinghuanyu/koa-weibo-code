/*
 * @Author: your name
 * @Date: 2021-07-18 18:02:42
 * @LastEditTime: 2021-08-07 18:56:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nodejs/koa2-weibo-code/src/routes/views/user.js
 */
const router = require('koa-router')();
const {
    loginRedirect
} = require('../../middleWares/loginChecks.js');
router.get('/register', async (ctx, next) => {
    await ctx.render('register', {
        title: '用户注册'
    });
});
/**
 * 获取登陆信息
 * @param {Object} ctx koa2 ctx
 */
function getLoginInfo(ctx) {
    let data = {
        //默认未登陆
        isLogin: false
    };
    let userInfo = ctx.session.userInfo;
    if (userInfo) {
        data.isLogin = true;
        data.userName = userInfo.userName;
    }
}
router.get('/login', async (ctx, next) => {
    await ctx.render('login', {
        title: '用户登陆',
        ...getLoginInfo(ctx)
    });
});
router.get('/register', async (ctx, next) => {
    await ctx.render('register', {
        title: '用户注册',
        ...getLoginInfo(ctx)
    });
});
router.get('/setting', loginRedirect, async (ctx, next) => {
    console.log('输出用户信息', ctx.session.userInfo);
    await ctx.render('setting', {
        title: '用户修改信息',
        ...ctx.session.userInfo,
        picture: ctx.session.userInfo.picture ? ctx.session.userInfo.picture : 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=550723927,1346838877&fm=27&gp=0.jpg'
    });
});
module.exports = router;