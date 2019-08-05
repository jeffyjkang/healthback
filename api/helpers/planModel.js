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
  create: plan => {
    db("plan")
      .insert(plan)
      .returning("*")
      .then(createdPlan => {
        createdPlan = createdPlan[0];
        const planId = createdPlan.id;
        const fromDate = createdPlan.fromDate.toISOString();
        const toDate = createdPlan.toDate.toISOString();
        const fromDay = fromDate.substring(0, 10).split("-")[2];
        const toDay = toDate.substring(0, 10).split("-")[2];
        if (Number(toDay) < 7) {
          for (let i = 0; i < 7 - Number(toDay); i++) {
            let dailyDate = `${fromDate.substring(0, 10).split("-")[0]}-${
              fromDate.substring(0, 10).split("-")[1]
            }-${Number(fromDay) + i}`;
            db("day")
              .insert({ dailyDate, planId })
              .then(res => {
                return res;
              });
          }
          for (let i = 0; i < Number(toDay); i++) {
            let dailyDate = `${toDate.substring(0, 10).split("-")[0]}-${
              toDate.substring(0, 10).split("-")[1]
            }-${i + 1}`;
            db("day")
              .insert({ dailyDate, planId })
              .then(res => {
                return res;
              });
          }
        } else {
          for (let i = Number(fromDay); i < Number(toDay) + 1; i++) {
            let dailyDate = `${fromDate.substring(0, 10).split("-")[0]}-${
              fromDate.substring(0, 10).split("-")[1]
            }-${i}`;
            db("day")
              .insert({ dailyDate, planId })
              .then(res => {
                return res;
              });
          }
        }
        return planId;
      });
  },
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
