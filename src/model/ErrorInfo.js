/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-29 21:31:06
 * @LastEditTime: 2021-07-31 19:33:25
 * @LastEditors: Please set LastEditors
 * @Description: 失败信息集合包括error number 和msg
 * @FilePath: /nodejs/koa2-weibo-code/src/model/ErrInfo.js
 */
module.exports = {
    //用户名已经存在
    registerUserNameExistInfo: {
        errno: 10001,
        msg: '用户名未存在'
    },
    //注册失败
    registerFailInfo: {
        errno: 10002,
        msg: '注册失败请重试'
    },
    //用户名检查
    registerUserNameNotExistInfo: {
        errno: 10003,
        msg: '用户名未存在'
    },
    //登陆失败
    loginFailInfo: {
        errno: 10004,
        msg: '登陆失败，用户名或者密码错误'
    },
    //未登陆
    loginCheckedFailInfo: {
        errno: 10005,
        msg: '您尚未登陆'
    },
    //修改密码失败
    changePasswordFail: {
        errno: 10006,
        msg: '修改密码失败'
    }
};