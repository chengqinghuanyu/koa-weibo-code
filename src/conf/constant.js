/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-29 21:03:57
 * @LastEditTime: 2021-08-21 15:21:42
 * @LastEditors: Please set LastEditors
 * @Description: 存放常量的文件
 * @FilePath: /nodejs/koa2-weibo-code/src/conf/constant.js
 */
const path = require('path');
const filePath = path.join(__dirname, '..', '..', 'uploadFiles');
module.exports = {
    DEFAULT_PICTURE: 'https://dwz.cn/rnTnftZs',
    MAX_SIZE: 1024 * 1024 * 1024,
    DICT_FOLDER_PATH: filePath,
    PAGE_SIZE: 5
};