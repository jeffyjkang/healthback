exports.up = function(knex, Promise) {
  return knex.schema.createTable("misc", misc => {
    misc.increments("id").primary();
    misc.boolean("complete");
    misc.string("miscNotes");
    misc
      .integer("dayId")
      .unsigned()
      .references("id")
      .inTable("day")
      .notNullable()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    misc.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("misc");
};
