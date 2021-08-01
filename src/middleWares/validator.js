/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-01 10:13:11
 * @LastEditTime: 2021-08-01 11:04:48
 * @LastEditors: Please set LastEditors
 * @Description: 中间件验证
 * @FilePath: /nodejs/koa2-weibo-code/src/middlewares/validates.js
 */

const {
    ErrorModel
} = require("../model/ResModel");
const {
    jsonSchemaFailInfo
} = require('../model/ErrorInfo.js');
/**
 * 生产json-schema验证函数
 * @param {function} validateFn 验证函数
 * @returns 
 */
function genValidator(validateFn) {
    //定义中间件函数
    async function validator(ctx, next) {
        //校验
        const data = ctx.request.body;
        const error = validateFn(data);
        if (error) {
            //校验失败
            ctx.body = new ErrorModel(jsonSchemaFailInfo);
            return;
        }
        //验证成功继续
        await next();
    }
    //返回中间件
    return validator;
}
module.exports = {
    genValidator
};