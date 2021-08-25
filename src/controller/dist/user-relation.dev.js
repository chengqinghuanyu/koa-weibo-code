"use strict";

/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-23 19:59:06
 * @LastEditTime: 2021-08-25 22:30:12
 * @LastEditors: Please set LastEditors
 * @Description: 用户关系
 * @FilePath: /nodejs/koa2-weibo-code/src/controller/user-relation.js
 */
var _require = require('../model/ResModel.js'),
    SuccessModel = _require.SuccessModel,
    ErrorModel = _require.ErrorModel;

var _require2 = require('../services/user-relation.js'),
    getUsersByFollower = _require2.getUsersByFollower,
    getFollowerByUser = _require2.getFollowerByUser,
    addFollower = _require2.addFollower,
    deleteFollower = _require2.deleteFollower;

var _require3 = require('../model/ErrorInfo.js'),
    addFollowerFailInfo = _require3.addFollowerFailInfo,
    deleteFollowFailInfo = _require3.deleteFollowFailInfo;
/**
 * 根据用户ID返回粉丝
 * @param {number} userId 用户ID
 */


function getFans(userId) {
  var _ref, count, userList;

  return regeneratorRuntime.async(function getFans$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getUsersByFollower(userId));

        case 2:
          _ref = _context.sent;
          count = _ref.count;
          userList = _ref.userList;
          return _context.abrupt("return", new SuccessModel({
            count: count,
            userList: userList
          }));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}
/**
 * 获取关注人
 * @param {number} userId 关注人ID
 */


function getFollowers(userId) {
  var _ref2, count, userList;

  return regeneratorRuntime.async(function getFollowers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getFollowerByUser(userId));

        case 2:
          _ref2 = _context2.sent;
          count = _ref2.count;
          userList = _ref2.userList;
          return _context2.abrupt("return", new SuccessModel({
            count: count,
            followersList: userList
          }));

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}
/**
 * 微博关注
 * @param {number} myUserId 关注ID
 * @param {number} curUserId 被关注ID
 */


function follow(myUserId, curUserId) {
  return regeneratorRuntime.async(function follow$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(addFollower(myUserId, curUserId));

        case 3:
          return _context3.abrupt("return", new SuccessModel());

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", new ErrorModel(addFollowerFailInfo));

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6]]);
}
/**
 * 取消关注
 * @param {number} myUserId 当前用ID
 * @param {number} curUserId 关注者ID
 * @returns 
 */


function unFollow(curUserId, myUserId) {
  var result;
  return regeneratorRuntime.async(function unFollow$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(deleteFollower(curUserId, myUserId));

        case 2:
          result = _context4.sent;

          if (!result) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", new SuccessModel());

        case 5:
          return _context4.abrupt("return", new ErrorModel(deleteFollowFailInfo));

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}

module.exports = {
  getFans: getFans,
  follow: follow,
  unFollow: unFollow,
  getFollowers: getFollowers
};