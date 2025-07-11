const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

// Registro
router.post('/register', async (req, res) => {
  const { nombre, email, contrasena } = req.body;

  const hash = await bcrypt.hash(contrasena, 10);

  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email, contrasena_hash, fecha_registro) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [nombre, email, hash]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error registrando usuario' });
  }
});

module.exports = router;
