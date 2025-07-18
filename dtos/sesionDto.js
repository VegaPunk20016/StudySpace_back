function SesionDto({ id, usuario_id, materia_id, fecha, duracion_min, resumen }) {
    return {
        id,
        usuarioId: usuario_id,
        materiaId: materia_id,
        fecha,
        duracionMin: duracion_min,
        resumen
    };
}

module.exports = SesionDto;
