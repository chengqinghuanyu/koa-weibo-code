/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-18 20:23:42
 * @LastEditTime: 2021-07-31 19:01:43
 * @LastEditors: Please set LastEditors
 * @Description: 用户路由
 * @FilePath: /nodejs/koa2-weibo-code/src/controller/user.js
 */
const {
    getUserInfo
} = require('../services/user.js');
const {
    registerUserNameNotExistInfo
} = require('../model/ErrorInfo.js');
const {
    ErrorModel,
    SuccessModel
} = require('../model/ResModel');
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
        return new SuccessModel({});
    }
    //用户名不存在
    return new ErrorModel(registerUserNameNotExistInfo);


}

module.exports = {
    isExist
};