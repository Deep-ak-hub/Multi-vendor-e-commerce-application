const { UserRoles } = require("../../config/constants");
const { getPagination } = require("../../utilites/pagination");
const ProductModel = require("../products/products.model");
const VariantModel = require("./variant.model");

class VariantService {
  async transformToVariantData(req) {
    const data = req.body;

    const product = await ProductModel.findOne(data.product);

    if (!product) {
      throw {
        code: 404,
        message: "Product not found",
        status: "PRODUCT_NOT_FOUND",
      };
    }

    if (
      req.loggedInUser.role !== UserRoles.ADMIN &&
      product.createdBy.toString() !== req.loggedInUser._id.toString()
    ) {
      throw {
        code: 403,
        message: "You are not allowed to add variant",
        status: "UNAUTHORIZED",
      };
    }
    data.price = data.price * 100;
    data.afterDiscount = data.price - (data.price * data.discount) / 100;

    data.createdBy = req.loggedInUser._id;
  }

  async storeVariant(data) {
    let variant = new VariantModel(data);
    variant = await variant.save();
    return variant;
  }

  async listAllVariantsByFilter(filter, sort, query) {
    const {page, skip , limit} = getPagination(query)

    const data = await VariantModel.find(filter)
      .populate("product")
      .populate("createdBy", ["id", "name", "email"])
      .sort(sort)
      .skip(skip)
      .limit(limit)

    const count = await VariantModel.countDocuments(filter)

    return {
      data, 
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count/limit)
      }
    }
  }

  async validateVariantData(id, loggedInUser) {

  }

  async transformToVariantUpdateData(req, oldVariant) {
    
  }
}

const variantService = new VariantService();

module.exports = variantService;
