const knex = require("knex");
//process.env.NODE_ENV ||
const environment = "development";
const knexConfig = require("../knexfile")[environment];
module.exports = knex(knexConfig);
