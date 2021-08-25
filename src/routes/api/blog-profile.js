/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-21 15:30:14
 * @LastEditTime: 2021-08-25 22:37:05
 * @LastEditors: Please set LastEditors
 * @Description: 个人主页API路由
 * @FilePath: /nodejs/koa2-weibo-code/src/routes/api/blog-profile.js
 */
const router = require('koa-router')();;
const {
    loginCheck
} = require('../../middleWares/loginChecks.js');
const {
    getProfileBlogList
} = require('../../controller/blog-profile.js');
const {
    getBlogListStr
} = require('../../utils/blogs.js');

const {
    follow,
    unFollow
} = require('../../controller/user-relation.js');
router.prefix('/api/profile');

router.get('/load-more/:userName/:pageIndex', loginCheck, async (ctx, next) => {
    let {
        userName,
        pageIndex
    } = ctx.params;
    pageIndex = parseInt(pageIndex);
    console.log('当前页面：', pageIndex);
    const result = await getProfileBlogList({
        userName,
        pageIndex
    });
    result.data.tpl = getBlogListStr(result.data.blogList);
    ctx.body = result;

});
router.post('/follow', loginCheck, async (ctx, next) => {
    let {
        id: myUserId
    } = ctx.session.userInfo;
    console.log('关注输出：', myUserId);
    let {
        userId: curUserId
    } = ctx.request.body;
    //console.log('被关注输出：', curUserId);
    ctx.body = await follow(myUserId, curUserId);
});
router.post('/unFollow', loginCheck, async (ctx, next) => {
    let {
        id: myUserId
    } = ctx.session.userInfo;
    console.log('关注输出：', myUserId);
    let {
        userId: curUserId
    } = ctx.request.body;
    //console.log('被关注输出：', curUserId);
    ctx.body = await unFollow(myUserId, curUserId);
});
module.exports = router;