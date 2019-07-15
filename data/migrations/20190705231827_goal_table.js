exports.up = function(knex, Promise) {
  return knex.schema.createTable("goal", goal => {
    goal.increments("id").primary();
    goal.date("date").notNullable();
    goal.integer("weight");
    goal.string("exerciseGoal");
    goal.string("foodGoal");
    goal.string("sleepGoal");
    goal.string("miscGoal");
    goal
      .integer("userId")
      .notNullable()
      .unsigned();
    goal
      .foreign("userId")
      .references("id")
      .inTable("user")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    goal.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("goal");
};
