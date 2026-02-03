const multer = require("multer");
const fs = require("fs");
const { randomStringGenerator } = require("../utilites/helper");

const uploader = (type = "image") => {
  const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const path = "./public/uploads/";
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }
      cb(false, path);
    },

    filename: (req, file, cb) => {
      const fileName = randomStringGenerator(10) + "-" + file.originalname;
      cb(null, fileName);
    },
  });

  let allowedTypes = ["jpg", "jpeg", "png", "svg", "bmp", "webp", "gif"];

  const validateFileType = (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    if (allowedTypes.includes(ext.toLowerCase())) {
      cb(false, true);
    } else {
      cb({
        code: 422,
        message: "File format not supported",
        status: "INVALID_FILE_ERR",
      });
    }
  };
  
  let limit = 3000000; //equivalent to 3 mb

  if (type === "audio") {
    allowedTypes = ["mp3", "m3u8"];
    limit = 5000000;
  } else if (type === "doc") {
    allowedTypes = ["doc", "docx", "pdf", "csv", "json"];
    limit = 5000000;
  } else if (type === "video") {
    allowedTypes = ["mp4"];
    limit = 10000000;
  }


  return multer({
    storage: myStorage,
    fileFilter: validateFileType,
    limits: {
        fileSize: limit
    },
  });
};

module.exports = uploader;
