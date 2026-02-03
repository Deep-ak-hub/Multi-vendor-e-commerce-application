const slugify = require("slugify");
const { cloudinaryService } = require("../../services/cloudinary.service");
const CategoryModel = require("./category.model");
const { UserRoles } = require("../../config/constants");

class CategoryService {
  async transformToCategoryData(req) {
    try {
      const data = req.body;
      data.slug = slugify(data.name, { lower: true });

      if (req.file) {
        data.image = await cloudinaryService.singleFileUpload(
          req.file.path,
          "category",
        );
      }

      if(!data.parent || data.parent==="" || data.parent === "null") {
        data.parent = null
      }

      if(!data.brands || data.brands === "" || data.brands === "null") {
        data.brands = null
      }

      data.createdBy = req.loggedInUser._id;
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async storeCategory(data) {
    try {
      let category = new CategoryModel(data);
      category = await category.save();
      return await this.getSingleRowByFilter({ _id: category._id });
    } catch (exception) {
      throw exception;
    }
  }

  async transformToCategoryUpdateData(req, oldCategory) {
    try {
      const data = req.body;

      if (data.name && data.name !== oldCategory.name) {
        data.slug = slugify(data.name, { lower: true });
      }

      if (req.file) {
        data.image = await cloudinaryService.singleFileUpload(
          req.file.path,
          "category",
        );
      } else {
        data.image = oldCategory.image;
      }

      data.updatedBy = req.loggedInUser._id;

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async listAllCategoriesByFilter(filter) {
    const data = await CategoryModel.find(filter)
      .populate("parent", ['_id', 'name', 'slug','image','parent','brands', 'status'])
      .populate("brands", ['_id', 'name', 'slug','image','parent','brands', 'status'])
      .populate("createdBy", ["_id", "name", "role", "image", "status", "email", ])
      .populate("updatedBy", ["_id", "name", "role", "image", "status", "email", ]);

      return data
  }

  async validateCategoryDetail(id, loggedInUser) {
    try {
      let filter = {
        _id: id,
      };

      if (loggedInUser.role !== UserRoles.ADMIN) {
        filter = {
          ...filter,
          createdBy: loggedInUser._id,
        };
      }

      const categoryDetail = await this.getSingleRowByFilter(filter);

      if (!categoryDetail) {
        throw {
          code: 404,
          message: "Category Details not found",
          status: "CATEGORY_NOT_FOUND",
        };
      }
      return categoryDetail;
    } catch (exception) {
      throw exception;
    }
  }

  async updateCategory(data, filter) {
    try {
      const updatedData = await CategoryModel.findOneAndUpdate(
        filter,
        { $set: data },
        { new: true },
      );
      return updatedData;
    } catch (exception) {
      throw exception;
    }
  }

  async deleteCategoryByFilter(filter) {
    try {
      return CategoryModel.findOneAndDelete(filter);
    } catch (exception) {
      throw exception;
    }
  }

  async getSingleRowByFilter(filter) {
    try {
      const data = await CategoryModel.findOne(filter)
        .populate("parent", ['_id', 'name', 'slug','image','parent','brands', 'status'])
        .populate("brands", ['_id', 'name', 'slug','image','parent','brands', 'status'])
        .populate("createdBy", ["_id", "name", "role", "image", "status", "email", ])
        .populate("updatedBy", ["_id", "name", "role", "image", "status", "email", ]);

        return data

    } catch (exception) {
      throw exception;
    }
  }
}

const categoryService = new CategoryService();

module.exports = categoryService
