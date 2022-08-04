const { Router } = require("express");
const Prestamo = require("../modelos/Prestamo");

const router = Router();

// GET http://localhost:4000/prestamo/listar
router.get("/listar", async function (req, res) {
  try {
    const prestamos = await Prestamo.find().populate([
      { path: "usuario", select: "nombre email" },
      { path: "ejemplar", select: "id n_edicion" },
    ]); // []
    res.send(prestamos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error en el servidor");
  }
});

// POST http://localhost:4000/prestamo/guardar
router.post("/guardar", async function (req, res) {
  try {
    console.log(req.body);
    let validarExistenciaPrestamo = await Prestamo.findOne({
      id: req.body.id,
    });
    if (validarExistenciaPrestamo) {
      return res.status(400).send("El prestamo ingresado ya esta registrado");
    }

    let prestamo = new Prestamo();
    prestamo.id = req.body.id;
    prestamo.usuario = req.body.usuario._id;
    prestamo.estadoFisico = req.body.estadoFisico._id;
    prestamo.fechaPrestamo = new Date();
    prestamo.fechaDevolucion = new Date();
    // guardamos
    prestamo = await prestamo.save();
    res.send(prestamo);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error en servidor");
  }
});

// PUT http://localhost:4000/prestamo/editar/id
router.put("/editar/:prestamoId", async function (req, res) {
  try {
    console.log(req.body, req.params.prestamoId);

    let prestamo = await Prestamo.findById(req.params.prestamoId);
    if (!prestamo) {
      return res.status(400).send("El prestamo no existe");
    }

    const invExisteXId = await Prestamo.findOne({
      id: req.body.id,
      _id: { $ne: prestamo._id },
    });
    if (invExisteXId) {
      return res.status(400).send("Id del prestamo ya existe");
    }

    prestamo = new Prestamo();
    prestamo.id = req.body.id;
    prestamo.usuario = req.body.usuario._id;
    prestamo.estadoFisico = req.body.estadoFisico._id;
    prestamo.fechaPrestamo = new Date();
    prestamo.fechaDevolucion = new Date();
    // guardamos
    prestamo = await prestamo.save();
    res.send(prestamo);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrió un error en el servidor");
  }
});

// GET http://localhost:4000/prestamo/id
router.get('/:prestamoId', async function (req, res) {
    try {
      const prestamo = await Prestamo.findById(req.params.prestamoId);
      if (!prestamo) {
        return res.status(404).send("Prestamo ya esta registrado");
      }
      res.send(prestamo);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error al consultar prestamo por Id");
    }
  });

module.exports = router;
