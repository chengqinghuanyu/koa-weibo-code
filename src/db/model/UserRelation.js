/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-22 14:16:18
 * @LastEditTime: 2021-08-22 18:25:05
 * @LastEditors: Please set LastEditors
 * @Description: 用户关系
 * @FilePath: /nodejs/koa2-weibo-code/src/db/model/userRelation.js
 */
const seq = require('../seq.js');
const {
    INTEGER
} = require('../types.js');
const UserRelation = seq.define('userRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        commit: '用户id'
    },
    followerId: {
        type: INTEGER,
        allowNull: false,
        commit: '被关注用户id'
    }
});
module.exports = {
    UserRelation
};