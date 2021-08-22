/*
 * @Author: your name
 * @Date: 2021-08-22 11:55:29
 * @LastEditTime: 2021-08-22 11:56:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nodejs/koa2-weibo-code/test/square.test.js
 */
const server = require('../server.js');
//cookie：COOKIE是从浏览器里面登陆的用户拿过来的，每次测试需要更新一下
const {
    COOKIE,
    USER_NAME
} = require('../testUserInfo.js');
test('广场页加载应该成功', async function () {
    const res = await server.get(`/api/square/load-more/${USER_NAME}/0`).set("cookie", COOKIE);

    expect(res.body.errno).toBe(0);
    const data = res.body.data;
    expect(data).toHaveProperty('isEmpty');
    expect(data).toHaveProperty('blogList');
    expect(data).toHaveProperty('pageSize');
    expect(data).toHaveProperty('pageIndex');
    expect(data).toHaveProperty('count');
})