const db = require("../config/db");

class modelProduct {
  static getAllProducts(req, res, next) {
    const query = "SELECT * FROM product";
    db.all(query, (err, row) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json(row);
    });
  }
  static postNewProducts(req, body) {
    const query = "INSERT INTO product (merchant_id, name, quantity, price, created_by, updated_by) VALUES (?,?,?,?,?,?)";
    db.run(query, [req.user.user.id, body.name, body.quantity, body.price, req.user.user.name, req.user.user.name], function (err) {
      if (err) {
      }
    });
  }
  static updateQuantity(req, res, next) {
    const body = req.body;
    const id = req.params.id;
    const query = "UPDATE product SET quantity = ?, updated_at = (DATETIME('now')) WHERE id = ?";
    db.run(query, [body.quantity, id], function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
  static updatePrice(req, res, next) {
    const body = req.body;
    const id = req.params.id;
    const query = "UPDATE product SET price = ?, updated_at = (DATETIME('now')) WHERE id = ?";
    db.run(query, [body.price, id], function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
  static deleteProduct(req, res, next) {
    const query = "DELETE from product WHERE id = ?";
    const userId = req.params.id;

    db.run(query, [userId], function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
}

module.exports = modelProduct;
