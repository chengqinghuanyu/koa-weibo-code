/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-08 20:18:51
 * @LastEditTime: 2021-08-11 21:59:01
 * @LastEditors: Please set LastEditors
 * @Description: 首页微博
 * @FilePath: /nodejs/koa2-weibo-code/src/controller/blog-home.js
 */

const {
    SuccessModel,
    ErrorModel
} = require('../model/ResModel.js');
const {
    createBlog
} = require('../services/blog.js');
const {
    createBlogFailInfo
} = require('../model/ErrorInfo.js');
/**
 * 创建微博
 * @param {Object} param0 userId：用户ID，content：微博内容，image：图片
 */
async function create({
    userId,
    content,
    image
}) {
    //service
    try {
        console.log('ctrol:', userId);
        const blog = await createBlog({
            userId,
            content,
            image
        });
        return new SuccessModel(blog);
    } catch (error) {
        //console.log(error.message, error.stack);
        return new ErrorModel(createBlogFailInfo);
    }
}
module.exports = {
    create
};