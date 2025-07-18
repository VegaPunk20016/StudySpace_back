const { getConnection, sql } = require("../db");

async function getAll() {
    const pool = await getConnection();
    const result = await pool.request()
        .query(`SELECT * FROM sesiones`);
    return result.recordset;
}

async function getById(id) {
    const pool = await getConnection();
    const result = await pool.request()
        .input("id", sql.Int, id)
        .query(`SELECT * FROM sesiones WHERE id = @id`);
    return result.recordset[0];
}

async function create(sesion) {
    const pool = await getConnection();
    await pool.request()
        .input("usuario_id", sql.Int, sesion.usuario_id)
        .input("materia_id", sql.Int, sesion.materia_id)
        .input("fecha", sql.DateTime, sesion.fecha)
        .input("duracion_min", sql.Int, sesion.duracion_min)
        .input("resumen", sql.NVarChar(sql.MAX), sesion.resumen || null)
        .query(`
            INSERT INTO sesiones (usuario_id, materia_id, fecha, duracion_min, resumen)
            VALUES (@usuario_id, @materia_id, @fecha, @duracion_min, @resumen)
        `);
}

async function update(id, sesion) {
    const pool = await getConnection();
    const result = await pool.request()
        .input("id", sql.Int, id)
        .input("usuario_id", sql.Int, sesion.usuario_id)
        .input("materia_id", sql.Int, sesion.materia_id)
        .input("fecha", sql.DateTime, sesion.fecha)
        .input("duracion_min", sql.Int, sesion.duracion_min)
        .input("resumen", sql.NVarChar(sql.MAX), sesion.resumen || null)
        .query(`
            UPDATE sesiones
            SET usuario_id = @usuario_id,
                materia_id = @materia_id,
                fecha = @fecha,
                duracion_min = @duracion_min,
                resumen = @resumen
            WHERE id = @id
        `);
    return result.rowsAffected[0];
}

async function remove(id) {
    const pool = await getConnection();
    const result = await pool.request()
        .input("id", sql.Int, id)
        .query(`DELETE FROM sesiones WHERE id = @id`);
    return result.rowsAffected[0];
}
async function getByUserId(usuario_id) {
    const pool = await getConnection();
    const result = await pool.request()
        .input("usuario_id", sql.Int, usuario_id)
        .query(`
            SELECT 
                s.id AS sesion_id,
                s.fecha,
                s.duracion_min,
                s.resumen,
                u.id AS usuario_id,
                u.nombre AS usuario_nombre,
                u.correo AS usuario_correo,
                m.id AS materia_id,
                m.nombre AS materia_nombre,
                m.descripcion AS materia_descripcion
            FROM sesiones s
            JOIN usuarios u ON s.usuario_id = u.id
            JOIN materias m ON s.materia_id = m.id
            WHERE s.usuario_id = @usuario_id
            ORDER BY s.fecha DESC
        `);

    return result.recordset;
}

async function getByUserIdPaginated(usuario_id, page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;

    const pool = await getConnection();

    const result = await pool.request()
        .input("usuario_id", sql.Int, usuario_id)
        .input("offset", sql.Int, offset)
        .input("pageSize", sql.Int, pageSize)
        .query(`
            SELECT 
                s.id AS sesion_id,
                s.fecha,
                s.duracion_min,
                s.resumen,
                u.id AS usuario_id,
                u.nombre AS usuario_nombre,
                u.correo AS usuario_correo,
                m.id AS materia_id,
                m.nombre AS materia_nombre,
                m.descripcion AS materia_descripcion
            FROM sesiones s
            JOIN usuarios u ON s.usuario_id = u.id
            JOIN materias m ON s.materia_id = m.id
            WHERE s.usuario_id = @usuario_id
            ORDER BY s.fecha DESC
            OFFSET @offset ROWS
            FETCH NEXT @pageSize ROWS ONLY
        `);

    const countResult = await pool.request()
        .input("usuario_id", sql.Int, usuario_id)
        .query(`
            SELECT COUNT(*) AS total
            FROM sesiones
            WHERE usuario_id = @usuario_id
        `);

    return {
        data: result.recordset,
        total: countResult.recordset[0].total
    };
}


module.exports = { getAll, getById, create, update, remove, getByUserId, getByUserIdPaginated };
