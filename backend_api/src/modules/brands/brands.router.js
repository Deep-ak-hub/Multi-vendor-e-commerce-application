const brandRouter = require("express").Router();

const { UserRoles } = require("../../config/constants");
const brandController = require("./brands.controller");
const loginCheck = require("../../middlewares/auth.middleware");
const { createBrandDTO, updateBrandDTO } = require("./brands.validator");
const validateBodyData = require("../../middlewares/validator.middleware")
const uploader = require("../../middlewares/uploader.middleware")

brandRouter.get("/for-home",brandController.getAllActiveBrands)     //List by all but only active brands

brandRouter.post('/', loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), uploader().single('logo'), validateBodyData(createBrandDTO), brandController.addBrand)
brandRouter.get('/', loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), brandController.getAllBrands)       //get all brands
brandRouter.get('/:id', loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), brandController.getBrandById)       //get detail by id
brandRouter.put('/:id', loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), uploader().single('logo'), validateBodyData(updateBrandDTO), brandController.updateBrandData)       //update by id
brandRouter.delete('/:id', loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), brandController.deleteBrandById)    // delete by id

module.exports = brandRouter;
