"use strict";

/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-08 20:21:22
 * @LastEditTime: 2021-08-22 10:06:34
 * @LastEditors: Please set LastEditors
 * @Description: 微博 service
 * @FilePath: /nodejs/koa2-weibo-code/src/services/blog.js
 */
var _require = require('../db/model/Blog.js'),
    Blog = _require.Blog;

var _require2 = require('../db/model/User.js'),
    User = _require2.User;

var _require3 = require('./_format.js'),
    formatUser = _require3.formatUser;
/**
 * 创建微博
 * @param {Object} param0 创建微博 { userId:用户ID,content:微博内容,image:图片}
 */


function createBlog(_ref) {
  var userId, content, image, result;
  return regeneratorRuntime.async(function createBlog$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userId = _ref.userId, content = _ref.content, image = _ref.image;
          _context.next = 3;
          return regeneratorRuntime.awrap(Blog.create({
            userId: userId,
            content: content,
            image: image
          }));

        case 3:
          result = _context.sent;
          return _context.abrupt("return", result.dataValues);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}
/**
 * 根据参数查询微博数据
 * @param {
     object
 }
 param0 {
     userName,
     pageIndex,
     pageSize
 }
 */


function getBlogListByUser(_ref2) {
  var userName, _ref2$pageIndex, pageIndex, pageSize, userWhereOptions, result, blogList;

  return regeneratorRuntime.async(function getBlogListByUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userName = _ref2.userName, _ref2$pageIndex = _ref2.pageIndex, pageIndex = _ref2$pageIndex === void 0 ? 0 : _ref2$pageIndex, pageSize = _ref2.pageSize;
          //拼接查询条件
          userWhereOptions = {};

          if (userName) {
            userWhereOptions.userName = userName;
          } //执行查询


          console.log(pageSize);
          console.log(pageSize);
          _context2.next = 7;
          return regeneratorRuntime.awrap(Blog.findAndCountAll({
            limit: pageSize,
            //每页条数
            offset: pageSize * pageIndex,
            //跳过调试
            order: [['id', 'desc']],
            include: [{
              model: User,
              attributes: ['userName', 'picture', 'nickName'],
              where: userWhereOptions
            }]
          }));

        case 7:
          result = _context2.sent;
          //分页总数，result.row,result.count
          blogList = result.rows.map(function (row) {
            return row.dataValues;
          });
          blogList.map(function (blogItem) {
            var user = blogItem.user.dataValues;
            blogItem.user = formatUser(user);
            return blogItem;
          });
          return _context2.abrupt("return", {
            count: result.count,
            blogList: blogList
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
}

module.exports = {
  createBlog: createBlog,
  getBlogListByUser: getBlogListByUser
};