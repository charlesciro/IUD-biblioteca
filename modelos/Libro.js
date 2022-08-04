const { Schema, model } = require('mongoose');

const LibroSchema = Schema({
	isbn: {
        type: Number,
        required: true,
        unique: true,
    },
    titulo: {
        type: String,
        required: true,
    },
	autor: {
        type: String,
        required: true,
    },
	editorial: {
        type: String,
        required: true,
    },
	n_paginas: {
        type: Number,
        required: true
    },
    formato: {
        type: String,
        required: true,
        enum: [ 'Impreso', 'Digital' ]
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    }

});

module.exports = model('Libro', LibroSchema);

