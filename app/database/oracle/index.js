const oracledb = require('oracledb');

const config = require("./config");

const handleSql = sql => {
    let idx = 0;
    while (sql.includes('?')) {
        sql = sql.replace('?', ':bv' + idx);
        idx++;
    }
    return sql;
}

const query = async(sqlStr, params = []) => {
    const conn = await oracledb.getConnection(config.db1);
    const result = await conn.execute(handleSql(sqlStr), params);
    const data = result.rows
    return {
        rows: data.length,
        header: data.length === 0 ? [] : Object.keys(data[0]),
        data
    };
};

module.exports = { query };