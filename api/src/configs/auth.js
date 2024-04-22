require("dotenv").config();
console.log(process.env)
module.exports = {
    jwt: {
        secret: process.env.JWT_KEY_TOKEN,
        expiresIn: "1d"
    }
}