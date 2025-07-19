const bcrypt = require("bcrypt");
const Model = require("../models/usuarioModel");
const Mapper = require("../mappers/usuarioMapper");

const SALT_ROUNDS = 10;

async function getAll(req, res) {
    try {
        const usuarios = await Model.getAll();
        res.json({ success: true, data: Mapper.mapUsuarios(usuarios) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}

async function getById(req, res) {
    try {
        const usuario = await Model.getById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ success: false, message: "No encontrado" });
        }
        res.json({ success: true, data: Mapper.mapUsuario(usuario) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}

async function create(req, res) {
    try {
        const { nombre, correo, rol, password } = req.body;

        if (!nombre || !correo || !rol || !password) {
            return res.status(400).json({ success: false, message: "nombre, correo, rol y password son requeridos" });
        }

        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        req.body.password_hash = hash;
        delete req.body.password;

        await Model.create(req.body);

        res.json({ success: true, message: "Usuario creado" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}

async function update(req, res) {
    try {
        const { password } = req.body;

        if (password) {
            const hash = await bcrypt.hash(password, SALT_ROUNDS);
            req.body.password_hash = hash;
            delete req.body.password;
        }

        const rowsAffected = await Model.update(req.params.id, req.body);

        if (!rowsAffected) {
            return res.status(404).json({ success: false, message: "No encontrado" });
        }

        res.json({ success: true, message: "Usuario actualizado" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}

async function remove(req, res) {
    try {
        const rowsAffected = await Model.remove(req.params.id);
        if (!rowsAffected) {
            return res.status(404).json({ success: false, message: "No encontrado" });
        }
        res.json({ success: true, message: "Usuario eliminado" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}

async function removeByEmail(req, res) {
    try {
        const correo = req.params.correo;
        const rowsAffected = await Model.removeByEmail(correo);
        if (!rowsAffected) {
            return res.status(404).json({ success: false, message: "No encontrado" });
        }
        res.json({ success: true, message: "Usuario eliminado por correo" });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
        
    }
}

async function getByRol(req, res) {
    try{
        const rol = req.params.rol;
        const usuario = await Model.getByRol(rol);
        if (!usuario) {
            return res.status(404).json({ success: false, message: "No encontrado" });
        }
        res.json({ success: true, data: Mapper.mapUsuario(usuario) });
    }catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}

// opcional: login
async function login(req, res) {
    try {
        const { correo, password } = req.body;

        if (!correo || !password) {
            return res.status(400).json({ success: false, message: "email y password son requeridos" });
        }

        const usuario = await Model.getByEmail(correo);

        if (!usuario) {
            return res.status(401).json({ success: false, message: "Credenciales inválidas" });
        }

        const valid = await bcrypt.compare(password, usuario.password_hash);

        if (!valid) {
            return res.status(401).json({ success: false, message: "Credenciales inválidas" });
        }

        // opcional: aquí puedes generar un JWT si lo implementas
        res.json({ success: true, message: "Login exitoso", user: Mapper.mapUsuario(usuario) });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}

module.exports = { getAll, getById, create, update, remove, login, getByRol, removeByEmail };
