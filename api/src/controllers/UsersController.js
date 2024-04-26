const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");
const UserRepository = require("../repositories/UserRepository");

const { hash, compare } = require("bcryptjs");
const validator = require("email-validator");

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;

        const userRepository = new UserRepository();
        
        const userExists = await userRepository.finByEmail(email);

        if (!validator.validate(email)) {
            throw new AppError("Insert a valid e-mail.")
        }
        
        if (userExists) {
            throw new AppError("This e-mail is already in use.");
        }
        
        if (password.length < 6) {
            throw new AppError("Your password must have more than 6 characters.")
        }

        const hashedPassword = await  hash(password, 8);

        await userRepository.create({name, email, password: hashedPassword});

        return response.status(201).json();
    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const user_id = request.user.id;

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

        if (!user) {
            throw new AppError("User not found.");
        }

        if (!email) {
            throw new AppError("E-mail is missing", 401);
        }

        if (!validator.validate(email)) {
            throw new AppError("Insert a valid e-mail.")
        }
        
        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email.toLowerCase()]);

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("This e-mail is already in use.")
        }

        user.name = name ?? user.name;
        user.email = email.toLowerCase() ?? user.email;

        if ( password && !old_password ) {
            throw new AppError("You need insert the old password to update your password");
        }

        if ( password && old_password ) {

            if (password.length < 6) {
                throw new AppError("Your password must have more than 6 characters.")
            }

            const checkOldPassword = await compare(old_password, user.password);

            if (!checkOldPassword) {
                throw new AppError("Your old password don't match.");
            }

            user.password = await hash(password, 8);
        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?
        `, [user.name, user.email, user.password, user_id]);

        return response.json();
    }
}

module.exports = UsersController;
