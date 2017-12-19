"use strict";

const Controller = require("egg").Controller;
const jwt = require("jsonwebtoken");
const fs = require("fs");

class LoginController extends Controller {
    async index() {
        const { ctx } = this;

        // 需要附加的用户个人数据
        const playload = this.login(ctx.query);

        // 证书的生成：openssl req -newkey rsa:2048 -new -nodes -keyout key.pem -out csr.pem
        const cert = fs.readFileSync(__dirname + "\\key\\csr.pem");

        // expiresIn: expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
        const token = jwt.sign({ user: playload }, cert, {
            expiresIn: "30 days"
        });

        ctx.body = {
            // playload,
            token
            // secrect: JSON.parse(Buffer(token.split(".")[0], "base64").toString()),
            // playloadInfo: JSON.parse(Buffer(token.split(".")[1], "base64").toString())
        };
    }

    login(query) {
        // 此处加入登录逻辑,如果登录成功返回对应数据
        const user = {
            name: query.user,
            psw: query.psw,
            fullname: "张三",
            uid: 2,
            type: 4
        };

        delete user.psw;

        return user;
    }
}

module.exports = LoginController;