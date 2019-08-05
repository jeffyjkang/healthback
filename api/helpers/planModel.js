const db = require("../../data/dbConfig");
module.exports = {
  get: id => {
    let query = db("plan");
    if (id) {
      query = db("plan")
        .where({ id })
        .first();
    }
    return query;
  },
  // create: async plan => {
  //   const [id] = await db("plan").insert(plan);
  //   return db("plan")
  //     .where({ id })
  //     .first();
  // },
  create: plan => {
    db("plan")
      .insert(plan)
      .returning("*")
      .then(createdPlan => {
        createdPlan = createdPlan[0];
        const planId = createdPlan.id;
        console.log(planId);
        const fromDay = createdPlan.fromDate.substring(0, 10).split("-")[2];
        const toDay = createdPlan.toDate.substring(0, 10).split("-")[2];
        if (Number(toDay) < 7) {
          for (let i = 0; i < 7 - Number(toDay); i++) {
            let dailyDate = `${
              createdPlan.fromDate.substring(0, 10).split("-")[0]
            }-${createdPlan.fromDate.substring(0, 10).split("-")[1]}-${Number(
              fromDay
            ) + i}`;
            db("day").insert({ dailyDate, planId });
          }
          for (let i = 0; i < Number(toDay); i++) {
            let dailyDate = `${
              createdPlan.toDate.substring(0, 10).split("-")[0]
            }-${createdPlan.toDate.substring(0, 10)[1]}-${i + 1}`;
            db("day").insert({ dailyDate, planId });
          }
        } else {
          for (let i = Number(fromDay); i < Number(toDay) + 1; i++) {
            let dailyDate = `${
              createdPlan.fromDate.substring(0, 10).split("-")[0]
            }-${createdPlan.fromDate.substring(0, 10)[1]}-${i}`;
            db("day").insert({ dailyDate, planId });
          }
        }
        return planId;
      });
  },
  // edit: async (id, plan) => {
  //   await db("plan")
  //     .where({ id })
  //     .update(plan);
  //   return db("plan")
  //     .where({ id })
  //     .first();
  // },
  edit: (id, plan) => {
    return db("plan")
      .where({ id })
      .update(plan);
  },
  remove: id => {
    return db("plan")
      .where({ id })
      .del();
  }
};
