/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-23 19:59:06
 * @LastEditTime: 2021-08-25 22:30:12
 * @LastEditors: Please set LastEditors
 * @Description: 用户关系
 * @FilePath: /nodejs/koa2-weibo-code/src/controller/user-relation.js
 */
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResModel.js');
const {
    getUsersByFollower,
    getFollowerByUser,
    addFollower,
    deleteFollower
} = require('../services/user-relation.js');
const {
    addFollowerFailInfo,
    deleteFollowFailInfo
} = require('../model/ErrorInfo.js');
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
/**
 * 获取关注人
 * @param {number} userId 关注人ID
 */
async function getFollowers(userId) {
    //service
    const {
        count,
        userList
    } = await getFollowerByUser(userId);
    //console.log('userList----关注人列表---', userList);
    return new SuccessModel({
        count,
        followersList: userList
    });
}
/**
 * 微博关注
 * @param {number} myUserId 关注ID
 * @param {number} curUserId 被关注ID
 */
async function follow(myUserId, curUserId) {
    try {
        await addFollower(myUserId, curUserId);
        return new SuccessModel();
    } catch (error) {
        return new ErrorModel(addFollowerFailInfo);
    }

}
/**
 * 取消关注
 * @param {number} myUserId 当前用ID
 * @param {number} curUserId 关注者ID
 * @returns 
 */
async function unFollow(curUserId, myUserId) {

    const result = await deleteFollower(curUserId, myUserId);
    if (result) {
        return new SuccessModel();
    }
    return new ErrorModel(deleteFollowFailInfo);


}
module.exports = {
    getFans,
    follow,
    unFollow,
    getFollowers
};