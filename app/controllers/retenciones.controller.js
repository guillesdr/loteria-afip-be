const Retenciones = require("../models/retenciones.model.js");

// Create and Save a new Retenciones
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Retenciones
  const retenciones = new Retenciones({
    periodo: req.body.periodo,
    juego: req.body.juego,
    agencia: req.body.agencia,
    cuit: req.body.cuit,
    recaudacion: req.body.recaudacion,
    comision: req.body.comision,
    ingresosBrutos: req.body.ingresosBrutos,
  });

  // Save Retenciones in the database
  Retenciones.create(retenciones, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Retenciones.",
      });
    else res.send(data);
  });
};

// Retrieve all Retencioness from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Retenciones.getAll((title, data) => {
    console.log(data);
    res.send(data);
  });
};

// Delete all Retencioness from the database.
exports.deleteAll = (req, res) => {
  Retenciones.removeAll(req.params.periodo, req.params.juego, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all retencioness.",
      });
    else res.send({ message: `All Retencioness were deleted successfully!` });
  });
};

// Retrieve all Retencioness from the database (with condition).
exports.actualizarCuit = (req, res) => {
  Retenciones.actualizarCuit(() => {
    res.send({ message: `Cuits Actualizados` });
  });
};
