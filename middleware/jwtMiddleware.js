const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Token inválido o expirado' });
    }

    req.usuario = usuario; // guarda los datos del usuario en la request
    next();
  });
}

function soloAdmin(req, res, next) {
  if (req.usuario.rol !== 'Admin') {
    return res.status(403).json({ success: false, message: 'No tienes permisos de administrador' });
  }
  next();
}

module.exports = {
  verificarToken,
  soloAdmin
};