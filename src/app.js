/*
 * @Author: your name
 * @Date: 2021-07-15 21:03:11
 * @LastEditTime: 2021-08-05 22:13:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nodejs/koa2-weibo-code/src/app.js
 */
const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const {
  REDIS_CONFIG
} = require('./conf/db.js');
const {
  isProd
} = require('./utils/env.js');
const {
  SESSION_SECRET_KEY
} = require('./conf/secretKeys.js');
const index = require('./routes/index');
const userApiRouter = require('./routes/api/user');
const errorViewRouter = require('./routes/views/error.js');
const usersView = require('./routes/views/user.js');



// error handler
let onerrorConf = {};

if (isProd) {
  //线上环境跳转error，开发环境直接抛出错误方便修改
  onerrorConf = {
    redirect: '/error',
  };
}
onerror(app, onerrorConf);
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

//session配置
app.keys = [SESSION_SECRET_KEY];
app.use(session({
  key: 'weibo_sid', //cookie name 默认是weibosid;
  prefix: 'weibo:sess:', //redis key前缀默认是koa:sess
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, //ms

  },
  //redis设置过期时间ttl和cookie一致做到同步过期。
  //ttl: 1000 * 60 * 60 * 24, //ms,
  store: redisStore({
    //redis存储，如果登陆都会创建一个用户的配置
    all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.prot}`
  })
}));


// routes
app.use(index.routes(), index.allowedMethods());
//用户注册，登陆API
app.use(userApiRouter.routes(), userApiRouter.allowedMethods());
app.use(usersView.routes(), usersView.allowedMethods());
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()); //404路由注册到最下面

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;