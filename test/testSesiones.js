const fetch = require("node-fetch");

const usuario_id = 1; // 👉 cambia al ID que quieras probar
const page = 1;       // 👉 si tu endpoint acepta parámetro `page`, usa este

async function probarSesiones() {
  const url = `http://localhost:8080/api/sesiones/usuario/${usuario_id}/paginated?page=${page}`;

  try {
    console.log(`⏳ Haciendo petición a: ${url}`);
    const resp = await fetch(url);

    console.log(`📡 Status HTTP: ${resp.status} ${resp.statusText}`);

    const json = await resp.json();

    console.log("📋 Respuesta JSON completa:");
    console.log(JSON.stringify(json, null, 2));

    if (!json.success || !Array.isArray(json.data)) {
      console.error("🚨 Error: Respuesta inválida. Revisa tu endpoint.");
    } else {
      console.log(`✅ Datos recibidos (${json.data.length} registros):`);
      console.log(json.data.slice(0, 3)); // solo muestra los 3 primeros
    }

  } catch (err) {
    console.error("❌ Error haciendo la petición:", err.message);
  }
}

probarSesiones();
