// 获取orcl连接设置
const getOrclConfig = config => {
    let port = config.port || 1521;
    return {
        user: config.user,
        password: config.password,
        connectString: `${config.host}:${config.port}/${config.sid}`
    }
}

module.exports = { getOrclConfig }