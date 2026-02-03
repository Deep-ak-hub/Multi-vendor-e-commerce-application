const transactionRouter = require("express").Router();
const transactionController = require("./transactions.controller");

transactionRouter.get("/", transactionController.getTransactions);

module.exports = transactionRouter;
