class UsersController {
    index(request, response) {
        const { page, limit } = request.query;
        response.status(200).send(`Página: ${page} - Limite de usuários: ${limit}`);
    }

    create(request, response) {
        const { name, email, password } = request.body;

        response.status(201).json({ name, email, password });
    }
}

module.exports = UsersController;
