const sql = require("mssql");
require("dotenv").config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: false, // true si usas Azure
        trustServerCertificate: true
    }
};

async function getConnection() {
    try {
        const pool = await sql.connect(dbConfig);
        return pool;
    } catch (err) {
        console.error("DB connection error:", err);
        throw err;
    }
}

module.exports = { getConnection, sql };
