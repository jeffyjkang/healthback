exports.up = function(knex, Promise) {
  return knex.schema.createTable("goal", goal => {
    goal.increments("id").primary();
    goal.date("fromDate");
    goal.date("toDate");
    goal.string("goalDescription");
    goal
      .integer("userId")
      .unsigned()
      .references("id")
      .inTable("user")
      .notNullable();
    goal.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("goal");
};
