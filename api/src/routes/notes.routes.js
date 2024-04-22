const { Router } = require("express");
const NotesController = require("../controllers/NotesController.js");
const ensureAuthnticated = require("../middleware/ensureAuthenticated.js");
const notesRoutes = Router();
const notesController = new NotesController();

notesRoutes.use(ensureAuthnticated);

notesRoutes.get("/", notesController.index);
notesRoutes.post("/:user_id", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes;
