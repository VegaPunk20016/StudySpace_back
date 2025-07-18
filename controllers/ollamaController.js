const { callGemma } = require("../services/ollamaService");

async function recomendaciones(req, res) {
  try {
    const { usuario_id, sesiones } = req.body;

    if (!usuario_id || !sesiones) {
      return res.status(400).json({ success: false, message: "usuario_id y sesiones son requeridos" });
    }

    const prompt = generarPromptRecomendaciones(usuario_id, sesiones);

    const respuesta = await callGemma(prompt);

    res.json({ success: true, recomendaciones: respuesta.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// función para generar el prompt
function generarPromptRecomendaciones(usuario_id, sesiones) {
  return `
Eres un asistente académico experto en planificar el estudio de estudiantes.
Analiza las siguientes sesiones de estudio del usuario ${usuario_id} y sugiere:
- Temas prioritarios a reforzar.
- Mejor horario recomendado para el usuario.
- Métodos de estudio más eficaces para este caso.

Datos de las sesiones:
${JSON.stringify(sesiones, null, 2)}

Responde en formato JSON con las claves:
"temas_prioritarios", "horario_recomendado", "metodos_sugeridos".
`.trim();
}


module.exports = { recomendaciones };
