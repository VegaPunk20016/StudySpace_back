const express = require("express");
const controller = require("../controllers/sesionesController");
const { verificarToken, soloAdmin } = require("../middleware/jwtMiddleware");

const router = express.Router();

router.get("/",verificarToken, controller.getAll);
router.get("/:id",verificarToken, soloAdmin, controller.getById);
router.get("/usuario/:usuario_id", verificarToken, controller.getByUserId);
router.get("/usuario/:usuario_id/paginated", verificarToken, controller.getByUserIdPaginated);
router.post("/", verificarToken, controller.create);
router.put("/:id", verificarToken, controller.update);
router.delete("/:id", verificarToken, controller.remove);

module.exports = router;
