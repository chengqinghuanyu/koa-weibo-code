/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-18 20:27:39
 * @LastEditTime: 2021-08-24 21:52:21
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
    //console.log('输出用户查找结果222', result);
    if (!result) {
        //未找到
        return result;
    }
    //格式化
    const formatRes = formatUser(result.dataValues);

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
/**
 * 删除用户
 * @param {string} userName 用户名
 */
async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    });
    return result > 0;
}
/**
 * 修改用户信息
 * @param {
     Object
 }
 param0 要修改的内容newPassword：新密码, newNickname：新昵称, newCity：新城市, newPicture：新的头像
 * @param {
     object
 }
 param1 userName：原始用户名, password：原始密码
 */
async function updateUser({
    newPassword,
    newNickname,
    newCity,
    newPicture
}, {
    userName,
    password
}) {
    //拼接内容
    let updateData = {};
    if (newPassword) {
        updateData.password = newPassword;
    }
    if (newNickname) {
        updateData.nickName = newNickname;
    }
    if (newPicture) {
        updateData.picture = newPicture;
    }
    if (newCity) {
        updateData.city = newCity;
    }
    //拼接查询条件
    let whereData = {
        userName: userName
    };
    if (password) {
        whereData.password = password;
    }
    //执行修改
    //console.log('查询', whereData);
    //console.log('更新', updateData);
    const result = await User.update(updateData, {
        'where': whereData
    });
    //console.log('返回结果', result);
    return result[0] > 0; //修改的行数
}
module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
};