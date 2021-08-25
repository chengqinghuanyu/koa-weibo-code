"use strict";

/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-08 09:51:46
 * @LastEditTime: 2021-08-25 22:32:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nodejs/koa2-weibo-code/src/routes/views/blog.js
 */
var router = require('koa-router')();

var _require = require('../../controller/user-relation.js'),
    getFans = _require.getFans,
    getFollowers = _require.getFollowers;

var _require2 = require('../../middleWares/loginChecks.js'),
    loginRedirect = _require2.loginRedirect,
    loginCheck = _require2.loginCheck;

var _require3 = require('../../controller/blog-profile.js'),
    getProfileBlogList = _require3.getProfileBlogList;

var _require4 = require('../../controller/blog-square.js'),
    getSquareBlogList = _require4.getSquareBlogList;

var _require5 = require('../../services/user.js'),
    getUserInfo = _require5.getUserInfo;

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
  var currentUser, currUserInfo, userInfo, result, _result$data, isEmpty, blogList, pageSize, pageIndex, count, fansResult, _fansResult$data, fansCount, fansList, followersResult, _followersResult$data, followersList, followersCount, amFollowed;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          currentUser = ctx.params.userName;
          _context3.next = 3;
          return regeneratorRuntime.awrap(getUserInfo(currentUser));

        case 3:
          currUserInfo = _context3.sent;
          //console.log('获取当前用信息：', currUserInfo);
          userInfo = ctx.session.userInfo;
          _context3.next = 7;
          return regeneratorRuntime.awrap(getProfileBlogList(currentUser, 0));

        case 7:
          result = _context3.sent;
          _result$data = result.data, isEmpty = _result$data.isEmpty, blogList = _result$data.blogList, pageSize = _result$data.pageSize, pageIndex = _result$data.pageIndex, count = _result$data.count; //获取第一页数据 

          blogList.forEach(function (item) {
            item.createdAt = moment(item.createdAt).format('YYYY-MM-DD h:mm:ss a');
            item.updatedAt = moment(item.updatedAt).format('YYYY-MM-DD h:mm:ss a');
          }); //获取粉丝

          _context3.next = 12;
          return regeneratorRuntime.awrap(getFans(currUserInfo.id));

        case 12:
          fansResult = _context3.sent;
          _fansResult$data = fansResult.data, fansCount = _fansResult$data.count, fansList = _fansResult$data.userList; //console.log('粉丝列表：', fansList);
          //获取关注人列表

          _context3.next = 16;
          return regeneratorRuntime.awrap(getFollowers(currUserInfo.id));

        case 16:
          followersResult = _context3.sent;
          _followersResult$data = followersResult.data, followersList = _followersResult$data.followersList, followersCount = _followersResult$data.count; //我是否关注了此人

          amFollowed = fansList.some(function (item) {
            return item.userName == userInfo.userName;
          }); // console.log('是否被关注：', amFollowed);
          // console.log('关注人列表：', followersCount);
          // console.log('关注人列表：', followersList);

          _context3.next = 21;
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
              userInfo: currUserInfo,
              isMe: '',
              fansData: {
                count: fansCount,
                list: fansList
              },
              followersData: {
                list: followersList,
                count: followersCount
              },
              amFollowed: amFollowed
            }
          }));

        case 21:
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
          console.log('输出广场列表数据：', blogList);
          _context4.next = 8;
          return regeneratorRuntime.awrap(ctx.render('square', {
            blogData: {
              isEmpty: isEmpty,
              blogList: blogList,
              pageSize: pageSize,
              pageIndex: pageIndex,
              count: count
            }
          }));

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
});
module.exports = router;