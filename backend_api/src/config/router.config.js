const router = require("express").Router();

const authRouter = require("../modules/auth/auth.router");
const frontRouter = require("../modules/front/front.router");
const bannerRouter = require("../modules/banners/banners.router");
const brandRouter = require("../modules/brands/brands.router");
const categoryRouter = require("../modules/category/category.router");
const feedbackRouter = require("../modules/feedback/feedback.router");
const inventoryRouter = require("../modules/inventory/inventory.router");
const offersRouter = require("../modules/offers/offers.router");
const orderRouter = require("../modules/order/order.router");
const orderDetailsRouter = require("../modules/order-details/order-details.router");
const productsRouter = require("../modules/products/products.router");
const transactionsRouter = require("../modules/transactions/transactions.router");
const usersRouter = require("../modules/users/users.router");
const variantRouter = require("../modules/variant/variant.router");

router.use("/auth", authRouter);
router.use("/front", frontRouter);
router.use("/banners", bannerRouter);
router.use("/brands", brandRouter);
router.use("/category", categoryRouter);
router.use("/feedback", feedbackRouter);
router.use("/inventory", inventoryRouter);
router.use("/offers", offersRouter);
router.use("/order", orderRouter);
router.use("/order-details", orderDetailsRouter);
router.use("/products", productsRouter);
router.use("/variant", variantRouter)
router.use("/transactions", transactionsRouter);
router.use("/users", usersRouter);

module.exports = router;
