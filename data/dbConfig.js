const knex = require("knex");
//process.env.NODE_ENV ||
const environment = process.env.NODE_ENV || "development";
const knexConfig = require("../knexfile")[environment];
module.exports = knex(knexConfig);
