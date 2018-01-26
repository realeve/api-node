const defaultSetting = {
    // host
    host: "127.0.0.1",
    // port
    port: "3306",
    // username
    user: "root",
    // password
    password: "root"
}

// 此处 db1,db2 要与 api.sys_database 中 db_key中的设置保持一致；
// db1应为默认数据库
const db1 = {
    database: 'api'
}

const db2 = {
    database: 'kpi'
}


module.exports = {
    // database configuration
    clients: {
        db1,
        db2
    },
    default: defaultSetting,
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false
};