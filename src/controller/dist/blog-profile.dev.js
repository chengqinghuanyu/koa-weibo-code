"use strict";

/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-21 15:04:35
 * @LastEditTime: 2021-08-25 22:32:21
 * @LastEditors: Please set LastEditors
 * @Description: 个人主页
 * @FilePath: /nodejs/koa2-weibo-code/src/controller/blog-profile.js
 */
var _require = require('../services/blog.js'),
    getBlogListByUser = _require.getBlogListByUser;

var _require2 = require('../conf/constant.js'),
    PAGE_SIZE = _require2.PAGE_SIZE;

var _require3 = require('../model/ResModel.js'),
    SuccessModel = _require3.SuccessModel;
/**
 * 获取个人主页数据
 * @param {string} userName 用户名
 * @param {number} pageIndex 第几页
 */


function getProfileBlogList(_ref) {
  var userName, pageIndex, result, blogList;
  return regeneratorRuntime.async(function getProfileBlogList$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userName = _ref.userName, pageIndex = _ref.pageIndex;

          //service
          if (!pageIndex) {
            pageIndex = 0;
          } //console.log('输出页面：', pageIndex);


          _context.next = 4;
          return regeneratorRuntime.awrap(getBlogListByUser({
            userName: userName,
            pageIndex: pageIndex,
            pageSize: PAGE_SIZE
          }));

        case 4:
          result = _context.sent;
          blogList = result.blogList;
          return _context.abrupt("return", new SuccessModel({
            isEmpty: blogList.length === 0,
            blogList: blogList,
            pageSize: PAGE_SIZE,
            pageIndex: pageIndex,
            count: result.count
          }));

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  getProfileBlogList: getProfileBlogList
};