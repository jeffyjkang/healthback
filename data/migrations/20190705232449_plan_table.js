exports.up = function(knex, Promise) {
  return knex.schema.createTable("plan", plan => {
    plan.increments("id").primary();
    plan.date("fromDate").notNullable();
    plan.date("toDate").notNullable();
    plan.float("weight");
    plan.string("exercisePlan");
    plan.string("foodPlan");
    plan.string("sleepPlan");
    plan.string("miscPlan");
    plan
      .integer("goalId")
      .notNullable()
      .unsigned();
    plan
      .foreign("goalId")
      .references("id")
      .inTable("goal")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    plan.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("plan");
};
