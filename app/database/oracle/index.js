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


const query = async(sql, params = []) => {
    if (typeof sql === 'string') {
        sql = {
            sql,
            db_key: 'db1'
        }
    }
    const conn = await oracledb.getConnection(config[sql.db_key]);
    const result = await conn.execute(handleSql(sql.sql), params);
    await conn.release();
    const data = result.rows;
    return {
        rows: data.length,
        header: result.metaData.map(item => item.name),
        data
    };
};

module.exports = { query };