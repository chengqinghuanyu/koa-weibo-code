/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-18 20:23:42
 * @LastEditTime: 2021-07-31 20:38:30
 * @LastEditors: Please set LastEditors
 * @Description: 用户路由
 * @FilePath: /nodejs/koa2-weibo-code/src/controller/user.js
 */
const {
    getUserInfo,
    createUser
} = require('../services/user.js');
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo
} = require('../model/ErrorInfo.js');
const {
    ErrorModel,
    SuccessModel
} = require('../model/ResModel');

const doCrypto = require('../utils/crpy.js');
/**
 * 
 * @param {string} userName 用户名
 */
async function isExist(userName) {
    //业务逻辑返回处理
    //services 获取数据
    //统一返回格式
    const userInfo = await getUserInfo(userName);
    console.log('crl输出用户信息：', userInfo);
    if (userInfo) {
        //统一返回已存在
        return new SuccessModel(userInfo);
    }
    //用户名不存在
    return new ErrorModel(registerUserNameNotExistInfo);


}

/**
 * 注册
 * @param {string} userName 名称
 * @param {string } password 密码
 * @param {number} gender 性别，{1:男，2:女，3:未知}
 */
async function register({
    userName,
    password,
    gender
}) {
    //统一返回格式
    const userInfo = await getUserInfo(userName);
    console.log('crl输出用户信息：', userInfo);
    if (userInfo) {
        //统一返回已存在
        return new ErrorModel(registerUserNameExistInfo);
    }
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        });
        return new SuccessModel({});
    } catch (error) {
        console.error(error.message, error.stack);
        return new ErrorModel(registerFailInfo);
    }

}

module.exports = {
    isExist,
    register
};