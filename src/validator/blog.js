/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-11 22:05:35
 * @LastEditTime: 2021-08-11 22:08:01
 * @LastEditors: Please set LastEditors
 * @Description: 微博校验格式
 * @FilePath: /nodejs/koa2-weibo-code/src/validator/blog.js
 */
const validate = require('./_validate.js');
//校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string',
            maxLength: 140
        },
        image: {
            type: 'string',
            maxLength: 255
        }
    }
};

//执行校验规则AJV
/**
 * 
 * @param {Object} data   校验微博数据格式
 */
function blogValidate(data = {}) {
    return validate(SCHEMA, data);
}

module.exports = blogValidate;