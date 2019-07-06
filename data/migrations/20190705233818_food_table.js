exports.up = function(knex, Promise) {
  return knex.schema.createTable("food", food => {
    food.increments("id").primary();
    food.date("date");
    food.boolean("complete");
    food.string("foodNotes");
    food
      .integer("planId")
      .unsigned()
      .references("id")
      .inTable("plan")
      .notNullable();
    food.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("food");
};
