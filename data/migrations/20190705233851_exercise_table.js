exports.up = function(knex, Promise) {
  return knex.schema.createTable("exercise", exercise => {
    exercise.increments("id").primary();
    exercise.boolean("complete");
    exercise.string("exerciseNotes");
    exercise
      .integer("dayId")
      .unsigned()
      .references("id")
      .inTable("day")
      .notNullable()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    exercise.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("exercise");
};
