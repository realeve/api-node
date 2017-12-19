"use strict";

const Controller = require("egg").Controller;

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
        data = Object.assign(data, {
            id,
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
    }

    async destroy() {
        const { ctx } = this;

        ctx.body = {
            type: "delete"
        };
    }
}

module.exports = ApiController;