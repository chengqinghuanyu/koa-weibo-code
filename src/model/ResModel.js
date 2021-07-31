/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-29 21:17:45
 * @LastEditTime: 2021-07-31 19:02:34
 * @LastEditors: Please set LastEditors
 * @Description: class模型
 * @FilePath: /nodejs/koa2-weibo-code/src/model/ResModel.js
 */

/**
 * 基础模型
 */
class BaseModel {
    constructor({
        errno,
        data,
        msg
    }) {
        this.errno = errno;
        if (data) {
            this.data = data;
        }
        if (msg) {
            this.msg = msg;
        }
    }
}
/**
 * 成功的数据模型
 */
class SuccessModel extends BaseModel {
    constructor(data = {}) {
        super({
            error: 0,
            data
        });
    }
}
/**
 * 失败数据模型
 */
class ErrorModel extends BaseModel {
    constructor({
        errno,
        msg
    }) {
        super({
            errno,
            msg
        });
    }
}
module.exports = {
    ErrorModel,
    SuccessModel
};