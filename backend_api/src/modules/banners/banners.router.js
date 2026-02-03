const bannerRouter = require("express").Router();
const bannerController = require("./banners.controller");

bannerRouter.get("/", bannerController.getBanner)
module.exports = bannerRouter;
