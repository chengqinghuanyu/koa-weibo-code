"use strict";

/*
 * @Author: your name
 * @Date: 2021-08-22 11:55:29
 * @LastEditTime: 2021-08-22 11:56:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nodejs/koa2-weibo-code/test/square.test.js
 */
var server = require('../server.js'); //cookie：COOKIE是从浏览器里面登陆的用户拿过来的，每次测试需要更新一下


var _require = require('../testUserInfo.js'),
    COOKIE = _require.COOKIE,
    USER_NAME = _require.USER_NAME;

test('广场页加载应该成功', function _callee() {
  var res, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(server.get("/api/square/load-more/".concat(USER_NAME, "/0")).set("cookie", COOKIE));

        case 2:
          res = _context.sent;
          expect(res.body.errno).toBe(0);
          data = res.body.data;
          expect(data).toHaveProperty('isEmpty');
          expect(data).toHaveProperty('blogList');
          expect(data).toHaveProperty('pageSize');
          expect(data).toHaveProperty('pageIndex');
          expect(data).toHaveProperty('count');

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
});