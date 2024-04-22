const { Router } = require("express");
const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated.js");
const multer = require("multer");
const uploadConfig = require("../configs/upload.js");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);
const usersControllers = new UsersController();

function middleware(request, response, next) {
    console.log("Passed trough the middleware");
    next();
}

usersRoutes.post("/", usersControllers.create);
usersRoutes.put("/", ensureAuthenticated, usersControllers.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), (request, response) => {
    console.log(request.file.filename);
    response.json();
});

module.exports = usersRoutes;
