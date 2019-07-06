exports.up = function(knex, Promise) {
  return knex.schema.createTable("sleep", sleep => {
    sleep.increments("id").primary();
    sleep.date("date");
    sleep.boolean("complete");
    sleep.string("sleepNotes");
    sleep
      .integer("planId")
      .unsigned()
      .references("id")
      .inTable("plan")
      .notNullable();
    sleep.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("sleep");
};
