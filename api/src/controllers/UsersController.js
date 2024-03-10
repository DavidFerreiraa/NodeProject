const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class UsersController {
    index(request, response) {
        const { page, limit } = request.query;
        response.status(200).send(`Página: ${page} - Limite de usuários: ${limit}`);
    }

    async create(request, response) {
        const { name, email, password } = request.body;

        const database = await sqliteConnection();
        const userExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if (userExists) {
            throw new AppError("This e-mail is already in use.")
        }

        await database.run("INSERT INTO users ( name, email, password) VALUES (?, ?, ?)", [name, email, password]) //Create a user into db

        return response.status(201).json();
    }
}

module.exports = UsersController;
