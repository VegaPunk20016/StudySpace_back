const Model = require("../models/sesionModel");
const Mapper = require("../mappers/sesionMapper");

async function getAll(req, res) {
    try {
        const sesiones = await Model.getAll();
        res.json({ success: true, data: Mapper.mapSesiones(sesiones) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}

async function getById(req, res) {
    try {
        const sesion = await Model.getById(req.params.id);
        if (!sesion) {
            return res.status(404).json({ success: false, message: "No encontrada" });
        }
        res.json({ success: true, data: Mapper.mapSesion(sesion) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}

async function create(req, res) {
    try {
        const { usuario_id, materia_id, fecha, duracion_min } = req.body;
        if (!usuario_id || !materia_id || !fecha || !duracion_min) {
            return res.status(400).json({ success: false, message: "usuario_id, materia_id, fecha y duracion_min son requeridos" });
        }
        await Model.create(req.body);
        res.json({ success: true, message: "Sesión creada" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}

async function update(req, res) {
    try {
        const rowsAffected = await Model.update(req.params.id, req.body);
        if (!rowsAffected) {
            return res.status(404).json({ success: false, message: "No encontrada" });
        }
        res.json({ success: true, message: "Sesión actualizada" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}

async function remove(req, res) {
    try {
        const rowsAffected = await Model.remove(req.params.id);
        if (!rowsAffected) {
            return res.status(404).json({ success: false, message: "No encontrada" });
        }
        res.json({ success: true, message: "Sesión eliminada" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}

async function getByUserId(req, res) {
    try {
        const usuario_id = req.params.usuario_id;

        const sesiones = await Model.getByUserId(usuario_id);

        if (!sesiones.length) {
            return res.status(404).json({ success: false, message: "No se encontraron sesiones para este usuario" });
        }

        res.json({ success: true, data: sesiones });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}

async function getByUserIdPaginated(req, res) {
    try {
        const usuario_id = parseInt(req.params.usuario_id);
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        const result = await Model.getByUserIdPaginated(usuario_id, page, pageSize);

        if (!result.data.length) {
            return res.status(404).json({ success: false, message: "No se encontraron sesiones para este usuario" });
        }

        res.json({
            success: true,
            page,
            pageSize,
            total: result.total,
            totalPages: Math.ceil(result.total / pageSize),
            data: result.data
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}


module.exports = { getAll, getById, create, update, remove, getByUserId, getByUserIdPaginated };
