const express = require("express");
const controller = require("../controllers/sesionesController");

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/usuario/:usuario_id", controller.getByUserId);
router.get("/usuario/:usuario_id/paginated", controller.getByUserIdPaginated);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
