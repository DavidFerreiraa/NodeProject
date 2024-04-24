const { Router } = require("express");
const TagsController = require("../controllers/TagsController.js");
const ensureAuthenticated = require("../middleware/ensureAuthenticated.js");

const tagsRoutes = Router();

const tagsController = new TagsController();

tagsRoutes.get("/", ensureAuthenticated, tagsController.index);

module.exports = tagsRoutes;
