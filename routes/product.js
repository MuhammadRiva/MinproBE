const express = require("express");
const Router = express.Router();
const db = require("../config/db");
const controllerProduct = require("../controller/controllerProduct");
const middleware = require("../middleware/middleware");

Router.get("/", middleware.checkAuth, controllerProduct.getAllProducts);
Router.post("/", middleware.checkAuth, controllerProduct.PostNewProduct);
Router.put("/quantity/:id", middleware.checkAuth, controllerProduct.updateQuantity);
Router.put("/price/:id", middleware.checkAuth, controllerProduct.updatePrice);
Router.delete("/id", middleware.checkAuth, controllerProduct.deleteProduct);

module.exports = Router;
