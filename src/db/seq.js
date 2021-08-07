/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-17 19:00:29
 * @LastEditTime: 2021-08-07 22:04:06
 * @LastEditors: Please set LastEditors
 * @Description: mysql链接数据库
 * @FilePath: /nodejs/koa2-weibo-code/src/db/req.js
 */
const {
    isProd,
    isTest
} = require('../utils/env.js');
const Sequelize = require('sequelize');
const {
    MYSQL_CONFIG
} = require('../conf/db.js');
// console.log(MYSQL_CONFIG);
const {
    host,
    user,
    password,
    database,
    dialect
} = MYSQL_CONFIG;
const conf = {
    host: host,
    dialect: dialect
};
// //线上环境使用连接池
if (isProd) {
    conf.pool = {
        max: 5, //最多5个
        min: 0, //最小0
        idle: 10000, //10秒未被使用就释放
    };
}
//如果测试环境
if (isTest) {
    //单元测试不打印    sql语句
    conf.logging = () => {};
}

const seq = new Sequelize(database, user, password, conf);

seq.authenticate().then(() => {
    console.log('ok');
}).catch(err => {
    console.log(err);
});

module.exports = seq;