module.exports = (app) => {
  const retenciones = require("../controllers/retenciones.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", retenciones.create);

  // Retrieve all Tutorials
  router.get("/", retenciones.findAll);

  // Delete all Tutorials
  router.delete("/:periodo/:juego", retenciones.deleteAll);

  // Actualizar Cuits
  router.get("/actualizarCuit", retenciones.actualizarCuit);

  // Retrieve totalMesJuegoTotal
  router.get("/getMesJuegoTotal/:mes/:juego", retenciones.getMesJuegoTotal);

  app.use("/api/retenciones", router);
};
