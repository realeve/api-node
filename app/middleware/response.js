module.exports = () => {
    return async function responseMiddleware(ctx, next) {
        const start = Date.now();
        await next();
        const delta = Math.ceil(Date.now() - start);
        ctx.set('X-Response-Time', delta + 'ms');

        // 只对json数据做此处理
        if (ctx.response.header['content-type'].includes('application/json')) {
            ctx.body = ctx.body.replace('{', `{"xResponseTime":"${delta}ms",`);
        }
    }
}