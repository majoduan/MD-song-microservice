const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

async function getConnection() {
    try {
        const pool = await sql.connect(dbConfig);
        return pool;
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
}

module.exports = {
    getConnection
};