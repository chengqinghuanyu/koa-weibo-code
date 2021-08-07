/*
 * @Author: your name
 * @Date: 2021-08-06 22:16:48
 * @LastEditTime: 2021-08-06 22:22:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nodejs/koa2-weibo-code/test/user/model.test.js
 */
/**
 * @author 尹鹏孝
 * @description 测试数据模型
 */
const {
    User
} = require('../../src/db/model/index.js');
test('User 模型的各个属性，符合预期', () => {
    //build会构建内存数据库，不会存在数据库中
    const user = User.build({
        userName: 'zhangsan',
        password: '123',
        nickName: '张三',
        //gender:1,
        picture: 'xxx',
        city: 'beijing'
    })
    //验证各个属性
    expect(user.userName).toBe('zhangsan');
    expect(user.password).toBe('123');
    expect(user.nickName).toBe('张三');
    expect(user.gender).toBe(3);
    expect(user.picture).toBe('xxx');
    expect(user.city).toBe('beijing');
})