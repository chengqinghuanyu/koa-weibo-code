/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-17 18:35:23
 * @LastEditTime: 2021-07-17 19:43:50
 * @LastEditors: Please set LastEditors
 * @Description: 环境变量
 * @FilePath: /nodejs/koa2-weibo-code/src/utils/env.js
 */
const ENV = process.env.NODE_ENV;
module.exports = {
    isDev: ENV === 'dev',
    notDev: ENV !== 'dev',
    isProd: ENV === 'production',
    notProd: ENV !== 'production',
    isTest: ENV === 'test',
    notTest: ENV !== 'test',
};