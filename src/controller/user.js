/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-18 20:23:42
 * @LastEditTime: 2021-08-01 12:35:39
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
    registerFailInfo,
    loginFailInfo
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
        console.log('查询到用户');
        //统一返回已存在
        return new ErrorModel(registerUserNameExistInfo);
    }
    try {
        console.log('未查询到用户');
        console.log(password);
        password = doCrypto(password);
        console.log(password);
        await createUser({
            userName,
            password,
            gender
        });
        return new SuccessModel({});
    } catch (error) {
        console.error('输出错误堆栈：', error.message, error.stack);

        return new ErrorModel(registerFailInfo);
    }

}
/**
 * 注册功能
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
    //登陆成功
    console.log(password);
    password = doCrypto(password);
    console.log(password);
    const userInfo = await getUserInfo(userName, password);

    if (!userInfo) {
        //登陆失败
        return new ErrorModel(loginFailInfo);
    }
    if (ctx.session.userInfo == null) {
        //登陆成功
        ctx.session.userInfo = userInfo;

    }
    return new SuccessModel();



}



module.exports = {
    isExist,
    register,
    login
};