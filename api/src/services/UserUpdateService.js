const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const validator = require("email-validator");

class UserUpdateService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ id, name, email, password, old_password }) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new AppError("User not found.");
        }

        if (!email) {
            throw new AppError("E-mail is missing", 401);
        }

        if (!validator.validate(email)) {
            throw new AppError("Insert a valid e-mail.")
        }

        const userWithUpdatedEmail = await this.userRepository.findByEmail(email);

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

        this.userRepository.update({ name: user.name, email: user.email, password: user.password, id: user.id});
    }
}

module.exports = UserUpdateService;
