"use strict";

/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-22 11:08:04
 * @LastEditTime: 2021-08-22 11:10:12
 * @LastEditors: Please set LastEditors
 * @Description: 广场页面加载更多
 * @FilePath: /nodejs/koa2-weibo-code/src/routes/api/blog-square.js
 */
var router = require('koa-router')();

;

var _require = require('../../middleWares/loginChecks.js'),
    loginCheck = _require.loginCheck;

var _require2 = require('../../controller/blog-square.js'),
    getSquareBlogList = _require2.getSquareBlogList;

var _require3 = require('../../utils/blogs.js'),
    getBlogListStr = _require3.getBlogListStr;

router.prefix('/api/square');
router.get('/load-more/:userName/:pageIndex', loginCheck, function _callee(ctx, next) {
  var pageIndex, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          pageIndex = ctx.params.pageIndex;
          pageIndex = parseInt(pageIndex);
          console.log('当前页面：', pageIndex);
          _context.next = 5;
          return regeneratorRuntime.awrap(getSquareBlogList({
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