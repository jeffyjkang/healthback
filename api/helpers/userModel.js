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
  register: user => {
    return db("user").insert(user);
  },
  login: username => {
    return db("user")
      .where({ username })
      .first();
  },
  edit: (id, user) => {
    return db("user")
      .where({ id })
      .update(user)
      .returning("*");
  },
  remove: id => {
    return db("user")
      .where({ id })
      .del();
  }
};
