const { Schema, model } = require('mongoose');

const PrestamoSchema = Schema({
	id: {
        type: Number,
        required: true,
        unique: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
	ejemplar: {
        type: Schema.Types.ObjectId,
        ref: 'Ejemplar',
        required: true
    },
    estadoFisico: {
        type: String,
        required: true,
    },
    fechaPrestamo: {
        type: Date,
        required: true,
    },
    fechaDevolucion: {
        type: Date,
        required: false,
    }
});

module.exports = model('Prestamo', PrestamoSchema);

