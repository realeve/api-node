"use strict";

const Controller = require("egg").Controller;
const jwt = require("jsonwebtoken");

class LoginController extends Controller {
    async index() {
        const { ctx } = this;
        const playload = this.login(ctx.query);
        const cert = "shhhhhdasdfasdf";

        // algorithm (default: HS256)
        // expiresIn: expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"

        const token = jwt.sign(playload, cert, { expiresIn: "30 days" });

        ctx.body = {
            playload,
            token,
            secrect: JSON.parse(Buffer(token.split(".")[0], "base64").toString()),
            playloadInfo: JSON.parse(Buffer(token.split(".")[1], "base64").toString())
        };
    }

    login(query) {
        let user = {
            namename: query.user,
            psw: query.psw,
            uid: 2,
            type: 4
        };
        return user;
    }
}

module.exports = LoginController;