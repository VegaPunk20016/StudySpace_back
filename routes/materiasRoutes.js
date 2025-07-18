const express = require("express");
const controller = require("../controllers/materiasController");

const router = express.Router();

router.get("/", controller.getAll);
router.get("/search", controller.getByName);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);



module.exports = router;
