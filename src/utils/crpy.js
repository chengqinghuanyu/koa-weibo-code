/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-31 20:06:41
 * @LastEditTime: 2021-07-31 20:38:12
 * @LastEditors: Please set LastEditors
 * @Description: 加密方法
 * @FilePath: /nodejs/koa2-weibo-code/src/utils/crp.js
 */
const crypto = require('crypto');
const {
    CRYPTO_SECRET_KEY
} = require('../conf/secretKeys.js');
/**
 * 
 * @param {string} content 铭文
 */
function _md5(content) {
    const md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
}
/**
 * 
 * @param {string} content 铭文
 */
function doCrypto(content) {
    const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`;
    return _md5(str);
}
module.exports = doCrypto;