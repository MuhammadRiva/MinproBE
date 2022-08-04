const jwt = require("jsonwebtoken");
const modelMerchant = require("../models/modelMerchant");

class controllerMerchant {
  static async login(req, res, next) {
    const body = req.body;
    const user = await modelMerchant.findUserByNameAndPassword(body.name, body.password);
    if (user && user.length != 0) {
      const token = jwt.sign({ user }, process.env.KEY);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
  static getMerchant(req, res, next) {
    modelMerchant.getMerchant(req, res, next);
  }
  static getMerchantInfoByName(req, res, next) {
    modelMerchant.getMerchantInfoByName(req, res, next);
  }
  static postMerchant(req, res, next) {
    modelMerchant.postMerchant(req, res, next);
    res.status(201).json({ message: "Success create new data!" });
  }
  static deleteMerchant(req, res, next) {
    req.user = jwt.verify(req.headers.authorization, process.env.KEY);
    if (req.user.user.id != 1) {
      res.status(401).json({ message: "Unauthorized!" });
    } else {
      modelMerchant.deleteMerchant(req, res, next);
      res.status(200).json({ message: "Success deleting data!" });
    }
  }
  static updateMerchantPassword(req, res, next) {
    req.user = jwt.verify(req.headers.authorization, process.env.KEY);
    if (req.user.user.id != req.params.id) {
      res.status(401).json({ message: "Unauthorized!" });
    } else {
      if (!req.body.password) {
        res.status(400).json({ message: "Please fill all form!" });
      } else {
        modelMerchant.updateMerchantPassword(req, res, next);
      }
    }
  }
}

module.exports = controllerMerchant;
