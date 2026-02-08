const slugify = require("slugify");
const { cloudinaryService } = require("../../services/cloudinary.service");
const ProductModel = require("./products.model");
const { UserRoles } = require("../../config/constants");
const { getPagination } = require("../../utilites/pagination");

class ProductService {
  async transformToProductData(req) {
    try {
      const data = req.body;
      let slugParams = data.name + "-" + Date.now();
      data.slug = slugify(slugParams, { lower: true });

      // foreign key(category, brand, seller) management
      if (!data.category || data.category === "" || data.category === "null") {
        data.category = null;
      }

      if (!data.brand || data.brand === "" || data.category === "null") {
        data.brand = null;
      }

      if (!data.seller || data.seller === "" || data.seller === "null") {
        data.seller = null;
      }

      // price paisa into rupees
      data.price = data.price * 100;

      // afterDiscount
      data.afterDiscount = data.price - (data.price * data.discount) / 100;

      if (req.files) {
        data.images = await cloudinaryService.multiplefileUpload(
          req.files,
          "product",
        );
      }

      data.createdBy = req.loggedInUser._id;

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async storeProduct(data) {
    try {
        let product = new ProductModel(data)
        product = await product.save()
        return await this.getSingleRowByFilter({_id: product._id})
    } catch (exception) {
        throw exception
    }
  }

  async transformToProductUpdateData(req, oldProduct) {
    try {
      const data = req.body

      // foreign key management
      if(data.brand !== undefined && data.brand !== "" && data.brand !== "null") {
        data.brand = data.brand
      } else {
        data.brand = oldProduct.brand
      }

      if(data.category !== undefined && data.category !== "" && data.category !== "null"){
        data.category = data.category
      } else {
        data.category = oldProduct.category
      }

      if(data.seller !== undefined && data.seller !== "" && data.seller !== "null") {
        data.seller = data.seller
      } else {
        data.seller = oldProduct.seller
      }

      if(data.name && data.name !== oldProduct.name) {
        let slugParams = data.name + "-" + Date.now()
        data.slug = slugify(slugParams, {lower: true})
      }

      if(data.price !== undefined) {
        data.price = data.price * 100
        data.afterDicount = data.price - (data.price * data.discount)/100
      } else {
        data.price = oldProduct.price
        data.afterDicount = oldProduct.afterDicount
      }

      data.images = oldProduct.images

      if(req.files) {
        let images = await cloudinaryService.multiplefileUpload(req.files, "product")
        data.images = [...images,...oldProduct.images]
      }

      data.updatedBy = req.loggedInUser._id

      return data
    } catch (exception) {
      throw exception
    }
  }

  async listAllProductsByFilter(filter, sort, query) {
    try {
      const{page, limit, skip} = getPagination(query)

      const data = await ProductModel.find(filter)
        .populate("brand",['_id','name','slug','image','parent','brands','status'])
        .populate("category",['_id','name','slug','image','parent','brands','status'])
        .populate("seller",['_id','name','role','image','status','email'])
        .populate("createdBy",['_id','name','role','image','status','email'])
        .populate("updatedBy",['_id','name','role','image','status','email'])
        .sort(sort)
        .skip(skip)
        .limit(limit)
      
      const count = await ProductModel.countDocuments(filter)

      return {
        data,
        pagination: {
          page: page,
          limit: limit,
          total: count,
          totalPages: Math.ceil(count/limit)
        }
      }
    } catch (exception) {
        throw exception
    }
  }

  async validateProductDetail(id, loggedInUser) {
    try {
      let filter = {
        _id: id
      }

      if(loggedInUser.role !== UserRoles.ADMIN) {
        filter = {
          ...filter,
          createdBy: loggedInUser._id
        }
      }

      const productDetails = await this.getSingleRowByFilter(filter)

      if(!productDetails) {
        throw {
          code: 404,
          message: "Product details not found",
          status: "PRODUCT_NOT_FOUND"
        }
      }
      return productDetails
    } catch (exception) {
      throw exception
    }
  }

  async updateProduct(data, filter) {
    try {
      const updatedProduct = await ProductModel.findOneAndUpdate(filter, {$set: data}, {new: true})
    return updatedProduct
    } catch (exception) {
      throw exception
    }
  }

  async deleteProductByFilter(filter) {
    try {
      return ProductModel.findOneAndDelete(filter)
    } catch (exception) {
      throw exception
    }
  }

  async getSingleRowByFilter(filter) {
    try {
        const productDetails = await ProductModel.findOne(filter)
            .populate("brand",['_id','name','slug','image','parent','brands','status'])
            .populate("category",['_id','name','slug','image','parent','brands','status'])
            .populate("seller",['_id','name','role','image','status','email'])
            .populate("createdBy",['_id','name','role','image','statis','email'])
            .populate("updatedBy",['_id','name','role','image','statis','email'])
        return productDetails
    } catch (exception) {
        throw exception
    }
  }

}

const productService = new ProductService();
module.exports = productService;
