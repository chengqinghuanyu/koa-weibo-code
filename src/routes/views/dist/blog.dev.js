"use strict";

/*
import { session } from 'express-session';
 * @Author: 尹鹏孝
 * @Date: 2021-08-08 09:51:46
 * @LastEditTime: 2021-08-23 21:20:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nodejs/koa2-weibo-code/src/routes/views/blog.js
 */
var router = require('koa-router')();

var _require = require('../../controller/user-relation.js'),
    getFans = _require.getFans;

var _require2 = require('../../middleWares/loginChecks.js'),
    loginRedirect = _require2.loginRedirect;

var _require3 = require('../../controller/blog-profile.js'),
    getProfileBlogList = _require3.getProfileBlogList;

var _require4 = require('../../controller/blog-square.js'),
    getSquareBlogList = _require4.getSquareBlogList;

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
  var currentUser, result, _result$data, isEmpty, blogList, pageSize, pageIndex, count, fansResult, _fansResult$data, fansCount, fansList;

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
          }); //获取粉丝

          _context3.next = 8;
          return regeneratorRuntime.awrap(getFans(currentUser.id));

        case 8:
          fansResult = _context3.sent;
          _fansResult$data = fansResult.data, fansCount = _fansResult$data.count, fansList = _fansResult$data.userList;
          console.log('输出：：：：fansCount', fansResult.data);
          console.log(fansList);
          _context3.next = 14;
          return regeneratorRuntime.awrap(ctx.render('profile', {
            blogData: {
              isEmpty: isEmpty,
              blogList: blogList,
              pageSize: pageSize,
              pageIndex: pageIndex,
              count: count,
              userName: currentUser
            },
            userData: {
              userInfo: currentUser,
              isMe: '',
              fansData: {
                count: fansCount,
                list: fansList
              }
            }
          }));

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //微博广场

router.get('/square', loginRedirect, function _callee4(ctx, next) {
  var result, _result$data2, isEmpty, blogList, pageSize, pageIndex, count;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(getSquareBlogList(0));

        case 2:
          result = _context4.sent;
          _result$data2 = result.data, isEmpty = _result$data2.isEmpty, blogList = _result$data2.blogList, pageSize = _result$data2.pageSize, pageIndex = _result$data2.pageIndex, count = _result$data2.count; //获取第一页数据 

          blogList.forEach(function (item) {
            item.createdAt = moment(item.createdAt).format('YYYY-MM-DD h:mm:ss a');
            item.updatedAt = moment(item.updatedAt).format('YYYY-MM-DD h:mm:ss a');
          });
          _context4.next = 7;
          return regeneratorRuntime.awrap(ctx.render('square', {
            blogData: {
              isEmpty: isEmpty,
              blogList: blogList,
              pageSize: pageSize,
              pageIndex: pageIndex,
              count: count
            }
          }));

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
});
module.exports = router;