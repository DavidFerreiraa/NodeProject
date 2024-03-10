const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");
const { hash } = require("bcryptjs");


class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;
        
        const database = await sqliteConnection();
        const userExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if (userExists) {
            throw new AppError("This e-mail is already in use.")
        }

        const hashedPassword = await  hash(password, 8);

        await database.run("INSERT INTO users ( name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]) //Create a user into db

        return response.status(201).json();
    }
}

module.exports = UsersController;
