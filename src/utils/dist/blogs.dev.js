"use strict";

/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-21 16:59:30
 * @LastEditTime: 2021-08-22 10:06:51
 * @LastEditors: Please set LastEditors
 * @Description: 微博相关的模板解析方法
 * @FilePath: /nodejs/koa2-weibo-code/src/utils/blogs.js
 */
var fs = require('fs');

var path = require('path');

var ejs = require('ejs');

var BLOG_LIST_TPL = fs.readFileSync(path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')).toString();
/**
 * 微博列表渲染
 * @param {array} blogList 微博列表
 * @param {boolean} canReply 是否可以回复
 * @returns 
 */

function getBlogListStr() {
  var blogList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var canReply = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return ejs.render(BLOG_LIST_TPL, {
    blogData: {
      blogList: blogList,
      canReply: canReply
    }
  });
}

;
module.exports = {
  getBlogListStr: getBlogListStr
};