'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

class ApiService extends Service {
    async index() {
        const key = this.config.keys;
        return { key };
    }

    async getSqlSetting(id, nonce) {
        //     b.db_host,
        //     b.db_username,
        //     b.db_password,
        //     b.db_port,
        //     b.db_database
        const sql = `SELECT
            api_name title,
            param,
            sqlStr AS 'sql',
            b.db_name,
            b.db_key,
            b.db_type
        FROM
            sys_api a
        INNER JOIN sys_database b ON a.db_id = b.id
        WHERE
            a.id = ?
        AND a.nonce =?`;

        const data = await this.app.mysql.get(this.config.APIDB_KEY).query(sql, [id, nonce]);
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

    // 按param顺序处理查询参数
    handleAPIParams(param, ctx) {
        let query = ctx.query;
        const queries = _.cloneDeep(ctx.queries);
        Object.keys(queries).forEach(item => {
            queries[item] = queries[item].length ? queries[item] : queries[item][0]
        });
        query = Object.assign(query, queries);
        return param.split(',').map(item => query[item]);
    }

    async getDataFromMySQL(sql, ctx) {
        const client = this.app.mysql.get(sql.db_key);
        const params = this.handleAPIParams(sql.param, ctx);
        return await client.query(sql.sql, params);
    }

    async getAPIData(sql, ctx) {
        if (sql.db_type === 'mysql') {
            return await this.getDataFromMySQL(sql, ctx);
        }
        return [{
            msg: 'unknown type of database type : ' + sql.db_type
        }]
    }

}

module.exports = ApiService;