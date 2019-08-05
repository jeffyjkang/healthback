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
  // create: async day => {
  //   const [id] = await db("day").insert(day);
  //   return db("day")
  //     .where({ id })
  //     .first();
  // },
  create: day => {
    return db("day").insert(day);
  },
  // edit: async (id, day) => {
  //   await db("day")
  //     .where({ id })
  //     .update(day);
  //   return db("day")
  //     .where({ id })
  //     .first();
  // },
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
