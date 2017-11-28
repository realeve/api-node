'use strict';

const Controller = require('egg').Controller;

class ApiController extends Controller {
    async index() {
        const ctx = this.ctx;
        const id = ctx.query.id;
        let data = await ctx.service.api.index();
        data = Object.assign(data, {
            id,
            data: '中文内容测试'
        })
        ctx.body = data;
    }

    async options() {
        const { ctx } = this;
        ctx.body = {
            type: 'options'
        }
    }

    async show() {
        const { ctx } = this;
        const id = ctx.params.id;
        let data = await ctx.service.api.index();
        data = Object.assign(data, {
            id,
            data: 'api路由测试',
            type: ctx.helper.isInteger(id)
        });
        ctx.body = data;
    }

    async create() {
        const { ctx } = this;

        ctx.body = {
            type: 'post'
        }
    }

    async update() {
        const { ctx } = this;

        ctx.body = {
            type: 'put'
        }
    }

    async destroy() {
        const { ctx } = this;

        ctx.body = {
            type: 'delete'
        }
    }
}

module.exports = ApiController;