const Juego = require("../models/juego.model.js");

// Create and Save a new Juego
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Juego
  const juego = new Juego({
    codigo: req.body.codigo,
    descripcion: req.body.descripcion
  });

  // Save Juego in the database
  Juego.create(juego, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Juego."
      });
    else res.send(data);
  });
};

// Retrieve all Juegos from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Juego.getAll((title, data) => {
    console.log(data);
    res.send(data)
  });
};

// Find a single Juego by Id
exports.findOne = (req, res) => {
  Juego.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Juego with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Juego with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Juegos
exports.findAllPublished = (req, res) => {
  Juego.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving juegos."
      });
    else res.send(data);
  });
};

// Update a Juego identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Juego.updateById(
    req.params.id,
    new Juego(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Juego with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Juego with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Juego with the specified id in the request
exports.delete = (req, res) => {
  Juego.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Juego with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Juego with id " + req.params.id
        });
      }
    } else res.send({ message: `Juego was deleted successfully!` });
  });
};

// Delete all Juegos from the database.
exports.deleteAll = (req, res) => {
  Juego.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all juegos."
      });
    else res.send({ message: `All Juegos were deleted successfully!` });
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