"use strict";

const Controller = require("egg").Controller;
const mssql = require('../database/mssql');

class ApiController extends Controller {
    async index() {
        const ctx = this.ctx;
        const query = ctx.query;
        let data = await ctx.service.api.index();
        data = Object.assign(data, {
            query,
            data: "中文内容测试"
        });
        ctx.body = data;
    }

    async options() {
        const { ctx } = this;
        ctx.body = {
            type: "options"
        };
    }

    async show() {
        const { ctx } = this;
        const id = ctx.params.id;
        const query = ctx.query;

        const queries = ctx.queries;
        let data = await ctx.service.api.index();

        const sql = await ctx.service.api.getSqlSetting(id);

        data = Object.assign(data, {
            id,
            sql,
            query,
            queries,
            data: "api路由测试"
        });
        ctx.body = data;
        ctx.status = 200;
    }

    async create() {
        const { ctx } = this;
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
        const { ctx } = this;
        ctx.body = {
            type: "put",
            condition: ctx.request.body.condition
        };
        ctx.status = 204;
    }

    async destroy() {
        const { ctx } = this;

        ctx.body = {
            type: "delete"
        };
    }

    async mssql() {
        const data = await mssql.query("select * from tblApi");

        this.ctx.body = data;
    }

    async mysql() {
        const data = await this.app.mysql.query("select * from sys_api");
        const header = (() => {
            if (!data.length) {
                return [];
            }
            return Object.keys(data[0]);
        })();

        this.ctx.body = {
            rows: data.length,
            header,
            data
        };
    }
}

module.exports = ApiController;