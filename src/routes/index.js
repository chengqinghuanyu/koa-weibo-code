/*
 * @Author: your name
 * @Date: 2021-07-15 21:03:11
 * @LastEditTime: 2021-07-17 11:58:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo-code/src/routes/index.js
 */
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  //异步读取数据

  await ctx.render('index', {
    title: 'Hello Koa 2!',
    msg: '你好',
    isMe: true,
    blogList: [{
      id: 1,
      title: 'aaa'
    }, {
      id: 2,
      title: 'bbb'
    }, {
      id: 3,
      title: 'ccc'
    }, {
      id: 4,
      title: 'ddd'
    }]
  })
})

router.get('/string', async (ctx, next) => {
  //debugger
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/profile/:userName', async (ctx, next) => {
  let {
    userName
  } = ctx.params;
  ctx.body = {
    title: 'this is profile',
    userName
  }
})
router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
  let {
    userName,
    pageIndex
  } = ctx.params;
  ctx.body = {
    title: 'this is loadMoreAPI',
    userName,
    pageIndex
  }
})
module.exports = router