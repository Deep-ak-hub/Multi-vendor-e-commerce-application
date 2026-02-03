const { userService } = require("./user.service");

class UsersController {
  async getAllUsers(req, res, next) {
    try {
      const loggedInUser = req.loggedInUser;
      let filter = {
        _id: { $ne: loggedInUser._id },
      };

      if (req.query.role) {
        filter = {
          ...filter,
          role: req.query.role,
        };
      }

      if (req.query.search) {
        filter = {
          ...filter,
          $or: [
            { name: new RegExp(req.query.search, "i") },
            { email: new RegExp(req.query.search, "i") },
            { phone: new RegExp(req.query.search, "i") },
          ],
        };
      }

      // paginaton, limit, page
      const { data, pagination } = await userService.getAllRowsByFilter(
        filter,
        req.query,
      );
      res.json({
        data: data,
        message: "User List",
        status: "OK",
        meta: { pagination },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const {userId} = req.params

      const user = await userService.getSingleRowByFilter({_id: userId})

      // console.log(user);
      
      if(!user) {
        throw {
          code: 404,
          message: "User not found",
          status: "USER_NOT_FOUND"
        }
      }

      const deleteuser = await userService.deleteSingleRowByFilter({_id: user._id})

      res.json({
        data: deleteuser,
        message: "User Deleted",
        status: "USER_DELETED"
      })

    } catch (exception) {
      throw exception
    }
  }
}

const usersController = new UsersController();

module.exports = usersController;
