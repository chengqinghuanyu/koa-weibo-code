/*
import { session } from 'express-session';
 * @Author: 尹鹏孝
 * @Date: 2021-08-08 09:51:46
 * @LastEditTime: 2021-08-22 11:03:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nodejs/koa2-weibo-code/src/routes/views/blog.js
 */
const router = require('koa-router')();
const {
    loginRedirect
} = require('../../middleWares/loginChecks.js');
const {
    getProfileBlogList
} = require('../../controller/blog-profile.js');
const {
    getSquareBlogList
} = require('../../controller/blog-square.js');
const moment = require('moment');
//首页
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {});
});
//个人首页
router.get('/profile', loginRedirect, async (ctx, next) => {
    const {
        userName
    } = ctx.session.userInfo;
    ctx.redirect('/profile/' + userName);
});
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    const {
        userName: currentUser
    } = ctx.params;
    const result = await getProfileBlogList(currentUser, 0);
    const {
        isEmpty,
        blogList,
        pageSize,
        pageIndex,
        count
    } = result.data;
    //获取第一页数据 

    blogList.forEach(item => {
        item.createdAt = moment(item.createdAt).format('YYYY-MM-DD h:mm:ss a');
        item.updatedAt = moment(item.updatedAt).format('YYYY-MM-DD h:mm:ss a');
    });

    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count,
            userName: currentUser
        }
    });

});
//微博广场
router.get('/square', loginRedirect, async (ctx, next) => {

    const result = await getSquareBlogList(0);
    const {
        isEmpty,
        blogList,
        pageSize,
        pageIndex,
        count
    } = result.data;
    //获取第一页数据 
    blogList.forEach(item => {
        item.createdAt = moment(item.createdAt).format('YYYY-MM-DD h:mm:ss a');
        item.updatedAt = moment(item.updatedAt).format('YYYY-MM-DD h:mm:ss a');
    });
    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    });

});

module.exports = router;