function UsuarioDto({ id, nombre, email, fecha_registro }) {
    return {
        id,
        nombre,
        email,
        fechaRegistro: fecha_registro
    };
}

module.exports = UsuarioDto;
