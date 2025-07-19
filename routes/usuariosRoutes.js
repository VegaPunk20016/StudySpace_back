const express = require("express");
const controller = require("../controllers/usuariosController");
const { verificarToken, soloAdmin } = require("../middleware/jwtMiddleware");

const router = express.Router();


//publicas
// login
router.post("/login", controller.login);
router.post("/", controller.create);

//privadas
router.get("/", verificarToken, soloAdmin, controller.getAll);
router.get("/rol/:rol", verificarToken, soloAdmin, controller.getByRol);
router.get("/:id", verificarToken, controller.getById);
router.put("/:id",verificarToken, controller.update);
router.delete("/delete/:correo",verificarToken, controller.removeByEmail);
router.delete("/:id",verificarToken, soloAdmin, controller.remove);


module.exports = router;
