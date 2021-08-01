/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-31 20:47:05
 * @LastEditTime: 2021-08-01 12:42:47
 * @LastEditors: Please set LastEditors
 * @Description: 用户信息验证
 * @FilePath: /nodejs/koa2-weibo-code/src/validator/user.js
 */
const validate = require('./_validate.js');
//校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        userName: {
            type: 'string',
            pattern: '^[a-zA-Z0-9_-]+$',
            maxLength: 20,
            minLength: 2,
        },
        password: {
            type: 'string',
            maxLength: 20,
            minLength: 2,
        },
        newPassword: {
            type: 'string',
            maxLength: 20,
            minLength: 2,
        },
        nickName: {
            type: 'string',
            maxLength: 20,
            minLength: 2,
        },
        picture: {
            type: 'string',
            maxLength: 255
        },
        city: {
            type: 'string',
            maxLength: 255,
            minLength: 2,
        },
        gender: {
            type: 'string',
        }
    }
};
//执行校验规则AJV
/**
 * 
 * @param {Object} data   校验用户数据格式
 */
function userValidate(data = {}) {
    return validate(SCHEMA, data);
}

module.exports = userValidate;