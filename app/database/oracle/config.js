// 获取orcl连接设置
const getOrclConfig = config => {
    let port = config.port || 1521;
    return {
        user: config.user,
        password: config.password,
        connectString: `${config.host}:${config.port}/${config.sid}`
    }
}

const db1 = {
    user: "orcl",
    password: "orcl",
    host: "127.0.0.1",
    port: 1521,
    sid: 'ORCL'
}

module.exports = {
    db1: getOrclConfig(db1)
}