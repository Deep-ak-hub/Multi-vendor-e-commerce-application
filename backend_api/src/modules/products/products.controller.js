const { UserRoles, Status } = require("../../config/constants");
const queryBuilder = require("../../utilites/queryBuilder");
const productService = require("./products.service");

class ProductsController {
  async addProducts(req, res, next) {
    try {
      const productDetails = await productService.transformToProductData(req);
      const products = await productService.storeProduct(productDetails);

      res.json({
        data: products,
        message: "Product added successfully",
        STATUS: "PRODUCTS_ADDED",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getAllProducts(req, res, next) {
    try {
      const{filter, sort} = queryBuilder.getAllProductsQuery(req)

   /*    console.log(filter);
      console.log(sort);
       */

      const { data, pagination } = await productService.listAllProductsByFilter(
        filter,
        sort,
        req.query,
      );

      res.json({
        data: data,
        message: "Products fetched successfully",
        status: "PRODUCTS_FETCHED",
        meta: { pagination },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getAllActiveProducts(req, res, next) {
    try {
      const {filter, sort} = queryBuilder.getAllActiveProductsQuery(req)

      const { data, pagination } = await productService.listAllProductsByFilter(
        filter,
        sort,
        req.query,
      );

      res.json({
        data: data,
        message: "Product Listing",
        status: "PRODUCT_LIST",
        meta: { pagination },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getProductsById(req, res, next) {
    try {
      const { id } = req.params;

      const productDetails = await productService.validateProductDetail(
        id,
        req.loggedInUser,
      );

      res.json({
        data: productDetails,
        message: "Product Details fetched",
        status: "PRODUCT_DETAILS",
      });
    } catch (exception) {
      throw exception;
    }
  }

  async updateProductsById(req, res, next) {
    try {
      const productDetails = await productService.validateProductDetail(
        req.params.id,
        req.loggedInUser,
      );
      let updateData = await productService.transformToProductUpdateData(
        req,
        productDetails,
      );
      updateData = await productService.updateProduct(updateData, {
        _id: productDetails._id,
      });

      res.json({
        data: updateData,
        messasge: "Product updated successfully",
        status: "PRODUCT_UPDATED",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async deleteProductById(req, res, next) {
    const productDetails = await productService.validateProductDetail(
      req.params.id,
      req.loggedInUser,
    );
    const del = await productService.deleteProductByFilter({
      _id: productDetails._id,
    });

    res.json({
      data: del,
      message: "Product deleted successfully",
      status: "PRODUCT_DELETED",
    });
  }
}

const productsController = new ProductsController();

module.exports = productsController;
