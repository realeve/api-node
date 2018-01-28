'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const orcl = require('../database/oracle');

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
        param = param || '';
        if (!param.trim().length) {
            return [];
        }
        let query = _.cloneDeep(ctx.query);
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
        const data = await client.query(sql.sql, params);
        const header = data.length ? Object.keys(data[0]) : [];
        return {
            data,
            header
        }
    }

    async getDataFromOrcl(sql, ctx) {
        const params = this.handleAPIParams(sql.param, ctx);
        return await orcl.query(sql, params);
    }

    async getAPIData(sql, ctx) {
        let result = [];
        ctx.query.mode = ctx.query.mode || 'array';
        switch (sql.db_type) {
            case 'mysql':
                result = await this.getDataFromMySQL(sql, ctx);
                result = this.handleData(result, ctx);
                break;
            case 'orcl':
                result = await this.getDataFromOrcl(sql, ctx);
                if (ctx.query.mode === 'object') {
                    result.data = result.data.map(item => {
                        const obj = {};
                        result.header.forEach((key, i) => {
                            obj[key] = item[i]
                        })
                        return obj;
                    });
                }
                break;
            default:
                break;
        }

        return this.handleData(result, ctx);
    }

    handleData(result, ctx) {
        if (ctx.query.mode === 'array') {
            result.data = result.data.map(item => Object.values(item));
        }
        return result
    }

}

module.exports = ApiService;