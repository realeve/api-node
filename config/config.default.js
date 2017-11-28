'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1511836451261_6421';

    // add your config here
    // config.middleware = ['response', 'gzip'];

    // config.gzip = {
    //     threshold: 1024,
    // }

    // 中间件：响应时间、gzip压缩
    config.middleware = ['response', 'compress'];
    config.compress = {
        threshold: 1024,
    };

    // 关闭 CSRF 校验，使用JWT验证安全
    config.security = {
        csrf: false
    };

    return config;
};