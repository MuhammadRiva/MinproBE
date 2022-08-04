const jwt = require("jsonwebtoken");
const modelProduct = require("../models/modelProduct");
const product = require("../models/modelProduct");

class controllerProduct {
  static getAllProducts(req, res, next) {
    modelProduct.getAllProducts(req, res, next);
  }
  static PostNewProduct(req, res, next) {
    const body = req.body;
    req.user = jwt.verify(req.headers.authorization, process.env.KEY);
    if (body.name == null) {
      res.status(400).json({ message: "Require fill all form!" });
    }
    product.postNewProducts(req, body);
    res.status(201).json({ message: "Success!" });
  }
  static updateQuantity(req, res, next) {
    req.user = jwt.verify(req.headers.authorization, process.env.KEY);
    if (req.user.user.id != 1) {
      res.status(401).json({ message: "Unauthorized!" });
    } else {
      modelProduct.updateQuantity(req, res, next);
      res.status(200).json({ message: "Success update quantity!" });
    }
  }
  static updatePrice(req, res, next) {
    req.user = jwt.verify(req.headers.authorization, process.env.KEY);
    if (req.user.user.id != 1) {
      res.status(401).json({ message: "Unauthorized!" });
    } else {
      modelProduct.updatePrice(req, res, next);
      res.status(200).json({ message: "Success update price!" });
    }
  }
  static deleteProduct(req, res, next) {
    const body = req.body;
    req.user = jwt.verify(req.headers.authorization, process.env.KEY);
    if (req.user.user.id != 1) {
      res.status(401).json({ message: "Unauthorized!" });
    } else {
      modelProduct.deleteProduct(req, res, next);
      res.status(200).json({ message: "Success delete product!" });
    }
  }
}

module.exports = controllerProduct;
