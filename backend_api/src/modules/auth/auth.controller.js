const { authService } = require("./auth.service");
const { userService } = require("../users/user.service");
const authEmailService = require("./auth.mail");
const { Status } = require("../../config/constants");
const { randomStringGenerator, createDate } = require("../../utilites/helper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AppConfig } = require("../../config/config");

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      const data = await authService.transformUserForRegistration(req);
      const user = await userService.storeUser(data);

      await authEmailService.notifyToActivateUserAccout(user);
      res.json({
        data: userService.getUserPublicProfile(user),
        message: "Your account has been created successfully",
        status: "OK",
        meta: {
          activationLink: AppConfig.frontendURL + "verify/" + user.activationToken,
        },
      });
      // console.log(data.activationToken);
    } catch (exception) {
      console.log({ exception });
      next(exception);
    }
  };

  activateUserByToken = async (req, res, next) => {
    try {
      const token = req.params.token;
      
      let userDetail = await userService.getSingleRowByFilter({
        activationToken: token,
      });

      console.log("Found user:", userDetail);

      if (!userDetail) {
        throw {
          code: 404,
          message: "Token not found",
          status: "USER_NOT_FOUND_ERR",
        };
      }

      // Check if already active
      if (userDetail.status === Status.ACTIVE) {
        // Account already activated – treat as success
        return res.status(200).json({
          data: userService.getUserPublicProfile(userDetail),
          message: "Account is already active. Please login.",
          status: "ALREADY_ACTIVATED",
        });
      }

      // userdetails exists
      const today = Date.now();
      console.log(userDetail);
      const expiryTime = userDetail.expiryTime.getTime();

      //expiry check
      if (today > expiryTime) {
        throw {
          code: 422,
          message: "Token expired",
          status: "ACTIVATION_TOKEN_EXPIRED",
        };
      }

      const update = {
        activationToken: null,
        expiryTime: null,
        status: Status.ACTIVE,
      };
      userDetail = await userService.updateSingleRowByFilter(
        { _id: userDetail._id },
        update,
      );

      // notify
      await authEmailService.notifyWelcomeMessage(userDetail);

      // respond
      res.status(201).json({
        data: userService.getUserPublicProfile(userDetail),
        message: "Thank you for registering, Please login to continue",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  };

  async resendActivationToken(req, res, next) {
    try {
      const token = req.params.token;
      // console.log("old token: ", userDetail.activationToken);

      let userDetail = await userService.getSingleRowByFilter({
        activationToken: token,
      });
      // console.log("New token: ", userDetail.activationToken);

      if (!userDetail) {
        throw {
          code: 404,
          message: "User has been already activated or token not found",
          status: "USER_NOT_FOUND_ERR",
        };
      }

      // userdetails exists
      const today = Date.now();
      // console.log(userDetail);
      const expiryTime = userDetail.expiryTime.getTime();

      //expiry check
      if (today <= expiryTime) {
        throw {
          code: 422,
          message: "Token not expired",
          status: "ACTIVATION_TOKEN_NOT_EXPIRED",
        };
      }

      const update = {
        activationToken: randomStringGenerator(),
        expiryTime: createDate(new Date(), 1),
        status: Status.INACTIVE,
      };

      userDetail = await userService.updateSingleRowByFilter(
        { _id: userDetail._id },
        update,
      );

      // notify
      await authEmailService.notifyToActivateUserAccout(userDetail);

      // respond
      res.status(201).json({
        data: null,
        message: "A new activation link has been sent to your email...",
        status: "OK",
        meta: {
          resendLink:
            AppConfig.frontendURL + "/verify/" + userDetail.activationToken,
        },
      });
    } catch (exception) {
      next(exception);
    }
  }

  loginUser = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const userDetail = await userService.getSingleRowByFilter({
        email: username,
      });

      if (!userDetail) {
        throw {
          code: 422,
          message: "You have not registered yet",
          status: "USER_NOT_REGISTERED",
        };
      }

      //user found
      if (!bcrypt.compareSync(password, userDetail.password)) {
        throw {
          code: 422,
          message: "Credentials doesnot match",
          status: "CREDENTIALS_DOES_NOT_MATCH",
        };
      }

      //password verify
      if (userDetail.status !== Status.ACTIVE) {
        throw {
          code: 422,
          message:
            "Account not activated yet, please check your email for activation",
          status: "ACCOUNT_NOT_ACTIVATED",
        };
      }

      // we are creating the rest api. The REST api doesn't preserve the state that comes in the api request. so in order to preserve the state we need to share a specific data(in form of token) to acknowledge the frontend about the login state from backend. So we create a token using jwt

      // json web token
      // 3 part => headers.payload.signature

      const accessToken = jwt.sign(
        { sub: userDetail._id, typ: "Bearer" },
        AppConfig.jwtSecret,
        { expiresIn: "1d" },
      );

      // refreshToken

      // 2FA

      res.status(200).json({
        data: accessToken,
        message: "You have been successfully logged in.",
        status: "LOGIN_SUCCESS",
      });
    } catch (exception) {
      next(exception);
    }
  };

  forgetPasswordRequest = async (req, res, next) => {
    try {
      // validation of data in the router through DTO

      // get user Detail(email) from that DTO
      const { email } = req.body;
      const userDetail = await userService.getSingleRowByFilter({
        email: email,
      });

      if (!userDetail) {
        throw {
          code: 404,
          message: "Email not found",
          status: "EMAIL_NOT_FOUND_ERR",
        };
      }

      // generate a token and expiryTime
      const updateData = {
        forgetPasswordToken: randomStringGenerator(),
        expiryTime: createDate(new Date(), 1 / 24),
      };

      // update user  with updateData
      const updatedUser = await userService.updateSingleRowByFilter(
        { _id: userDetail._id },
        updateData,
      );

      // send mail to the user with link
      await authEmailService.sendResetLink(updatedUser);

      // response to the client
      res.status(200).json({
        data: null,
        message:
          "An email has been forwarded to registered account for password reset.",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  };

  getLoggedInUserProfile = (req, res, next) => {
    res.json({
      data: req.loggedInUser,
      message: "profile fetched successfully",
      status: "OK",
    });
  };

  updateUserProfile = async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await userService.getSingleRowByFilter({ _id: userId });

      if (!user) {
        throw {
          code: 404,
          message: "User not found",
          status: "USER_NOT_FOUND_ERR",
        };
      }

      const updateData = await authService.transformUserForUpdate(req);

      // console.log("Update Data:", updateData)

      const updatedUser = await userService.updateSingleRowByFilter(
        { _id: userId },
        updateData,
      );

      if (!updatedUser) {
        throw {
          code: 400,
          message: "User update failed",
          status: "USER_UPDATE_FAILED",
        };
      }

      res.status(200).json({
        data: userService.getUserPublicProfile(updatedUser),
        message: "User updated successfully",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  };

  verifyForgetPassword = async (req, res, next) => {
    try {
      // token from params
      const { token } = req.params;

      // token user get
      const userDetail = await userService.getSingleRowByFilter({
        forgetPasswordToken: token,
      });

      // exception throw if not found
      if (!userDetail) {
        throw {
          code: 404,
          message: "Token not found",
          status: "TOKEN_NOT_FOUND_ERR",
        };
      }

      // validate expiryTime
      const now = Date.now();
      const expiryTIme = userDetail.expiryTime.getTime();

      // expired => throw exception
      if (now > expiryTIme) {
        throw {
          code: 422,
          message: "Token Expired",
          status: "TOKEN_EXPIRED_ERR",
        };
      }

      // success => return with verification code
      res.status(200).json({
        data: { token },
        message: "Token verified Successfully",
        status: "TOKEN_VALID",
      });
    } catch (exception) {
      next(exception);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      // params => token
      // body(data) => password, confirmPassword
      const { token } = req.params;
      const { password, confirmPassword } = req.body;

      // token user get
      const userDetail = await userService.getSingleRowByFilter({
        forgetPasswordToken: token,
      });

      // exception throw if not found
      if (!userDetail) {
        throw {
          code: 404,
          message: "Token not found",
          status: "TOKEN_NOT_FOUND_ERR",
        };
      }

      // validate expiryTime
      const now = Date.now();
      const expiryTime = userDetail.expiryTime.getTime();

      // expired => throw exception
      if (now > expiryTime) {
        throw {
          code: 410,
          message: "Reset token is expired",
          status: "RESET_TOKEN_EXPIRED_ERR",
        };
      }

      const updatePassword = {
        password: bcrypt.hashSync(password, 12),
        forgetPasswordToken: null,
        expiryTime: null,
      };

      await userService.updateSingleRowByFilter(
        { _id: userDetail._id },
        updatePassword,
      );

      // optional : notify via email

      // response to the client
      res.status(200).json({
        data: null,
        message: "Password has been reset successfully",
        status: "PASSWORD_RESET_SUCCESS",
      });
    } catch (exception) {
      next(exception);
    }
  };

  userProfileLogout = (req, res, enextnd) => {
    res.json({
      data: {},
      message: "logout successful",
      status: "OK",
    });
  };
}

const authController = new AuthController();

module.exports = authController;
