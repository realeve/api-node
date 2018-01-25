'use strict';

const Service = require('egg').Service;

class ApiService extends Service {
    async index() {
        const key = this.config.keys;
        return { key };
    }

    async getSqlSetting(id, nonce) {
        return await this.app.mysql.query("select db_id*1 id,api_name title,param,sqlStr as 'sql'from sys_api where id = ? and nonce=?", [id, nonce]);
    }

    validateAPISetting(sql, ctx) {
        // is noncer valid
        if (!sql.length) {
            ctx.body = {
                msg: 'Unauthorized,noncer is error.'
            };
            ctx.status = 401;
            return false;
        }
        sql = sql[0];

        // param valid
        if (Reflect.get(sql, 'param')) {
            const params = sql.param.split(',');
            const query = ctx.query;
            const queries = ctx.queries;
            const invalidParam = [];
            params.forEach(item => {
                if (!Reflect.has(query, item) && !Reflect.has(queries, item)) {
                    invalidParam.push(`'${item}'`);
                }
            })

            if (invalidParam.length) {
                ctx.body = {
                    msg: `Unauthorized,param ${invalidParam.join('\ and\ ')} must be provided.`
                };
                ctx.status = 401;
                return false;
            }
        }

        return true;
    }

}

module.exports = ApiService;