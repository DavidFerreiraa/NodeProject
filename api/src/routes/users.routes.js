const { Router } = require("express");
const ensureAuthenticated = require("../middleware/ensureAuthenticated.js");
const multer = require("multer");

const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController.js");

const uploadConfig = require("../configs/upload.js");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersControllers = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", usersControllers.create);
usersRoutes.put("/", ensureAuthenticated, usersControllers.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);

module.exports = usersRoutes;
