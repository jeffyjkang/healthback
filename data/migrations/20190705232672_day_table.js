exports.up = function(knex, Promise) {
  return knex.schema.createTable("day", day => {
    day.increments("id").primary();
    day.date("dailyDate").notNullable();
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
      .notNullable()
      .unsigned();
    day
      .foreign("planId")
      .references("id")
      .inTable("plan")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    day.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("day");
};
