const UsuarioDto = require("../dtos/usuarioDto");

function mapUsuarios(usuarios) {
    return usuarios.map(u => UsuarioDto(u));
}

function mapUsuario(usuario) {
    return UsuarioDto(usuario);
}

module.exports = { mapUsuarios, mapUsuario };
