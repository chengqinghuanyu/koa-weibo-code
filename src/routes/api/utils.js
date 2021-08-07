/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-07 10:21:44
 * @LastEditTime: 2021-08-07 11:26:06
 * @LastEditors: Please set LastEditors
 * @Description: 工具路由
 * @FilePath: /nodejs/koa2-weibo-code/src/routes/api/utils.js
 */
const router = require('koa-router')();
router.prefix('/api/utils');
const {
    loginCheck
} = require('../../middleWares/loginChecks.js');
const koaForm = require('formidable-upload-koa');
const {
    saveFiles
} = require('../../controller/utils.js');
//上传图片
router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
    const file = ctx.req.files['file'];
    const {
        size,
        path,
        name,
        type
    } = file;
    //controller
    ctx.body = await saveFiles({
        size,
        filePath: path,
        name,
        type
    });

});

module.exports = router;