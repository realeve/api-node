const util = require('../../public/util');

const db1 = {
    user: "orcl",
    password: "orcl",
    host: "127.0.0.1",
    port: 1521,
    sid: 'ORCL'
}

module.exports = {
    db1: util.getOrclConfig(db1)
}