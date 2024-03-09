const express = require("express");

const app = express();
app.use(express.json());

app.get("/message/:id", (request, response) => {
    const { id } = request.params;
    response.send(`Message ID: ${id}`);
});

app.get("/users", (request, response) => {
    const { page, limit } = request.query;
    response.send(`Página: ${page} - Limite de usuários: ${limit}`);
});

app.post("/users", (request, response) => {
    const { name, email, password } = request.body;

    response.json({ name, email, password });
})

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
