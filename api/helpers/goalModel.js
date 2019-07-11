const db = require("../../data/dbConfig");
module.exports = {
  get: id => {
    let query = db("goal");
    if (id) {
      query = db("goal").where("goal.id", id);
    }
    return query;
  },
  create: async goal => {
    const [id] = await db("goal").insert(goal);
    return db("goal")
      .where({ id })
      .first();
  }
};
