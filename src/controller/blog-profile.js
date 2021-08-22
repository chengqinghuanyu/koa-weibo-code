/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-21 15:04:35
 * @LastEditTime: 2021-08-22 10:05:04
 * @LastEditors: Please set LastEditors
 * @Description: 个人主页
 * @FilePath: /nodejs/koa2-weibo-code/src/controller/blog-profile.js
 */

/**
 * 获取个人主页数据
 * @param {string} userName 用户名
 * @param {number} pageIndex 第几页
 */
const {
    getBlogListByUser
} = require('../services/blog.js');
const {
    PAGE_SIZE
} = require('../conf/constant.js');
const {
    SuccessModel
} = require('../model/ResModel.js');
async function getProfileBlogList({
    userName,
    pageIndex
}) {
    //service
    if (!pageIndex) {
        pageIndex = 0;
    }
    console.log('输出页面：', pageIndex);
    const result = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize: PAGE_SIZE
    });
    const blogList = result.blogList;
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    });
}

module.exports = {
    getProfileBlogList
};