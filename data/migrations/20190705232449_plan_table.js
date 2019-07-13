exports.up = function(knex, Promise) {
  return knex.schema.createTable("plan", plan => {
    plan.increments("id").primary();
    plan.date("fromDate");
    plan.date("toDate");
    plan.string("exercisePlan");
    plan.string("foodPlan");
    plan.string("sleepPlan");
    plan.string("miscPlan");
    plan
      .integer("goalId")
      .unsigned()
      .references("id")
      .inTable("goal")
      .notNullable()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    plan.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("plan");
};
