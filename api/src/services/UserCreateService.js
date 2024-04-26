const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");
const validator = require("email-validator");

class UserCreateService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ name, email, password }) {
        const userExists = await this.userRepository.findByEmail(email);

        if (!validator.validate(email)) {
            throw new AppError("Insert a valid e-mail.")
        }
        
        if (userExists) {
            throw new AppError("This e-mail is already in use.");
        }
        
        if (password.length < 6) {
            throw new AppError("Your password must have more than 6 characters.")
        }

        const hashedPassword = await hash(password, 8);

        const userCreated = await this.userRepository.create({name, email, password: hashedPassword});

        return userCreated;
    }
}

module.exports = UserCreateService;
