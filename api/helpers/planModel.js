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
    return db("plan").insert(plan);
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
