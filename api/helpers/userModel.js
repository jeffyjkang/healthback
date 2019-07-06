const db = require("../../data/dbConfig");
module.exports = {
  get: id => {
    let query = db("user");
    if (id) {
      query = db("user").where("user.id", id);
    }
    return query;
  },
  register: async user => {
    const [id] = await db("user").insert(user);
    return db("user")
      .where({ id })
      .first();
  },
  login: async username => {
    const user = await db("user")
      .where({ username })
      .first();
    return user;
  }
};