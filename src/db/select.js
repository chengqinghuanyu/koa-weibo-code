/*
 * @Author: your name
 * @Date: 2021-07-17 10:18:20
 * @LastEditTime: 2021-07-17 11:01:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /sequelize-test/src/select.js
 */
const {
    User,
    Blog
} = require('./modal');
!(async function () {
    //查询一条
    // const zhangsan = await User.findOne({
    //     where: {
    //         userName: 'zhangsan'
    //     }
    // })
    // console.log(zhangsan);
    //使用用户名和nickName查询，查询一条
    // const zhangsanName = await User.findOne({
    //     arrtributes: ['userName', 'nickName'],
    //     where: {
    //         userName: 'zhangsan'
    //     }
    // })
    // console.log('zhangsanName', zhangsanName);
    //查询所有数据的特定值
    // const zhangsanBlogList = await Blog.findAll({
    //     where: {
    //         userId: 7
    //     },
    //     order: [
    //         ['id', 'desc']
    //     ]
    // });
    // console.log('zhangsanBlogList', zhangsanBlogList.map(blog => blog.dataValues));

    //查询所有，跳过多少条
    // const blogPageList = await Blog.findAll({
    //     limit: 2, //限制查询2条，
    //     offset: 0, //不跳过
    //     order: [
    //         ['id', 'desc']
    //     ]
    // })
    // console.log('blogPageList', blogPageList.map(blog => blog.dataValues));
    //查询总数
    // const blogListAndCount = await Blog.findAndCountAll({
    //     limit: 1,
    //     offset: 1,
    //     order: [
    //         ['id', 'desc']
    //     ]
    // });
    // console.log('blogListAndCount', blogListAndCount.count, blogListAndCount.rows.map(blog => blog.dataValues));

    //连表查询blog-user
    // const blogListWithUser = await Blog.findAndCountAll({
    //     order: [
    //         ['id', 'desc']
    //     ],
    //     include: [{
    //         model: User,
    //         attributes: ['userName', 'nickName'],
    //         where: {
    //             userName: 'zhangsan'
    //         }
    //     }]
    // });

    // console.log('blogListWithUser',
    //     blogListWithUser.count,
    //     blogListWithUser.rows.map(blog => {
    //         const blogVal = blog.dataValues;
    //         blogVal.user = blogVal.user.dataValues;
    //         return blogVal;
    //     })
    // );

    const userListWithBlog = await User.findAndCountAll({
        attributes: ['userName', 'nickName'],
        include: [{
            model: Blog
        }]
    });
    console.log('userListWithBlog',
        userListWithBlog.count,
        userListWithBlog.rows.map(user => {
            const userVal = user.dataValues;
            userVal.blogs = userVal.blogs.map(blog => blog.dataValues);

            return userVal;
        })

    );
})()