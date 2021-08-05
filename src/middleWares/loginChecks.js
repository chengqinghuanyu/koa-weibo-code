/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-05 21:37:17
 * @LastEditTime: 2021-08-05 22:20:42
 * @LastEditors: Please set LastEditors
 * @Description: 登陆验证
 * @FilePath: /nodejs/koa2-weibo-code/src/middleWares/loginChecks.js
 */
const {
    ErrorModel
} = require('../model/ResModel.js');
const {
    loginCheckedFailInfo
} = require('../model/ErrorInfo.js');
/**
 * 页面验证
 * @param {Object} ctx koa2 
 * @param {function} next next 
 */
async function loginCheck(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        await next(ctx);
        return;
    }
    ctx.body = new ErrorModel(loginCheckedFailInfo);
}
/**
 * 登陆跳转
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginRedirect(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        await next(ctx);
        return;
    }
    //未登录
    const url = ctx.url;
    ctx.redirect('/login?url=' + encodeURIComponent(url));
}
module.exports = {
    loginCheck,
    loginRedirect
};