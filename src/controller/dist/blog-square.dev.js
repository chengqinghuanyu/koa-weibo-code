"use strict";

/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-22 11:03:48
 * @LastEditTime: 2021-08-22 11:34:13
 * @LastEditors: Please set LastEditors
 * @Description: 微博广场
 * @FilePath: /nodejs/koa2-weibo-code/src/controller/blog-square.js
 */
var _require = require('../conf/constant.js'),
    PAGE_SIZE = _require.PAGE_SIZE;

var _require2 = require('../model/ResModel.js'),
    SuccessModel = _require2.SuccessModel;

var _require3 = require('../cache/blog.js'),
    getSquareCatchList = _require3.getSquareCatchList;
/**
 * 微博广场列表
 * @param {number} pageIndex 分页页数
 */


function getSquareBlogList(_ref) {
  var _ref$pageIndex, pageIndex, _ref$pageSize, pageSize, result, blogList;

  return regeneratorRuntime.async(function getSquareBlogList$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref$pageIndex = _ref.pageIndex, pageIndex = _ref$pageIndex === void 0 ? 0 : _ref$pageIndex, _ref$pageSize = _ref.pageSize, pageSize = _ref$pageSize === void 0 ? PAGE_SIZE : _ref$pageSize;
          console.log('输出结果222:', pageIndex);
          _context.next = 4;
          return regeneratorRuntime.awrap(getSquareCatchList({
            pageIndex: pageIndex,
            pageSize: pageSize
          }));

        case 4:
          result = _context.sent;
          console.log('输出结果集：', result);
          blogList = result.blogList;
          return _context.abrupt("return", new SuccessModel({
            isEmpty: blogList.length === 0,
            blogList: blogList,
            pageSize: PAGE_SIZE,
            pageIndex: pageIndex,
            count: result.count
          }));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  getSquareBlogList: getSquareBlogList
};