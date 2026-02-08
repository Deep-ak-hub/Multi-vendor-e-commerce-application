// const dotenv = require("dotenv")
// dotenv.config()
require("dotenv").config();

const CloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
};

const DbConfig = {
  mongodb: {
    url: process.env.MONGODB_URL,
    dbName: process.env.MONGODB_DB,
  }
};

const SmtpConfig = {
  smtpService: process.env.PROVIDER ?? 'gmail',
  smtpHost : process.env.SMTP_HOST,
  smtpPort : process.env.SMTP_PORT,
  smtpUser : process.env.SMTP_USER,
  smtpPassword : process.env.SMTP_PASSWORD,
  smtpFromAddress : process.env.SMTP_FROM,
}

const AppConfig = {
  frontendURL: process.env.FRONTEND_URL,
  jwtSecret: process.env.JWT_SECRET
}

const AdminConfig = {
  name: process.env.ADMIN_NAME,
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD
}

const RedisConfig = {
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
}

module.exports = {
  CloudinaryConfig,
  DbConfig,
  SmtpConfig,
  AppConfig,
  AdminConfig,
  RedisConfig
};
