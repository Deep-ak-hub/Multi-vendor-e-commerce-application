const express = require("express");
// const { mongoDbInit } = require("./mongodb.config.js");

// Ensure MongoDB initialization errors are handled
/* mongoDbInit().catch((err) => {
  console.error("Failed to initialize MongoDB:", err);
  process.exit(1);
});
 */
const router = require("./router.config.js");
const ErrorHandler = require("../middlewares/error-handling.middleware.js");
const cors = require("cors");
const rateLimit = require("express-rate-limit")
const helmet = require("helmet")

const app = express();

app.use(cors());
const limiter = rateLimit({
  windowMs: 180000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
})

app.use(limiter)

app.use(helmet())

// Parser
app.use(
  express.json({
    limit: "5mb",
  }),
);

app.use(
  express.urlencoded({
    limit: "5mb",
  }),
);

app.use("/api/v1", router);
// app.use('/api/v2',router)

// 404 error
app.use((req, res, next) => {
  next({
    error: null,
    message: "not found",
    status: "NOT_FOUND_ERR",
  });
});

app.use(ErrorHandler);

module.exports = app;
