"use strict";

/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-21 15:30:14
 * @LastEditTime: 2021-08-22 10:05:22
 * @LastEditors: Please set LastEditors
 * @Description: 个人主页API路由
 * @FilePath: /nodejs/koa2-weibo-code/src/routes/api/blog-profile.js
 */
var router = require('koa-router')();

;

var _require = require('../../middleWares/loginChecks.js'),
    loginCheck = _require.loginCheck;

var _require2 = require('../../controller/blog-profile.js'),
    getProfileBlogList = _require2.getProfileBlogList;

var _require3 = require('../../utils/blogs.js'),
    getBlogListStr = _require3.getBlogListStr;

router.prefix('/api/profile');
router.get('/load-more/:userName/:pageIndex', loginCheck, function _callee(ctx, next) {
  var _ctx$params, userName, pageIndex, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ctx$params = ctx.params, userName = _ctx$params.userName, pageIndex = _ctx$params.pageIndex;
          pageIndex = parseInt(pageIndex);
          console.log('当前页面：', pageIndex);
          _context.next = 5;
          return regeneratorRuntime.awrap(getProfileBlogList({
            userName: userName,
            pageIndex: pageIndex
          }));

        case 5:
          result = _context.sent;
          result.data.tpl = getBlogListStr(result.data.blogList);
          ctx.body = result;

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;