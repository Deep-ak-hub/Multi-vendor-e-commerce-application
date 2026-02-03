/* const express = require("express")
const authRouter = express.Router */

const authRouter = require("express").Router();
const authController = require("./auth.controller");

const loginCheck = require('../../middlewares/auth.middleware')
const validateBodyData = require('../../middlewares/validator.middleware')
const {RegisterDTO, LoginDTO, ForgetPasswordDTO, ResetPasswordDTO, updateUserDTO} = require('../auth/auth.validator');
const uploader = require("../../middlewares/uploader.middleware");

// name, email, phone, password, role, gender, dob, address, image,
// _id, status, activationToken, forgetPassword, expiryTime, createdAt, createdBy, updatedBy

authRouter.post("/register", uploader().single('image') ,validateBodyData(RegisterDTO) ,authController.registerUser);
authRouter.get("/activate/:token", authController.activateUserByToken);
authRouter.get("/resend-activation-token/:token", authController.resendActivationToken)
authRouter.post("/login", validateBodyData(LoginDTO) ,authController.loginUser);

authRouter.get("/me", loginCheck() ,authController.getLoggedInUserProfile);
authRouter.put("/:userId/edit-user", loginCheck(), uploader().single() , validateBodyData(updateUserDTO), authController.updateUserProfile);

authRouter.post("/forget-password", validateBodyData(ForgetPasswordDTO) ,authController.forgetPasswordRequest);
authRouter.get("/verify-token/:token", authController.verifyForgetPassword)
authRouter.post("/reset-password/:token", validateBodyData(ResetPasswordDTO) ,authController.resetPassword);


authRouter.post("/logout", authController.userProfileLogout);

module.exports = authRouter;
