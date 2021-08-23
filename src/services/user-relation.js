/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-23 20:01:33
 * @LastEditTime: 2021-08-23 21:28:40
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

        let userList = result.row.map(row => row.dataValues);
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

module.exports = {
    getUsersByFollower
};