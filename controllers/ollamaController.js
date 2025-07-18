const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const { callGemma } = require("../services/ollamaService");
const { parseOllamaResponse } = require("../utils/ollamaParser");

function recomendaciones(req, res) {
  const { usuario_id } = req.body;

  if (!usuario_id) {
    return res.status(400).json({
      success: false,
      message: "usuario_id es requerido",
    });
  }

  // 1️⃣ Petición HTTP interna
  fetch(`http://localhost:8080/api/sesiones/usuario/${usuario_id}`)
    .then(resp => resp.json())
    .then(json => {
      if (!json.success || !Array.isArray(json.data)) {
        throw new Error("Error al obtener las sesiones del usuario");
      }

      const sesiones = json.data;

      // 2️⃣ Guardar JSON en archivo
      const uploadsDir = path.join(__dirname, "../uploads");
      fs.mkdir(uploadsDir, { recursive: true }, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ success: false, error: err.message });
        }

        const filePath = path.join(uploadsDir, `usuario_${usuario_id}_sesiones.json`);
        fs.writeFile(filePath, JSON.stringify(sesiones, null, 2), "utf-8", (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: err.message });
          }

          // 3️⃣ Leer archivo
          fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ success: false, error: err.message });
            }

            const sesionesFromFile = JSON.parse(data);
            const prompt = generarPromptRecomendaciones(usuario_id, sesionesFromFile);

            // 4️⃣ Llamar a Gemma
            callGemma(prompt)
              .then(respuesta => {
                const limpio = parseOllamaResponse(respuesta);

                if (!limpio) {
                  return res.status(500).json({ success: false, message: "No se pudo parsear la respuesta de Ollama" });
                }

                res.json({
                  success: true,
                  recomendaciones: limpio,
                  archivo: `/uploads/usuario_${usuario_id}_sesiones.json`,
                });
              })
              .catch(err => {
                console.error(err);
                res.status(500).json({ success: false, error: err.message });
              });
          });
        });
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    });
}

function generarPromptRecomendaciones(usuario_id, sesiones) {
  return `
Eres un asistente académico experto en planificar el estudio de estudiantes.

Analiza las siguientes sesiones de estudio del usuario con ID ${usuario_id}.
Su nombre está en los datos. Dirígete a él directamente cuando sea necesario.

Por favor calcula y responde en **formato JSON válido, sin texto adicional, sin saltos de línea extra ni comentarios**, las siguientes claves:
- "media_tiempoestudio": media de tiempo de estudio por sesion en minutos.
- "materia_masestudiada": nombre de la materia que más estudió.
- "temas_prioritarios": lista con 2 o 3 temas a reforzar.
- "horario_recomendado": un horario sugerido para estudiar.
- "metodos_sugeridos": un párrafo con los métodos de estudio más eficaces para este caso.

Datos de las sesiones del usuario:
${JSON.stringify(sesiones, null, 2)}

Responde **únicamente el JSON solicitado**, no agregues nada más antes ni después.
`.trim();
}

module.exports = { recomendaciones };
