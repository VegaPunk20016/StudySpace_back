const express = require("express");
const { recomendaciones } = require("../controllers/ollamaController");

const router = express.Router();

router.post("/recomendaciones", recomendaciones);

module.exports = router;
