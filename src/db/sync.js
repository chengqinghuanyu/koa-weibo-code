/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-17 09:30:54
 * @LastEditTime: 2021-07-17 19:45:30
 * @LastEditors: Please set LastEditors
 * @Description: 描述sequelize同步
 * @FilePath: /sequelize-test/src/sync.js
 */

const seq = require('./seq');
// require('./modal');
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