const express = require("express");
const { getConnection, sql } = require("./db");
require("dotenv").config();
const bcrypt = require("bcrypt");

const usuariosRoutes = require("./routes/usuariosRoutes"); // <--- esto te falta
const materiasRoutes = require("./routes/materiasRoutes");
const sesionesRoutes = require("./routes/sesionesRoutes");
const ollamaRoutes = require("./routes/ollamaRoutes");

const app = express();
const PORT = 8080;

app.use(express.json());

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/materias", materiasRoutes);
app.use("/api/sesiones", sesionesRoutes);
app.use("/api/ollama", ollamaRoutes);


app.listen(PORT, () => {
    console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});
