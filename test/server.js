/*
 * @Author: your name
 * @Date: 2021-07-17 21:40:31
 * @LastEditTime: 2021-08-22 09:50:54
 * @LastEditors: Please set LastEditors
 * @Description: jest server
 * @FilePath: /nodejs/koa2-weibo-code/test/server.js
 */
const request = require('supertest');
const server = require('../src/app.js').callback();
module.exports = request(server);