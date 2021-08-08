/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-08 09:22:03
 * @LastEditTime: 2021-08-08 09:25:17
 * @LastEditors: Please set LastEditors
 * @Description: 微博模型
 * @FilePath: /nodejs/koa2-weibo-code/src/db/model/Blog.js
 */
const seq = require('../seq.js');
const {
    STRING,
    DECIMAL,
    TEXT,
    INTEGER,
    BOOLEAN
} = require('../types.js');
//微博
const Blog = seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
        unique: true,
        comment: '用户名ID'
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: '微博内容'
    },
    image: {
        type: STRING,
        comment: '图片地址'
    }
});
module.exports = {
    Blog
};