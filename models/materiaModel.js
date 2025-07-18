const { getConnection, sql } = require("../db");

async function getAll() {
    const pool = await getConnection();
    const result = await pool.request()
        .query(`SELECT * FROM materias`);
    return result.recordset;
}

async function getById(id) {
    const pool = await getConnection();
    const result = await pool.request()
        .input("id", sql.Int, id)
        .query(`SELECT * FROM materias WHERE id = @id`);
    return result.recordset[0];
}

async function create(materia) {
    const pool = await getConnection();
    await pool.request()
        .input("nombre", sql.NVarChar(100), materia.nombre)
        .input("descripcion", sql.NVarChar(sql.MAX), materia.descripcion || null)
        .query(`
            INSERT INTO materias (nombre, descripcion)
            VALUES (@nombre, @descripcion)
        `);
}

async function update(id, materia) {
    const pool = await getConnection();
    const result = await pool.request()
        .input("id", sql.Int, id)
        .input("nombre", sql.NVarChar(100), materia.nombre)
        .input("descripcion", sql.NVarChar(sql.MAX), materia.descripcion || null)
        .query(`
            UPDATE materias
            SET nombre = @nombre,
                descripcion = @descripcion
            WHERE id = @id
        `);
    return result.rowsAffected[0];
}

async function remove(id) {
    const pool = await getConnection();
    const result = await pool.request()
        .input("id", sql.Int, id)
        .query(`DELETE FROM materias WHERE id = @id`);
    return result.rowsAffected[0];
}

async function getByName(nombre) {
    const pool = await getConnection();
    const result = await pool.request()
        .input("nombre", sql.NVarChar(100), `%${nombre}%`)
        .query(`
            SELECT * FROM materias 
            WHERE nombre LIKE @nombre
        `);
    return result.recordset;
}


module.exports = { getAll, getById, create, update, remove, getByName };
