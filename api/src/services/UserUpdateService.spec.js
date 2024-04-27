const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const UserUpdateService = require("./UserUpdateService");
const AppError = require("../utils/AppError");



describe("UserUpdateService", () => {
    let userCreateService;
    let userRepository;
    let userUpdateService;

    beforeEach(() => {
        userRepository = new UserRepositoryInMemory();
        userCreateService = new UserCreateService(userRepository);
        userUpdateService = new UserUpdateService(userRepository);
    })

    it("Should not update a user without email", async () => {
        const user = {
            name: "User test",
            email: "user@test.com",
            password: "123456"
        };

        const userCreated = await userCreateService.execute(user);
        
        await expect(userUpdateService.execute({id: userCreated.id, name: userCreated.name, email: "", password: "1234567", old_password: user.password})).rejects.toEqual(new AppError("E-mail is missing", 401));
    })

    it("Should not update without user", async () => {
        const user = {
            name: "User test",
            email: "user@test.com",
            password: "123456"
        };

        const userCreated = await userCreateService.execute(user);
        
        await expect(userUpdateService.execute({id: "", name: "", email: "", password: "", old_password: ""})).rejects.toEqual(new AppError("User not found."));
    })
});
