const {Router} = require ('express');
const router = Router();
const Ejemplar = require('../modelos/Ejemplar');

// GET http://localhost:4000/ejemplar/listar
router.get('/listar', async function(req, res) {
    try {
        const ejemplares = await Ejemplar.find();
        res.send(ejemplares);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});

// GET http://localhost:4000/ejemplar/:ejemplarId
router.get('/:ejemplarId', async function (req, res) {
    try {
         ejemplar = await Ejemplar.findById(req.params.ejemplarId);
      if (!ejemplar) {
        return res.status(404).send("El ejemplar no existe");
      }
      if(ejemplar){
        res.send(ejemplar);
        }
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error al consultar ejemplar por Id");
    }
  });


// POST http://localhost:4000/libro/guardar
router.post('/guardar', async function(req, res){

    try{
        let ejemplar = new Ejemplar();

        ejemplar.n_edicion = req.body.n_edicion;
        ejemplar.libro = req.body.libro;

        ejemplar = await ejemplar.save();
        res.send(ejemplar);
    }catch(error){
        console.log(error)
        res.send('Ocurrio un error');
    }
});

// PUT http://localhost:4000/ejemplar/editar/id
router.put('/editar/:ejemplarId', async function(req, res){

    try {
        let ejemplar = await Ejemplar.findById(req.params.ejemplarId);
        if (!ejemplar) {
          return res.status(404).send("El ejemplar no existe");
        }

        if(ejemplar){
            ejemplar.n_edicion = req.body.n_edicion;
            ejemplar.libro = req.body.libro;
       
            ejemplar = await ejemplar.save();
            res.send(ejemplar);
            }
        } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error en servidor');
        }
});

// GET http://localhost:4000/ejemplar/id
router.get('/:ejemplarId', async function (req, res) {
    try {
      const ejemplar = await Ejemplar.findById(req.params.ejemplarId);
      if (!ejemplar) {
        return res.status(404).send("El ejemplar no existe");
      }
      res.send(ejemplar);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error al consultar ejemplar por Id");
    }
  });


// DELETE http://localhost:4000/ejemplar/id
router.delete('/delete/:ejemplarId', async function (req, res) {
    try {
        ejemplar = await Ejemplar.findById(req.params.ejemplarId);

      if (!ejemplar) {
        return res.status(404).send("El ejemplar no existe");
      }
      if(ejemplar){
        // eliminamos
        ejemplar = await ejemplar.delete();
        res.send(`el ejemplar con el n_edicion: ${ejemplar.n_edicion} y el id: ${ejemplar._id} ha sido eliminado`);
        }
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error al consultar ejemplar por Id");
    }
  });

module.exports = router;