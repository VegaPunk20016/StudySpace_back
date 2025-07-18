const MateriaDto = require("../dtos/materiaDto");

function mapMaterias(materias) {
    return materias.map(m => MateriaDto(m));
}

function mapMateria(materia) {
    return MateriaDto(materia);
}

module.exports = { mapMaterias, mapMateria };
