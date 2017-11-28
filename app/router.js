'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app

    // home
    router.get('/', controller.api.index);

    // api列表
    router.get('/api/', controller.api.index);

    // 获取指定ID数据
    router.get('/api/:id', controller.api.show);

    // 插入数据
    router.post('/api/', controller.api.create);

    // 更新数据
    router.put('/api/', controller.api.update);

    // 删除数据
    router.delete('/api/', controller.api.destroy);
};