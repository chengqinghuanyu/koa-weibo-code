/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-23 20:01:33
 * @LastEditTime: 2021-08-25 22:37:15
 * @LastEditors: Please set LastEditors
 * @Description: 用户关系服务表
 * @FilePath: /nodejs/koa2-weibo-code/src/services/user-relation.js
 */
const {
    User,
    UserRelation
} = require('../db/model/index.js');
const {
    formatUser
} = require('./_format.js');
/**
 * 获取关注该用户的用户列表
 * @param {number} followerId 被关注人ID
 */
async function getUsersByFollower(followerId) {
    if (followerId) {
        const result = await User.findAndCountAll({
            attributes: ['id', 'userName', 'nickName', 'picture'],
            order: [
                ['id', 'desc']
            ],
            include: [{
                model: UserRelation,
                where: {
                    followerId
                }
            }]
        });
        //result.count,result.row;
        //console.log('输出用户关系：', result);
        let userList = result.rows.map(row => row.dataValues);
        //格式化
        userList = formatUser(userList);
        return {
            count: result.count,
            userList
        };
    } else {
        return {
            count: 0,
            userList: []
        };
    }

}
/**
 * 获取关注人列表
 * @param {number} userId userid
 */
async function getFollowerByUser(userId) {
    const result = await UserRelation.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [{
            model: User,
            attributes: ['id', 'userName', 'nickName', 'picture']
        }],
        where: {
            userId
        }
    });
    //result.rows:列表,result.count:总数;
    let userList = result.rows.map(row => row.dataValues);
    userList = userList.map(item => {
        let user = item.user;
        user = user.dataValues;
        user = formatUser(user);
        //console.log(user);
        return user;
    });

    //console.log('关注人：', result);
    let count = result.count;
    return {
        userList,
        count
    };
}
/**
 * 添加关注关系
 * @param {number} userId 用户ID
 * @param {number} followerId 被关注用户ID
 */
async function addFollower(userId, followerId) {
    const result = UserRelation.create({
        userId,
        followerId
    });
    return result.dataValues;
}
/**
 * 删除关注关系
 * @param {number} userId 
 * @param {number} followerId 
 * @returns 
 */
async function deleteFollower(userId, followerId) {
    const result = UserRelation.destroy({
        where: {
            userId,
            followerId
        }

    });
    return result > 0;

}

module.exports = {
    getUsersByFollower,
    getFollowerByUser,
    addFollower,
    deleteFollower
};