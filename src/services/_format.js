/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-29 20:50:25
 * @LastEditTime: 2021-07-31 19:03:02
 * @LastEditors: Please set LastEditors
 * @Description: 格式化内部代码
 * @FilePath: /nodejs/koa2-weibo-code/src/services/_format.js
 */
const {
    DEFAULT_PICTURE
} = require('../conf/constant.js');
/**
 * 
 * 用户默认头像
 * @param {Object} obj 用户对象
 * @returns 
 */
function _formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = DEFAULT_PICTURE;
    }
    return obj;
}
/**
 * 格式化用户信息
 * @param {Array|Object} list 用户对象
 */
function formatUser(list) {
    if (list == null) {
        return list;

    }
    if (list instanceof Array) {
        //数组形式
        return list.map(_formatUserPicture);
    }
    //如果是用户对象直接处理后返回
    return _formatUserPicture(list);
}
module.exports = {
    formatUser
};