const database = require("./db.js");

// constructor
const Padron = function (Padron) {
  this.title = Padron.title;
  this.description = Padron.description;
  this.published = Padron.published;
};

Padron.create = (newPadron, result) => {
  sql.query("INSERT INTO Padrons SET ?", newPadron, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Padron: ", { id: res.insertId, ...newPadron });
    result(null, { id: res.insertId, ...newPadron });
  });
};

Padron.findById = (id, result) => {
  sql.query(`SELECT * FROM Padrons WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Padron: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Padron with the id
    result({ kind: "not_found" }, null);
  });
};


Padron.getAll = (result) => {
  let sql = "SELECT * FROM padron";

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

Padron.removeAll = result => {
  sql.query("DELETE FROM Padrons", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Padrons`);
    result(null, res);
  });
};

module.exports = Padron;
