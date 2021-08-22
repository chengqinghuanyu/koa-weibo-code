/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-21 16:59:30
 * @LastEditTime: 2021-08-22 10:06:51
 * @LastEditors: Please set LastEditors
 * @Description: 微博相关的模板解析方法
 * @FilePath: /nodejs/koa2-weibo-code/src/utils/blogs.js
 */

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const BLOG_LIST_TPL = fs.readFileSync(path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')).toString();
/**
 * 微博列表渲染
 * @param {array} blogList 微博列表
 * @param {boolean} canReply 是否可以回复
 * @returns 
 */
function getBlogListStr(blogList = [], canReply = false) {
    return ejs.render(BLOG_LIST_TPL, {
        blogData: {
            blogList,
            canReply
        }
    });
};
module.exports = {
    getBlogListStr
};