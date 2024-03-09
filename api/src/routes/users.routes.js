const { Router } = require("express");

const usersRoutes = Router();

usersRoutes.get("/", (request, response) => {
    const { page, limit } = request.query;
    response.send(`Página: ${page} - Limite de usuários: ${limit}`);
});

usersRoutes.post("/", (request, response) => {
    const { name, email, password } = request.body;

    response.json({ name, email, password });
})

module.exports = usersRoutes;
