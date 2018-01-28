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

        ctx.body = {
            data: result.data,
            header: result.header,
            rows: result.data.length,
            source: '数据来源:' + sql.db_name,
            title: sql.title,
        };

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
        const data = await mssql.query("select * from tblApi");

        this.ctx.body = data;
    }

    async orcl() {
        const data = await orcl.query('select * from tbl_user');
        console.log(data)
        this.ctx.body = data
    }
}

module.exports = ApiController;