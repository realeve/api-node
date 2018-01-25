const ua_parser = require("ua_parser");
const _ = require('lodash');

module.exports = {
    isInteger(num) {
        return _.isInteger(num);
        // return Number.parseInt(num, 10) == num;
    },
    userAgent(ua) {
        return ua_parser.userAgent(ua);
    }
}