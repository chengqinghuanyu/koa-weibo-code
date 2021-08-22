"use strict";

/*
import { session } from 'express-session';
 * @Author: 尹鹏孝
 * @Date: 2021-08-08 09:51:46
 * @LastEditTime: 2021-08-21 17:14:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nodejs/koa2-weibo-code/src/routes/views/blog.js
 */
var router = require('koa-router')();

var _require = require('../../middleWares/loginChecks.js'),
    loginRedirect = _require.loginRedirect;

var _require2 = require('../../controller/blog-profile.js'),
    getProfileBlogList = _require2.getProfileBlogList;

var moment = require('moment'); //首页


router.get('/', loginRedirect, function _callee(ctx, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(ctx.render('index', {}));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}); //个人首页

router.get('/profile', loginRedirect, function _callee2(ctx, next) {
  var userName;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userName = ctx.session.userInfo.userName;
          ctx.redirect('/profile/' + userName);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get('/profile/:userName', loginRedirect, function _callee3(ctx, next) {
  var currentUser, result, _result$data, isEmpty, blogList, pageSize, pageIndex, count;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          currentUser = ctx.params.userName;
          _context3.next = 3;
          return regeneratorRuntime.awrap(getProfileBlogList(currentUser, 0));

        case 3:
          result = _context3.sent;
          _result$data = result.data, isEmpty = _result$data.isEmpty, blogList = _result$data.blogList, pageSize = _result$data.pageSize, pageIndex = _result$data.pageIndex, count = _result$data.count; //获取第一页数据 

          blogList.forEach(function (item) {
            item.createdAt = moment(item.createdAt).format('YYYY-MM-DD h:mm:ss a');
            item.updatedAt = moment(item.updatedAt).format('YYYY-MM-DD h:mm:ss a');
          });
          _context3.next = 8;
          return regeneratorRuntime.awrap(ctx.render('profile', {
            blogData: {
              isEmpty: isEmpty,
              blogList: blogList,
              pageSize: pageSize,
              pageIndex: pageIndex,
              count: count,
              userName: currentUser
            }
          }));

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;