"use strict";

/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-18 20:27:39
 * @LastEditTime: 2021-08-24 21:52:21
 * @LastEditors: Please set LastEditors
 * @Description: 用户的服务逻辑 user service
 * @FilePath: /nodejs/koa2-weibo-code/src/services/user.js
 */
var _require = require('../db/model/index'),
    User = _require.User;

var _require2 = require('../services/_format.js'),
    formatUser = _require2.formatUser;
/**
 * 获取用户信息
 * @param {string} userName 用户名 
 * @param {string} password 密码
 */


function getUserInfo(userName, password) {
  var whereOpt, result, formatRes;
  return regeneratorRuntime.async(function getUserInfo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //查询条件
          whereOpt = {
            userName: userName
          };

          if (password) {
            Object.assign(whereOpt, {
              password: password
            });
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
            where: whereOpt
          }));

        case 4:
          result = _context.sent;

          if (result) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", result);

        case 7:
          //格式化
          formatRes = formatUser(result.dataValues);
          return _context.abrupt("return", formatRes);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}
/**
 * 创建用户--数层是按增删改查来命名
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别
 * @param {string} nickName 昵称
 */


function createUser(_ref) {
  var userName, password, _ref$gender, gender, _ref$nickName, nickName, user;

  return regeneratorRuntime.async(function createUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userName = _ref.userName, password = _ref.password, _ref$gender = _ref.gender, gender = _ref$gender === void 0 ? 3 : _ref$gender, _ref$nickName = _ref.nickName, nickName = _ref$nickName === void 0 ? userName : _ref$nickName;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.create({
            userName: userName,
            password: password,
            gender: gender,
            nickName: nickName ? nickName : userName
          }));

        case 3:
          user = _context2.sent;
          return _context2.abrupt("return", user.dataValues);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}
/**
 * 删除用户
 * @param {string} userName 用户名
 */


function deleteUser(userName) {
  var result;
  return regeneratorRuntime.async(function deleteUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.destroy({
            where: {
              userName: userName
            }
          }));

        case 2:
          result = _context3.sent;
          return _context3.abrupt("return", result > 0);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}
/**
 * 修改用户信息
 * @param {
     Object
 }
 param0 要修改的内容newPassword：新密码, newNickname：新昵称, newCity：新城市, newPicture：新的头像
 * @param {
     object
 }
 param1 userName：原始用户名, password：原始密码
 */


function updateUser(_ref2, _ref3) {
  var newPassword, newNickname, newCity, newPicture, userName, password, updateData, whereData, result;
  return regeneratorRuntime.async(function updateUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          newPassword = _ref2.newPassword, newNickname = _ref2.newNickname, newCity = _ref2.newCity, newPicture = _ref2.newPicture;
          userName = _ref3.userName, password = _ref3.password;
          //拼接内容
          updateData = {};

          if (newPassword) {
            updateData.password = newPassword;
          }

          if (newNickname) {
            updateData.nickName = newNickname;
          }

          if (newPicture) {
            updateData.picture = newPicture;
          }

          if (newCity) {
            updateData.city = newCity;
          } //拼接查询条件


          whereData = {
            userName: userName
          };

          if (password) {
            whereData.password = password;
          } //执行修改
          //console.log('查询', whereData);
          //console.log('更新', updateData);


          _context4.next = 11;
          return regeneratorRuntime.awrap(User.update(updateData, {
            'where': whereData
          }));

        case 11:
          result = _context4.sent;
          return _context4.abrupt("return", result[0] > 0);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  });
}

module.exports = {
  getUserInfo: getUserInfo,
  createUser: createUser,
  deleteUser: deleteUser,
  updateUser: updateUser
};