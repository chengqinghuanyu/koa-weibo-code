/*
 * @Author: ypx
 * @Date: 2021-07-17 18:28:07
 * @LastEditTime: 2021-07-17 19:48:43
 * @LastEditors: Please set LastEditors
 * @Description: 链接redis方法
 * @FilePath: /nodejs/koa2-weibo-code/src/catch/_redis.js
 */
const redis = require('redis');
const {
    REDIS_CONFIG
} = require('../conf/db.js');
//创建客户端链接
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);
redisClient.on('error', err => {
    console.log('redis-err:', err);
});
//定义set和get方法
/**
 * 
 * @param {string} key 键
 * @param string val 值
 * @param num timeout 过期时间单位1s
 */
function set(key, val, timeout = 60 * 60) {
    if (typeof val === 'object') {
        val = JSON.stringify(val);
    }
    redisClient.set(key, val);
    redisClient.expire(key, timeout);
};

/**
 * redis 键
 * @param {key} key 键 
 */
function get(key) {
    const promise = new Promise((res, rej) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                rej(err);
            }
            if (!key) {
                rej(null);
            }
            try {
                res(JSON.parse(val));
            } catch (error) {
                res(val);
            }

        });
    });

    return promise;
};

module.exports = {
    set,
    get
};