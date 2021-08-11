/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-08 20:21:22
 * @LastEditTime: 2021-08-11 21:59:20
 * @LastEditors: Please set LastEditors
 * @Description: 微博 service
 * @FilePath: /nodejs/koa2-weibo-code/src/services/blog.js
 */
const {
    Blog
} = require('../db/model/Blog.js');
/**
 * 创建微博
 * @param {Object} param0 创建微博 { userId:用户ID,content:微博内容,image:图片}
 */
async function createBlog({
    userId,
    content,
    image
}) {
    console.log('userId:', userId);
    console.log('content:', content);
    console.log('image:', image);
    const result = await Blog.create({
        userId,
        content,
        image
    });
    console.log('result', result);
    return result.dataValues;
}

module.exports = {
    createBlog
};