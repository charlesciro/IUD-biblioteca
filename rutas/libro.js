const {Router} = require ('express');
const router = Router();
const Libro = require('../modelos/Libro');

// GET http://localhost:4000/libro/listar
router.get('/listar', async function(req, res) {
    try {
        const libro = await Libro.find();
        res.send(libro);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en el servidor');
    }
});

// GET http://localhost:4000/libro/:libroId
router.get('/:libroId', async function (req, res) {
  try {
       libro = await Libro.findById(req.params.libroId);
    if (!libro) {
      return res.status(404).send("El libro no existe");
    }
    if(libro){
      res.send(libro);
      }
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error al consultar libro por Id");
  }
});


// POST http://localhost:4000/libro/guardar
router.post('/guardar', async function(req, res){

    try{
        let libro = new Libro();
        libro.isbn = req.body.isbn;
        libro.titulo = req.body.titulo;
        libro.autor = req.body.autor;
        libro.editorial = req.body.editorial;
        libro.n_paginas = req.body.n_paginas;
        libro.formato = req.body.formato;
        libro.categoria = req.body.categoria;

        libro = await libro.save();

        res.send(libro);
    }catch(error){
        console.log(error)
        res.send('Ocurrio un error');
    }
});


// PUT http://localhost:4000/libro/editar/id
router.put('/editar/:libroId', async function(req, res){

    try {
        let libro = await Libro.findById(req.params.libroId);
        if (!libro) {
          return res.status(404).send("El libro no existe");
        }

        if(libro){
            libro.isbn = req.body.isbn;
            libro.titulo = req.body.titulo;
            libro.autor = req.body.autor;
            libro.editorial = req.body.editorial;
            libro.n_paginas = req.body.n_paginas;
            libro.formato = req.body.formato;
            libro.categoria = req.body.categoria;
            // guardamos
            libro = await libro.save();
            res.send(libro);
        }
        } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error en servidor');
        }
});

// DELETE http://localhost:4000/libro/eliminar/:libroId
router.delete('/eliminar/:libroId', async function (req, res) {
    try {
         libro = await Libro.findById(req.params.libroId);
      if (!libro) {
        return res.status(404).send("El libro no existe");
      }
      if(libro){
        // eliminamos
        libro = await libro.delete();
        res.send(`el libro con el título: ${libro.titulo} y el id: ${libro._id} ha sido eliminado`);
        }
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error al eliminar libro");
    }
  });


module.exports = router;