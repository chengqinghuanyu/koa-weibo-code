/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-07 10:29:27
 * @LastEditTime: 2021-08-07 11:28:14
 * @LastEditors: Please set LastEditors
 * @Description: utils controller
 * @FilePath: /nodejs/koa2-weibo-code/src/controller/utils.js
 */
const path = require('path');
const {
    MAX_SIZE,
    DICT_FOLDER_PATH
} = require('../conf/constant.js');
const {
    ErrorModel,
    SuccessModel
} = require('../model/ResModel.js');
const {
    uploadFailSizeInfo
} = require('../model/ErrorInfo.js');
const fse = require('fs-extra');

//判断文件是否存在,不存在就创建
fse.pathExists(DICT_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DICT_FOLDER_PATH);
    }
});
/**
 * 文件上传
 * @param {string} param0 name,size,type,filePath文件名，尺寸，类型，文件地址 
 * @returns 
 */
async function saveFiles({
    name,
    size,
    type,
    filePath
}) {
    if (MAX_SIZE < size) {
        await fse.remove(filePath);
        return new ErrorModel(uploadFailSizeInfo);
    }
    //移动文件
    const fileName = Date.now() + '.' + name; //防止重名
    const distFilePath = path.join(DICT_FOLDER_PATH, fileName);
    await fse.move(filePath, distFilePath);
    //返回信息
    return new SuccessModel({
        url: fileName
    });

};
module.exports = {
    saveFiles
};