const { Router } = require("express");
const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated.js")

const usersRoutes = Router();
const usersControllers = new UsersController();

function middleware(request, response, next) {
    console.log("Passed trough the middleware");
    next();
}

usersRoutes.post("/", usersControllers.create);
usersRoutes.put("/", ensureAuthenticated, usersControllers.update);

module.exports = usersRoutes;
