const database = require("./db.js");

// constructor
const Retencion = function (Retencion) {
  this.periodo = Retencion.periodo;
  this.agente = Retencion.agente;
  this.contribuyente = Retencion.contribuyente;
  this.numeroInscripcion = Retencion.numeroInscripcion;
  this.base = Retencion.base;
  this.certificado = Retencion.certificado;
  this.retenido = Retencion.retenido;
};

Retencion.create = (newRetencion, result) => {

  let sql = "INSERT INTO retenciones(periodo, agente, contribuyente, numeroInscripcion, base, certificado, retenido) VALUES(?,?)";
  // first row only
  database.appDatabase.all(sql, [newRetencion.periodo, newRetencion.agente, newRetencion.contribuyente, newRetencion.numeroInscripcion, newRetencion.base, newRetencion.certificado, newRetencion.retenido], (err, res) => {
    if (err) {
      result(null, err);
      return console.log(err.message);
    }

    result(null, res);
    console.log(res);
    return ("Se carga linea del retenciones");
  });



};


Retencion.getAll = (result) => {
  let sql = "SELECT * FROM  retenciones";

  // first row only
  database.appDatabase.all(sql, [], (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
    return;
  });

};


Tutorial.remove = (periodo, result) => {
  database.appDatabase.all("DELETE FROM tutorials WHERE periodo = ?", periodo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(res);
    console.log(`deleted ${res.affectedRows} retenciones`);
    result(null, res);
  });
};

Retencion.removeAll = result => {
  database.appDatabase.all("DELETE FROM retenciones", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(res);
    console.log(`deleted ${res.affectedRows} retenciones`);
    result(null, res);
  });
};

module.exports = Retencion;
