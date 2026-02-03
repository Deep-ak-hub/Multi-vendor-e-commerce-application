const offersRouter = require("express").Router();
const offersController = require("./offers.controller");

offersRouter.get("/", offersController.getOffers);

module.exports = offersRouter;
