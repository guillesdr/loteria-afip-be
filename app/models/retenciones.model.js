const database = require("./db.js");
const database2 = require("./db.js");

// constructor
const Retencion = function (Retencion) {
  this.periodo = Retencion.periodo;
  this.juego = Retencion.juego;
  this.agencia = Retencion.agencia;
  this.cuit = Retencion.cuit;
  this.recaudacion = Retencion.recaudacion;
  this.comision = Retencion.comision;
  this.ingresosBrutos = Retencion.ingresosBrutos;
};

Retencion.create = (newRetencion, result) => {
  let sql =
    "INSERT INTO retenciones(periodo, juego, agencia, cuit, recaudacion, comision, ingresos_brutos) VALUES(?,?,?,?,?,?,?)";
  // first row only
  database.appDatabase.all(
    sql,
    [
      newRetencion.periodo,
      newRetencion.juego,
      newRetencion.agencia,
      newRetencion.cuit,
      newRetencion.recaudacion,
      newRetencion.comision,
      newRetencion.ingresosBrutos,
    ],
    (err, res) => {
      if (err) {
        result(null, err);
        return console.log(err.message);
      }

      result(null, res);
      console.log(res);
      return "Se carga linea del retenciones";
    }
  );
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

Retencion.removeAll = (periodo, juego, result) => {
  database.appDatabase.all(
    `DELETE FROM retenciones WHERE periodo=${periodo} and juego=${juego}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(res);
      console.log(`deleted ${res.affectedRows} retenciones`);
      result(null, res);
    }
  );
};

Retencion.actualizarCuit = (result) => {
  let sql = "SELECT * FROM  retenciones";

  database.appDatabase.all(sql, [], (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    res.map((retencion) => {
      let cuit = retencion.cuit.toString().replace("-", "").replace("-", "");
      //cuit = cuit.replaceAll("-", "");

      const agente = retencion.agencia.split("-")[0];

      database2.appDatabase.all(
        `UPDATE padron SET cuit =${cuit}  WHERE agente = ${agente}`,
        (err, res) => {
          console.log(err);
        }
      );
    });

    result(null, res);
    return;
  });
};

Retencion.getMesJuegoTotal = (mes, juego, result) => {
  console.log(mes);
  console.log(juego);
  let sql = `SELECT sum(comision) as comisiones FROM  retenciones where periodo = ${mes} and juego = ${juego}`;

  console.log(sql);
  // first row only
  database.appDatabase.all(sql, [], (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    console.log(res);
    result(null, res);
    return;
  });
};

Retencion.getResumenComisiones = (result) => {
  let sql = `SELECT j.descripcion juego, IFNULL((SELECT sum(comision) FROM  retenciones r WHERE r.juego=j.id
                AND periodo=1),0) "1",
                
                
                IFNULL((SELECT sum(comision) FROM  retenciones r WHERE r.juego=j.id
                AND periodo=2),0) "2" ,
                
                IFNULL((SELECT sum(comision) FROM  retenciones r WHERE r.juego=j.id
                AND periodo=3),0) "3" ,
                
                IFNULL((SELECT sum(comision) FROM  retenciones r WHERE r.juego=j.id
                AND periodo=4),0) "4" ,
                
                IFNULL((SELECT sum(comision) FROM  retenciones r WHERE r.juego=j.id
                AND periodo=5),0) "5" ,
                
                IFNULL((SELECT sum(comision) FROM  retenciones r WHERE r.juego=j.id
                AND periodo=6),0) "6" ,
                
                IFNULL((SELECT sum(comision) FROM  retenciones r WHERE r.juego=j.id
                AND periodo=7),0) "7" ,
                
                IFNULL((SELECT sum(comision) FROM  retenciones r WHERE r.juego=j.id
                AND periodo=8),0) "8" ,
                
                IFNULL((SELECT sum(comision) FROM  retenciones r WHERE r.juego=j.id
                AND periodo=9),0) "9" ,
                
                IFNULL((SELECT sum(comision) FROM  retenciones r WHERE r.juego=j.id
                AND periodo=10),0) "10" ,
                
                IFNULL((SELECT sum(comision) FROM  retenciones r WHERE r.juego=j.id
                AND periodo=11),0) "11" ,
                
                IFNULL((SELECT sum(comision) FROM  retenciones r WHERE r.juego=j.id
                AND periodo=11),0) "12" 
                
              FROM juegos j
              ORDER BY j.descripcion`;

  console.log(sql);
  // first row only
  database.appDatabase.all(sql, [], (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    console.log(res);
    result(null, res);
    return;
  });
};

module.exports = Retencion;
