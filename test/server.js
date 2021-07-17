/*
 * @Author: your name
 * @Date: 2021-07-17 21:40:31
 * @LastEditTime: 2021-07-17 21:42:31
 * @LastEditors: Please set LastEditors
 * @Description: jest server
 * @FilePath: /nodejs/koa2-weibo-code/test/server.js
 */
const request = require('supertest');
const server = require('../src/app.js').callback();
module.exports = request(server);