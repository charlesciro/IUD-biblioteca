const express = require('express');
require("dotenv").config();
// const { getConnection } = require('./db/db-connection-mongo');
const initDB = require('./db/mongoConnection')
const cors = require('cors')

const app = express();
app.use(cors())

initDB();

const prestamo = require('./rutas/prestamo');
const usuario = require('./rutas/usuario');
const ejemplar = require('./rutas/ejemplar');
const categoria = require('./rutas/categoria');
const libro = require('./rutas/libro');

const PORT = process.env.PORT || 4000;

// Json parse
app.use(express.json());

app.use('/usuario', usuario); // http://localhost:4000/usuario GET, POST, PUT
app.use('/prestamo', prestamo); // http://localhost:4000/prestamo GET, POST, PUT
app.use('/categoria', categoria); // http://localhost:4000/categoria GET, POST, PUT
app.use('/ejemplar', ejemplar); // http://localhost:4000/ejemplar GET, POST, PUT
app.use('/libro', libro); // http://localhost:4000/libro GET, POST, PUT


app.listen(PORT, function() {
    console.log('Aplicacion corriendo en el puerto 4000');
});


