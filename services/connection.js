const mysql = require('mysql2/promise');
const db = require('../database');


async function query(sql, params){

    const conn = await mysql.createConnection(db.db);
    const [results, ] = await conn.execute(sql,params);

    return results;
}

module.exports = {
    query
}