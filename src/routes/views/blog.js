/*
 * @Author: 尹鹏孝
 * @Date: 2021-08-08 09:51:46
 * @LastEditTime: 2021-08-25 22:32:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nodejs/koa2-weibo-code/src/routes/views/blog.js
 */
const router = require('koa-router')();
const {
    getFans,
    getFollowers
} = require('../../controller/user-relation.js');
const {
    loginRedirect,
    loginCheck
} = require('../../middleWares/loginChecks.js');
const {
    getProfileBlogList
} = require('../../controller/blog-profile.js');
const {
    getSquareBlogList
} = require('../../controller/blog-square.js');
const {
    getUserInfo
} = require('../../services/user.js');
const moment = require('moment');
//首页
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {});
});
//个人首页
router.get('/profile', loginRedirect, async (ctx, next) => {
    const {
        userName
    } = ctx.session.userInfo;
    ctx.redirect('/profile/' + userName);
});
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    const {
        userName: currentUser
    } = ctx.params;

    const currUserInfo = await getUserInfo(currentUser);
    //console.log('获取当前用信息：', currUserInfo);
    const {
        userInfo
    } = ctx.session;


    const result = await getProfileBlogList(currentUser, 0);
    const {
        isEmpty,
        blogList,
        pageSize,
        pageIndex,
        count
    } = result.data;

    //获取第一页数据 

    blogList.forEach(item => {
        item.createdAt = moment(item.createdAt).format('YYYY-MM-DD h:mm:ss a');
        item.updatedAt = moment(item.updatedAt).format('YYYY-MM-DD h:mm:ss a');
    });
    //获取粉丝
    const fansResult = await getFans(currUserInfo.id);
    const {
        count: fansCount,
        userList: fansList
    } = fansResult.data;
    //console.log('粉丝列表：', fansList);
    //获取关注人列表
    const followersResult = await getFollowers(currUserInfo.id);
    const {
        followersList,
        count: followersCount
    } = followersResult.data;
    //我是否关注了此人
    const amFollowed = fansList.some(item => item.userName == userInfo.userName);
    // console.log('是否被关注：', amFollowed);
    // console.log('关注人列表：', followersCount);
    // console.log('关注人列表：', followersList);
    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count,
            userName: currentUser,
        },
        userData: {
            userInfo: currUserInfo,
            isMe: '',
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
                list: followersList,
                count: followersCount
            },
            amFollowed,
        }
    });

});
//微博广场
router.get('/square', loginRedirect, async (ctx, next) => {

    const result = await getSquareBlogList(0);
    const {
        isEmpty,
        blogList,
        pageSize,
        pageIndex,
        count
    } = result.data;
    //获取第一页数据 
    blogList.forEach(item => {
        item.createdAt = moment(item.createdAt).format('YYYY-MM-DD h:mm:ss a');
        item.updatedAt = moment(item.updatedAt).format('YYYY-MM-DD h:mm:ss a');
    });
    console.log('输出广场列表数据：', blogList);
    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    });

});



module.exports = router;