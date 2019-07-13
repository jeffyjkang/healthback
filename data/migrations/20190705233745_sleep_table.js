exports.up = function(knex, Promise) {
  return knex.schema.createTable("sleep", sleep => {
    sleep.increments("id").primary();
    sleep.boolean("complete");
    sleep.string("foodNotes");
    sleep
      .integer("dayId")
      .unsigned()
      .references("id")
      .inTable("day")
      .notNullable()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    sleep.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("sleep");
};
