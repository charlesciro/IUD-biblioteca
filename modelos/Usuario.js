const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
	nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
	estado: {
        type: String,
        required: true,
        enum: [ 'Activo', 'Inactivo' ]
    },
    n_prestamos: {
        type: Number,
        required: true,
    },
	tipo: {
        type: String,
        required: true,
        enum: [ 'Profesor', 'Alumno' ]
    },
	direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    }
});

module.exports = model('Usuario', UsuarioSchema);

