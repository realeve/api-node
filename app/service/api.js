'use strict';

const Service = require('egg').Service;

class ApiService extends Service {
    async index() {
        const key = this.config.keys;
        return { key };
    }

    async getSqlSetting(id, nonce) {
        const sql = `SELECT
            api_name title,
            param,
            sqlStr AS 'sql',
            b.db_name,
            b.db_key,
            b.db_type,
            b.db_host,
            b.db_username,
            b.db_password,
            b.db_port,
            b.db_database
        FROM
            sys_api a
        INNER JOIN sys_database b ON a.db_id = b.id
        WHERE
            a.id = ?
        AND a.nonce =?`;

        const data = await this.app.mysql.query(sql, [id, nonce]);
        return data[0]
    }

    validateAPISetting(sql, ctx) {
        // is noncer valid
        if (!sql) {
            ctx.body = {
                msg: 'Unauthorized,noncer is error.'
            };
            ctx.status = 401;
            return false;
        }

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