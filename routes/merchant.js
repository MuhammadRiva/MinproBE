const express = require("express");
const Router = express.Router();
const db = require("../config/db");
const controllerMerchant = require("../controller/controllermerchant");
const middleware = require("../middleware/middleware");

Router.get("/login", controllerMerchant.login);
Router.get("/", middleware.checkAuth, controllerMerchant.getMerchant);
Router.get("/:id", middleware.checkAuth, controllerMerchant.getMerchantInfoByName);
Router.put("/password/:id", middleware.checkAuth, controllerMerchant.updateMerchantPassword);
Router.post("/", middleware.checkAuth, controllerMerchant.postMerchant);
Router.delete("/:id", middleware.checkAuth, controllerMerchant.deleteMerchant);

module.exports = Router;
