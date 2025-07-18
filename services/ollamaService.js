const fetch = require("node-fetch");

async function callGemma(prompt) {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gemma3:latest",
      prompt,
      stream: false
    })
  });

  if (!res.ok) {
    throw new Error(`Error de Ollama: ${res.statusText}`);
  }

  const data = await res.json();
  return data.response;
}

module.exports = { callGemma };
