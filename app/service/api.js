'use strict';

const Service = require('egg').Service;

class ApiService extends Service {
    async index() {
        const key = this.config.keys;
        return { key };
    }
}

module.exports = ApiService;