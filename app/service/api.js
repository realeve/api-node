'use strict';

const Service = require('egg').Service;

class ApiService extends Service {
    async index() {
        const key = this.config.keys;
        return { key };
    }

    async getSqlSetting(id) {
        const data = await this.app.mysql.query('select * from sys_api where id = ?', [id]);
        return data[0];
    }
}

module.exports = ApiService;