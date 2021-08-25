"use strict";

/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-08 20:18:51
 * @LastEditTime: 2021-08-25 22:34:57
 * @LastEditors: Please set LastEditors
 * @Description: 首页微博
 * @FilePath: /nodejs/koa2-weibo-code/src/controller/blog-home.js
 */
var xss = require('xss');

var _require = require('../model/ResModel.js'),
    SuccessModel = _require.SuccessModel,
    ErrorModel = _require.ErrorModel;

var _require2 = require('../services/blog.js'),
    createBlog = _require2.createBlog;

var _require3 = require('../model/ErrorInfo.js'),
    createBlogFailInfo = _require3.createBlogFailInfo;
/**
 * 创建微博
 * @param {Object} param0 userId：用户ID，content：微博内容，image：图片
 */


function create(_ref) {
  var userId, content, image, blog;
  return regeneratorRuntime.async(function create$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userId = _ref.userId, content = _ref.content, image = _ref.image;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(createBlog({
            userId: userId,
            content: xss(content),
            image: image
          }));

        case 4:
          blog = _context.sent;
          return _context.abrupt("return", new SuccessModel(blog));

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", new ErrorModel(createBlogFailInfo));

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
}

module.exports = {
  create: create
};