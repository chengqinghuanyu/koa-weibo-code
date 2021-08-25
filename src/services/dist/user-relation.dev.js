"use strict";

/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-23 20:01:33
 * @LastEditTime: 2021-08-25 22:37:15
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
          //console.log('输出用户关系：', result);
          userList = result.rows.map(function (row) {
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
/**
 * 获取关注人列表
 * @param {number} userId userid
 */


function getFollowerByUser(userId) {
  var result, userList, count;
  return regeneratorRuntime.async(function getFollowerByUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(UserRelation.findAndCountAll({
            order: [['id', 'desc']],
            include: [{
              model: User,
              attributes: ['id', 'userName', 'nickName', 'picture']
            }],
            where: {
              userId: userId
            }
          }));

        case 2:
          result = _context2.sent;
          //result.rows:列表,result.count:总数;
          userList = result.rows.map(function (row) {
            return row.dataValues;
          });
          userList = userList.map(function (item) {
            var user = item.user;
            user = user.dataValues;
            user = formatUser(user); //console.log(user);

            return user;
          }); //console.log('关注人：', result);

          count = result.count;
          return _context2.abrupt("return", {
            userList: userList,
            count: count
          });

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}
/**
 * 添加关注关系
 * @param {number} userId 用户ID
 * @param {number} followerId 被关注用户ID
 */


function addFollower(userId, followerId) {
  var result;
  return regeneratorRuntime.async(function addFollower$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          result = UserRelation.create({
            userId: userId,
            followerId: followerId
          });
          return _context3.abrupt("return", result.dataValues);

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}
/**
 * 删除关注关系
 * @param {number} userId 
 * @param {number} followerId 
 * @returns 
 */


function deleteFollower(userId, followerId) {
  var result;
  return regeneratorRuntime.async(function deleteFollower$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          result = UserRelation.destroy({
            where: {
              userId: userId,
              followerId: followerId
            }
          });
          return _context4.abrupt("return", result > 0);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
}

module.exports = {
  getUsersByFollower: getUsersByFollower,
  getFollowerByUser: getFollowerByUser,
  addFollower: addFollower,
  deleteFollower: deleteFollower
};