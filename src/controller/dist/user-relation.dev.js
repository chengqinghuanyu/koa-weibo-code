"use strict";

/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-23 19:59:06
 * @LastEditTime: 2021-08-23 21:28:09
 * @LastEditors: Please set LastEditors
 * @Description: 用户关系
 * @FilePath: /nodejs/koa2-weibo-code/src/controller/user-relation.js
 */
var _require = require('../model/ResModel.js'),
    SuccessModel = _require.SuccessModel;

var _require2 = require('../services/user-relation.js'),
    getUsersByFollower = _require2.getUsersByFollower;
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

module.exports = {
  getFans: getFans
};