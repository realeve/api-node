module.exports = () => {
    return async function responseMiddleware(ctx, next) {
        const start = Date.now();
        await next();
        const delta = Math.ceil(Date.now() - start);
        ctx.set('X-Response-Time', delta + 'ms');
    }
}