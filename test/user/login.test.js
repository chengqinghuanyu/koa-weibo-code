/*
import { header } from 'header.vue';
 * @Author: your name
 * @Date: 2021-08-06 22:38:51
 * @LastEditTime: 2021-08-07 09:08:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nodejs/koa2-weibo-code/test/user/login.test.js
 */
const server = require('../server.js');
//用户信息
const userName = `u_${Date.now()}`;
const password = `p_${Date.now()}`;
const testUser = {
    userName,
    password,
    nickName: userName,
    gender: '1'
};

//存储cookie
let COOKIE = '';
//注册
test('注册一个新用户，应该成功', async () => {
    const res = await server.post('/api/users/registry').send(testUser);
    expect(res.body.errno).toBe(0);
})

//重复注册用户
test('重复注册用户，应该失败', async () => {
    const res = await server.post('/api/users/registry').send(testUser);
    expect(res.body.errno).not.toBe(0);
});

//查询用户是否存在
test('查询注册的用户,应该存在', async () => {
    const res = await server.post('/api/users/isExist').send(testUser);
    expect(res.body.errno).toBe(0);
});

//json schema
test('查询json schema 非法格式，应该不成功', async () => {
    const res = await server.post('/api/users/registry').send({
        userName: '123',
        password: '1',
        gender: 'mail'
    });
    expect(res.body.errno).not.toBe(0);
});

//登陆
test('登陆应该成功', async () => {
    const res = await server.post('/api/users/login').send({
        userName,
        password
    });
    expect(res.body.errno).toBe(0);
    //console.log(res);
    //获取cookie
    COOKIE = res.header['set-cookie'].join(';');

});

//删除
test('删除应该成功', async () => {

    const res = await server.post('/api/users/delete').set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
});

//再次查询应该不存在
test('再次查询用户,应该不存在', async () => {
    const res = await server.post('/api/users/isExist').send(testUser);
    expect(res.body.errno).not.toBe(0);
});