module.exports = (app) => {
  const padron = require("../controllers/padron.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", padron.create);

  // Retrieve all Tutorials
  router.get("/", padron.findAll);

  // Update a Tutorial with id
  router.put("/:id", padron.update);

  // Delete a Tutorial with id
  router.delete("/:id", padron.delete);

  // Delete all Tutorials
  router.delete("/", padron.deleteAll);

  // Retrieve a single Tutorial with id
  router.get("/:numAgencia", padron.findByNumeroAgencia);

  app.use("/api/padron", router);
};
