const { getConnection, sql } = require("../db");

async function getAll() {
    const pool = await getConnection();
    const result = await pool.request()
        .query(`SELECT * FROM usuarios`);
    return result.recordset;
}

async function getById(id) {
    const pool = await getConnection();
    const result = await pool.request()
        .input("id", sql.Int, id)
        .query(`SELECT * FROM usuarios WHERE id = @id`);
    return result.recordset[0];
}

async function create(usuario) {
    const pool = await getConnection();
    await pool.request()
        .input("nombre", sql.NVarChar(100), usuario.nombre)
        .input("correo", sql.NVarChar(150), usuario.correo)
        .input("password_hash", sql.NVarChar(255), usuario.password_hash)
        .input("fecha_registro", sql.DateTime, usuario.fecha_registro || new Date())
        .query(`
            INSERT INTO usuarios (nombre, correo, password_hash, fecha_registro)
            VALUES (@nombre, @correo, @password_hash, @fecha_registro)
        `);
}

async function update(id, usuario) {
    const pool = await getConnection();
    const result = await pool.request()
        .input("id", sql.Int, id)
        .input("nombre", sql.NVarChar(100), usuario.nombre)
        .input("correo", sql.NVarChar(150), usuario.correo)
        .input("password_hash", sql.NVarChar(255), usuario.password_hash)
        .query(`
            UPDATE usuarios
            SET nombre = @nombre,
                correo = @correo,
                password_hash = @password_hash
            WHERE id = @id
        `);
    return result.rowsAffected[0];
}

async function remove(id) {
    const pool = await getConnection();
    const result = await pool.request()
        .input("id", sql.Int, id)
        .query(`DELETE FROM usuarios WHERE id = @id`);
    return result.rowsAffected[0];
}

async function getByEmail(correo) {
    const pool = await getConnection();
    const result = await pool.request()
        .input("correo", sql.NVarChar(150), correo)
        .query("SELECT * FROM usuarios WHERE correo = @correo");
    return result.recordset[0]; // devuelve un solo usuario o undefined
}



module.exports = { getByEmail,getAll, getById, create, update, remove};
