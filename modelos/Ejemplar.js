const { Schema, model } = require('mongoose');

const EjemplarSchema = Schema({
    n_edicion: {
        type: Number,
        required: true,
    },
    libro: {
        type: Schema.Types.ObjectId,
        ref: 'Libro',
        required: true
    }
});

module.exports = model('Ejemplar', EjemplarSchema);

