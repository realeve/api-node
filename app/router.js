"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    const validator = app.middleware.validator();
    // console.log(validator);
    // home
    router.get("/", controller.api.index);

    router.get("/login", controller.login.index);

    // api列表
    router.get("/api/", controller.api.index);

    // 获取指定ID数据
    router.get("/api/:id", validator.query, controller.api.show);

    // 插入数据
    router.post("/api/", controller.api.create);

    // 更新数据
    router.put("/api/", validator.update, controller.api.update);

    // 删除数据
    router.delete("/api/", validator.update, controller.api.destroy);
};