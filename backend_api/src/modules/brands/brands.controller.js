const { UserRoles, Status } = require("../../config/constants");
const brandService = require("./brands.service");

class BrandController {
  addBrand = async (req, res, next) => {
    try {
      const data = await brandService.transformToBrandData(req);
      const brand = await brandService.storeBrand(data);

      res.json({
        data: brand,
        message: "Brand Created Successfully",
        status: "BRAND_CREATED",
      });
    } catch (exception) {
      next(exception);
    }
  };

  getAllBrands = async (req, res, next) => {
    try {
      let filter = {};
      if (req.loggedInUser.role !== UserRoles.ADMIN) {
        filter = {
          ...filter,
          createdBy: req.loggedInUser._id,
        };
      }
      const data = await brandService.listAllBrandsByFilter(filter);
      res.json({
        data: data,
        message: "Brand Listing",
        status: "BRAND_LIST",
      });
    } catch (exception) {
      next(exception);
    }
  };

  getAllActiveBrands = async (req, res, next) => {
    try {
      const filter = { status: Status.ACTIVE };
      const data = await brandService.listAllBrandsByFilter(filter);

      res.json({
        data: data,
        message: "Brand Listing",
        status: "BRAND_LISTING",
      });
    } catch (exception) {
      next(exception);
    }
  };

  getBrandById = async (req, res, next) => {
    try {
      const brandDetails = await brandService.validateBrandDetail(req.params.id, req.loggedInUser);

      if (!brandDetails) {
        throw {
          code: 404,
          message: "brand not found",
          status: "BRAND_NOT_FOUND",
        };
      }

      res.json({
        data: brandDetails,
        message: "Brand details",
        status: "BRAND_DETAIL",
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateBrandData = async (req, res, next) => {
    try {
      const brandDetail = await brandService.validateBrandDetail(
        req.params.id,
        req.loggedInUser
      );

      let updateData = await brandService.transfomrToBrandUpdateData(
        req,
        brandDetail
      );

      updateData = await brandService.updateBrand(updateData, {
        _id: brandDetail._id,
      });
      res.json({
        data: updateData,
        message: "Brand Updated",
        status: "BRAND_UPDATED",
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteBrandById = async (req, res, next) => {
    try {
      const brandDetail = await brandService.validateBrandDetail(
        req.params.id,
        req.loggedInUser
      );
      const deleteBrand = await brandService.deleteDataByFilter({
        _id: brandDetail._id,
      });

      res.json({
        data: deleteBrand,
        message: "Brand Deleted",
        status: "BRAND_DELETED",
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const brandController = new BrandController();

module.exports = brandController;
