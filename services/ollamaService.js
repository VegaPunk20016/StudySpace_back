const fetch = require("node-fetch");

async function callGemma(prompt) {
  const t0 = Date.now();
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gemma3:latest",
      prompt,
      stream: false
    })
  });
  const t1 = Date.now();

  console.log(`📡 Ollama respondió en ${(t1 - t0)/1000}s`);

  if (!res.ok) {
    throw new Error(`Error de Ollama: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.response;
}

async function checkOllama() {
  const res = await fetch("http://localhost:11434/api/tags");
  if (!res.ok) throw new Error(`Ollama no responde: ${res.status}`);
  const tags = await res.json();
  const ok = tags.models.some(m => m.name.startsWith("gemma3"));
  if (!ok) throw new Error(`gemma3 no está cargado`);
  return true;
}

module.exports = { callGemma, checkOllama };
