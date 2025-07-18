/**
 * Limpia y parsea la respuesta de Ollama que viene con ```json ... ```
 * Devuelve un objeto JS listo para usar, o null si falla.
 * 
 * @param {string} raw - Respuesta cruda de Ollama
 * @returns {object|null}
 */
function parseOllamaResponse(raw) {
  if (!raw) return null;

  let limpio = raw.trim();

  // Quitar triple backtick y la etiqueta json si vienen
  limpio = limpio
    .replace(/^```json/i, '')
    .replace(/^```/, '')
    .replace(/```$/, '')
    .trim();

  try {
    const obj = JSON.parse(limpio);
    return obj;
  } catch (err) {
    console.error("❌ Error parseando JSON de Ollama:", err.message);
    return null;
  }
}

module.exports = { parseOllamaResponse };
