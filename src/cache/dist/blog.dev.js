"use strict";

/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-22 11:15:04
 * @LastEditTime: 2021-08-22 11:57:32
 * @LastEditors: Please set LastEditors
 * @Description: 微博缓存
 * @FilePath: /nodejs/koa2-weibo-code/src/cache/blog.js
 */
var _require = require('./_redis.js'),
    get = _require.get,
    set = _require.set;

var _require2 = require('../services/blog.js'),
    getBlogListByUser = _require2.getBlogListByUser; //redis-key前缀


var KEY_PREFIX = 'weibo:square:';
/**
 * 缓存分页
 * @param {number} pageIndex 页数
 * @param {number} pageSize 每页数量
 */

function getSquareCatchList(_ref) {
  var pageIndex, pageSize, key, catchResult, result;
  return regeneratorRuntime.async(function getSquareCatchList$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          pageIndex = _ref.pageIndex, pageSize = _ref.pageSize;
          key = "".concat(KEY_PREFIX).concat(pageIndex, "_").concat(pageSize); //尝试获取缓存

          console.log('缓存：1111');
          _context.next = 5;
          return regeneratorRuntime.awrap(get(key));

        case 5:
          catchResult = _context.sent;
          console.log('我的缓存：', catchResult);

          if (!(catchResult != null)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", catchResult);

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(getBlogListByUser({
            pageIndex: pageIndex,
            pageSize: pageSize
          }));

        case 11:
          result = _context.sent;
          console.log('输出catch的查询结果：', result); //设置缓存，值，过期时间1min

          set(key, result, 60);
          return _context.abrupt("return", result);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  getSquareCatchList: getSquareCatchList
};