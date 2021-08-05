/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-18 20:27:39
 * @LastEditTime: 2021-08-01 21:37:58
 * @LastEditors: Please set LastEditors
 * @Description: 用户的服务逻辑 user service
 * @FilePath: /nodejs/koa2-weibo-code/src/services/user.js
 */

const {
    User
} = require('../db/model/index');

const {
    formatUser
} = require('../services/_format.js');
/**
 * 获取用户信息
 * @param {string} userName 用户名 
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
    //查询条件
    const whereOpt = {
        userName
    };
    if (password) {
        Object.assign(whereOpt, {
            password
        });
    }
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    });
    console.log('输出用户查找结果222', result);
    if (!result) {
        //未找到
        return result;
    }
    //格式化
    const formatRes = formatUser(result.dataValues);
    console.log('输出用户查找结果', result);
    return formatRes;
}
/**
 * 创建用户--数层是按增删改查来命名
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别
 * @param {string} nickName 昵称
 */
async function createUser({
    userName,
    password,
    gender = 3,
    nickName = userName
}) {
    const user = await User.create({
        userName,
        password,
        gender,
        nickName: nickName ? nickName : userName
    });
    return user.dataValues;

}

module.exports = {
    getUserInfo,
    createUser
};