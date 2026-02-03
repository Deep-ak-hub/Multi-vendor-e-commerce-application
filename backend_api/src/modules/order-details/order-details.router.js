const orderDetailsRouter = require("express").Router();
const orderDetailsController = require("./order-details.controller");

orderDetailsRouter.get("/", orderDetailsController.getOrderDetails);

module.exports = orderDetailsRouter;
