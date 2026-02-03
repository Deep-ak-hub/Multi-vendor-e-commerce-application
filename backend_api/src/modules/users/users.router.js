const usersRouter = require("express").Router();
const { UserRoles } = require("../../config/constants");
const loginCheck = require("../../middlewares/auth.middleware");
const uploader = require("../../middlewares/uploader.middleware");
const validateBodyData = require("../../middlewares/validator.middleware");
const authController = require("../auth/auth.controller");
const { RegisterDTO, updateUserDTO } = require("../auth/auth.validator");
const usersController = require("./users.controller");

usersRouter.post("/", loginCheck([UserRoles.ADMIN]), uploader().single('image'), validateBodyData(RegisterDTO), authController.registerUser);

usersRouter.get('/', loginCheck([UserRoles.ADMIN]), usersController.getAllUsers)

usersRouter.put('/:userId/edit-user', loginCheck(), uploader().single(), validateBodyData(updateUserDTO), authController.updateUserProfile)

usersRouter.delete('/:userId', loginCheck(), usersController.deleteUser)

module.exports = usersRouter;
