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
  create: async goal => {
    console.log("4", goal);
    const [id] = await db("goal").insert(goal);
    console.log("5", id);
    return db("goal")
      .where({ id })
      .first();
  },
  edit: async (id, goal) => {
    await db("goal")
      .where({ id })
      .update(goal);
    return db("goal")
      .where({ id })
      .first();
  },
  remove: id => {
    return db("goal")
      .where({ id })
      .del();
  }
};
