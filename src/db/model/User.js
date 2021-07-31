/*
 * @Author: 尹鹏孝
 * @Date: 2021-07-18 19:40:45
 * @LastEditTime: 2021-07-29 21:41:13
 * @LastEditors: Please set LastEditors
 * @Description: 用户数据模型
 * @FilePath: /nodejs/koa2-weibo-code/src/db/modal/User.js
 */
const seq = require('../seq.js');
const {
    STRING,
    DECIMAL,
    TEXT,
    INTEGER,
    BOOLEAN
} = require('../types.js');
//用户
const User = seq.define('user', {
    userName: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: '用户名'
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: '密码'
    },
    nickName: {
        type: STRING,
        allowNull: false,
        comment: '昵称'
    },
    gender: {
        type: DECIMAL,
        allowNull: false,
        defaultValue: 3,
        comment: '性别1：男，2：女，3:保密，默认是3保密'
    },
    picture: {
        type: STRING,
        comment: '头像：头像地址'
    },
    city: {
        type: STRING,
        comment: '城市'
    }

});

module.exports = {
    User
};