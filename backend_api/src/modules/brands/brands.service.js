const slugify = require("slugify");
const { cloudinaryService } = require("../../services/cloudinary.service");
const BrandModel = require("./brands.model");
const { UserRoles } = require("../../config/constants");

class BrandService {
  async transformToBrandData(req) {
    try {
      const data = req.body;
      data.slug = slugify(data.name, {
        lower: true,
      });

      if (req.file) {
        data.logo = await cloudinaryService.singleFileUpload(
          req.file.path,
          "brand"
        );
      }

      data.createdBy = req.loggedInUser._id;
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async storeBrand(data) {
    try {
      const brand = new BrandModel(data);
      return await brand.save()
    } catch (error) {
      if (error.code === 11000) {
        throw {
          code: 400,
          message: "Brand already exists",
          status: "BRAND_ALREADY_EXISTS",
        };
      }
      throw error;
    }
  }

  async listAllBrandsByFilter(filter) {
    try {
      const data = await BrandModel.find(filter)
        .populate("createdBy", [
          "_id",
          "name",
          "role",
          "image",
          "status",
          "email",
        ])
        .populate("updatedBy", [
          "_id",
          "name",
          "role",
          "image",
          "status",
          "email",
        ]);
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async getSingleRowByFilter(filter) {
    try {
      const data = await BrandModel.findOne(filter)
        .populate("createdBy", [
          "_id",
          "name",
          "role",
          "image",
          "status",
          "email",
        ])
        .populate("updatedBy", [
          "_id",
          "name",
          "role",
          "image",
          "status",
          "email",
        ]);
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async validateBrandDetail(id, loggedInUser) {
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

      const brandDetail = await this.getSingleRowByFilter(filter);
      if (!brandDetail) {
        throw {
          code: 404,
          message: "Brand Details not found",
          status: "BRAND_NOT_FOUND",
        };
      }
      return brandDetail;
    } catch (exception) {
      throw exception;
    }
  }

  async transfomrToBrandUpdateData(req, oldBrand) {
    try {
      const data = req.body;

      if (data.name && data.name !== oldBrand.name) {
        data.slug = slugify(data.name, { lower: true });
      }

      if (req.file) {
        data.logo = await cloudinaryService.singleFileUpload(
          req.file.path,
          "brand"
        );
      } else {
        data.logo = oldBrand.logo;
      }

      data.updatedBy = req.loggedInUser._id;

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async updateBrand(data, filter) {
    try {
      const updatedData = await BrandModel.findOneAndUpdate(
        filter,
        { $set: data },
        { new: true }
      );
      return updatedData;
    } catch (exception) {
      throw exception;
    }
  }

  async deleteDataByFilter(filter) {
    try {
      return await BrandModel.findOneAndDelete(filter);
    } catch (exception) {
      throw exception;
    }
  }
}

const brandService = new BrandService();

module.exports = brandService;
