const queryBuilder = require("../../utilites/queryBuilder");
const variantService = require("./variant.service");

class VariantController {
  async createVariant(req, res, next) {
    try {
      const variantDetails = await variantService.transformToVariantData(req);
      const variant = await variantService.storeVariant(variantDetails);

      res.json({
        data: variant,
        message: "Variant created successfully",
        status: "VARIANT_ADDED"
      })
    } catch (exception) {
       next(exception);
    }
  }

  async getAllVariants(req, res, next) {
    try {
      const {filter, sort} = queryBuilder.getAllVariantsQuery(req)
      
      const {data, pagination} = variantService.listAllVariantsByFilter(filter, sort, req.query)

      res.json({
        data: data,
        message: "Variants fetched Successfully",
        status: "VARIANTS_LIST",
        meta: {pagination}
      })
    } catch (exception) {
      next(exception);
    }
  }

  async getVariantById(req, res, next) {
    try {
    } catch (exception) {
      throw exception;
    }
  }

  async updateVariant(req, res, next) {
    try {
    } catch (exception) {
      next(exception);
    }
  }

  async deleteVariant(req, res, next) {
    try {
    } catch (exception) {
      next(exception);
    }
  }
}

const variantController = new VariantController();

module.exports = variantController;
