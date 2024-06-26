const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("UserCreateService", () => {
    let userRepository;
    let userCreateService;

    beforeEach(() => {
        userRepository = new UserRepositoryInMemory();
        userCreateService = new UserCreateService(userRepository);
    })

    it("should create a user", async () => {
        const user = {
            name: "User test",
            email: "user@test.com",
            password: "123456"
        };
    
        const userCreated = await userCreateService.execute(user);
    
        expect(userCreated).toHaveProperty("id");
    })

    it("should not create a user with same e-mail", async () => {
        const user1 = {
            name: "User test 1",
            email: "user@test.com", //same email
            password: "123456"
        };

        const user2 = {
            name: "User test 2",
            email: "user@test.com", //same email
            password: "123456789"
        };

        await userCreateService.execute(user1);
        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("This e-mail is already in use."));
    })
})