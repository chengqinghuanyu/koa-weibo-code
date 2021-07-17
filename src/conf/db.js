/*
 * @Author: your name
 * @Date: 2021-07-17 11:43:03
 * @LastEditTime: 2021-07-17 19:48:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nodejs/koa2-weibo-code/src/conf/db.js
 */
/**
 * @description存储配置
 * @author:ypx
 * 
 */
const {
    isProd
} = require('../utils/env.js');
let REDIS_CONFIG = {
    port: 6379,
    host: '127.0.0.1'
};
let MYSQL_CONFIG = {
    host: 'localhost',
    dialect: 'mysql',
    user: 'root',
    port: 3306,
    password: '123456',
    database: 'koa2_weibo_db'
};
if (isProd) {
    //线上环境
    REDIS_CONFIG = {
        port: 6379,
        host: '127.0.0.1'
    };
    /**
     * 线上环境
     */
    MYSQL_CONFIG = {
        host: 'localhost',
        dialect: 'mysql',
        user: 'root',
        port: 3306,
        password: '123456',
        database: 'koa2_weibo_db'
    };
};
module.exports = {
    REDIS_CONFIG
};