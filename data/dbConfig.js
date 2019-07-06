const knex = require("knex");
const environment = "development";
const knexConfig = require("../knexfile")[environment];
module.exports = knex(knexConfig);
