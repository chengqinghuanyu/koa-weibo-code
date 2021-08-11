/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-11 22:15:59
 * @LastEditTime: 2021-08-11 22:19:51
 * @LastEditors: Please set LastEditors
 * @Description: 微博数据模型单元测试
 * @FilePath: /nodejs/koa2-weibo-code/test/blog/model.test.js
 */
const {
    Blog
} = require('../../src/db/model/index.js');
test('微博数据模型属性符合预期', () => {
    const blog = Blog.build({
        userId: 1,
        image: 'xxx.png',
        content: '验证微博数据格式'
    });
    expect(blog.userId).toBe(1);
    expect(blog.content).toBe('验证微博数据格式');
    expect(blog.image).toBe('xxx.png');
})