const inventoryRouter = require("express").Router();

const inventoryController = require("./inventory.controller");

inventoryRouter.get("/", inventoryController.getInventory);

module.exports = inventoryRouter;
