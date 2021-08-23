"use strict";

/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-18 19:54:13
 * @LastEditTime: 2021-08-23 21:28:18
 * @LastEditors: Please set LastEditors
 * @Description: 数据模型入口文件
 * @FilePath: /nodejs/koa2-weibo-code/src/db/modal/index.js
 */
var _require = require('./User.js'),
    User = _require.User;

var _require2 = require('./Blog.js'),
    Blog = _require2.Blog;

var _require3 = require('./UserRelation.js'),
    UserRelation = _require3.UserRelation;
/**
 * 一个用户有多个微博
 */


Blog.belongsTo(User, {
  foreignKey: 'userId'
});
/**
 * 创建外键关系---
 */

UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
});
/**
 * 创建外键关系---
 */

User.hasMany(UserRelation, {
  foreignKey: 'userId'
});
module.exports = {
  User: User,
  Blog: Blog,
  UserRelation: UserRelation
};