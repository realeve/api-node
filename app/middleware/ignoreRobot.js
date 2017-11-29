module.exports = options => {
    return async function ignoreRobot(ctx, next) {
        await next();

        const env = ctx.helper.userAgent(ctx.header['user-agent']);
        // console.log(env);

        // 屏蔽爬虫数据请求
        if (options.enabled && env.browser.name == 'unknown') {
            ctx.body.isRobot = true;
            ctx.body = {
                errMsg: 'Forbidden'
            };
            ctx.status = 403;
        }
    }
}