/*
 * @Author: your name
 * @Date: 2021-07-17 21:30:55
 * @LastEditTime: 2021-07-17 21:35:17
 * @LastEditors: Please set LastEditors
 * @Description: 测试用例
 * @FilePath: /nodejs/koa2-weibo-code/test/demo.test.js
 */
function sum(a, b) {
    return a + b;
}
test('100+300=400', () => {
    let res = sum(100, 300);
    expect(res).toBe(400);
})