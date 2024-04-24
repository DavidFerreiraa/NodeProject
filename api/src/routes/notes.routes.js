const { Router } = require("express");
const NotesController = require("../controllers/NotesController.js");
const ensureAuthenticated = require("../middleware/ensureAuthenticated.js");
const notesRoutes = Router();
const notesController = new NotesController();

notesRoutes.use(ensureAuthenticated);

notesRoutes.get("/", notesController.index);
notesRoutes.post("/", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes;
