const { Router } = require("express");
const TagsController = require("../controllers/TagsController.js");
const ensureAuthnticated = require("../middleware/ensureAuthenticated.js");

const tagsRoutes = Router();

const tagsController = new TagsController();

tagsRoutes.get("/", ensureAuthnticated, tagsController.index);

module.exports = tagsRoutes;
