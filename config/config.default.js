'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1511836451261_6421';

    // add your config here
    config.middleware = ['response'];

    return config;
};