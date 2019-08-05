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
        console.log(createdPlan);
        const planId = createdPlan.id;
        const fromDate = createdPlan.fromDate.toISOString();
        const toDate = createdPlan.toDate.toISOString();
        console.log(planId);
        console.log(fromDate);
        console.log(toDate);
        const fromDay = fromDate.substring(0, 10).split("-")[2];
        const toDay = toDate.substring(0, 10).split("-")[2];
        if (Number(toDay) < 7) {
          for (let i = 0; i < 7 - Number(toDay); i++) {
            let dailyDate = `${fromDate.substring(0, 10).split("-")[0]}-${
              fromDate.substring(0, 10).split("-")[1]
            }-${Number(fromDay) + i}`;
            console.log(dailyDate);
            db("day").insert({ dailyDate, planId });
          }
          for (let i = 0; i < Number(toDay); i++) {
            let dailyDate = `${toDate.substring(0, 10).split("-")[0]}-${
              toDate.substring(0, 10)[1]
            }-${i + 1}`;
            console.log(dailyDate);
            db("day").insert({ dailyDate, planId });
          }
        } else {
          for (let i = Number(fromDay); i < Number(toDay) + 1; i++) {
            let dailyDate = `${fromDate.substring(0, 10).split("-")[0]}-${
              fromDate.substring(0, 10)[1]
            }-${i}`;
            console.log(dailyDate);
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
