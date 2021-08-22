/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-22 09:28:30
 * @LastEditTime: 2021-08-22 10:01:23
 * @LastEditors: Please set LastEditors
 * @Description: 个人主页测试
 * @FilePath: /nodejs/koa2-weibo-code/test/blog/profile.test.js
 */

const server = require('../server.js');
//cookie：COOKIE是从浏览器里面登陆的用户拿过来的，每次测试需要更新一下
const {
    COOKIE,
    USER_NAME
} = require('../testUserInfo.js');
test('个人主页加载第一页应该成功', async function () {
    const res = await server.get(`/api/profile/load-more/${USER_NAME}/0`).set("cookie", COOKIE);

    expect(res.body.errno).toBe(0);
    const data = res.body.data;
    expect(data).toHaveProperty('isEmpty');
    expect(data).toHaveProperty('blogList');
    expect(data).toHaveProperty('pageSize');
    expect(data).toHaveProperty('pageIndex');
    expect(data).toHaveProperty('count');
})