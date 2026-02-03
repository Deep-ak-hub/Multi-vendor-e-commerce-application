const categoryRouter = require("express").Router();

const { UserRoles } = require("../../config/constants");
const loginCheck = require("../../middlewares/auth.middleware");
const uploader = require("../../middlewares/uploader.middleware");
const validateBodyData = require("../../middlewares/validator.middleware");
const categoryController = require("./category.controller");
const { createCategoryDTO, updateCategoryDTO } = require("./category.validator");

categoryRouter.get("/for-home", categoryController.getAllActiveCategories);

categoryRouter.post("/",  loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), uploader().single('image'), validateBodyData(createCategoryDTO),categoryController.addCategory);

categoryRouter.get("/", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), categoryController.getAllCategories);

categoryRouter.get("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), categoryController.getCategoryById);

categoryRouter.put("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), uploader().single('image'), validateBodyData(updateCategoryDTO), categoryController.updateCategoryById);

categoryRouter.delete("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), categoryController.deleteCategoryById);

module.exports = categoryRouter;
