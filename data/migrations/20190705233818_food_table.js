exports.up = function(knex, Promise) {
  return knex.schema.createTable("food", food => {
    food.increments("id").primary();
    food.boolean("complete");
    food.string("foodNotes");
    food
      .integer("dayId")
      .unsigned()
      .references("id")
      .inTable("day")
      .notNullable()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    food.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("food");
};
