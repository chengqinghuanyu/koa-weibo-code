/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-31 20:57:04
 * @LastEditTime: 2021-07-31 21:06:37
 * @LastEditors: Please set LastEditors
 * @Description: 统一校验
 * @FilePath: /nodejs/koa2-weibo-code/src/validator/validate.js
 */

const Ajv = require('ajv');
const ajv = new Ajv({
    //allErrors: false //校验错误
});
/**
 * 
 * @param {object} schema json-schema规则 
 * @param {*} data json-schema校验
 */
function validate(schema, data = {}) {
    const valid = ajv.validate(schema, data);
    if (!valid) {
        return ajv.errors[0];
    }
};
module.exports = validate;