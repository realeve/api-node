'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1511836451261_6421';

    // 中间件：响应时间、gzip压缩
    config.middleware = ['response', 'compress', 'ignoreRobot'];
    config.compress = {
        threshold: 1024,
    };

    // body内容最大长度
    config.bodyParser = {
        jsonLimit: '10mb',
        formLimit: '100mb',
    };

    // 关闭 CSRF 校验，使用JWT验证安全
    config.security = {
        // csrf: false,
        domainWhiteList: ['http://localhost:90'],
    };

    config.ignoreRobot = {
        enabled: false
    };

    return config;
};