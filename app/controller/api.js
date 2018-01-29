"use strict";

const Controller = require("egg").Controller;
const mssql = require('../database/mssql');
const orcl = require('../database/oracle');

class ApiController extends Controller {
    async index() {
        const ctx = this.ctx;
        ctx.body = 'hello world';
    }

    async options() {
        const {
            ctx
        } = this;
        ctx.body = {
            type: "options"
        };
    }

    // orcl:http://localhost:7001/api/20?nonce=cfa450c2d0&mode=object
    // mysql:http://localhost:7001/api/3/?nonce=e4e497e849
    // http://localhost:7001/api/13/?nonce=e7bfeab257&uid=3&task_id=1&mode=array
    // mssql:http://localhost:7001/api/21?nonce=e0db8c647f&aid=3&author=develop

    async show() {
        const {
            ctx
        } = this;
        const id = ctx.params.id;
        const sql = await ctx.service.api.getSqlSetting(id, ctx.query.nonce);
        const validate = ctx.service.api.validateAPISetting(sql, ctx);
        if (!validate) {
            return;
        }

        const result = await ctx.service.api.getAPIData(sql, ctx);

        ctx.body = Object.assign({
            rows: result.data.length,
            source: '数据来源:' + sql.db_name,
            title: sql.title,
        }, result);

        ctx.status = 200;
    }

    async create() {
        const {
            ctx
        } = this;
        const reqInfo = ctx.request.body;
        ctx.body = {
            type: "post",
            reqInfo,
            header: ctx.header
        };
        ctx.status = 201;
    }

    /*
            调用：
            var dataUrl = 'http://localhost:7001/api';
            var option = {
                url: dataUrl,
                method: 'put',
                data: { condition: { id: 1 } }
            }

            axios(option).then(res => {
                console.log(res.data);
            });
        */
    async update() {
        const {
            ctx
        } = this;
        ctx.body = {
            type: "put",
            condition: ctx.request.body.condition
        };
        ctx.status = 204;
    }

    async destroy() {
        const {
            ctx
        } = this;

        ctx.body = {
            type: "delete"
        };
    }

    async mssql() {
        const data = await mssql.query({
            sql: "select * from tblApi",
            db_username: 'sa',
            db_password: '123',
            db_host: '127.0.0.1',
            db_database: 'api'
        });

        this.ctx.body = data;
    }

    async orcl() {
        // const data = await orcl.query('select * from "tbl_user" a where a."id"=?', [3]);
        const data = await orcl.query('select * from "tbl_user" a ');
        this.ctx.body = data;
    }
}

module.exports = ApiController;