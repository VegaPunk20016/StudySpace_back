const Model = require("../models/materiaModel");
const Mapper = require("../mappers/materiaMapper");

async function getAll(req, res) {
    try {
        const materias = await Model.getAll();
        res.json({ success: true, data: Mapper.mapMaterias(materias) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}

async function getById(req, res) {
    try {
        const materia = await Model.getById(req.params.id);
        if (!materia) {
            return res.status(404).json({ success: false, message: "No encontrada" });
        }
        res.json({ success: true, data: Mapper.mapMateria(materia) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}

async function create(req, res) {
    try {
        if (!req.body.nombre) {
            return res.status(400).json({ success: false, message: "El nombre es requerido" });
        }
        await Model.create(req.body);
        res.json({ success: true, message: "Materia creada" });
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
        res.json({ success: true, message: "Materia actualizada" });
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
        res.json({ success: true, message: "Materia eliminada" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}

async function getByName(req, res) {
    try {
        const { nombre } = req.query;
        if (!nombre) {
            return res.status(400).json({ success: false, message: "El nombre es requerido como query param" });
        }

        const materias = await Model.getByName(nombre);

        if (!materias.length) {
            return res.status(404).json({ success: false, message: "No se encontraron materias" });
        }

        res.json({ success: true, data: Mapper.mapMaterias(materias) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}


module.exports = { getAll, getById, create, update, remove, getByName };
