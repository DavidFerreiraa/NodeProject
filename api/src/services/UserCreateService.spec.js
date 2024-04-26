const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");

it("should create a user", async () => {
    const user = {
        name: "User test",
        email: "user@test.com",
        password: "123456"
    }

    const userRepositoryInMemory = new UserRepositoryInMemory();
    const userCreateService = new UserCreateService(userRepositoryInMemory);

    const userCreated = await userCreateService.execute(user);

    expect(userCreated).toHaveProperty("id");
})