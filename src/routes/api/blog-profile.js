/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-21 15:30:14
 * @LastEditTime: 2021-08-22 10:05:22
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

module.exports = router;