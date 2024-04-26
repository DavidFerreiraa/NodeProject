class UserUpdateService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ id, name, email, password, oldPassword }) {
        const user = await this.userRepository.findByEmail(email);
    }
}