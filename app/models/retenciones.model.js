const database = require("./db.js");

// constructor
const Retencion = function (Retencion) {
  this.title = Retencion.title;
  this.description = Retencion.description;
  this.published = Retencion.published;
};

Retencion.create = (newRetencion, result) => {
  database.appDatabase.run("INSERT INTO retenciones SET ?", newRetencion, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    console.log("created Retencion: ", { id: res.insertId, ...newRetencion });
    result(null, { id: res.insertId, ...newRetencion });
  });
};


Retencion.findById = (id, result) => {
  sql.query(`SELECT * FROM Retencions WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Retencion: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Retencion with the id
    result({ kind: "not_found" }, null);
  });
};


Retencion.getAll = (result) => {
  let sql = "SELECT * FROM Retencion";

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

Retencion.removeAll = result => {
  sql.query("DELETE FROM Retenciones", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Retencions`);
    result(null, res);
  });
};

module.exports = Retencion;
