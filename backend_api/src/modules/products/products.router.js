const productsRouter = require("express").Router();
const productsController = require("./products.controller");

productsRouter.get("/", productsController.getProducts);

module.exports = productsRouter;
