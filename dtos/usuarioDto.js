function UsuarioDto({ id, nombre, email, rol, fecha_registro }) {
    return {
        id,
        nombre,
        email,
        rol,
        fechaRegistro: fecha_registro
    };
}

module.exports = UsuarioDto;
