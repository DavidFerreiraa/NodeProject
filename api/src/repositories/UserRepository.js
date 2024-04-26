const sqliteConnection = require("../database/sqlite");

class UserRepository {
    async finByEmail(email) {
        const database = await sqliteConnection();

        const user = await database.get("SELECT * FROM users WHERE email = (?)", [email.toLowerCase()])

        return user;
    }

    async create({name, email, password}) {
        const database = await sqliteConnection();

        const userId = await database.run("INSERT INTO users ( name, email, password) VALUES (?, ?, ?)", [name, email.toLowerCase(), password]) //Create a user into db

        return {id: userId};
    }
}

module.exports = UserRepository;
