/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-22 11:03:48
 * @LastEditTime: 2021-08-22 11:34:13
 * @LastEditors: Please set LastEditors
 * @Description: 微博广场
 * @FilePath: /nodejs/koa2-weibo-code/src/controller/blog-square.js
 */
const {
    PAGE_SIZE
} = require('../conf/constant.js');
const {
    SuccessModel
} = require('../model/ResModel.js');
const {
    getSquareCatchList
} = require('../cache/blog.js');
/**
 * 微博广场列表
 * @param {number} pageIndex 分页页数
 */
async function getSquareBlogList({
    pageIndex = 0,
    pageSize = PAGE_SIZE
}) {
    console.log('输出结果222:', pageIndex);
    const result = await getSquareCatchList({
        pageIndex,
        pageSize
    });
    console.log('输出结果集：', result);
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
    getSquareBlogList
};