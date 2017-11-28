'use strict';

const Controller = require('egg').Controller;

class ApiController extends Controller {
    async index() {
        const ctx = this.ctx;
        const id = ctx.query.id;
        const data = await ctx.service.api.index();
        data.id = id;
        ctx.body = data;
    }
}

module.exports = ApiController;