module.exports = {
    // database configuration
    client: {
        // host
        host: "127.0.0.1",
        // port
        port: "3306",
        // username
        user: "root",
        // password
        password: "root",
        // database
        database: "api"
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false
};