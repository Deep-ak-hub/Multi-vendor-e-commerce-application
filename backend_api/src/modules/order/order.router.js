const orderRouter = require("express").Router();
const orderController = require("./order.controller");
orderRouter.get("/", orderController.getOrder);

module.exports = orderRouter;
