"use strict";

/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-23 20:01:33
 * @LastEditTime: 2021-08-23 21:28:40
 * @LastEditors: Please set LastEditors
 * @Description: 用户关系服务表
 * @FilePath: /nodejs/koa2-weibo-code/src/services/user-relation.js
 */
var _require = require('../db/model/index.js'),
    User = _require.User,
    UserRelation = _require.UserRelation;

var _require2 = require('./_format.js'),
    formatUser = _require2.formatUser;
/**
 * 获取关注该用户的用户列表
 * @param {number} followerId 被关注人ID
 */


function getUsersByFollower(followerId) {
  var result, userList;
  return regeneratorRuntime.async(function getUsersByFollower$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!followerId) {
            _context.next = 9;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(User.findAndCountAll({
            attributes: ['id', 'userName', 'nickName', 'picture'],
            order: [['id', 'desc']],
            include: [{
              model: UserRelation,
              where: {
                followerId: followerId
              }
            }]
          }));

        case 3:
          result = _context.sent;
          //result.count,result.row;
          userList = result.row.map(function (row) {
            return row.dataValues;
          }); //格式化

          userList = formatUser(userList);
          return _context.abrupt("return", {
            count: result.count,
            userList: userList
          });

        case 9:
          return _context.abrupt("return", {
            count: 0,
            userList: []
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  getUsersByFollower: getUsersByFollower
};