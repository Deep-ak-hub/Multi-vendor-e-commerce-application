const feedbackRouter = require("express").Router();

const feedbackController = require("./feedback.controller");

feedbackRouter.get("/", feedbackController.getFeedback);

module.exports = feedbackRouter;
