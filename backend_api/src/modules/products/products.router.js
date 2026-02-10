const productsRouter = require("express").Router();
const { UserRoles } = require("../../config/constants");
const loginCheck = require("../../middlewares/auth.middleware");
const uploader = require("../../middlewares/uploader.middleware");
const validateBodyData = require("../../middlewares/validator.middleware");
const productsController = require("./products.controller");
const { RegisterProductDTO, UpdateProductDTO } = require("./products.validator");

productsRouter.get("/for-home", productsController.getAllActiveProducts)

productsRouter.post("/", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), uploader().array('images'), validateBodyData(RegisterProductDTO), productsController.addProducts)

productsRouter.get("/", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), productsController.getAllProducts)

productsRouter.get("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), productsController.getProductsById)

productsRouter.get("/public/:id", productsController.getPublicProductsById)

productsRouter.put("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), uploader().single('images'), validateBodyData(UpdateProductDTO), productsController.updateProductsById)

productsRouter.delete("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), productsController.deleteProductById)

module.exports = productsRouter;
