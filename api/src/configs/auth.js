module.exports = {
    jwt: {
        secret: process.env.JWT_KEY_TOKEN || "default",
        expiresIn: "1d"
    }
}