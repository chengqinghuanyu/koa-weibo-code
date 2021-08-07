/*
 * @Author: your name
 * @Date: 2021-07-17 21:42:46
 * @LastEditTime: 2021-07-17 21:50:31
 * @LastEditors: Please set LastEditors
 * @Description: json test
 * @FilePath: /nodejs/koa2-weibo-code/test/json.test.js
 */

const server = require('./server.js');
test('json返回格式正确', async () => {
    const res = await server.get('/json');
    expect(res.body).toEqual({
        title: 'koa2 json'
    });
    expect(res.body.title).toBe('koa2 json')
    // const res = await server.post('/login').send({
    //     userName: 'zhangsan',
    //     passWord: '123'
    // });
    // expect(res.body).toEqual({
    //     title: 'koa2 json'
    // });
    // expect(res.body.title).toBe('koa2 json')

})