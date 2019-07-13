exports.up = function(knex, Promise) {
  return knex.schema.createTable("day", day => {
    day.increments("id").primary();
    day.date("dailyDate");
    day.boolean("sleepComplete").defaultTo(false);
    day.boolean("foodComplete").defaultTo(false);
    day.boolean("exerciseComplete").defaultTo(false);
    day.boolean("miscComplete").defaultTo(false);
    day.string("sleepNotes");
    day.string("foodNotes");
    day.string("exerciseNotes");
    day.string("miscNotes");
    day
      .integer("planId")
      .unsigned()
      .references("id")
      .inTable("plan")
      .notNullable()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    day.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("day");
};
