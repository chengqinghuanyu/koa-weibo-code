/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-08 20:21:22
 * @LastEditTime: 2021-08-25 22:35:47
 * @LastEditors: Please set LastEditors
 * @Description: 微博 service
 * @FilePath: /nodejs/koa2-weibo-code/src/services/blog.js
 */
const {
    Blog
} = require('../db/model/Blog.js');
const {
    User
} = require('../db/model/User.js');
const {
    formatUser
} = require('./_format.js');
/**
 * 创建微博
 * @param {Object} param0 创建微博 { userId:用户ID,content:微博内容,image:图片}
 */
async function createBlog({
    userId,
    content,
    image
}) {
    // console.log('userId:', userId);
    // console.log('content:', content);
    // console.log('image:', image);
    const result = await Blog.create({
        userId,
        content,
        image
    });
    //console.log('result', result);
    return result.dataValues;
}
/**
 * 根据参数查询微博数据
 * @param {
     object
 }
 param0 {
     userName,
     pageIndex,
     pageSize
 }
 */
async function getBlogListByUser({
    userName,
    pageIndex = 0,
    pageSize
}) {
    //拼接查询条件
    let userWhereOptions = {};
    if (userName) {
        userWhereOptions.userName = userName;
    }

    //执行查询
    const result = await Blog.findAndCountAll({
        limit: pageSize, //每页条数
        offset: pageSize * pageIndex, //跳过调试
        order: [
            ['id', 'desc']
        ],
        include: [{
            model: User,
            attributes: ['userName', 'picture', 'nickName'],
            where: userWhereOptions
        }]
    });

    //分页总数，result.row,result.count
    let blogList = result.rows.map(row => row.dataValues);
    blogList.map(blogItem => {
        const user = blogItem.user.dataValues;
        blogItem.user = formatUser(user);
        return blogItem;
    });
    return {
        count: result.count,
        blogList
    };
}
module.exports = {
    createBlog,
    getBlogListByUser
};