"use strict";

/*
 * @Author: your name
 * @Date: 2021-07-15 21:03:11
 * @LastEditTime: 2021-08-22 11:11:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nodejs/koa2-weibo-code/src/app.js
 */
var Koa = require('koa');

var app = new Koa();

var views = require('koa-views');

var json = require('koa-json');

var onerror = require('koa-onerror');

var bodyparser = require('koa-bodyparser');

var logger = require('koa-logger');

var session = require('koa-generic-session');

var redisStore = require('koa-redis');

var koaStatic = require('koa-static');

var path = require('path');

var _require = require('./conf/db.js'),
    REDIS_CONFIG = _require.REDIS_CONFIG;

var _require2 = require('./utils/env.js'),
    isProd = _require2.isProd;

var _require3 = require('./conf/secretKeys.js'),
    SESSION_SECRET_KEY = _require3.SESSION_SECRET_KEY;

var blogViewRouter = require('./routes/views/blog.js');

var blogApisRouter = require('./routes/api/blog-home.js');

var blogProfileApiRouter = require('./routes/api/blog-profile.js');

var blogSquareApiRouter = require('./routes/api/blog-square.js');

var userApiRouter = require('./routes/api/user');

var errorViewRouter = require('./routes/views/error.js');

var usersView = require('./routes/views/user.js');

var utilsApiRouter = require('./routes/api/utils.js'); // error handler


var onerrorConf = {};

if (isProd) {
  //线上环境跳转error，开发环境直接抛出错误方便修改
  onerrorConf = {
    redirect: '/error'
  };
}

onerror(app, onerrorConf); // middlewares

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(koaStatic(__dirname + '/public'));
var ulrFile = path.join(__dirname, '..', 'uploadFiles');
app.use(koaStatic(ulrFile));
app.use(views(__dirname + '/views', {
  extension: 'ejs'
})); // logger

app.use(function _callee(ctx, next) {
  var start, ms;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          start = new Date();
          _context.next = 3;
          return regeneratorRuntime.awrap(next());

        case 3:
          ms = new Date() - start;
          console.log("".concat(ctx.method, " ").concat(ctx.url, " - ").concat(ms, "ms"));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}); //session配置

app.keys = [SESSION_SECRET_KEY];
app.use(session({
  key: 'weibo_sid',
  //cookie name 默认是weibosid;
  prefix: 'weibo:sess:',
  //redis key前缀默认是koa:sess
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 //ms

  },
  //redis设置过期时间ttl和cookie一致做到同步过期。
  //ttl: 1000 * 60 * 60 * 24, //ms,
  store: redisStore({
    //redis存储，如果登陆都会创建一个用户的配置
    all: "".concat(REDIS_CONFIG.host, ":").concat(REDIS_CONFIG.prot)
  })
})); // routes-------
//微博首页

app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods());
app.use(blogApisRouter.routes(), blogApisRouter.allowedMethods()); //微博住户页面

app.use(blogProfileApiRouter.routes(), blogProfileApiRouter.allowedMethods()); //微博主页

app.use(blogSquareApiRouter.routes(), blogSquareApiRouter.allowedMethods()); //用户注册，登陆API

app.use(userApiRouter.routes(), userApiRouter.allowedMethods());
app.use(usersView.routes(), usersView.allowedMethods()); //注册图片上传

app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods());
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()); //404路由注册到最下面
// error-handling

app.on('error', function (err, ctx) {
  console.error('server error', err, ctx);
});
module.exports = app;