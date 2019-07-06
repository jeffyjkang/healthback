exports.up = function(knex, Promise) {
  return knex.schema.createTable("exercise", exercise => {
    exercise.increments("id").primary();
    exercise.date("date");
    exercise.boolean("complete");
    exercise.string("exerciseNotes");
    exercise
      .integer("planId")
      .unsigned()
      .references("id")
      .inTable("plan")
      .notNullable();
    exercise.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("exercise");
};
