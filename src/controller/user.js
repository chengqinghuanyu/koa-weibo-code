/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-18 20:23:42
 * @LastEditTime: 2021-08-07 22:06:42
 * @LastEditors: Please set LastEditors
 * @Description: 用户路由
 * @FilePath: /nodejs/koa2-weibo-code/src/controller/user.js
 */
require('iconv-lite').encodingExists('foo');
const {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
} = require('../services/user.js');
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo,
    changeInfoFailInfo,
    changePasswordFail
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
    //console.log('crl输出用户信息：', userInfo);
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
    //console.log('crl输出用户信息：', userInfo);
    if (userInfo) {
        //console.log('查询到用户');
        //统一返回已存在
        return new ErrorModel(registerUserNameExistInfo);
    }
    try {
        // console.log('未查询到用户');
        // console.log(password);
        password = doCrypto(password);
        //console.log(password);
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
    //console.log(password);
    password = doCrypto(password);
    //console.log(password);
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

/**
 * 删除用户
 * @param {string} userName 用户名
 */
async function deleteCurrentUser(userName) {
    //service
    const result = await deleteUser(userName);
    if (result) {
        return new SuccessModel();
    }
    return new ErrorModel(deleteUserFailInfo);
}
/**
 * 修改个人信息
 * @param {Object} ctx koa2 ctx 
 * @param {string} param1 nickname:姓名，city：城市，picture:个人头像 
 */
async function changeInfo(ctx, {
    nickName,
    city,
    picture
}) {
    // const {
    //     userName
    // } = ctx.session.userInfo;
    //console.log("输出更新住户信息：",ctx.session);
    const userName = ctx.session.userInfo ? ctx.session.userInfo.userName : '';
    if (!nickName) {
        userName = userName;
    }
    //service
    // console.log('更新前入参');
    // console.log(userName);
    const result = await updateUser({
        newNickname: nickName,
        newCity: city,
        newPicture: picture
    }, {
        userName
    });
    //console.log('更新后', result);
    if (result) {
        //执行成功
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture
        });
        return new SuccessModel();
    }
    return new ErrorModel(changeInfoFailInfo);
}
/**
 * 修改密码
 * @param {object} param0 userName:用户名, password:密码, newPassword：要修改的密码
 */
async function changePassword({
    userName,
    password,
    newPassword
}) {
    const result = await updateUser({
        newPassword: doCrypto(newPassword),
    }, {
        userName,
        password: doCrypto(password),
    });
    if (result) {
        return new SuccessModel();
    }
    return new ErrorModel(changePasswordFail);
}
/**
 * 退出
 * @param {object} ctx 
 */
async function logout(ctx) {
    delete ctx.session.userInfo;
    return new SuccessModel();
}
module.exports = {
    isExist,
    register,
    login,
    deleteCurrentUser,
    changeInfo,
    changePassword,
    logout
};