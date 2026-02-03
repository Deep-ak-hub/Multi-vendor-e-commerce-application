const { CloudinaryConfig } = require("../config/config");
const { fileDelete } = require("../utilites/helper");
const cloudinary = require("cloudinary").v2;
// import {v2 as cloudianry} from 'cloudianry'

// cloudinary contains four main section :
/**
 * configurataion
 * file upload
 * optimization
 * transformation
 */

class CloudinaryService {
  constructor() {
    // configuration
    cloudinary.config({
      cloud_name: CloudinaryConfig.cloudName,
      api_key: CloudinaryConfig.apiKey,
      api_secret: CloudinaryConfig.apiSecret,
    });
  }

  // transformation + optimization
  optimizeImage(public_id, size = "1024*1024") {
    let { width, height } = size.split("x");
    return cloudinary.url(public_id, {
      transformation: [
        {
          aspect_ratio: "1.0",
          height: height,
          width: width,
          crop: "fill",
        },
      ],
    });
  }

  // file upload
  async singleFileUpload(filePath, dir = null, size = "1024*1024") {
    try {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        filePath,
        {
          unique_filename: true,
          folder: dir ? "/ecom-50/" + dir : "/ecom-50",
          // format: "auto",
        }
      );

      //   optimization + transformation
      const thumbUrl = this.optimizeImage(public_id, size);

      //   delete temp file
      fileDelete(filePath);

      return {
        publicId: public_id,
        url: secure_url,
        thumbUrl: thumbUrl,
      };
    } catch (exception) {
      console.log(exception);

      throw {
        code: 500,
        message: "Error uploading file to cloudinary",
        status: "CLOUDINARY_UPLOAD_ERR",
      };
    }
  }

  async multiplefileUpload(files, dir = null, size = "1024 * 1024") {
    try {
      let uploadFiles = [];
      if (files && files.length) {
        files.map((file) => {
          uploadFiles.push(this.singleFileUpload(file.path, dir, size));
        });

        const settlement = await Promise.allSettled(uploadFiles);

        let returnFiles = [];
        settlement.forEach((uploadFile) => {
          if (uploadFile.status === "fulfilled") {
            returnFiles.push(uploadFile.value);
          }
        });
        return returnFiles;
      } else {
        return null;
      }
    } catch (exception) {
      throw {
        code: 500,
        message: "ERROR UPLOADING FILE TO CLOUDINARY",
        status: "CLOUDINARY_UPLOAD_ERR",
      };
    }
  }
}

const cloudinaryService = new CloudinaryService();
module.exports = { cloudinaryService };
