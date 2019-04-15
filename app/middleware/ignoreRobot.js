// 请求头的user-agent为unknown时，不是chrome/ie/edge/firefox/safari等浏览器，不返回数据
// 在config.default.js中配置 enabled开关本中间件
module.exports = options => {
    return async function ignoreRobot(ctx, next) {
        await next();

        const env = ctx.helper.userAgent(ctx.header['user-agent']);
        // console.log(env);

        // ctx.body.ip = ctx.ip;

        // 屏蔽爬虫数据请求
        if (options.enable && env.browser.name === 'unknown') {
            ctx.body.isRobot = true;
            ctx.body = {
                errMsg: 'Forbidden'
            };
            ctx.status = 403;
        }
    }
}