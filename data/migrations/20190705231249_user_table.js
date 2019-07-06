exports.up = function(knex, Promise) {
  return knex.schema.createTable("user", user => {
    user.increments("id").primary();
    user
      .string("username")
      .unique()
      .notNullable();
    user.string("password").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("user");
};
