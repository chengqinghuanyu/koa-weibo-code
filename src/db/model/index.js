/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-18 19:54:13
 * @LastEditTime: 2021-08-08 09:25:48
 * @LastEditors: Please set LastEditors
 * @Description: 数据模型入口文件
 * @FilePath: /nodejs/koa2-weibo-code/src/db/modal/index.js
 */
const {
    User
} = require('./User.js');
const {
    Blog
} = require('./Blog.js');
module.exports = {
    User,
    Blog
};