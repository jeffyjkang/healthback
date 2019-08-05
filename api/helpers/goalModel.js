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
  create: goal => {
    return db("goal").insert(goal);
  },
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
