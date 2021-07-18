/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-17 09:30:54
 * @LastEditTime: 2021-07-18 20:03:10
 * @LastEditors: Please set LastEditors
 * @Description: 描述sequelize同步
 * @FilePath: /sequelize-test/src/sync.js
 */

const seq = require('./seq.js');
require('./model/index.js');
seq.authenticate().then(() => {
    console.log('as ok');
}).catch(err => {
    console.log(err);
});
seq.sync({
    force: true
}).then(() => {
    console.log('async ok');
    process.exit();
});