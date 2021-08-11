/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-11 22:20:31
 * @LastEditTime: 2021-08-11 22:37:09
 * @LastEditors: Please set LastEditors
 * @Description: 微博首页test
 * @FilePath: /nodejs/koa2-weibo-code/test/blog/home.test.js
 */
const server = require('../server.js');
//cookie：COOKIE是从浏览器里面登陆的用户拿过来的，每次测试需要更新一下
const {
    COOKIE
} = require('../testUserInfo.js');
//存储微博的ID
let BlogId = '';
test('创建一条微博应该成功', async () => {
    const content = "单元测试的微博内容" + Date.now;
    const image = "单元测试的微博图片" + Date.now + ".png";
    //开始单元测试
    const res = await server.post('/api/blogs/create').send({
        content,
        image
    }).set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
    expect(res.body.data.content).toBe(content);
    expect(res.body.data.image).toBe(image);
    BlogId = res.body.data.id;

});