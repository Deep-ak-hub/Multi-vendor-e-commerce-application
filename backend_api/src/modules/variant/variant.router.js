const { UserRoles } = require("../../config/constants")
const loginCheck = require("../../middlewares/auth.middleware")
const validateBodyData = require("../../middlewares/validator.middleware")
const variantController = require("./variant.controller")
const { updateVariantDTO } = require("./variant.validator")

const variantRouter = require("express").Router()

variantRouter.post("/", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), validateBodyData(updateVariantDTO), variantController.createVariant)
variantRouter.get("/", variantController.getAllVariants)
variantRouter.get("/:id", variantController.getVariantById)
variantRouter.put("/:variantId", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), validateBodyData(updateVariantDTO), variantController.updateVariant)
variantRouter.delete("/:variantId", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), variantController.deleteVariant)

module.exports = variantRouter