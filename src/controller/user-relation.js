/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-23 19:59:06
 * @LastEditTime: 2021-08-23 21:28:09
 * @LastEditors: Please set LastEditors
 * @Description: 用户关系
 * @FilePath: /nodejs/koa2-weibo-code/src/controller/user-relation.js
 */
const {
    SuccessModel
} = require('../model/ResModel.js');
const {
    getUsersByFollower
} = require('../services/user-relation.js');
/**
 * 根据用户ID返回粉丝
 * @param {number} userId 用户ID
 */
async function getFans(userId) {
    const {
        count,
        userList
    } = await getUsersByFollower(userId);
    return new SuccessModel({
        count,
        userList
    });
}
module.exports = {
    getFans
};