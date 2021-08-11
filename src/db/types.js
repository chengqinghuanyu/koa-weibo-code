/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-18 19:42:11
 * @LastEditTime: 2021-08-08 21:48:28
 * @LastEditors: Please set LastEditors
 * @Description: 封装sequelize数据类型
 * @FilePath: /nodejs/koa2-weibo-code/src/db/types.js
 */
const Sequelize = require('sequelize');
module.exports = {
    STRING: Sequelize.STRING,
    DECIMAL: Sequelize.DECIMAL,
    TEXT: Sequelize.TEXT,
    INTEGER: Sequelize.INTEGER,
    BOOLEAN: Sequelize.BOOLEAN
};