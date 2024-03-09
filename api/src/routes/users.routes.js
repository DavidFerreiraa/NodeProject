const { Router } = require("express");
const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();
const usersControllers = new UsersController();

function middleware(request, response, next) {
    console.log("Passed trough the middleware");
    next();
}

usersRoutes.get("/", usersControllers.index);

usersRoutes.post("/", usersControllers.create)

module.exports = usersRoutes;
