require("dotenv").config()

const { mongoDbInit } = require("../config/mongodb.config");
const adminSeedServices = require("./admin.seed.service");


(async () => {
  try {
    await mongoDbInit();
    console.log("Database Connected");

    await adminSeedServices.seedAdmin();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
