const config = require("../../../knexfile");
const knex = require("knex");

const connection = knex(config.development);

modules.exports = connection;
