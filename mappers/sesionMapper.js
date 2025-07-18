const SesionDto = require("../dtos/sesionDto");

function mapSesiones(sesiones) {
    return sesiones.map(s => SesionDto(s));
}

function mapSesion(sesion) {
    return SesionDto(sesion);
}

module.exports = { mapSesiones, mapSesion };
