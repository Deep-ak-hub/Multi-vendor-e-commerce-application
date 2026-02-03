const jwt = require("jsonwebtoken");
const { AppConfig } = require("../config/config");
const { userService } = require("../modules/users/user.service");
const { Status, UserRoles } = require("../config/constants");

const loginCheck = (allowedRole = null) => {
  return async (req, res, next) => {
    try {
      let token = req.headers["authorization"] ?? null;

      if (!token) {
        throw {
          code: 401,
          message: "Login required",
          stauts: "TOKEN_NOT_FOUND",
        };
      }

      token = token.replace("Bearer ", "");
      // const data = jwt.decode()
      const data = jwt.verify(token, AppConfig.jwtSecret);
      // console.log(data);

      if (data.typ !== "Bearer") {
        throw {
          code: 401,
          message: "Invalid token type",
          status: "INVALID_TOKEN_TYPE",
        };
      }

      // checking if the user (from the token) still exists in the database AND if their account is still active. If the user was deleted or banned by an admin, this will return nothing, and the code will reject the request.
      const userDetail = await userService.getSingleRowByFilter({
        _id: data.sub,
        status: Status.ACTIVE,
      });

      // if admin removes the certain user or ban that user from the platform
      if (!userDetail) {
        throw {
          code: 401,
          message: "User does not exists or activated anymore",
          status: "USER_NOT_FOUND_OR_ACTIVATED",
        };
      }

      // request manipulate
      // Takes the user's full data and extracts only the public information (like name, email, profile picture) and stores in loggedInUser
      req.loggedInUser = userService.getUserPublicProfile(userDetail);

      //  checks if the user has permission to access the route
      if (
        userDetail.role === UserRoles.ADMIN ||  //User is admin,can access anything
        !allowedRole ||  //there's no role requirement on this route
        (allowedRole && allowedRole.length && allowedRole.includes(userDetail.role)) //the user's role is in the allowed roles list
      ) {
        next();
      } else {
        throw {
          code: 403,
          message: "Access Denied",
          status: "PERMISSION_DENIED",
        };
      }

    } catch (exception) {
      if (exception instanceof jwt.TokenExpiredError) {
        exception.code = 401;
        exception.status = "TOKEN_EXPIRED_ERR";
      } else if (exception instanceof jwt.JsonWebTokenError) {
        exception.code = 401;
        exception.status = "JWT_ERR";
      }
      next(exception);
    }
  };
};

module.exports = loginCheck;
