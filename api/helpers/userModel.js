const db = require("../../data/dbConfig");
module.exports = {
  get: id => {
    let query = db("user");
    if (id) {
      query = db("user")
        .where({ id })
        .first();
    }
    return query;
  },
  // register: async user => {
  //   const [id] = await db("user").insert(user);
  //   return db("user")
  //     .where({ id })
  //     .first();
  // },
  register: user => {
    return db("user").insert(user);
  },
  login: async username => {
    const user = await db("user")
      .where({ username })
      .first();
    return user;
  },
  edit: async (id, user) => {
    await db("user")
      .where({ id })
      .update(user);
    return db("user")
      .where({ id })
      .first();
  },
  remove: id => {
    return db("user")
      .where({ id })
      .del();
  }
};
