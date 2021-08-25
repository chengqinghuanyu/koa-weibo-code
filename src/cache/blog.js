/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-22 11:15:04
 * @LastEditTime: 2021-08-25 22:34:45
 * @LastEditors: Please set LastEditors
 * @Description: 微博缓存
 * @FilePath: /nodejs/koa2-weibo-code/src/cache/blog.js
 */
const {
    get,
    set
} = require('./_redis.js');
const {
    getBlogListByUser
} = require('../services/blog.js');
//redis-key前缀
const KEY_PREFIX = 'weibo:square:';
/**
 * 缓存分页
 * @param {number} pageIndex 页数
 * @param {number} pageSize 每页数量
 */
async function getSquareCatchList({
    pageIndex,
    pageSize
}) {
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`;
    //尝试获取缓存
    //console.log('缓存：1111');
    const catchResult = await get(key);
    // console.log('我的缓存：',
    //     catchResult);
    if (catchResult != null) {
        return catchResult;
    }
    //没有缓存或者缓存过期就从数据库读取
    const result = await getBlogListByUser({
        pageIndex,
        pageSize
    });
    console.log('输出catch的查询结果：', result);
    //设置缓存，值，过期时间1min
    set(key, result, 60);
    return result;

}

module.exports = {
    getSquareCatchList
};