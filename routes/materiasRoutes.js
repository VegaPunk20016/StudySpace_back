const express = require("express");
const controller = require("../controllers/materiasController");
const { verificarToken, soloAdmin } = require("../middleware/jwtMiddleware");

const router = express.Router();

router.get("/", verificarToken, controller.getAll);
router.get("/search", verificarToken, controller.getByName);
router.get("/:id", verificarToken, soloAdmin, controller.getById);
router.post("/", verificarToken, soloAdmin, controller.create);
router.put("/:id", verificarToken, soloAdmin, controller.update);
router.delete("/:id", verificarToken, soloAdmin, controller.remove);



module.exports = router;
