const sqliteConnection = require("../database/sqlite");

class UserRepository {
    async findByEmail(email) {
        const database = await sqliteConnection();

        const user = await database.get("SELECT * FROM users WHERE email = (?)", [email.toLowerCase()])

        return user;
    }

    async findById(id) {
        const database = await sqliteConnection();

        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        return user;
    }

    async create({name, email, password}) {
        const database = await sqliteConnection();

        const userId = await database.run("INSERT INTO users ( name, email, password) VALUES (?, ?, ?)", [name, email.toLowerCase(), password]) //Create a user into db

        return {id: userId};
    }

    async update({ name, email, password, id }) {
        const database = await sqliteConnection();

        await database.run(`
        UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        updated_at = DATETIME('now')
        WHERE id = ?
    `, [name, email, password, id]);
    }
}

module.exports = UserRepository;
