const oracledb = require('oracledb');

// This can be either of the Oracledb constants oracledb.ARRAY or oracledb.OBJECT. The default value is oracledb.ARRAY which is more efficient.
// https://github.com/oracle/node-oracledb/blob/master/doc/api.md#queryoutputformats
oracledb.outFormat = oracledb.ARRAY; // oracledb.OBJECT;

const getOrclConfig = option => {
    return {
        user: option.db_username,
        password: option.db_password,
        connectString: `${option.db_host}:${option.db_port}/${option.db_database}`
    }
}

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
    const config = getOrclConfig(sql);
    const conn = await oracledb.getConnection(config);
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