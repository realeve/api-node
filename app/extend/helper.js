const ua_parser = require("ua_parser");

module.exports = {
    isInteger(num) {
        return Number.parseInt(num, 10) == num;
    },
    userAgent(ua) {
        return ua_parser.userAgent(ua);
    }
}