const database = require("./db.js");

// constructor
const Juego = function (juego) {
  this.codigo = juego.codigo;
  this.descripcion = juego.descripcion;
};

Juego.create = (newJuego, result) => {

  let sql = "INSERT INTO juegos(codigo,descripcion) VALUES(?,?)";
  // first row only
  database.appDatabase.all(sql, [newJuego.codigo, newJuego.descripcion], (err, res) => {
    if (err) {
      result(null, err);
      return console.log(err.message);
    }

    result(null, res);
    console.log(res);
    return ("New employee has been added");
  });



};

Juego.findById = (id, result) => {
  sql.query(`SELECT * FROM juegos WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found juego: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Juego with the id
    result({ kind: "not_found" }, null);
  });
};


Juego.getAll = (result) => {
  let sql = "SELECT * FROM juegos";

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


Juego.updateById = (id, juego, result) => {
  sql.query(
    "UPDATE juegos SET title = ?, description = ?, published = ? WHERE id = ?",
    [juego.title, juego.description, juego.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Juego with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated juego: ", { id: id, ...juego });
      result(null, { id: id, ...juego });
    }
  );
};

Juego.remove = (id, result) => {
  sql.query("DELETE FROM juegos WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Juego with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted juego with id: ", id);
    result(null, res);
  });
};



Juego.removeAll = result => {
  database.appDatabase.all("DELETE FROM juegos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(res);
    console.log(`deleted ${res.affectedRows} juegos`);
    result(null, res);
  });
};

module.exports = Juego;
