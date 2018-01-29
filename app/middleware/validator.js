/**
 * 验证查询请求的id,nonce两个必要参数
 * 如果验证通过应返回更新对应 sql 语句
 * 同时需在该模块中添加jwt/oAuth2等的验证结果
 */

module.exports = options => {
    async function query(ctx, next) {
        const id = ctx.params.id;
        const nonce = ctx.params.nonce;
        const rules = {
            id: { type: 'id' },
            nonce: { type: 'string' }
        };
        try {
            ctx.validate(rules, {
                id,
                nonce
            });
        } catch (err) {
            ctx.logger.warn(err.errors);
            ctx.body = { errMsg: err.errors };
            ctx.status = 422;
            return;
        }

        await next();
    }

    async function update(ctx, next) {

        const body = ctx.request.body;
        const rules = {
            condition: { type: 'object' }
        };

        try {
            ctx.validate(rules, {
                condition: body.condition
            });
        } catch (err) {
            ctx.logger.warn(err.errors);
            ctx.body = { errMsg: err.errors };
            ctx.status = 422;
            return;
        }

        await next();
    }
    return {
        query,
        update
    }
}