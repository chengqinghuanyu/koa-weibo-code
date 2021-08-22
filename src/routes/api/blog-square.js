/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-22 11:08:04
 * @LastEditTime: 2021-08-22 11:10:12
 * @LastEditors: Please set LastEditors
 * @Description: 广场页面加载更多
 * @FilePath: /nodejs/koa2-weibo-code/src/routes/api/blog-square.js
 */
const router = require('koa-router')();;
const {
    loginCheck
} = require('../../middleWares/loginChecks.js');
const {
    getSquareBlogList
} = require('../../controller/blog-square.js');
const {
    getBlogListStr
} = require('../../utils/blogs.js');
router.prefix('/api/square');

router.get('/load-more/:userName/:pageIndex', loginCheck, async (ctx, next) => {
    let {
        pageIndex
    } = ctx.params;
    pageIndex = parseInt(pageIndex);
    console.log('当前页面：', pageIndex);
    const result = await getSquareBlogList({
        pageIndex
    });
    result.data.tpl = getBlogListStr(result.data.blogList);
    ctx.body = result;

});

module.exports = router;