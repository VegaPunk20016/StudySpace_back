require("dotenv").config();
const express = require("express");
const winston = require("winston");

// rutas
const usuariosRoutes = require("./routes/usuariosRoutes");
const materiasRoutes = require("./routes/materiasRoutes");
const sesionesRoutes = require("./routes/sesionesRoutes");
const ollamaRoutes = require("./routes/ollamaRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// rutas
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/materias", materiasRoutes);
app.use("/api/sesiones", sesionesRoutes);
app.use("/api/ollama", ollamaRoutes);
app.use("/uploads", express.static("uploads"));

// logger con winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
  logger.info(`Servidor iniciado en puerto ${PORT}`);
});
