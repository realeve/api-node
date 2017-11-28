'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app

    router.get('/', controller.api.index);

    router.get('/api/:id', controller.api.api);
};