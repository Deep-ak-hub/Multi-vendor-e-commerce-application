const { Status } = require("../../config/constants");
const bcrypt = require("bcryptjs")
const { cloudinaryService } = require("../../services/cloudinary.service");
const { randomStringGenerator, createDate } = require("../../utilites/helper");

class AuthService {
  async transformUserForRegistration(req) {
    try {
      const data = req.body;

      /* if(!req.file) {
        throw {code: 400, message: "Image Required", detail: {image: "Image is compulsory", status: "VALIDATION_ERR"}}
      } */

      if(req.file) {
          const file = req.file;                 // for multiple files ----> const files = req.files
          data.image = await cloudinaryService.singleFileUpload(file.path,"users/");
      }

      // const salt = bcrypt.genSaltSync(12)
      // data.password = bcrypt.hashSync(data.password, salt)
      data.password = bcrypt.hashSync(data.password, 12);

      data.activationToken = randomStringGenerator();
      data.expiryTime = createDate(new Date(), 1);
      data.status = Status.INACTIVE;

      return data
    } catch (exception) {
      throw exception;
    }
  }

  async transformUserForUpdate(req) {
    const data = req.body

    if(req.file) {
      const file = req.file
      data.image = await cloudinaryService.singleFileUpload(file.path,"users/");
    }

    // if user want to update password
    if(data.password && data.password.trim()!== '') {
      data.password = bcrypt.hashSync(data.password,12)
    } else {
      delete data.password
    }

    delete data.role
    delete data.status
    delete data.activationToken
    delete data.forgetPasswordToken
    delete data.expiryTime

    return data
  }
}

const authService = new AuthService()
module.exports = {authService}
