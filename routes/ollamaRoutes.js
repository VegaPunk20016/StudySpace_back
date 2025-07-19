const express = require("express");
const { recomendaciones } = require("../controllers/ollamaController");
const { verificarToken } = require("../middleware/jwtMiddleware");

const router = express.Router();

router.post("/recomendaciones", verificarToken, recomendaciones);

module.exports = router;
