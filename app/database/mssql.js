// const config = require("./config");
const sql = require("mssql");

const getData = async(sql, pool, param) => {
    const request = await pool.request();
    let idx = 0;
    while (sql.includes('?')) {
        const key = 'param' + idx;
        request.input(key, param[idx]);
        sql = sql.replace('?', '@' + key);
        idx++;
    }
    return await request.query(sql);
}

const query = async(option, param) => {
    const config = {
        user: option.db_username,
        password: option.db_password,
        server: option.db_host, // You can use 'localhost\\instance'
        database: option.db_database
    }

    const pool = await sql.connect(config);
    const result = await getData(option.sql, pool, param);
    await sql.close();
    return {
        data: result.recordset,
        header: Object.keys(result.recordset.columns),
        rows: result.rowsAffected[0]
    };
};

module.exports = { query };