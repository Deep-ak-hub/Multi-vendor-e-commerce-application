const { UserRoles, Status } = require("../../config/constants");
const categoryService = require("./category.service");

class CategoryController {
  async addCategory(req, res, next) {
    try {
      const data = await categoryService.transformToCategoryData(req)
      const category = await categoryService.storeCategory(data);

      res.json({
        data: category,
        message: "Category Created Successfully",
        status: "CATEGORY_CREATED"
      })
    } catch (exception) {
      next(exception);
    }
  }

  async getAllCategories(req, res, next) {
    try {
      let filter = {};
      if (req.loggedInUser.role !== UserRoles.ADMIN) {
        filter = {
          ...filter,
          createdBy: req.loggedInUser._id,
        };
      }

      const data = await categoryService.listAllCategoriesByFilter(filter)

      res.json({
        data: data,
        message: "Category Listing",
        status: "CATEGORY_LIST"
      })
    } catch (exception) {
      next(exception);
    }
  }

  async getCategoryById(req, res, next) {
    const {id} = req.params
    try {
      const categoryDetail = await categoryService.validateCategoryDetail(id, req.loggedInUser)
      res.json({
        data: categoryDetail,
        message: "Category Detail",
        status: "CATEGORY_DETAIL"
      })
    } catch (exception) {
      next(exception)
    }
  }

  async getAllActiveCategories(req, res, next) {
    try {
      let filter = {status: Status.ACTIVE}
      const data = await categoryService.listAllCategoriesByFilter(filter)

      res.json({
        data: data,
        message: "Category Listing",
        status: "CATEGORY_LIST"
      })
    } catch (exception) {
      next(exception)
    }
  }

  async updateCategoryById(req, res, next) {
    try {
      const {id} = req.params
      const categoryDetail = await categoryService.validateCategoryDetail(id, req.loggedInUser)
      let updateData = await categoryService.transformToCategoryUpdateData(req, categoryDetail)
      updateData = await categoryService.updateCategory(updateData, {_id: categoryDetail._id})

      res.json({
        data: updateData,
        message: "Category Updated",
        status: "CATEGORY_UPDATED"
      })
    } catch (exception) {
      next(exception)
    }
  }

  async deleteCategoryById(req, res, next) {
    try {
      const {id} = req.params
      const categoryDetail = await categoryService.validateCategoryDetail(id, req.loggedInUser)
      const deleteData = await categoryService.deleteCategoryByFilter({_id: categoryDetail._id})

      res.json({
        data: deleteData,
        message: "Category Deleted",
        status: "CATEGORY_DELETED"
      })
    } catch (exception) {
      next(exception)
    }
  }
}

const categoryController = new CategoryController();

module.exports = categoryController;
