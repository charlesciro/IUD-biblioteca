const {Router} = require ('express');
const router = Router();
const Categoria = require('../modelos/Categoria');

// GET http://localhost:4000/categoria/listar
router.get('/listar', async function(req, res) {
    try {
        const categoria = await Categoria.find();
        res.send(categoria);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en el servidor');
    }
});

// POST http://localhost:4000/categoria/guardar
router.post('/guardar', async function(req, res){

    try{
        let categoria = new Categoria();
        categoria.nombre = req.body.nombre;

        categoria = await categoria.save();

        res.send(categoria);
    }catch(error){
        console.log(error)
        res.send('Ocurrio un error al guardar la categoria');
    }
    
});

// PUT http://localhost:4000/categoria/editar/id
router.put('/editar/:categoriaId', async function(req, res){

    try {
        let categoria = await Categoria.findById(req.params.categoriaId);
        if (!categoria) {
          return res.status(404).send("La categoria no existe");
        }

        if(categoria){
            categoria.nombre = req.body.nombre;
            // guardamos
            categoria = await categoria.save();
            res.send(categoria);
        }
      } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error al actualizar la categoria");
      }
});

// GET http://localhost:4000/categoria/id
router.get('/:categoriaId', async function (req, res) {
    try {
      const categoria = await Categoria.findById(req.params.categoriaId);
      if (!categoria) {
        return res.status(404).send("La categoria no existe");
      }
      res.send(categoria);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error al consultar la categoria por Id");
    }
  });

// DELETE http://localhost:4000/categoria/delete/id
router.delete('/delete/:categoriaId', async function (req, res) {
    try {
        categoria = await Categoria.findById(req.params.categoriaId);
      if (!categoria) {
        return res.status(404).send("La categoria no existe");
      }
      if(categoria){
        // eliminamos
        categoria = await categoria.delete();
        res.send(`la categoria con el nombre: ${categoria.nombre} y el id: ${categoria._id} ha sido eliminada`);
        }
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error al consultar la categoria por Id");
    }
  });




module.exports = router;