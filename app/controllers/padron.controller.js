const Padron = require("../models/padron.model.js");

// Create and Save a new Padron
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Padron
  const padron = new Padron({
    agente: req.body.agente,
    nombre: req.body.nombre,
    documento: req.body.documento,
    domicilio: req.body.domicilio,
    localidad: req.body.localidad,
    telefono: req.body.telefono,
    cuit: req.body.cuit,
    ingresosBrutos: req.body.ingresosBrutos,
    habilitacion: req.body.habilitacion,
    asignadas: req.body.asignadas,
    activas: req.body.activas,
  });

  // Save Padron in the database
  Padron.create(padron, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Padron."
      });
    else res.send(data);
  });
};

// Retrieve all Padrons from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Padron.getAll((title, data) => {
    console.log(data);
    res.send(data)
  });
};

// Find a single Padron by Id
exports.findOne = (req, res) => {
  Padron.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Padron with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Padron with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Padrons
exports.findAllPublished = (req, res) => {
  Padron.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving padrons."
      });
    else res.send(data);
  });
};

// Update a Padron identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Padron.updateById(
    req.params.id,
    new Padron(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Padron with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Padron with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Padron with the specified id in the request
exports.delete = (req, res) => {
  Padron.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Padron with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Padron with id " + req.params.id
        });
      }
    } else res.send({ message: `Padron was deleted successfully!` });
  });
};

// Delete all Padrons from the database.
exports.deleteAll = (req, res) => {
  Padron.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all padrons."
      });
    else res.send({ message: `All Padrons were deleted successfully!` });
  });
};



/*


// Load modules
const taskModel = require('../models/taskModels');
const { validationResult } = require('express-validator');

// Index page controller
function index_page_get (request, response) {
  taskModel.getTasks((queryResult) => {
    console.log(queryResult);
    response.render('index', { tasks: queryResult });
  });
};


*/