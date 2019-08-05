const db = require("../../data/dbConfig");
module.exports = {
  get: id => {
    let query = db("day");
    if (id) {
      query = db("day")
        .where({ id })
        .first();
    }
    return query;
  },
  create: day => {
    return db("day").insert(day);
  },
  edit: (id, day) => {
    return db("day")
      .where({ id })
      .update(day);
  },
  remove: id => {
    return db("day")
      .where({ id })
      .del();
  }
};
