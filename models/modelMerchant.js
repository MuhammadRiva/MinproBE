const db = require("../config/db");

class modelMerchant {
  static getMerchant(req, res, next) {
    const query = "SELECT * FROM merchant";
    db.all(query, (err, row) => {
      res.status(200).json(row);
    });
  }
  static getMerchantInfoByName(req, res, next) {
    const query = "SELECT * from merchant WHERE name = ?";
    const userId = req.params.id;
    db.all(query, [userId], function (err, result) {
      if (result.length == 0) {
        res.status(404).json({ message: "Data not found!" });
      } else {
        res.status(200).json(result);
      }
    });
  }
  static findUserByNameAndPassword(name, password) {
    const query = `SELECT * from merchant WHERE name = '${name}' AND password = '${password}'`;
    return new Promise(function (resolve, reject) {
      db.get(query, (err, row) => {
        resolve(row);
      });
    });
  }
  static postMerchant(req, res, next) {
    const body = req.body;
    const query = "INSERT INTO merchant (name, password, address,  phone_number) VALUES (?,?,?,?)";
    db.run(query, [body.name, body.password, body.address, body.phone_number], function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
  static deleteMerchant(req, res, next) {
    const query = "DELETE from merchant WHERE id = ?";
    const userId = req.params.id;

    db.run(query, [userId], function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
  static updateMerchantPassword(req, res, next) {
    const queryGet = `SELECT * FROM merchant WHERE id = ?`;
    const query = `UPDATE merchant SET password = ? WHERE id = ?`;
    const userId = req.params.id;
    const body = req.body;
    db.all(queryGet, [userId], (err, result) => {
      if (result.length == 0) {
        res.status(404).json({ message: "Data not found!" });
      }
      db.run(query, [body.password, userId], (errUpdate, result) => {
        if (errUpdate) {
          console.log(errUpdate);
        } else {
          res.status(200).json({ message: "Success updating data!" });
        }
      });
    });
  }
}

module.exports = modelMerchant;
