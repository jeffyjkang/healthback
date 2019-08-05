const db = require("../../data/dbConfig");
module.exports = {
  get: id => {
    let query = db("goal");
    if (id) {
      query = db("goal")
        .where({ id })
        .first();
    }
    return query;
  },
  // create: async goal => {
  //   const [id] = await db("goal").insert(goal);
  //   return db("goal")
  //     .where({ id })
  //     .first();
  // },
  create: goal => {
    console.log("3", goal);
    console.log(db("goal").insert(goal));
    return db("goal").insert(goal);
  },
  // edit: async (id, goal) => {
  //   await db("goal")
  //     .where({ id })
  //     .update(goal);
  //   return db("goal")
  //     .where({ id })
  //     .first();
  // },
  edit: (id, goal) => {
    return db("goal")
      .where({ id })
      .update(goal);
  },
  remove: id => {
    return db("goal")
      .where({ id })
      .del();
  }
};
