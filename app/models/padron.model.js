const database = require("./db.js");

// constructor
const Padron = function (Padron) {
  this.agente = Padron.agente;
  this.nombre = Padron.nombre;
  this.documento = Padron.documento;
  this.domicilio = Padron.domicilio;
  this.localidad = Padron.localidad;
  this.telefono = Padron.telefono;
  this.cuit = Padron.cuit;
  this.ingresosBrutos = Padron.ingresosBrutos;
  this.habilitacion = Padron.habilitacion;
  this.asignadas = Padron.asignadas;
  this.activas = Padron.activas;
};

Padron.create = (newPadron, result) => {
  console.log(newPadron);
  let sql =
    "INSERT INTO padron(agente, nombre, documento, domicilio, localidad, telefono, cuit, ingresosBrutos, habilitacion, asignadas, activas) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
  // first row only
  database.appDatabase.all(
    sql,
    [
      newPadron.agente,
      newPadron.nombre,
      newPadron.documento,
      newPadron.domicilio,
      newPadron.localidad,
      newPadron.telefono,
      newPadron.cuit,
      newPadron.ingresosBrutos,
      newPadron.habilitacion,
      newPadron.asignadas,
      newPadron.activas,
    ],
    (err, res) => {
      if (err) {
        result(null, err);
        console.log(err.message);
        return console.log(err.message);
      }

      result(null, res);
      //console.log(res);
      return "Se carga linea del padron";
    }
  );
};

Padron.getAll = (result) => {
  let sql = "SELECT * FROM  padron order by agente";

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

Padron.removeAll = (result) => {
  database.appDatabase.all("DELETE FROM padron", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(res);
    console.log(`deleted ${res.affectedRows} padron`);
    result(null, res);
  });
};

Padron.findByNumeroAgencia = (numAgencia, result) => {
  console.log(numAgencia);
  let sql = `SELECT * FROM padron WHERE agente = ${numAgencia}`;
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

module.exports = Padron;
