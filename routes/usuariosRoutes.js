const express = require("express");
const controller = require("../controllers/usuariosController");

const router = express.Router();

// CRUD
router.get("/", controller.getAll);
router.get("/rol/:rol", controller.getByRol);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/delete/:correo", controller.removeByEmail);
router.delete("/:id", controller.remove);

// login
router.post("/login", controller.login);

module.exports = router;
